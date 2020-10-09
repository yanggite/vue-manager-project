<template>
    <div class="RoleManage">
        <div class="main">
            <div class="title">
                <el-row>
                    <el-col :span="3">
                        <div class="name">数据列表</div>
                    </el-col>
                    <el-col :span="3" :offset="18">
                        <el-button type="primary" size="mini"  @click="onRoleAdd" v-if="btnList.add">添加角色</el-button>
                    </el-col>
                </el-row>
            </div>
            <el-card>
                <el-table :data="roleData" style="width: 100%" border>
                    <el-table-column prop="id" label="ID" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="roleName" label="角色" align="center" header-align="center"></el-table-column>
                    <el-table-column label="操作" align="center" header-align="center" width="400">
                        <template slot-scope="scope">
                            <el-link type="primary" @click="onEdit(scope.row)" v-if="btnList.edit">编辑</el-link>
                            <el-link type="danger" @click="onDelect(scope.row)" v-if="btnList.del">删除</el-link>
                            <!-- <el-link type="danger" @click="onDelect(scope.row)">删除</el-link> -->
                            <el-link type="success" @click="onPower(scope.row)" v-if="btnList.distributeRoute">分配权限</el-link>
                            <el-link type="warning" @click="onPowerBtn(scope.row)" v-if="btnList.distributeBtn">分配按钮</el-link>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    @size-change="sizeChange($event, getRoleList)"
                    @current-change="pageChange($event, getRoleList)"
                    :current-page="pageNo"
                    :page-sizes="pageSizeS"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
                    background
                ></el-pagination>
            </el-card>
        </div>
        <RoleEdit :roleEditVisible.sync="roleEditVisible" :currentUser="currentUser" v-if="roleEditVisible" />
        <AssignPorToRole :assignPorVisible.sync="assignPorVisible" v-if="assignPorVisible" :currentUser="currentUser" />
        <AssignBtnToRole :assignBtnVisible.sync="assignBtnVisible" v-if="assignBtnVisible" :currentUser="currentUser" />
        <RoleAdd :roleAddVisible.sync="roleAddVisible" v-if="roleAddVisible" @refreshList="refreshList" />
    </div>
</template>

<script>
import { mixins } from '../../utils/mixins';
import RoleEdit from './component/roleEdit';
import RoleAdd from './component/roleAdd';
import AssignPorToRole from './component/assignPorToRole';
import AssignBtnToRole from './component/assignBtnToRole';
export default {
    name: 'role',
    mixins: [mixins],
    //import引入的组件需要注入到对象中才能使用
    components: { RoleEdit, RoleAdd, AssignPorToRole, AssignBtnToRole },
    data() {
        return {
            currentUser: {},
            roleData: [],
            roleEditVisible: false,
            roleAddVisible: false,
            assignPorVisible: false,
            assignBtnVisible: false,
            btnList: {
                add: false,
                edit: false,
                del: false,
                forbidden: false,
                distributeRoute: false,
                distributeBtn: false
            }
        };
    },
    created() {
        this.getRoleList();
    },
    methods: {
        async getRoleList() {
            const result = await this.$api.getRoleList({ pageNo: this.pageNo, pageSize: this.pageSize });
            // console.log(result);
            if (result.code === '200') {
                this.roleData = result.data.roles;
                this.total = result.data.page.totalNum;
            } else if (result.code === '304') {
                return this.$message.info(result.msg);
            }
        },
        onEdit(val) {
            this.currentUser = Object.assign({}, val);
            this.roleEditVisible = true;
        },
        async onDelect(item) {
            const result = await this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(err => err);
            if (result === 'confirm') {
                //    console.log(item)
                const data = await this.$api.delRole({ id: item.id });
                console.log(data);
                if (data.code === '200') {
                    this.$message.success('删除成功');
                    this.getRoleList();
                } else {
                    this.$message.error('删除失败');
                }
            } else {
                this.$message.info('你已取消删除操作');
            }
        },
        onPower(val) {
            this.currentUser = Object.assign({}, val);
            this.assignPorVisible = true;
        },
        onPowerBtn(val) {
            this.currentUser = Object.assign({}, val);
            this.assignBtnVisible = true;
        },
        onSwitch(val, { id }) {
            console.log(val, id);
        },
        onRoleAdd() {
            this.roleAddVisible = true;
        },
        refreshList() {
            this.getRoleList();
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
                    if (item == '添加角色') {
                        this.btnList.add = true;
                    } else if (item == '编辑') {
                        this.btnList.edit = true;
                    } else if (item == '删除') {
                        //数据库未写
                        this.btnList.del = true;
                    } else if (item == '分配权限') {
                        this.btnList.distributeRoute = true;
                    } else if (item == '分配按钮') {
                        this.btnList.distributeBtn = true;
                    }
                });
            }
        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.getBtnPower(this.$route.path);
        this.getRoleList();
    }
};
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.RoleManage {
    .main {
        background-color: #fff;
        padding-top: 20px;
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
