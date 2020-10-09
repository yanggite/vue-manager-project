<template>
    <div class="sysConf">
        <div class="main">
            <div class="title">
                <el-row>
                    <el-col :span="3">
                        <div class="name">数据列表</div>
                    </el-col>
                    <!-- <el-col :span="3" :offset="18">
                        <el-button type="primary" size="mini" icon="el-icon-plus" @click="onAdd" v-if="btnList.add">添加</el-button>
                    </el-col> -->
                </el-row>
            </div>
            <el-card>
                <el-table :data="tableData" style="width: 100%" border>
                    <el-table-column type="index" width="50"></el-table-column>
                    <el-table-column prop="configKey" label="名称" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="remarks" label="备注" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="configValue" label="参数" align="center" header-align="center"></el-table-column>
                    <el-table-column label="操作" align="center" header-align="center" width="200">
                        <template slot-scope="scope">
                            <el-link type="primary"  @click="onEdit(scope.row)" v-if="btnList.edit"
                                >编辑</el-link
                            >
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
        <SysConfEdit :sysConfEditVisible.sync="sysConfEditVisible" v-if="sysConfEditVisible" :currentItem="currentItem" @refreshList="refreshList"/>
    </div>
</template>

<script>
import { mixins } from '@/utils/mixins';
import SysConfEdit from './component/sysConfEdit';
export default {
    name: 'sysConf',
    mixins: [mixins],
    components: { SysConfEdit },
    data() {
        return {
            sysConfEditVisible: false,
            currentItem: {},
            tableData: [],
            btnList: {
                edit: false,
            }
        };
    },
    created() {
        this.getBtnPower(this.$route.path);
        this.getListInit();
    },
    methods: {
        onAdd() {
            this.addNoticeVisible = true;
        },
        async getListInit() {
            const res = await this.$api.getSysConfigList({ pageNo: this.pageNo, pageSize: this.pageSize, type: 0 });
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
        onEdit(val) {
            this.currentItem = Object.assign({}, val);
            this.sysConfEditVisible = true;
        },
        async onDelect(item) {
            const result = await this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(err => err);
            if (result === 'confirm') {
                //    console.log(item)
                const data = await this.$api.delNotice({ id: item.id });
                this.$message.success('删除成功');
                this.getListInit();
            } else {
                this.$message.info('你已取消删除操作');
            }
        },
        async getBtnPower(val) {
            const res = await this.$api.getBtnPower({ url: val });
            if (res.code === '200') {
                this.handleBtnList(res.data);
            } else if (res.code === '500') {
                this.$message.error('获取按钮权限错误');
            }
        },
        handleBtnList(val) {
            if (val) {
                let btnArr = [];
                val.filter(item => {
                    btnArr.push(item.btnName);
                });
                console.log(btnArr);
                btnArr.find(item => {
                    if (item == '编辑') {
                        this.btnList.edit = true;
                    }
                });
            }
        }
    }
};
</script>

<style lang="less" scoped>
@import '@/assets/css/component.less';
.sysConf {
}
</style>
