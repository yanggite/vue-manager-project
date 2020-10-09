<template>
    <div class="roleAddDiv dialogSingle">
        <el-dialog title="添加角色" :visible.sync="CVisible" class="dialogueV">
            <el-form :model="form" :rules="rules" ref="ruleForm">
                <el-form-item label="角色" prop="roleName" :label-width="formLabelWidth">
                    <el-input v-model="form.roleName" autocomplete="off" class="inputPure"></el-input>
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
        roleAddVisible: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        CVisible: {
            get() {
                return this.roleAddVisible;
            },
            set(val) {
                this.$emit('update:roleAddVisible', val);
            }
        }
    },
    data() {
        return {
            form: {
                roleName: ''
            },
            formLabelWidth: '120',
            rules: {
                roleName: [{ required: true, message: '请输入角色', trigger: 'blur' }]
            }
        };
    },
    methods: {
        onCancle() {
            // this.$emit('update:roleAddVisible', false);
            this.CVisible = false;
        },
        onSumbit() {
            this.$refs.ruleForm.validate(async (valid) => {
                if (valid) {
                    const result = await this.$api.addRole({ ...this.form });
                    console.log(result);
                    if (result.code === '200') {
                        this.$message.success('添加成功');
                        this.CVisible = false;
                        this.$emit('refreshList');
                    } else if (result.code === '500') {
                        this.$message.error(result.msg);
                        this.CVisible = false;
                    } else {
                        this.$message.info('添加失败');
                         this.CVisible = false;
                    }
                }
            });
        }
    }
};
</script>

<style lang="less" scoped>
div.roleAddDiv {
}
</style>