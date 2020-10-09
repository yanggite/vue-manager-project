<template>
    <div class="orderDetail">
        <el-card>
            <el-row>
                <el-col :span="5"
                    ><div class="OrderState">
                        <span>当前商品订单：</span>
                        <span>{{ state == 0 ? '待确认' : state == 1 ? '已确认' : state == 2 ? '完成' : state == 3 ? '关闭' : null }}</span>
                    </div></el-col
                >
            </el-row>
        </el-card>
        <el-card>
            <section>
                <p class="tableTitle">基本信息</p>
                <el-table :data="basicTableTitle" style="width: 100%" border>
                    <el-table-column prop="orderNo" label="订单编号" align="center" header-align="center"></el-table-column>
                    <el-table-column label="提交时间" align="center" header-align="center">
                        <template slot-scope="scope">{{ scope.row.createTime | dateYMDHMSFormat }}</template>
                    </el-table-column>
                    <el-table-column prop="amount" label="订单金额" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="rTotal" label="订单拨付总额" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="pi" label="订单拨付比例" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="rHaveTotal" label="已拨付数量" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="shopName" label="商品名称" align="center" header-align="center"></el-table-column>
                    <el-table-column label="操作" align="center" header-align="center" width="220">
                        <template>
                            <el-link type="primary" @click="toShopList">查看</el-link>
                        </template>
                    </el-table-column>
                </el-table>
            </section>
            <section>
                <p class="tableTitle">支付信息</p>
                <el-table :data="payTableData" style="width: 100%" border>
                    <el-table-column prop="payAccount" label="支付账号" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="collectionAccount" label="收款账号" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="relName" label="收款人姓名" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="address" label="收件人地址" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="phone" label="收件人联系方式" align="center" header-align="center"></el-table-column>
                    <el-table-column label="操作" align="center" header-align="center" width="220">
                        <template>
                            <el-link type="primary" @click="toUser">查看</el-link>
                        </template>
                    </el-table-column>
                </el-table>
            </section>
            <section>
                <p class="tableTitle">收益信息</p>
                <el-table :data="profitTableData" style="width: 100%" border>
                    <el-table-column label="收益时间" align="center" header-align="center">
                        <template slot-scope="scope">{{ scope.row.createTime | dateYMDHMSFormat }}</template>
                    </el-table-column>
                    <el-table-column prop="amount" label="收益数量" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="sources" label="来源" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="remark" label="备注" align="center" header-align="center"></el-table-column>
                </el-table>
            </section>
            <section>
                <p class="tableTitle">操作信息</p>
                <el-table :data="operateTableData" style="width: 100%" border>
                    <el-table-column prop="operationName" label="操作者" align="center" header-align="center"></el-table-column>
                    <el-table-column label="操作时间" align="center" header-align="center">
                        <template slot-scope="scope">{{ scope.row.createTime | dateYMDHMSFormat }}</template>
                    </el-table-column>
                    <el-table-column prop="eventName" label="事件" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="remark" label="备注" align="center" header-align="center"></el-table-column>
                </el-table>
            </section>
        </el-card>
        <CloseOrder
            :closeOrderVisible.sync="closeOrderVisible"
            v-if="closeOrderVisible"
            :currentItem="currentItem"
            @refreshList="refreshList"
        />
        <AddRemark
            :addRemarkVisible.sync="addRemarkVisible"
            v-if="addRemarkVisible"
            :currentItem="currentItem"
            @refreshList="refreshList"
        />
    </div>
</template>
<script>
import { mixins } from '../../utils/mixins';
import CloseOrder from './component/closeOrder';
import AddRemark from './component/addRemark';
export default {
    name: 'orderDetail',
    mixins: [mixins],
    components: { CloseOrder, AddRemark },
    data() {
        return {
            //基本信息
            basicTableTitle: [],
            payTableData: [],
            //收益信息
            profitTableData: [],
            //操作信息
            operateTableData: [],
            currentItem: {},
            multipleSelection: [],
            closeOrderVisible: false,
            addRemarkVisible: false,
            state: null,
            orderId: null
        };
    },
    created() {
        console.log(this.$route.query.id);
        this.orderId = this.$route.query.id;
        this.getListInit();
    },

    methods: {
        async getListInit() {
            const res = await this.$api.getOrderInfoById({ pageNo: this.pageNo, pageSize: this.pageSize, id: this.orderId });
            console.log(res);
            if (res.code === '200') {
                this.basicTableTitle = [res.data.shopOrder];
                this.payTableData = [res.data.shopOrderPayInfo];
                this.profitTableData = res.data.shopOrderProfit;
                this.operateTableData = res.data.shopOrderOperation;
                this.state = res.data.shopOrder.state;
            } else {
                this.$message.error(res.msg);
            }
        },
        refreshList() {
            this.getListInit();
        },

        toShopList() {
            this.$router.push('/admin/getShop');
        },
        toUser() {
            this.$router.push('/admin/user');
        }
    }
};
</script>

<style lang="less" scoped>
@import '@/assets/css/component.less';
.orderDetail {
    .OrderState {
        font-size: 16px;
        color: red;
    }
    .tableTitle {
        margin: 20px 0;
    }
}
</style>
