<template>
    <div class="withdraw">
        <div class="searchBox">
            <el-card>
                <el-row style="margin-bottom:50px">
                    <el-col :span="3">提币订单个数：{{ total }} </el-col>
                    <el-col :span="3">提币订单总额：{{ totalMoney }} </el-col>
                    <el-col :span="4">已处理订单个数：{{ orderNum }} </el-col>
                    <el-col :span="4">已处理实际打款额：{{ relMoney }} </el-col>
                    <el-col :span="4">已处理订单手续费总额： </el-col>
                </el-row>
                <el-row>
                    <el-col :span="4">
                        <div class="searchInput">
                            UID：
                            <el-input size="small" placeholder="UID" v-model="form.nickName" @input="searchDebounce" clearable></el-input>
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div class="searchInput">
                            用户名：
                            <el-input
                                size="small"
                                placeholder="用户名"
                                v-model="form.nickName"
                                @input="searchDebounce"
                                clearable
                            ></el-input>
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div class="searchInput">
                            开始时间：
                            <el-date-picker
                                v-model="form.createTimeStart"
                                type="date"
                                placeholder="提币开始时间"
                                clearable
                                @change="searchDebounce"
                                value-format="yyyy-MM-dd"
                                size="small"
                            ></el-date-picker>
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div class="searchInput">
                            截止时间：
                            <el-date-picker
                                v-model="form.createTimeEnd"
                                type="date"
                                placeholder="提币结束时间"
                                clearable
                                @change="searchDebounce"
                                value-format="yyyy-MM-dd"
                                size="small"
                            ></el-date-picker>
                        </div>
                    </el-col>
                </el-row>
                <el-divider></el-divider>
                <el-row>
                    <el-col :span="4">
                        <div class="searchInput">
                            提币地址：
                            <el-input
                                size="small"
                                placeholder="提币地址"
                                v-model="form.widthdrawAddress"
                                @input="searchDebounce"
                                clearable
                            ></el-input>
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div class="searchInput">
                            打款地址：
                            <el-select v-model="form.paymentAddress" placeholder="请选择" size="small" @change="searchDebounce" clearable>
                                <el-option
                                    v-for="(item, index) in paymentAddressOption"
                                    :key="index"
                                    :label="item.paymentAddress"
                                    :value="item.paymentAddress"
                                ></el-option>
                            </el-select>
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div class="searchInput">
                            订单状态：
                            <el-select v-model="form.state" placeholder="请选择" size="small" @change="searchDebounce" clearable>
                                <el-option label="待审核" :value="1"></el-option>
                                <el-option label="处理中" :value="2"></el-option>
                                <el-option label="成功" :value="3"></el-option>
                                <el-option label="失败" :value="4"></el-option>
                                <el-option label="退回" :value="5"></el-option>
                            </el-select>
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
                    <el-col :span="3" :offset="15">
                        <el-button size="small" type="primary" v-if="btnList.bathchPay" @click="onbatchPay">批量打款</el-button>
                    </el-col>
                    <el-col :span="3">
                        <el-button size="small" type="primary" v-if="btnList.batchAbolish" @click="onbatchCancel">批量取消</el-button>
                    </el-col>
                </el-row>
            </div>
            <el-card>
                <el-table :data="tableData" style="width: 100%" border @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55"> </el-table-column>
                    <el-table-column type="index" width="50"></el-table-column>
                    <el-table-column prop="UID" label="UID" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="nickName" label="用户名" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="coinName" label="提币币种" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="widthdrawAddress" label="提币地址" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="tag" label="提币标签" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="paymentAddress" label="打款地址" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="totalMoney" label="提币数量" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="freeMoney" label="手续费数量" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="relMoney" label="实际打款数量" align="center" header-align="center"></el-table-column>

                    <el-table-column label="提币时间" align="center" header-align="center">
                        <template slot-scope="scope">{{ scope.row.createTime | dateYMDHMSFormat }}</template>
                    </el-table-column>
                    <el-table-column prop label="提币状态" align="center" header-align="center">
                        <template slot-scope="scope">
                            <el-tag v-if="scope.row.state === 1">待审核</el-tag>
                            <el-tag v-if="scope.row.state === 2">处理中</el-tag>
                            <el-tag v-if="scope.row.state === 3">成功</el-tag>
                            <el-tag v-if="scope.row.state === 4">失败</el-tag>
                            <el-tag v-if="scope.row.state === 5">退回</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="处理时间" align="center" header-align="center">
                        <template slot-scope="scope">{{ scope.row.doTime | dateYMDHMSFormat }}</template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" header-align="center" width="220">
                        <template slot-scope="scope">
                            <!-- <el-button
                                size="mini"
                                type="primary"
                                @click="onPay(scope.row)"
                                v-if="btnList.pay && (scope.row.state === 1 || scope.row.state === 4)"
                                >打款</el-button
                            > -->
                            <el-button size="mini" type="primary" @click="onPay(scope.row)">打款</el-button>
                            <el-button
                                size="mini"
                                type="warning"
                                @click="onAbolish(scope.row)"
                                v-if="btnList.abolish && (scope.row.state === 1 || scope.row.state === 4)"
                                >取消</el-button
                            >
                            <el-button size="mini" type="info" @click="onView(scope.row)" v-if="btnList.detail">详情</el-button>
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
        <WithdrawPay
            :withdrawPayVisible.sync="withdrawPayVisible"
            v-if="withdrawPayVisible"
            :currentItem="currentItem"
            @refreshList="refreshList"
        />
        <WithdrawDetail :withdrawDetailVisible.sync="withdrawDetailVisible" v-if="withdrawDetailVisible" :currentItem="currentItem" />
    </div>
</template>
<script>
import { mixins } from '../../utils/mixins';
// import _ from 'lodash';
// let _ = require('lodash')
import debounce from 'lodash/debounce';
import WithdrawPay from './component/withdrawPay.vue';
import WithdrawDetail from './component/withdrawDetail.vue';
export default {
    name: 'withdraw',
    mixins: [mixins],
    components: { WithdrawPay, WithdrawDetail },
    data() {
        return {
            tableData: [],
            form: {},
            coinOption: [],
            paymentAddressOption: [],
            withdrawPayVisible: false,
            withdrawDetailVisible: false,
            currentItem: {
            },
            multipleSelection: [],
            totalMoney: '',
            orderNum: '',
            relMoney: ''
        };
    },
    created() {
        this.getListInit();
        this.getSelectCoin();
    },

    methods: {
        async getAllPaymentAddress() {
            const res = await this.$api.getAllPaymentAddress();
            this.paymentAddressOption = res.data.allPaymentAddress;
            // console.log(this.paymentAddressOption);
        },
        async getListInit() {
            const res = await this.$api.getWidthdrawList({ pageNo: this.pageNo, pageSize: this.pageSize, ...this.form });
            // console.log(res);
            if (res.code === '200') {
                this.tableData = res.data.list;
                this.total = res.data.page.totalNum;
                this.totalMoney = res.data.totalMoney;
                this.orderNum = res.data.orderNum;
                this.relMoney = res.data.orderNum;
                this.getAllPaymentAddress();
            } else {
                this.$message.error(res.msg);
            }
        },
        async getSelectCoin() {
            const res = await this.$api.getSelectCoin();
            // console.log(res.data);
            if (res.code === '200') {
                this.coinOption = res.data;
            } else {
                this.$message.error(res.msg);
            }
        },

        handleSelect() {
            this.getListInit();
        },
        async onSwitch(val, { id }) {
            const res = await this.$api.setAdminState({ id, state: val });
            if (res.code === '200') {
                this.$message.success('设置状态成功');
            } else {
                this.$message.error('设置状态失败');
            }
        },
        searchDebounce: debounce(function() {
            this.getListInit(1);
        }, 1000),
        refreshList() {
            this.getListInit();
        },
        onView(val) {
            this.currentItem = Object.assign({}, val);
            this.withdrawDetailVisible = true;
        },
        onPay(val) {
            // this.currentItem.arrlyIds.push(val.id);
            // this.currentItem = { ...val, ...this.currentItem };
            this.currentItem.arrlyIds = [val.id];
            this.currentItem.paymentAddress = val.paymentAddress;
            this.withdrawPayVisible = true;
        },
        onbatchPay() {
            if (this.multipleSelection) {
                let paymentAddressArr = this.multipleSelection.map(item => item.paymentAddress);
                if (paymentAddressArr.length <= 0) {
                    return this.$message.info('请选择数据');
                }
                let res = this.isAllEqual(paymentAddressArr);
                if (!res) {
                    return this.$message.error('当前转出地址不一样');
                } else {
                    this.currentItem.arrlyIds = this.multipleSelection.map(item => item.id);
                    let addrssArr = this.multipleSelection.map(item => item.paymentAddress);
                    this.currentItem.paymentAddress = addrssArr[0];
                    this.withdrawPayVisible = true;
                }
            }
        },
        //判断数组元素是否相同
        isAllEqual(array) {
            if (array.length > 0) {
                return !array.some(function(value, index) {
                    return value !== array[0];
                });
            } else {
                return true;
            }
        },
        onAbolish(val) {
            console.log(val);
        },
        async onAbolish(item) {
            const result = await this.$confirm('是否取消这次提币订单?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(err => err);
            if (result === 'confirm') {
                if (Array.isArray(item)) {
                    this.batchCancel(item);
                } else {
                    this.batchCancel([item.id]);
                }
            } else {
                this.$message.info('你已取消此操作');
            }
        },
        async batchCancel(ids) {
            const res = await this.$api.batchCancel({ applyIds: ids });
            if (res.code === '200') {
                this.$message.success(res.msg);
                this.getListInit();
            } else if (res.code === '500') {
                this.$message.error(res.msg);
            } else {
                this.$message.error('取消失败');
            }
        },
        onbatchCancel() {
            if (this.multipleSelection) {
                let ids=this.multipleSelection.map(item=>item.id)
                this.onAbolish(ids);
            } else {
                this.$message.info('你还未选择任何数据');
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        }
    }
};
</script>

<style lang="less" scoped>
@import '@/assets/css/component.less';
.withdraw {
    .el-divider {
        margin: 10px 0;
    }
    .searchBox {
        // height: 56px;
        // display: flex;
        align-items: center;
        // color: #ffffff;
        font-size: 12px;
        // padding: 0 24px;
        // background: #202e4e;
        .el-row {
            width: 100%;
            .searchInput {
                display: flex;
                align-items: center;
                .el-input {
                    width: 160px;
                    // margin-left: 20px;
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
