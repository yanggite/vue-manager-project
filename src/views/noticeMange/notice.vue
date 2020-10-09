<template>
    <div class="notice">
        <div class="main">
            <div class="title">
                <el-row>
                    <el-col :span="3">
                        <div class="name">数据列表</div>
                    </el-col>
                    <el-col :span="3" :offset="18">
                        <el-button type="primary" size="mini"  @click="onAdd" v-if="btnList.add">添加</el-button>
                    </el-col>
                </el-row>
            </div>
            <el-card>
                <el-table :data="tableData" style="width: 100%" border>
                    <el-table-column type="index" width="50"></el-table-column>
                    <el-table-column label="语言版本" align="center" header-align="center">
                        <template slot-scope="scope">
                            <!-- {{scope.row.languageId==1?("中文简体"):(languageId==2?(English):(null))}} -->
                            <span v-if="scope.row.languageId === 1">中文简体</span>
                            <span v-if="scope.row.languageId === 2">English</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="title" label="标题" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="content" label="内容" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="sort" label="排序序号" align="center" header-align="center"></el-table-column>
                    <el-table-column label="发布时间" align="center" header-align="center">
                        <template slot-scope="scope">{{ scope.row.createDate | dateYMDHMSFormat }}</template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" header-align="center" width="200">
                        <template slot-scope="scope">
                            <el-link type="primary" @click="onEdit(scope.row)" v-if="btnList.edit">编辑</el-link>
                            <el-link type="danger" @click="onDelect(scope.row)" v-if="btnList.del">删除</el-link>
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
        <AddNotice :addNoticeVisible.sync="addNoticeVisible" v-if="addNoticeVisible" @refreshList="refreshList" />
        <EditNotice :editNoticeVisible.sync="editNoticeVisible" v-if="editNoticeVisible" :currentItem="currentItem" />
    </div>
</template>

<script>
import { mixins } from '@/utils/mixins';
import AddNotice from './component/addNotice';
import EditNotice from './component/editNotice';
export default {
    name: 'notice',
    mixins: [mixins],
    components: { AddNotice, EditNotice },
    data() {
        return {
            addNoticeVisible: false,
            editNoticeVisible: false,
            currentItem: {},
            tableData: [],
            btnList: {
                add: false,
                edit: false,
                del: false
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
            const res = await this.$api.getNoticesList({ pageNo: this.pageNo, pageSize: this.pageSize });
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
            this.editNoticeVisible = true;
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
                    if (item == '添加') {
                        this.btnList.add = true;
                    } else if (item == '编辑') {
                        this.btnList.edit = true;
                    } else if (item == '删除') {
                        //数据库未写
                        this.btnList.del = true;
                    }
                });
            }
        }
    }
};
</script>

<style lang="less" scoped>
@import '@/assets/css/component.less';
.notice {
}
</style>
