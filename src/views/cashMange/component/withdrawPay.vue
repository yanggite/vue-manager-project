<template>
    <div class="withdrawPay dialogSingle">
        <el-dialog title="转账" :visible.sync="CVisible">
            <div class="address">
                <p>当前转出地址</p>
                <p>{{ form.paymentAddress }}</p>
            </div>
            <el-form :model="form" :rules="rules" ref="form">
                <el-form-item prop="secret" :label-width="formLabelWidth">
                    <el-input type="password" v-model="form.secret" autocomplete="off" class="inputPure" placeholder="请输入对应密钥"></el-input>
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
        withdrawPayVisible: {
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
                return this.withdrawPayVisible;
            },
            set(val) {
                this.$emit('update:withdrawPayVisible', val);
            }
        }
    },
    data() {
        return {
            formLabelWidth: '120',
            rules: {
                secret: [{ required: true, message: '请输入密匙', trigger: 'blur' }]
            },
            form:{
                paymentAddress:"",
                arrlyIds:[],
                secret:"",
            }
        };
    },
    created() {
        console.log(this.currentItem);
        this.form.paymentAddress=this.currentItem.paymentAddress;
        this.form.arrlyIds=this.currentItem.arrlyIds;
    },
    methods: {
        onCancle() {
            this.CVisible = false;
        },
        onSumbit() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.onbatchPay();
                }
            });
        },
        async onbatchPay() {
            const res = await this.$api.manualPayment(this.form);
            if (res.code === '200') {
                this.$message.success(res.msg);
                this.$emit('refreshList');
            } else if (res.code === '302') {
                this.$message.error(res.msg);
            } else if (res.code === '500') {
                this.$message.error(res.msg);
            } else {
                this.$message.error('打款失败');
            }
            this.CVisible = false;
        }
    }
};
</script>

<style lang="less" scoped>
div.withdrawPay {
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
    .address {
        text-align: center;
        margin-bottom: 10px;
        color: #409eff;
    }
}
</style>
