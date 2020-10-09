<template>
    <div class="currencyConfig">
        <div class="main">
            <div class="title">
                <el-row>
                    <el-col :span="3">
                        <div class="name">数据列表</div>
                    </el-col>
                    <el-col :span="3" :offset="18">
                        <div class="name">
                            <el-button type="primary" size="small" @click="onAdd" v-if="btnList.add">新增</el-button>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <el-card>
                <el-table :data="tableData" style="width: 100%" border>
                    <el-table-column type="index" width="50"></el-table-column>
                    <!-- <el-table-column prop label="语言版本" align="center" header-align="center"></el-table-column> -->
                    <el-table-column prop="coinName" label="币种名称" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="blockType" label="区块链类型" align="center" header-align="center"></el-table-column>
                    <el-table-column label="logo缩略图" align="center" header-align="center">
                        <template slot-scope="scope">
                            <el-image style="width: 50px; height: 50px" :src="scope.row.logoUrl"></el-image>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column prop="" label="ustd交易对价格(读取)" align="center" header-align="center"></el-table-column> -->
                    <el-table-column prop="usdtUnit" label="usdt交易对价格" align="center" header-align="center"></el-table-column>
                    <el-table-column
                        prop="isShow"
                        label="前端是否展示(0不展示，1展示)"
                        align="center"
                        header-align="center"
                    ></el-table-column>
                    <el-table-column prop="isReachge" label="充币(0不允许，1允许)" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="isApply" label="提币(0不允许，1允许)" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="lowWidthdrawNum" label="起提数量" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="widthdrawBs" label="起提倍数(可能是小数)" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="transFree" label="转账手续费比例" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="transLowFree" label="转账手续费最小值" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="transUpFree" label="转账手续费最大值" align="center" header-align="center"></el-table-column>
                    <el-table-column label="操作" align="center" header-align="center" width="200">
                        <template slot-scope="scope">
                            <el-link type="primary" @click="onEdit(scope.row)">编辑</el-link>
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
        <AddCurrencyConfig
            :addCurrencyConfigVisible.sync="addCurrencyConfigVisible"
            v-if="addCurrencyConfigVisible"
            @refreshList="refreshList"
        />
        <EditCurrencyConfig
            :editCurrencyConfigVisible.sync="editCurrencyConfigVisible"
            v-if="editCurrencyConfigVisible"
            :currentItem="currentItem"
            @refreshList="refreshList"
        />
    </div>
</template>

<script>
import { mixins } from '@/utils/mixins';
import AddCurrencyConfig from './component/addCurrencyConfig';
import EditCurrencyConfig from './component/editCurrencyConfig';
export default {
    name: 'currencyConfig',
    mixins: [mixins],
    components: { AddCurrencyConfig ,EditCurrencyConfig},
    data() {
        return {
            addCurrencyConfigVisible: false,
            editCurrencyConfigVisible: false,
            currentItem: {},
            tableData: []
        };
    },
    created() {
        this.getListInit();
    },
    methods: {
        async getListInit() {
            const res = await this.$api.getCoinConfig({ pageNo: this.pageNo, pageSize: this.pageSize });
            if (res.code === '200') {
                this.tableData = res.data.list;
                this.total = res.data.page.totalNum;
            } else {
                this.$message.error(res.msg);
            }
        },
        refreshList() {
            this.getListInit();
        },
        onAdd(val) {
            this.currentItem = JSON.parse(JSON.stringify(val));
            this.addCurrencyConfigVisible = true;
        },
        onEdit(val) {
            this.currentItem = JSON.parse(JSON.stringify(val));
            this.editCurrencyConfigVisible = true;
        }
    }
};
</script>

<style lang="less" scoped>
@import '@/assets/css/component.less';
.currencyConfig {
}
</style>
