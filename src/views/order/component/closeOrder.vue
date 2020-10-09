<template>
    <div class="closeOrder dialogSingle">
        <el-dialog title="关闭订单" :visible.sync="CVisible" class="dialogueV">
            <el-form :model="form" :rules="rules" ref="form">
                <el-form-item label="内容" prop="content" :label-width="formLabelWidth">
                    <el-input
                        type="textarea"
                        rows="8"
                        v-model="form.content"
                        autocomplete="off"
                        class="inputPure"
                        placeholder="请输入500字以内的内容"
                        maxlength="500"
                    ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="onCancle" size="small">取 消</el-button>
                <el-button type="primary" @click="onSumbit" size="small">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>

export default {
    props: {
        closeOrderVisible: {
            type: Boolean,
            default: false
        },
        currentItem: {
            type: Object,
            default: () => {}
        }
    },
    computed: {
        CVisible: {
            get() {
                return this.closeOrderVisible;
            },
            set(val) {
                this.$emit('update:closeOrderVisible', val);
            }
        }
    },
    data() {
        return {
            form: {
               id:"",
               content:""
            },
            formLabelWidth: '120',
    
            rules: {
           
                content: [{ required: true, message: '请选择内容', trigger: 'blur' }]
            }
        };
    },
    created() {
        this.form = Object.assign(this.form, this.currentItem);
        // console.log(this.form);
    },
    methods: {
        onCancle() {
            // this.$emit('update:closeOrderVisible', false);
            this.CVisible = false;
        },
        onSumbit() {
            this.$refs.form.validate(async valid => {
                if (valid) {
                    this.$emit('refreshList')
                    this.CVisible = false;
                }
            });
        }
    }
};
</script>

<style lang="less" scoped>
div.closeOrder {
}
</style>
