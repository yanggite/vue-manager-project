<template>
    <div class="roleEditDiv dialogSingle">
        <el-dialog title="编辑角色" :visible.sync="CVisible">
            <el-form :model="currentUser" :rules="rules" ref="ruleForm">
                <el-form-item label="角色" prop="roleName" :label-width="formLabelWidth">
                    <el-input v-model="currentUser.roleName" autocomplete="off" class="inputPure"></el-input>
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
        roleEditVisible: {
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
                return this.roleEditVisible;
            },
            set(val) {
                this.$emit('update:roleEditVisible', val);
            }
        }
    },
    data() {
        return {
            form: {
                id: '',
                roleName: ''
            },
            id: '', //
            formLabelWidth: '120',

            rules: {
                roleName: [{ required: true, message: '请输入角色', trigger: 'blur' }]
            }
        };
    },
    created() {
        console.log(this.currentUser);
    },
    methods: {
        onCancle() {
            this.$emit('update:roleEditVisible', false);
        },
        onSumbit() {
            this.$refs.ruleForm.validate(async (valid) => {
                if (valid) {
                    this.$emit('update:roleEditVisible', false);
                    const result = await this.$api.editRole({ ...this.currentUser });
                    console.log(result);
                    if (result.code === '200') {
                        this.$message.success('修改成功');
                    }else{
                         this.$message.info('修改失败');
                    }
                }
            });
        }
    }
};
</script>

<style lang="less" scoped>
div.roleEditDiv {
}
</style>