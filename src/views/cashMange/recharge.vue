<template>
    <div class="userMange">
        <div class="searchBox">
            <el-card>
                <el-row style="margin-bottom:50px">
                    <el-col :span="3">充币订单比数：{{ total }} </el-col>
                    <el-col :span="3">充币总量：{{ totalAmount }} </el-col>
                </el-row>
                <el-row>
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
                            充币地址：
                            <el-input
                                size="small"
                                placeholder="充币地址"
                                v-model="form.toAddress"
                                @input="searchDebounce"
                                clearable
                            ></el-input>
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div class="searchInput">
                            转出地址：
                            <el-input
                                size="small"
                                placeholder="转出地址"
                                v-model="form.fromAddress"
                                @input="searchDebounce"
                                clearable
                            ></el-input>
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div class="searchInput">
                            哈希值：
                            <el-input size="small" placeholder="哈希值" v-model="form.hash" @input="searchDebounce" clearable></el-input>
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div class="searchInput">
                            币种：
                            <el-select v-model="form.coinName" placeholder="请选择" size="small" @change="searchDebounce" clearable>
                                <el-option
                                    v-for="item in coinOption"
                                    :key="item.id"
                                    :label="item.coinName"
                                    :value="item.coinName"
                                ></el-option>
                            </el-select>
                        </div>
                    </el-col>
                </el-row>
                <el-divider></el-divider>
                <el-row>
                    <el-col :span="4">
                        <div class="searchInput">
                            开始时间：
                            <el-date-picker
                                v-model="form.createTimeStart"
                                type="date"
                                placeholder="创建开始时间"
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
                                placeholder="创建截止时间"
                                clearable
                                @change="searchDebounce"
                                value-format="yyyy-MM-dd"
                                size="small"
                            ></el-date-picker>
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div class="searchInput">
                            归集地址：
                            <el-select v-model="form.poolAddress" placeholder="请选择" size="small" @change="searchDebounce" clearable>
                                <el-option
                                    v-for="(item, index) in poolAddressOption"
                                    :key="index"
                                    :label="item.poolAddress"
                                    :value="item.poolAddress"
                                ></el-option>
                            </el-select>
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div class="searchInput">
                            充币状态：
                            <el-select v-model="form.state" placeholder="请选择" size="small" @change="searchDebounce" clearable>
                                <!-- <el-option
                                    v-for="item in coinOption"
                                    :key="item.id"
                                    :label="item"
                                    :value="item"
                                ></el-option> -->
                                <el-option label="已上账" :value="1"></el-option>
                                <el-option label="上账失败" :value="2"></el-option>
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
                </el-row>
            </div>
            <el-card>
                <el-table :data="tableData" style="width: 100%" border @selection-change="handleSelectionChange">
                    <!-- <el-table-column type="selection" width="55"> </el-table-column> -->
                    <el-table-column type="index" width="50"></el-table-column>
                    <el-table-column prop="UID" label="UID" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="nickName" label="用户名" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="coinName" label="币种类型" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="fromAddress" label="转出地址" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="toAddress" label="充币地址" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="tag" label="标签" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="poolAddress" label="归集地址" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="amount" label="充币数量" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="hash" label="哈希值" align="center" header-align="center"></el-table-column>
                    <el-table-column prop label="上账状态" align="center" header-align="center">
                        <template slot-scope="scope">
                            <el-tag type="success" v-if="scope.row.state === 1">已上账</el-tag>
                            <el-tag type="info" v-if="scope.row.state === 2">上账失败</el-tag>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column prop="" label="归集状态" align="center" header-align="center"></el-table-column> -->
                    <el-table-column prop label="归集状态" align="center" header-align="center">
                        <template slot-scope="scope">
                            <el-tag type="success" v-if="scope.row.poolState === 1">已归集</el-tag>
                            <el-tag type="info" v-if="scope.row.poolState === 2">未归集</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="创建时间" align="center" header-align="center">
                        <template slot-scope="scope">{{ scope.row.createTime | dateYMDHMSFormat }}</template>
                    </el-table-column>
                    <el-table-column label="上账时间" align="center" header-align="center">
                        <template slot-scope="scope">{{ scope.row.billingTime | dateYMDHMSFormat }}</template>
                    </el-table-column>

                    <el-table-column label="操作" align="center" header-align="center" width="220">
                        <template slot-scope="scope">
                            <el-link type="primary" @click="handleDebt(scope.row)" v-if="scope.row.state === 2 && btnList.handleDebt"
                                >手动上账</el-link
                            >
                            <el-link type="primary" @click="onView(scope.row)" v-if="btnList.coinDetail">详情</el-link>
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
        <HandleDebt
            :handleDebtVisible.sync="handleDebtVisible"
            v-if="handleDebtVisible"
            :currentItem="currentItem"
            @refreshList="refreshList"
        />
        <CoinDetail :coinDetailVisible.sync="coinDetailVisible" v-if="coinDetailVisible" :currentItem="currentItem" />
    </div>
</template>
<script>
import { mixins } from '../../utils/mixins';
// import _ from 'lodash';
// let _ = require('lodash')
import debounce from 'lodash/debounce';
import HandleDebt from './component/handleDebt.vue';
import CoinDetail from './component/coinDetail';
export default {
    name: 'userMange',
    mixins: [mixins],
    components: { HandleDebt, CoinDetail },
    data() {
        return {
            tableData: [],
            form: {
       
            },
            coinOption: [],
            poolAddressOption: [],
            coinDetailVisible: false,
            handleDebtVisible: false,
            currentItem: {},
            totalAmount: ''
        };
    },
    created() {
        this.getListInit();
        this.getSelectCoin();
    },

    methods: {
        async getAllPoolAddress() {
            const res = await this.$api.getAllPoolAddress();
            this.poolAddressOption = res.data.allPaymentAddress;
        },
        async getListInit() {
            const res = await this.$api.getRechargeLog({ pageNo: this.pageNo, pageSize: this.pageSize, ...this.form });
            // console.log(res);
            if (res.code === '200') {
                this.tableData = res.data.list;
                this.total = res.data.page.totalNum;
                this.totalAmount = res.data.totalAmount;
                this.getAllPoolAddress();
            } else {
                this.$message.error(res.msg);
            }
        },
        async getSelectCoin() {
            const res = await this.$api.getSelectCoin();
            if (res.code === '200') {
                this.coinOption = res.data;
            } else {
                this.$message.error(res.msg);
            }
        },

        handleSelect() {
            this.getListInit();
        },
        handleDebt(val) {
            this.currentItem = Object.assign({}, val);
            this.handleDebtVisible = true;
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
            this.coinDetailVisible = true;
        },
        handleSelectionChange() {}
    }
};
</script>

<style lang="less" scoped>
@import '@/assets/css/component.less';
.userMange {
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
