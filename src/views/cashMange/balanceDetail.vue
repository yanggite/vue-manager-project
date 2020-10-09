<template>
    <div class="balanceDetail">
        <div class="searchBox">
            <el-card>
                <el-row>
                    <el-col :span="4">
                        <div class="searchInput">
                            UID：
                            <el-input size="small" placeholder="UID" v-model="form.UID" @input="searchDebounce" clearable></el-input>
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
                                placeholder="开始时间"
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
                                placeholder="截止时间"
                                clearable
                                @change="searchDebounce"
                                value-format="yyyy-MM-dd"
                                size="small"
                            ></el-date-picker>
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div class="searchInput">
                            类型：
                            <el-select v-model="form.eventName" placeholder="请选择" size="small" @change="searchDebounce" clearable>
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

                </el-row>
            </div>
            <el-card>
                <el-table :data="tableData" style="width: 100%" border @selection-change="handleSelectionChange">
                    <el-table-column type="index" width="50"></el-table-column>
                    <el-table-column prop="UID" label="UID" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="nickName" label="用户名" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="coinName" label="币种类型" align="center" header-align="center"></el-table-column>

                    <el-table-column prop="changeValue" label="变动数量" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="afterValue" label="变动后余额" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="eventName" label="类型" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="operationObject" label="操作对象" align="center" header-align="center"></el-table-column>
                    <el-table-column label="发生时间" align="center" header-align="center">
                        <template slot-scope="scope">{{ scope.row.createTime | dateYMDHMSFormat }}</template>
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

    </div>
</template>
<script>
import { mixins } from '../../utils/mixins';
// import _ from 'lodash';
// let _ = require('lodash')
import debounce from 'lodash/debounce';

export default {
    name: 'balanceDetail',
    mixins: [mixins],

    data() {
        return {
            tableData: [],
            form: {},
            coinOption: [],
            paymentAddressOption: [],
            coinDetailVisible: false,
            handleDebtVisible: false,
            currentItem: {}
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
            console.log(this.paymentAddressOption);
        },
        async getListInit() {
            const res = await this.$api.getWidthdrawList({ pageNo: this.pageNo, pageSize: this.pageSize, ...this.form });
            console.log(res);
            if (res.code === '200') {
                this.tableData = res.data.list;
                this.total = res.data.page.totalNum;
                this.getAllPaymentAddress();
            } else {
                this.$message.error(res.msg);
            }
        },
        async getSelectCoin() {
            const res = await this.$api.getSelectCoin();
            console.log(res.data);
            if (res.code === '200') {
                this.coinOption = res.data;
            } else {
                this.$message.error(res.msg);
            }
        },

        handleSelect() {
            this.getListInit();
        },
        onEdit(val) {
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
.balanceDetail {
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
