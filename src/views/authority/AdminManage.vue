<!--  -->
<template>
    <div class="AdminManage">
        <div class="main">
            <div class="title">
                <el-row>
                    <el-col :span="3">
                        <div class="name">数据列表</div>
                    </el-col>
                    <el-col :span="3" :offset="18">
                        <el-button type="primary" size="mini"  @click="onAdminAdd" v-if="btnList.add"
                            >添加管理员</el-button
                        >
                    </el-col>
                </el-row>
            </div>
            <el-card>
                <el-table :data="adminData" style="width: 100%" border>
                    <el-table-column prop="login" label="账号" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="roleName" label="角色" align="center" header-align="center"></el-table-column>
                    <el-table-column label="最近登录时间" align="center" header-align="center">
                        <template slot-scope="scope">{{ scope.row.lastLoginTime | dateYMDHMSFormat }}</template>
                    </el-table-column>
                    <el-table-column prop="ipAddress" label="最近登录IP" align="center" header-align="center"></el-table-column>

                    <el-table-column label="状态" align="center" header-align="center">
                        <!-- <template slot-scope="scope">
                            <el-switch
                                v-model="scope.row.state"
                                :active-value="1"
                                :inactive-value="0"
                                @change="onSwitch($event, scope.row)"
                            ></el-switch>
                        </template> -->
                        <template slot-scope="scope">
                            <el-tag type="success" v-if="scope.row.state === 1">正常</el-tag>
                            <el-tag type="info" v-if="scope.row.state === 0">禁用</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" header-align="center" width="360">
                        <template slot-scope="scope">
                            <el-link type="primary" @click="onEdit(scope.row)" v-if="btnList.edit">编辑</el-link>
                            <el-link type="danger" @click="onDelect(scope.row)" v-if="btnList.del">删除</el-link>
                            <el-link type="info" @click="onDisable(scope.row, 0)" v-if="btnList.forbidden">禁用</el-link>
                            <el-link type="success" @click="onDisable(scope.row, 1)" v-if="btnList.start">启用</el-link>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    @size-change="sizeChange($event, getAdminList)"
                    @current-change="pageChange($event, getAdminList)"
                    :current-page="pageNo"
                    :page-sizes="pageSizeS"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
                    background
                ></el-pagination>
            </el-card>
        </div>
        <AdminEdit
            :adminEditVisible.sync="adminEditVisible"
            v-if="adminEditVisible"
            :currentUser="currentUser"
            @refreshList="onRefreshList"
        />
        <AdminAdd :adminAdd.sync="adminAdd" v-if="adminAdd" @refreshList="onRefreshList" />
    </div>
</template>

<script>
import { mixins } from '../../utils/mixins';
import AdminEdit from './component/adminEdit';
import AdminAdd from './component/adminAdd';
export default {
    name: 'admin',
    mixins: [mixins],
    //import引入的组件需要注入到对象中才能使用
    components: { AdminEdit, AdminAdd },
    data() {
        return {
            adminData: [],
            adminEditVisible: false,
            adminAdd: false,
            searchOptions: [
                {
                    value: '1',
                    label: '正常'
                },
                {
                    value: '0',
                    label: '禁用'
                }
            ],
            searchValue: '', //v-model的值为当前被选中的el-option的 value 属性值
            currentUser: {},
            status: '',
            btnList: {
                add: false,
                edit: false,
                del: false,
                forbidden: false,
                start: false
            }
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        async getAdminList() {
            const res = await this.$api.getAdminList({ pageNo: this.pageNo, pageSize: this.pageSize, status: this.status });
            this.adminData = res.data.list;
            this.total = res.data.page.totalNum;
        },
        onEdit(val) {
            this.adminEditVisible = true;
            this.currentUser = val;
        },
        async onDelect(item) {
            console.log(item);
            const result = await this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(err => err);
            if (result === 'confirm') {
                const res = await this.$api.delAdmin({ id: item.id });
                console.log(res);
                if (res.code === '200') {
                    this.$message.success('删除成功');
                    this.getAdminList();
                } else {
                    this.$message.error(res.msg);
                }
            } else {
                this.$message.info('你已取消删除操作');
            }
        },
        async onDisable(item, state) {
            const res = await this.$api.setAdminState({ id: item.id, state: state });
            if (res.code === '200') {
                this.$message.success('设置状态成功');
                this.getAdminList();
            } else if (res.code === '321') {
                this.$message.info(res.msg);
            } else {
                this.$message.error('设置状态失败');
            }
        },
        async onSwitch(val, { id }) {
            const res = await this.$api.setAdminState({ id, state: val });
            if (res.code === '200') {
                this.$message.success('设置状态成功');
            } else if (res.code === '321') {
                this.$message.info(res.msg);
            } else {
                this.$message.error('设置状态失败');
            }
        },
        onAdminAdd() {
            this.adminAdd = true;
        },
        onRefreshList() {
            this.getAdminList();
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
                    if (item == '添加管理员') {
                        this.btnList.add = true;
                    } else if (item == '编辑') {
                        this.btnList.edit = true;
                    } else if (item == '删除') {
                        this.btnList.del = true;
                    } else if (item == '禁用') {
                        this.btnList.forbidden = true;
                    } else if (item == '启用') {
                        this.btnList.start = true;
                    }
                });
            }
        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        // console.log(this.$store.state.User.currentUrl);
        // this.getBtnPower(this.$store.state.User.currentUrl);
        this.getBtnPower(this.$route.path);
        this.getAdminList();
    },

    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {},
    beforeCreate() {}, //生命周期 - 创建之前
    beforeMount() {}, //生命周期 - 挂载之前
    beforeUpdate() {}, //生命周期 - 更新之前
    updated() {}, //生命周期 - 更新之后
    beforeDestroy() {}, //生命周期 - 销毁之前
    destroyed() {}, //生命周期 - 销毁完成
    activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.AdminManage {
    .main {
        background-color: #fff;
        padding-top: 20px;
        div.search {
            margin-left: 20px;
            .searchTitle {
                font-size: 14px;
                margin-right: 10px;
            }
        }

        div.divider {
            background-color: #ebeef5;
        }
        .title {
            padding: 10px 21px;
            font-size: 14px;
            .name {
                color: #409eff;
            }
        }
    }
}
</style>
