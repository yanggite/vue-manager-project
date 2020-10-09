<template>
    <div class="teamMange">
        <div class="main">
            <div class="title">
                <el-row>
                    <el-col :span="3">
                        <div class="name">数据列表</div>
                    </el-col>
                    <el-col :span="3" :offset="18">
                        <el-button type="primary" size="mini" @click="onAdd" v-if="btnList.add">新增</el-button>
                    </el-col>
                </el-row>
            </div>
            <el-card>
                <el-table :data="tableData" style="width: 100%" border>
                    <el-table-column type="index" width="50"></el-table-column>
                    <el-table-column prop="uid" label="UID" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="account" label="用户名" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="districtNumber" label="地区序号" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="teamNumber" label="团队序号" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="" label="归集地址" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="" label="打款地址" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="teamTotalNum" label="团队人数" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="" label="团队充币" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="" label="团队提币" align="center" header-align="center"></el-table-column>
                    <el-table-column label="创建时间" align="center" header-align="center">
                        <template slot-scope="scope">{{ scope.row.registerTime | dateYMDHMSFormat }}</template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" header-align="center" width="220">
                        <template slot-scope="scope">
                            <el-link type="primary" @click="onEdit(scope.row)" v-if="btnList.edit">编辑</el-link>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    @size-change="sizeChange($event, getListInit )"
                    @current-change="pageChange($event, getListInit )"
                    :current-page="pageNo"
                    :page-sizes="pageSizeS"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
                    background
                ></el-pagination>
            </el-card>
        </div>
        <AddTeam :addTeamVisible.sync="addTeamVisible" v-if="addTeamVisible" @refreshList="refreshList" />
        <EditTeam :editTeamVisible.sync="editTeamVisible" v-if="editTeamVisible" @refreshList="refreshList" :currentItem="currentItem"/>
    </div>
</template>
<script>
import { mixins } from '../../utils/mixins';
import AddTeam from './component/addTeam';
import EditTeam from './component/editTeam'
export default {
    name: 'teamMange',
    mixins: [mixins],
    components: { AddTeam,EditTeam },
    data() {
        return {
            tableData: [],
          
            addTeamVisible: false,
            editTeamVisible:false,
            currentItem: {}
        };
    },
    created() {
        this.getListInit ();
    },
    methods: {
        async getListInit () {
            const res = await this.$api.getUserTeam ({ pageNo: this.pageNo, pageSize: this.pageSize });
            console.log(res);
            if (res.code == '200') {
                this.tableData = res.data.list;
                this.total = res.data.page.totalNum;
            } else if (res.code === '350') {
                this.$message.info(res.msg);
            } else {
                this.$message.error('获取列表数据错误');
            }
        },
        handleSelect() {
            this.getListInit ();
        },
        onEdit(val) {
            this.currentItem=JSON.parse(JSON.stringify(val))
            this.editTeamVisible=true
        },
        onAdd() {
            this.addTeamVisible = true;
        }
    }
};
</script>

<style lang="less" scoped>
@import '@/assets/css/component.less';
</style>
