<template>
    <div class="addNotice dialogSingle">
        <el-dialog title="新增引导页面" :visible.sync="CVisible" class="dialogueV">
            <el-form :model="form" ref="form"  :rules="rules">
                <el-form-item label="标题" prop="title" :label-width="formLabelWidth">
                    <el-input
                        v-model="form.title"
                        autocomplete="off"
                        class="inputPure"
                        maxlength="20"
                        placeholder="请输入20字以内的标题"
                    ></el-input>
                </el-form-item>
                <el-form-item label="序号" prop="sort" :label-width="formLabelWidth">
                    <el-input v-model="form.sort" autocomplete="off" class="inputPure" placeholder="选填，序号越大，越优先展示"></el-input>
                </el-form-item>
                <el-form-item label="图片" prop="imgUrls" :label-width="formLabelWidth">
                    <div>

                        <el-upload
                            multiple
                            :limit="3"
                            :action="imgUrl"
                            :headers="headersObj"
                            :on-success="handleFacesuccess"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :on-exceed="handleExceed"
                            :on-remove="handleRemove"
                        >
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="imgUrl" alt="" />
                        </el-dialog>
                    </div>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="onCancle" size="small">取 消</el-button>
                <el-button type="primary" @click="onSumbit" size="small">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import JSEncrypt from '@/utils/jsencrypt.js';
import { publicKey } from '@/utils/publickey';
import { HOST } from '@/config/host.js';
export default {
    props: {
        addGuideVisible: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        CVisible: {
            get() {
                return this.addGuideVisible;
            },
            set(val) {
                this.$emit('update:addGuideVisible', val);
            }
        }
    },
    data() {
        return {
            dialogVisible: false,
            fileList: [],
            form: {
                title: '',
                sort: '',
                status: '0',
                imgUrls: []
            },
            // imgUrl: `${HOST}/web/oss/upload/file`,
            // imgUrl:"https://jsonplaceholder.typicode.com/posts/",
            imgUrl: `${HOST}/uploadOSS/headImgUpload`,
            headersObj: {
                token: localStorage.getItem('token')
            },
            formLabelWidth: '120',
            rules: {
                title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
                // imgUrls: [{ required: true, message: '请添加图片', trigger: 'change' }],
                // sort: [
                //     { required: true, message: '请输入序号', trigger: 'blur' },
                //     // { type: 'number', message: '序号必须为数字值' }
                // ]
            }
        };
    },
    created() {},
    methods: {
        onCancle() {
            // this.$emit('update:addGuideVisible', false);
            this.CVisible = false;
        },
        onSumbit() {
            this.$refs.form.validate(async valid => {
                if (valid) {
                    // console.log(this.form);
                    const res = await this.$api.addGuidePage(this.form);
                    if (res.code === '200') {
                        this.$message.success('新增成功');
                        this.$emit('refreshList');
                    } else if (res.code === '500') {
                        this.$message.error(res.msg);
                    } else {
                        this.$message.error('新增失败');
                    }
                    this.CVisible = false;
                }
            });
        },
        handleFacesuccess(response) {
            if (response.code == '200') {
                this.$message.success('上传成功');
            }
            console.log(response);
            this.form.imgUrls.push(response.data[0]);
            console.log(this.form.imgUrls);
        },
        handlePictureCardPreview(file) {
            this.imgUrl = file.url;
            this.dialogVisible = true;
        },
        handleExceed(files, fileList) {
            // this.$message.warning(
            //     `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`
            // );
            this.$message.warning(`请最多上传 3 个图片。`);
        },
        handleRemove(file) {
            console.log(file);
            console.log(this.form.imgUrls);
            console.log('移除最后一个原生');
            console.log(this.form.imgUrls.pop());
        }
    }
};
</script>

<style lang="less" scoped>
div.addNotice {
    /deep/ .el-upload-list--picture-card .el-upload-list__item-actions .el-upload-list__item-delete {
        display: none;
        // opacity: 0;
    }
}
</style>
