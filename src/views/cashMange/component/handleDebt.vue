<template>
    <div class="handleDebt dialogSingle">
        <el-dialog title="手动上账" :visible.sync="CVisible">
            <el-form :model="form" :rules="rules" ref="form">
      
                    <!-- <el-input v-model="form.amount" autocomplete="off" class="inputPure" disabled></el-input> -->
                    <p class="amountTit">上账数量：{{form.amount}}</p>
            
                <el-form-item label="UID" prop="UID" :label-width="formLabelWidth">
                    <el-input v-model="form.UID" autocomplete="off" class="inputPure" placeholder="请输入用户的UID"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="remarks" :label-width="formLabelWidth">
                    <el-input
                        type="textarea"
                        rows="8"
                        v-model="form.remarks"
                        autocomplete="off"
                        class="inputPure"
                        placeholder="请输入备注内容"
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
        handleDebtVisible: {
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
                return this.handleDebtVisible;
            },
            set(val) {
                this.$emit('update:handleDebtVisible', val);
            }
        }
    },
    data() {
        return {
            formLabelWidth: '120',
            rules: {
                UID: [{ required: true, message: '请输入UID', trigger: 'blur' }],
                remarks: [{ required: true, message: '请输入备注', trigger: 'blur' }]
            },
            form: {
                arrlyIds: [],
                UID: '',
                remarks: '',
                amount: ''
            }
        };
    },
    created() {
    
        this.form.arrlyIds = [this.currentItem.id];
        this.form.amount = this.currentItem.amount;
    },
    methods: {
        onCancle() {
            this.CVisible = false;
        },
        onSumbit() {
            this.$refs.form.validate(async valid => {
                if (valid) {
                    const res = await this.$api.manualPayment(this.form);
                    if (res.code === '200') {
                        this.$message.success('手动上账成功');
                        this.$emit('refreshList');
                    } else if (res.code === '500') {
                        this.$message.error(res.msg);
                    }else if (res.code === '302') {
                        this.$message.error(res.msg);
                    }
                     else {
                        this.$message.error('手动上账失败');
                    }
                    this.CVisible = false;
                }
            });
        }
    }
};
</script>

<style lang="less" scoped>
div.handleDebt {
    .nameTitle {
        font-weight: bold;
        margin-bottom: 10px;
    }
    .Acontent {
        line-height: 30px;
    }
    .itemNum {
        color: #409eff;
    }
    .amountTit{
        text-align: center;
        margin-bottom: 10px;
        color: #409EFF;
    }
}
</style>
