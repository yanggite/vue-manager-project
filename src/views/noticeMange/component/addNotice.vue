<template>
    <div class="addNotice dialogSingle">
        <el-dialog title="新增公告" :visible.sync="CVisible" class="dialogueV">
            <el-form :model="form" :rules="rules" ref="form">
                <el-form-item label="语言" prop="languageId" :label-width="formLabelWidth">
                    <el-select v-model="form.languageId" placeholder="请选择" class="editSelect">
                        <el-option v-for="item in languageOption" :key="item.id" :label="item.Name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
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
                    <el-input v-model.number="form.sort" autocomplete="off" class="inputPure" placeholder="选填，序号越大，越优先展示"></el-input>
                </el-form-item>
                <el-form-item label="内容" prop="content" :label-width="formLabelWidth">
                    <el-input
                        type="textarea"
                        rows="8"
                        v-model="form.content"
                        autocomplete="off"
                        class="inputPure"
                        placeholder="请输入500字以内的公告内容"
                        maxlength="500"
                    ></el-input>
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
export default {
    props: {
        addNoticeVisible: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        CVisible: {
            get() {
                return this.addNoticeVisible;
            },
            set(val) {
                this.$emit('update:addNoticeVisible', val);
            }
        }
    },
    data() {
        return {
            form: {
                languageId: '',
                title: '',
                content: '',
                thumbnail: '',
                sort: '',
                status: '0',
                ndesc: ''
            },
            formLabelWidth: '120',
            roleOption: [],
            teamOption: [],

            rules: {
                languageId: [{ required: true, message: '请选中语言', trigger: 'change' }],
                title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
                sort: [{ required: true, message: '请输入序号', trigger: 'blur' },
                 { type: 'number', message: '序号必须为数字值', trigger: 'blur'}
                ],
                content: [{ required: true, message: '请选择内容', trigger: 'blur' }]
            },
            languageOption: [
                {
                    id: 1,
                    Name: '中文简体'
                },
                {
                    id: 2,
                    Name: 'English'
                }
            ]
        };
    },
    created() {},
    methods: {
        onCancle() {
            // this.$emit('update:addNoticeVisible', false);
            this.CVisible = false;
        },
        onSumbit() {
            this.$refs.form.validate(async valid => {
                if (valid) {
                    // console.log(this.form);
                    const res = await this.$api.addNotice(this.form);
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
        }
    }
};
</script>

<style lang="less" scoped>
div.addNotice {
}
</style>
