<template>
    <div class="coinDetail dialogSingle">
        <el-dialog title="充币详情" :visible.sync="CVisible">
            <div class="Acontent">
                <p>
                    <span>转出地址(来源)：</span>
                    <span class="itemNum">{{ form.fromAddress }}</span>
                </p>
                <p>
                    <span>充币地址(转入)：</span>
                    <span class="itemNum">{{ form.toAddress }}</span>
                </p>
                <p>
                    <span>归集地址(转入)：</span>
                    <span class="itemNum">{{ form.poolAddress }}</span>
                </p>
                <p>
                    <span>交易哈希值：</span>
                    <span class="itemNum">{{ form.hash }}</span>
                </p>
                <p>
                    <span>区块扫描时间：</span>
                    <span class="itemNum">{{ form.blockScanTime }}</span>
                </p>
                <p>
                    <span>上账时间：</span>
                    <span class="itemNum">{{ form.billingTime }}</span>
                </p>
                <p>
                    <span>备注：</span>
                    <span class="itemNum">{{ form.remarks }}</span>
                </p>
                <p>
                    <span>操作员：</span>
                    <span class="itemNum">{{ form.nickName }}</span>
                </p>
            </div>

            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="onSumbit" size="small">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: {
        orderDetailVisible: {
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
                return this.orderDetailVisible;
            },
            set(val) {
                this.$emit('update:orderDetailVisible', val);
            }
        }
    },
    data() {
        return {
            formLabelWidth: '120',
            form: {}
        };
    },
    created() {
        console.log(this.currentItem);
        this.getListInit(this.currentItem.id);
    },
    methods: {
        async getListInit(id) {
            const res = await this.$api.getRechargeDetail({ id });
            console.log(res);
            if (res.code === '200') {
                this.form = res.data;
            } else if (res.code === '302') {
                this.$message.info(res.msg);
            } else {
                this.$message.error('获取详情失败');
            }
        },

        onSumbit() {
            this.CVisible = false;
        }
    }
};
</script>

<style lang="less" scoped>
div.coinDetail {
    .nameTitle {
        font-weight: bold;
        margin-bottom: 10px;
    }
    .Acontent {
        line-height: 30px;
    }
    .itemNum {
        color: #409eff;
    }
}
</style>
