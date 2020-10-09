<template>
    <div class="orderList">
        <div class="searchBox">
            <el-card>
                <el-row>
                    <el-col :span="4">
                        <div class="searchInput">
                            订单编号：
                            <el-input
                                size="small"
                                placeholder="订单编号"
                                v-model="form.orderNum"
                                @input="searchDebounce"
                                clearable
                            ></el-input>
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div class="searchInput">
                            用户账号：
                            <el-input
                                size="small"
                                placeholder="用户账号"
                                v-model="form.account"
                                @input="searchDebounce"
                                clearable
                            ></el-input>
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div class="searchInput">
                            提交时间：
                            <el-date-picker
                                v-model="form.submissionTime"
                                type="date"
                                placeholder="提交时间"
                                clearable
                                @change="searchDebounce"
                                value-format="yyyy-MM-dd"
                                size="small"
                            ></el-date-picker>
                        </div>
                    </el-col>
                </el-row>
            </el-card>
        </div>

        <div class="main">
            <div class="title">
                <el-row>
                    <el-col :span="3">
                        <div class="name">数据列表</div>
                    </el-col>
                    <el-col :span="3" :offset="18">
                        <a :href="hrefExported" v-if="btnList.exported">                           
                            <el-button size="small" type="primary" >导出订单</el-button>
                        </a>
                    </el-col>
                </el-row>
            </div>
            <el-card>
                <el-table :data="tableData" style="width: 100%" border>
                    <el-table-column prop="orderNo" label="订单编号" align="center" header-align="center"></el-table-column>
                    <el-table-column label="提交时间" align="center" header-align="center">
                        <template slot-scope="scope">{{ scope.row.createTime | dateYMDHMSFormat }}</template>
                    </el-table-column>
                    <el-table-column prop="account" label="用户账号" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="amount" label="订单金额" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="unit" label="计价单位" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="rCoinName" label="拨付币种" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="rTotal" label="拨付总额" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="shopName" label="商品名称" align="center" header-align="center"></el-table-column>
                    <el-table-column label="订单状态" align="center" header-align="center">
                        <template slot-scope="scope">
                            <el-tag v-if="scope.row.state === 0">待确认</el-tag>
                            <el-tag v-if="scope.row.state === 1">已确认</el-tag>
                            <el-tag v-if="scope.row.state === 2">完成</el-tag>
                            <el-tag v-if="scope.row.state === 3">关闭</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="发货状态" align="center" header-align="center">
                        <template slot-scope="scope">
                            <el-tag v-if="scope.row.deliveryStatus === 0">未发货</el-tag>
                            <el-tag v-if="scope.row.deliveryStatus === 1">已发货</el-tag>
                        </template>
                    </el-table-column>

                    <el-table-column label="操作" align="center" header-align="center" width="280">
                        <template slot-scope="scope">
                            <!-- <el-link type="info" @click="onView(scope.row)" v-if="btnList.detail">查看订单</el-link>
                            <el-link type="primary" @click="onPay(scope.row)" v-if="btnList.pay">修改状态</el-link>
                            <el-link type="warning" @click="onAbolish(scope.row)" v-if="btnList.abolish">发货状态</el-link> -->
                            <el-link type="info" @click="onOrderDetail(scope.row)" v-if="btnList.view">查看订单</el-link>
                            <el-link type="primary" @click="onUpdateState(scope.row)" v-if="btnList.editState">修改状态</el-link>
                            <el-link type="warning" @click="onDeliveryState(scope.row)" v-if="btnList.deliveryState">发货状态</el-link>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    @size-change="sizeChange($event, getListInit)"
                    @current-change="pageChange($event, getListInit)"
                    :current-page="pageNo"
                    :page-sizes="pageSizeS"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
                    background
                ></el-pagination>
            </el-card>
        </div>
        <DeliveryState
            :deliveryStateVisible.sync="deliveryStateVisible"
            v-if="deliveryStateVisible"
            :currentItem="currentItem"
            @refreshList="refreshList"
        />
        <OrderState
            :orderStateVisible.sync="orderStateVisible"
            v-if="orderStateVisible"
            :currentItem="currentItem"
            @refreshList="refreshList"
        />
    </div>
</template>
<script>
import { mixins } from '../../utils/mixins';
import debounce from 'lodash/debounce';
import DeliveryState from './component/updateDeliveryState';
import OrderState from './component/updateOrderState';
import { HOST } from '../../config/host';
import { exportMethodPost } from '@/utils/exportExcel.js';
export default {
    name: 'orderList',
    mixins: [mixins],
    components: { DeliveryState, OrderState },
    data() {
        return {
            tableData: [],
            form: {},
            deliveryStateVisible: false,
            orderStateVisible: false,
            currentItem: {},
            multipleSelection: []
            // hrefExported: `${HOST}/order/exportOrder?pageNo=${this.pageNo}&pageSize=${this.pageSize}`
        };
    },
    created() {
        this.getListInit();
    },
    computed: {
        hrefExported() {
            return `${HOST}/order/exportOrder?pageNo=${this.pageNo}&pageSize=${this.pageSize}`;
        }
    },
    methods: {
        async getListInit() {
            const res = await this.$api.getOrderList({ pageNo: this.pageNo, pageSize: this.pageSize, ...this.form });
            // console.log(res);
            if (res.code === '200') {
                this.tableData = res.data.list;
                this.total = res.data.page.totalNum;
            } else {
                this.$message.error(res.msg);
            }
        },

        searchDebounce: debounce(function() {
            this.getListInit(1);
        }, 1000),
        refreshList() {
            this.getListInit();
        },
        onOrderDetail(val) {
            this.$router.push({
                path: '/admin/orderDetail',
                query: {
                    id: val.id
                }
            });
        },
        onUpdateState(val) {
            this.currentItem = JSON.parse(JSON.stringify(val));
            this.orderStateVisible = true;
        },
        onDeliveryState(val) {
            this.currentItem = JSON.parse(JSON.stringify(val));
            this.deliveryStateVisible = true;
        }
        // async SaveExcel() {
        //     let myObj = {
        //         method: 'get',
        //         url: `${HOST}/order/exportOrder`,
        //         fileName: '订单列表',
        //         params: `pageNo=${this.pageNo}&pageSize=${this.pageSize}`,
        //         // data: { pageNo: this.pageNo, pageSize: this.pageSize },
        //     };
        //     exportMethodPost(myObj)
        // }
    }
};
</script>

<style lang="less" scoped>
@import '@/assets/css/component.less';

.orderList {
    .searchBox {
        align-items: center;
        font-size: 12px;
        .el-row {
            width: 100%;
            .searchInput {
                display: flex;
                align-items: center;
                .el-input {
                    width: 160px;
                }
                .el-select {
                    width: 160px;
                }
            }
            .btnbox {
                display: flex;
                justify-content: flex-end;
                align-items: center;
                .btn {
                    width: 98px;
                    height: 40px;
                    background: #0262f4;
                    border-radius: 4px;
                    color: #ffffff;
                    font-size: 14px;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>
