<template>
    <div class="updateOrderState dialogSingle">
        <el-dialog title="修改订单状态" :visible.sync="CVisible" class="dialogueV">
            <el-form :model="form" :rules="rules" ref="form">
                <el-form-item label="" prop="state" :label-width="formLabelWidth">
                    <el-select v-model="form.state" placeholder="请选择" class="editSelect">
                        <el-option v-for="item in memberOption" :key="item.val" :label="item.label" :value="item.val"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="" prop="remark" :label-width="formLabelWidth">
                    <el-input
                        type="textarea"
                        v-model="form.remark"
                        autocomplete="off"
                        :rows="5"
                        class="inputPure"
                        maxlength="100"
                        placeholder="请输入100字以内的备注内容"
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
        orderStateVisible: {
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
                return this.orderStateVisible;
            },
            set(val) {
                this.$emit('update:orderStateVisible', val);
            }
        }
    },
    data() {
        return {
            form: {
                id: '',
                state: '',
                remark: ''
            },
            formLabelWidth: '120',
            // 0.待确认 1.已确认 2.完成 3.关闭
            memberOption: [
                {
                    val: '0',
                    label: '待确认'
                },
                {
                    val: '1',
                    label: '已确认'
                },
                {
                    val: '2',
                    label: '完成'
                },
                {
                    val: '3',
                    label: '关闭'
                }
            ],
            rules: {
                state: [{ required: true, message: '请选择', trigger: 'change' }],
                remark: [{ required: true, message: '请输入备注', trigger: 'blur' }]
            }
        };
    },
    created() {
        this.form.id = this.currentItem.id;
        this.form.state = this.currentItem.state;
        this.memberOption.forEach((item, index) => {
            if (item.val == this.currentItem.state) {
                this.form.state = item.label;
            }
        });
    },
    methods: {
        onCancle() {
            // this.$emit('update:orderStateVisible', false);
            this.CVisible = false;
        },
        onSumbit() {
            this.$refs.form.validate(async valid => {
                if (valid) {
                    const res = await this.$api.editOrderState(this.form);
                    if (res.code === '200') {
                        this.$message.success('修改成功');
                        this.$emit('refreshList');
                    } else {
                        this.$message.error('修改失败');
                    }
                    this.CVisible = false;
                }
            });
        }
    }
};
</script>

<style lang="less" scoped>
div.updateOrderState {
}
</style>
