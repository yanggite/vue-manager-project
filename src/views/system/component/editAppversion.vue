<template>
    <div class="editAppversion dialogSingle">
        <el-dialog title="编辑" :visible.sync="CVisible">
            <el-form :model="form" :rules="rules" ref="form">
                <el-form-item label="版本号" prop="versionNum" :label-width="formLabelWidth">
                    <el-input v-model="form.versionNum" autocomplete="off" class="inputPure"></el-input>
                </el-form-item>
                <el-form-item label="下载页面地址" prop="pageUrl" :label-width="formLabelWidth">
                    <el-input v-model="form.pageUrl" autocomplete="off" class="inputPure"></el-input>
                </el-form-item>
                <el-form-item label="安装包地址" prop="downloadUrl" :label-width="formLabelWidth">
                    <el-input v-model="form.downloadUrl" autocomplete="off" class="inputPure"></el-input>
                </el-form-item>
                <el-form-item label="扩展字段" prop="extra" :label-width="formLabelWidth" v-if="currentItem.type === 2">
                    <el-input v-model="form.extra" autocomplete="off" class="inputPure"></el-input>
                </el-form-item>
                <el-form-item label="是否强制更新" prop="isUpdate" :label-width="formLabelWidth">
                    <el-select v-model="form.isUpdate" placeholder="请选择" @change="handleSelect" class="editSelect">
                        <el-option label="是" :value="1"></el-option>
                        <el-option label="否" :value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="更新内容" prop="releaseInfo" :label-width="formLabelWidth">
                    <el-input type="textarea" v-model="form.releaseInfo" autocomplete="off" class="inputPure" rows="5"></el-input>
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
        editAppVerVisible: {
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
                return this.editAppVerVisible;
            },
            set(val) {
                this.$emit('update:editAppVerVisible', val);
            }
        }
    },
    data() {
        return {
            form: {},
            id: '', //
            formLabelWidth: '120',
            rules: {
                versionNum: [{ required: true, message: '请输入版本号', trigger: 'blur' }],
                pageUrl: [{ required: true, message: '请输入下载页地址', trigger: 'blur' }],
                downloadUrl: [{ required: true, message: '请输入安装包地址', trigger: 'blur' }],
                releaseInfo: [{ required: true, message: '请输入更新内容', trigger: 'blur' }],
                extra: [{ required: true, message: '请输入扩展字段', trigger: 'blur' }],
                isUpdate: [{ required: true, message: '请选择类型', trigger: 'change' }]
            },
            isUpdate: ''
        };
    },
    created() {
        this.form = Object.assign({}, this.currentItem);
    },
    methods: {
        onCancle() {
            this.$emit('update:editAppVerVisible', false);
        },
        onSumbit() {
            this.$refs.form.validate(async valid => {
                if (valid) {
                    const res = await this.$api.editAppVersionInfo(this.form);
                    console.log(res);
                    if (res.code === '200') {
                        this.$message.success('编辑成功');
                        this.$emit('refreshList');
                    } else {
                        this.$message.info('编辑失败');
                    }
                    this.CVisible = false;
                }
            });
        },
        handleSelect() {
            // this.getAppVersionList();
        }
    }
};
</script>

<style lang="less" scoped>
div.editAppversion {
}
</style>
