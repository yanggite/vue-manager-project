<template>
    <div class="editUserMange dialogSingle">
        <el-dialog title="编辑" :visible.sync="CVisible">
            <el-form :model="form" :rules="rules" ref="form">
                <el-form-item label="联系方式" prop="phone" :label-width="formLabelWidth">
                    <el-input v-model="form.phone" autocomplete="off" class="inputPure"></el-input>
                </el-form-item>
                <el-form-item label="登录密码" prop="loginPassword" :label-width="formLabelWidth">
                    <el-input type="password" v-model="form.loginPassword" autocomplete="off" class="inputPure"></el-input>
                </el-form-item>
                <el-form-item label="支付密码" prop="payPassword" :label-width="formLabelWidth">
                    <el-input type="password" v-model="form.payPassword" autocomplete="off" class="inputPure"></el-input>
                </el-form-item>
                <el-form-item label="会员等级" prop="leave" :label-width="formLabelWidth">
                    <el-select v-model="form.leave" placeholder="请选择" class="editSelect">
                        <el-option
                            v-for="item in memberOption"
                            :key="item.id"
                            :label="item.leaveName"
                            :value="item.leaveName"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="用户状态" prop="status" :label-width="formLabelWidth">
                    <el-select v-model="form.status" placeholder="请选择" class="editSelect">
                        <el-option label="禁用" :value="1"></el-option>
                        <el-option label="正常" :value="0"></el-option>
                    </el-select>
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
import JSEncrypt from '@/utils/jsencrypt.js';
import { publicKey } from '@/utils/publickey';
import { phoneReg } from '@/utils/anyRules';

let validPhone = (rule, value, callback) => {
    if (!value) {
        callback(new Error('请输入电话号码'));
    } else if (!phoneReg.test(value)) {
        callback(new Error('请输入正确的11位手机号码'));
    } else {
        callback();
    }
};

export default {
    props: {
        editUserMangeVisible: {
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
                return this.editUserMangeVisible;
            },
            set(val) {
                this.$emit('update:editUserMangeVisible', val);
            }
        }
    },
    data() {
        return {
            formLabelWidth: '120',
            memberOption: [],
            form: {
                userId: '',
                phone: '',
                loginPassword: '',
                payPassword: '',
                status: '',
                leave: ''
            },
            rules: {
                phone: [{ required: true, message: '请输入联系方式', trigger: 'blur' }],
                loginPassword: [{ required: true, message: '请输入登录密码', trigger: 'blur' }],
                payPassword: [{ required: true, message: '请输入支付密码', trigger: 'blur' }],
                leave: [{ required: true, message: '请选择等级', trigger: 'change' }],
                status: [{ required: true, message: '请选择状态', trigger: 'change' }]
            }
        };
    },
    created() {
        this.formInit();
        this.getSelectLeave();
    },
    methods: {
        formInit() {
            console.log(this.currentItem);
            this.form.userId = this.currentItem.id;
            this.form.phone = this.currentItem.phone;
            this.form.status = this.currentItem.state;
            this.form.leave = this.currentItem.leave;
        },
        async getSelectLeave() {
            const res = await this.$api.getSelectLeave();
            if (res.code === '200') {
                this.memberOption = res.data;
            } else {
                this.$message.error(res.msg);
            }

        },
        onCancle() {
            this.CVisible = false;
        },
        onSumbit() {
            this.$refs.form.validate(async (valid) => {
                if (valid) {
                    const res = await this.$api.editUser({
                        ...this.form,
                        loginPassword: this.encryptData(publicKey, this.form.loginPassword),
                        payPassword: this.encryptData(publicKey, this.form.payPassword)
                    });
             
                    if (res.code === '200') {
                        this.$message.success('编辑成功');
                        this.$emit('refreshList');
                    } else {
                        this.$message.error(res.msg);
                    }
                    // this.$emit('refreshList');
                    this.CVisible = false;
                }
            });
        },
        encryptData(getPublicKey, data) {
            let encrypt = new JSEncrypt();
            encrypt.setPublicKey(getPublicKey);
            return encrypt.encrypt(data);
        }
    }
};
</script>

<style lang="less" scoped>
div.editUserMange {
}
</style>