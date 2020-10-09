<template>
    <div class="addTeam ">
        <el-dialog title="增加" :visible.sync="CVisible">
            <el-form :model="form" :rules="rules" ref="form" :label-position="labelPosition" label-width="110px">
                <el-form-item label="地区团队" prop="teamNumber" class="tipsForm">
                    <el-input v-model="form.teamNumber" autocomplete="off" class="inputPure" placeholder="a~Z的地区和1~9的团队"></el-input>
                    <span class="ptips">此处需填写a~Z地区序号和1~9的团队序号；例如“C1”,"a2"</span>
                </el-form-item>
                <el-form-item label="用户名" prop="userName">
                    <el-input v-model="form.userName" autocomplete="off" class="inputPure" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item  label="登录密码" prop="loginPassword">
                    <el-input type="password" v-model="form.loginPassword" autocomplete="off" class="inputPure"></el-input>
                </el-form-item>
                <el-form-item  label="支付密码" prop="payPassword">
                    <el-input type="password" v-model="form.payPassword" autocomplete="off" class="inputPure"></el-input>
                </el-form-item>
                <el-form-item label="联系方式" prop="phone">
                    <el-input v-model="form.phone" autocomplete="off" class="inputPure" placeholder="请输入手机号或邮箱"></el-input>
                </el-form-item>

                <el-form-item label="归集地址" prop="collectionAddress">
                    <el-select v-model="form.collectionAddress" placeholder="请选择" class="editSelect">
                        <el-option v-for="item in guijiOption" :key="item.id" :label="item.address" :value="item.address"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="打款地址" prop="toAddress">
                    <el-select v-model="form.toAddress" placeholder="请选择" class="editSelect">
                        <el-option v-for="item in dakuanOption" :key="item.id" :label="item.address" :value="item.address"></el-option>
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
import { phoneReg,mailReg } from '@/utils/anyRules';
import JSEncrypt from '@/utils/jsencrypt.js';
import { publicKey } from '@/utils/publickey';
let validPhoneEmail = (rule, value, callback) => {
    if (!value) {
        callback(new Error('请输入电话号码或邮箱'));
    } else if (!(phoneReg.test(value) ||mailReg.test(value))) {
        callback(new Error('请输入正确的手机号码或邮箱'));
    } else {
        callback();
    }
};

export default {
    props: {
        addTeamVisible: {
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
                return this.addTeamVisible;
            },
            set(val) {
                this.$emit('update:addTeamVisible', val);
            }
        }
    },
    data() {
        return {
            formLabelWidth: '120',
            guijiOption: [],
            dakuanOption: [],
            form: {},
            rules: {
                teamNumber: [{ required: true, message: '请输入', trigger: 'blur' }],
                userName: [{ required: true, message: '请输入', trigger: 'blur' }],
                phone: [{ required: true, trigger: 'blur', validator: validPhoneEmail }],
                loginPassword: [{ required: true, message: '请输入登录密码', trigger: 'blur' }],
                payPassword: [{ required: true, message: '请输入支付密码', trigger: 'blur' }],
                collectionAddress: [{ required: true, message: '请选择', trigger: 'change' }],
                toAddress: [{ required: true, message: '请选择', trigger: 'change' }]
            },
            formLabelWidth: '120',
            labelPosition: 'right'
        };
    },
    created() {
        this.selectAddress();
    },
    methods: {
        async selectAddress() {
            const res = await this.$api.selectAddress();
            if (res.code === '200') {
                this.guijiOption = res.data;
                this.dakuanOption = res.data;
            } else {
                this.$message.error(res.msg);
            }
        },
        onCancle() {
            this.CVisible = false;
        },
        onSumbit() {
            this.$refs.form.validate(async valid => {
                if (valid) {
                    const res = await this.$api.addUserTeam({
                        ...this.form,
                        loginPassword: this.encryptData(publicKey, this.form.loginPassword),
                        payPassword: this.encryptData(publicKey, this.form.payPassword)
                    });
                    if (res.code === '200') {
                        this.$message.success('新增成功');
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
div.addTeam {
    //弹出框

    /deep/.el-dialog {
        width: 400px;
        .el-dialog__header {
            background-color: rgb(243, 243, 243);
            .el-dialog__title {
                font-size: 14px;
            }
        }
        .el-form-item__content {
       
            .inputPure {
                width: 90%;
            }
            .el-input {
                height: 40px;
            }
        }
        .editSelect {
            width: 90%;
        }
    }

    .ptips {
        display: inline-block;
        font-size: 12px;
        color: #999999;
    }
}
</style>
