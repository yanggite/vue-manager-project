<template>
    <div class="resMessage dialogSingle">
        <el-dialog title="回复留言" :visible.sync="CVisible" class="dialogueV">
            <section>
                <div>
                    <p class="nameTile">
                        {{ oldres.message.nickName }}
                    </p>
                    <p>
                        {{ oldres.message.createTime | dateYMDHMSFormat }}
                    </p>
                    <p>
                        {{ oldres.message.content }}
                    </p>
                </div>

                <div>
                    <ul>
                        <li v-for="item in oldres.replys" :key="item.id">
                            <p class="nameTile">
                                {{ item.adminName }}
                            </p>
                            <p>
                                {{ item.createTime | dateYMDHMSFormat }}
                            </p>
                            <p>
                                {{ item.replyContent }}
                            </p>
                        </li>
                    </ul>
                </div>
            </section>

            <el-form :model="form" ref="form">
                <el-form-item label="" prop="sort" :label-width="formLabelWidth">
                    <!-- <p class="nameTile">{{ form.nickName }}</p> -->
                    <p class="nameTile">追加回复</p>
                </el-form-item>
                <el-form-item label="" prop="content" :label-width="formLabelWidth">
                    <el-input
                        type="textarea"
                        rows="8"
                        v-model="form.content"
                        autocomplete="off"
                        class="inputPure"
                        placeholder="请输入500字以内的回复内容"
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
        resMessageVisible: {
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
                return this.resMessageVisible;
            },
            set(val) {
                this.$emit('update:resMessageVisible', val);
            }
        }
    },
    data() {
        return {
            form: {
                id: '',
                // nickName: '',
                content: ''
            },
            oldres: {
                message: {},
                replys: []
            },
            formLabelWidth: '120',
            roleOption: [],
            teamOption: [],
            languageOption: [{}]
            // rules: {
            //     title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
            //     sort: [{ required: true, message: '请输入序号', trigger: 'blur' }],
            //     content: [{ required: true, message: '请选择内容', trigger: 'blur' }]
            // }
        };
    },
    created() {
        // console.log(this.currentItem)
        this.form.id = this.currentItem.id;
        // this.form.nickName = this.currentItem.nickName;
        this.getListInit(this.currentItem.id);
    },
    methods: {
        onCancle() {
            // this.$emit('update:resMessageVisible', false);
            this.CVisible = false;
        },
        onSumbit() {
            this.$refs.form.validate(async valid => {
                if (valid) {
                    console.log(this.form);
                    const res = await this.$api.replyMessage(this.form);
                    if (res.code === '200') {
                        this.$message.success('回复成功');
                        this.$emit('refreshList');
                    } else if (res.code === '500') {
                        this.$message.error(res.msg);
                    } else {
                        this.$message.error('回复失败');
                    }
                    this.CVisible = false;
                }
            });
        },

        async getListInit(id) {
            const res = await this.$api.getMessageDetail({ id });
            // console.log(res)
            this.oldres = res.data;
            console.log(this.oldres);
        }
    }
};
</script>

<style lang="less" scoped>
div.resMessage {
    .nameTile {
        font-weight: bold;
        font-size: 14px;
        margin:10px 0;
    }
    section{
        line-height: 22px;
    }
}
</style>
