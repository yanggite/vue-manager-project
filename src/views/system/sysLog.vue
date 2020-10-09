<template>
    <div class="sysLog">
        <div class="main">
            <div class="title">
                <el-row>
                    <el-col :span="3">
                        <div class="name">数据列表</div>
                    </el-col>
                </el-row>
            </div>
            <el-card>
                <el-table :data="tableData" style="width: 100%" border>
                    <el-table-column type="index" width="50"></el-table-column>
                    <el-table-column prop="loginName" label="请求用户" align="center" header-align="center"></el-table-column>
                     <el-table-column prop="clientIp" label="请求IP" align="center" header-align="center"></el-table-column>
                     <el-table-column prop="optContent" label="请求描述" align="center" header-align="center"></el-table-column>
                     <el-table-column  label="请求时间" align="center" header-align="center">
                         <template slot-scope="scope">
                             {{scope.row.createTime | dateYMDHMSFormat}}
                         </template>
                     </el-table-column>
                </el-table>
                <el-pagination
                    @size-change="sizeChange($event,getSystemLogList)"
                    @current-change="pageChange($event,getSystemLogList)"
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
export default {
    name: 'sysLog',
    mixins: [mixins],
    data() {
        return {
            tableData: []
        };
    },
    created() {
        this.getSystemLogList();
    },
    methods: {
        async getSystemLogList() {
            const res = await this.$api.getSystemLogList({ pageNo: this.pageNo, pageSize: this.pageSize });
            this.tableData = res.data.list;
            this.total = res.data.page.totalNum;
        }
    }
};
</script>

<style lang="less" scoped>
@import '@/assets/css/component.less';
</style>