<template>
    <div class="sysConfEdit dialogSingle">
        <el-dialog title="编辑参数" :visible.sync="CVisible" class="dialogueV">
            <el-form :model="form" :rules="rules" ref="form">
                <el-form-item label="参数" prop="configValue" :label-width="formLabelWidth">
                    <el-input v-model="form.configValue" autocomplete="off" class="inputPure" placeholder="请编辑参数"></el-input>
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
        sysConfEditVisible: {
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
                return this.sysConfEditVisible;
            },
            set(val) {
                this.$emit('update:sysConfEditVisible', val);
            }
        }
    },
    data() {
        return {
            form: {
                id: '',
                configValue: ''
            },
            formLabelWidth: '120',
            roleOption: [],
            teamOption: [],
            languageOption: [{}],
            rules: {
                configValue: [{ required: true, message: '请输入标题', trigger: 'blur' }]
            }
        };
    },
    created() {
        this.form = Object.assign({},this.form, this.currentItem);
        console.log(this.form);
    },
    methods: {
        onCancle() {
            // this.$emit('update:sysConfEditVisible', false);
            this.CVisible = false;
        },
        onSumbit() {
            this.$refs.form.validate(async valid => {
                if (valid) {
                    console.log(this.form);
                    const res = await this.$api.editSysConfig({id:this.form.id,value:this.form.configValue});
                    if (res.code === '200') {
                        this.$message.success('编辑成功');
                        this.$emit('refreshList');
                    } else if (res.code === '502') {
                        this.$message.error(res.msg);
                    } else {
                        this.$message.error('编辑失败');
                    }
                    this.CVisible = false;
                }
            });
        }
    }
};
</script>

<style lang="less" scoped>
.sysConfEdit {
}
</style>
