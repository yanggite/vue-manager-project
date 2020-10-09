<template>
    <div class="adminEditDiv dialogSingle">
        <el-dialog title="编辑管理员" :visible.sync="CVisible">
            <el-form :model="form" :rules="rules" ref="ruleForm">
                <el-form-item label="账号" prop="login" :label-width="formLabelWidth">
                    <el-input v-model="form.login" autocomplete="off" class="inputPure"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="psw" :label-width="formLabelWidth">
                    <el-input v-model="form.psw" autocomplete="off" class="inputPure"></el-input>
                </el-form-item>
                <el-form-item label="角色" prop="roleId" :label-width="formLabelWidth">
                    <el-select v-model="form.roleId" placeholder="请选择" class="editSelect">
                        <el-option v-for="item in roleOption" :key="item.id" :label="item.roleName" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="团队" prop="teamPermissionList" :label-width="formLabelWidth">
                    <el-select v-model="teamPermissionList" multiple placeholder="请选择" class="editSelect">
                        <el-option label="选择所有" value="ALL"></el-option>
                        <el-option v-for="item in teamOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
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
export default {
    props: {
        adminEditVisible: {
            type: Boolean,
            default: false
        },
        currentUser: {
            type: Object,
            default: () => {}
        }
    },
    computed: {
        CVisible: {
            get() {
                return this.adminEditVisible;
            },
            set(val) {
                this.$emit('update:adminEditVisible', val);
            }
        }
    },
    data() {
        return {
            psw: '',
            formLabelWidth: '120',
            roleOption: [],
            teamOption: [],
            teamPermissionList:[],
            rules: {
                login: [{ required: true, message: '请输入账号', trigger: 'blur' }],
                psw: [{ required: true, message: '请输入密码', trigger: 'blur' }],
                // teamPermissionList: [{ required: true, message: '请选择类型', trigger: 'change' }],
                roleId: [{ required: true, message: '请选择类型', trigger: 'change' }]
            },
            form: { login: '', psw: '', roleId: '', teamPermissionList: [] }
        };
    },
        watch: {
        teamPermissionList(val, oldval) {
            let newindex = val.indexOf('ALL'),
                oldindex = oldval.indexOf('ALL'); //获取val和oldval里ALL的索引,如果没有则返回-1
            if (newindex != -1 && oldindex == -1 && val.length > 1)
                //如果新的选择里有勾选了选择所有选择所有 则 只直线勾选所有整个选项
                this.teamPermissionList = ['ALL'];
            else if (newindex != -1 && oldindex != -1 && val.length > 1)
                //如果操作前有勾选了选择所有且当前也选中了勾选所有且勾选数量大于1  则移除掉勾选所有
                this.teamPermissionList.splice(val.indexOf('ALL'), 1);
        }
    },
    created() {
        this.form.login = this.currentUser.login;
        this.form.roleId = this.currentUser.roleId;
        this.form.id = this.currentUser.id;
        this.teamPermissionList = this.currentUser.teamPermissionList;
        this.getRoleList();
        this.getSelectTeamTag();
    },
    methods: {
        async getRoleList() {
            const res = await this.$api.getRoleList({ pageNo: 1, pageSize: 1000 });
            this.roleOption = res.data.roles;
        },
        onCancle() {
            this.CVisible = false;
        },
        onSumbit() {
            this.$refs.ruleForm.validate(async valid => {
                if (valid) {
                    const res = await this.$api.editAdmin({ ...this.form,teamPermissionList: this.teamPermissionList, psw: this.encryptData(publicKey, this.form.psw) });
                    console.log(res);
                    if (res.code === '200') {
                        this.$message.success('编辑成功');
                        this.$emit('refreshList');
                    } else {
                        this.$message.error('编辑失败');
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
        },
        async getSelectTeamTag() {
            const res = await this.$api.getSelectTeamTag();
            this.teamOption = res.data;
        }
    }
};
</script>

<style lang="less" scoped>
div.adminEditDiv {
}
</style>
