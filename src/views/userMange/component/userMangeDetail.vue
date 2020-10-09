<template>
    <div class="userMangeDetail dialogSingle">
        <el-dialog title="资产详情" :visible.sync="CVisible">
            <ul>
                <li v-for="item in list" :key="item.coinType">
                    <div class="Acontent">
                        <p class="nameTitle">{{item.coinType}}：</p>
                        <p>
                            <span>余额：</span>
                            <span class="itemNum">{{item.balance}}</span>
                        </p>
                        <p>
                            <span>个人累计充值：</span>
                            <span class="itemNum">{{}}</span>
                        </p>
                        <p>
                            <span>个人累计提现：</span>
                            <span class="itemNum">{{}}</span>
                        </p>
                        <p>
                            <span>团队累计充值：</span>
                            <span class="itemNum">{{item.teamRecharge}}</span>
                        </p>
                        <p>
                            <span>团队累计提现：</span>
                            <span class="itemNum">{{item.teamWidthdraw}}</span>
                        </p>
                    </div>
                </li>
            </ul>


            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="onSumbit" size="small">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: {
        UserMangeDetailVisible: {
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
                return this.UserMangeDetailVisible;
            },
            set(val) {
                this.$emit('update:UserMangeDetailVisible', val);
            }
        }
    },
    data() {
        return {
            formLabelWidth: '120',

            list: []
        };
    },
    created() {
        console.log(this.currentItem);
        this.getListInit(this.currentItem.id);
    },
    methods: {
        async getListInit(id) {
            const res = await this.$api.getUserDetail({ userId: id });
            console.log(res);
            if (res.code === '200') {
                this.list = res.data.list;
            } else if (res.code === '347') {
                this.$message.info(res.msg);
                this.CVisible = false;
            }
        },

        onSumbit() {
            this.CVisible = false;
        }
    }
};
</script>

<style lang="less" scoped>
div.userMangeDetail {
    .nameTitle{
        font-weight: bold;
        margin-bottom: 10px;
    }
    .Acontent{
        line-height: 30px;
    }
    .itemNum{
        color: #409EFF;
    }
}
</style>
