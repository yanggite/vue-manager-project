<template>
    <div class="addAppVersion dialogSingle">
        <el-dialog :title="title" :visible.sync="CVisible">
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
                <el-form-item label="是否强制更新" prop="isUpdate" :label-width="formLabelWidth">
                    <el-select
                        v-model="form.isUpdate"
                        placeholder="请选择"
                        @change="handleSelect"
                        class="editSelect"
                    >
                        <el-option label="是" :value="1"></el-option>
                        <el-option label="否" :value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="更新内容" prop="releaseInfo" :label-width="formLabelWidth">
                    <el-input type="textarea" v-model="form.releaseInfo" autocomplete="off" class="inputPure" rows="5" ></el-input>
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
        addAppVerVisible: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: ''
        }
    },
    computed: {
        CVisible: {
            get() {
                return this.addAppVerVisible;
            },
            set(val) {
                this.$emit('update:addAppVerVisible', val);
            }
        },
        type: function () {
            if (this.title == '新增安卓版本') {
                return '1';
            } else if (this.title == '新增ios版本') {
                return '2';
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
                isUpdate: [{ required: true, message: '请选择类型', trigger: 'change' }]
            },
            isUpdate: ''
        };
    },
    created() {
        console.log(this.title);
    },
    methods: {
        onCancle() {
            this.$emit('update:addAppVerVisible', false);
        },
        onSumbit() {
            this.$refs.form.validate(async (valid) => {
                if (valid) {
                    // this.$emit('update:addAppVerVisible', false);
                    const res = await this.$api.addAppVersionInfo({ ...this.form, type: this.type });
                    console.log(res);
                    if (res.code === '200') {
                        this.$message.success('新增成功');
                         this.$emit("refreshList")
                    } else {
                        this.$message.info('新增失败');
                    }
                     this.CVisible=false;
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
div.addAppVersion {

}
</style>