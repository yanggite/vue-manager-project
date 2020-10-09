<template>
    <div class="editGuidePage dialogSingle">
        <el-dialog title="编辑引导页面" :visible.sync="CVisible" class="dialogueV">
            <el-form :model="form" ref="form" :rules="rules">
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
                <el-form-item label="图片" :label-width="formLabelWidth">
                    <div>
                        <el-image style="width: 150px; height: 150px" :src="form.imgList[0]" v-if="form.imgList[0]" alt="" :preview-src-list="form.imgList"/>
                        <!-- <el-image style="width: 150px; height: 150px" :src="form.imgList[1]" v-if="form.imgList[1]" alt="" />
                        <el-image style="width: 150px; height: 150px" :src="form.imgList[2]" v-if="form.imgList[2]" alt="" /> -->
                    </div>
                </el-form-item>
                <el-form-item label="重传" prop="imgList" :label-width="formLabelWidth">
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
                        >
                        <!--    :on-remove="handleRemove" -->
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
        editGuideVisible: {
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
                return this.editGuideVisible;
            },
            set(val) {
                this.$emit('update:editGuideVisible', val);
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
                // imgUrls: [],
                imgList: []
            },
            successNum: 0,
            imgUrl: `${HOST}/uploadOSS/headImgUpload`,
            headersObj: {
                token: localStorage.getItem('token')
            },
            formLabelWidth: '120',
            rules: {
                title: [{ required: true, message: '请输入标题', trigger: 'blur' }]
            }
        };
    },
    created() {
        this.form = Object.assign(this.form, this.currentItem);
        console.log(this.form);
    },
    methods: {
        onCancle() {
            // this.$emit('update:editGuideVisible', false);
            this.CVisible = false;
        },
        onSumbit() {
            this.$refs.form.validate(async valid => {
                if (valid) {
                    // console.log(this.form);
                    const res = await this.$api.editGuidePage(this.form);
                    if (res.code === '200') {
                        this.$message.success('编辑成功');
                        this.$emit('refreshList');
                    } else if (res.code === '500') {
                        this.$message.error(res.msg);
                    } else {
                        this.$message.error('编辑失败');
                    }
                    this.CVisible = false;
                }
            });
        },
        handleFacesuccess(response) {
            console.log('this.successNum', this.successNum);
            if (response.code == '200') {
                this.$message.success('上传成功');
            }
            if (this.successNum < 1) {
                this.form.imgList = []; //重新上传，清空以前的
            }
            console.log(response);
            this.form.imgList.push(response.data[0]);
            console.log(this.form.imgList);
            this.successNum++;
        },
        handlePictureCardPreview(file) {
            this.imgUrl = file.url;
            this.dialogVisible = true;
        },
        handleExceed(files, fileList) {
            this.$message.warning(`请最多上传 3 个图片。`);
        },
        // handleRemove(file, fileList) {
        //     console.log(file);
        //     console.log('this.form.imgList', this.form.imgList);
        //     console.log(fileList.response.data[0]);
        //     this.form.imgList.find((item, index) => {
        //         if (item == fileList.response.data[0]) {
        //             this.form.imgList.splice(index, 1);
        //         }
        //     });
        //     console.log('this.form.imgList', this.form.imgList);

        //     // console.log(this.form.imgList.pop());
        // }
    }
};
</script>

<style lang="less" scoped>
div.editGuidePage {
    /deep/ .el-upload-list--picture-card .el-upload-list__item-actions .el-upload-list__item-delete {
        display: none;
        // opacity: 0;
    }
}
</style>
