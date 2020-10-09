<template>
    <div class="userMange">
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
                            <el-input size="small" placeholder="用户名" v-model="form.account" @input="searchDebounce" clearable></el-input>
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div class="searchInput">
                            联系方式：
                            <el-input size="small" placeholder="联系方式" v-model="form.phone" @input="searchDebounce" clearable></el-input>
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div class="searchInput">
                            推荐人UID：
                            <el-input
                                size="small"
                                placeholder="推荐人UID"
                                v-model="form.referrerUID"
                                @input="searchDebounce"
                                clearable
                            ></el-input>
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div class="searchInput">
                            推荐人名：
                            <el-input
                                size="small"
                                placeholder="推荐人用户名"
                                v-model="form.referrerAccount"
                                @input="searchDebounce"
                                clearable
                            ></el-input>
                        </div>
                    </el-col>
                </el-row>
                <el-divider></el-divider>
                <el-row>
                    <el-col :span="4">
                        <div class="searchInput">
                            开始时间：
                            <el-date-picker
                                v-model="form.registerCreatTime"
                                type="date"
                                placeholder="开始注册时间"
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
                                v-model="form.registerEndTime"
                                type="date"
                                placeholder="截止注册时间"
                                clearable
                                @change="searchDebounce"
                                value-format="yyyy-MM-dd"
                                size="small"
                            ></el-date-picker>
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div class="searchInput">
                            会员等级：
                            <el-select v-model="form.userLeave" placeholder="请选择" size="small" @change="searchDebounce" clearable>
                                <el-option
                                    v-for="item in memberOption"
                                    :key="item.id"
                                    :label="item.leaveName"
                                    :value="item.leaveName"
                                ></el-option>
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
                <el-table :data="tableData" style="width: 100%" border>
                    <el-table-column type="index" width="50"></el-table-column>
                    <el-table-column prop="uid" label="UID" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="userName" label="用户名" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="phone" label="联系方式" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="referrerUID" label="推荐人UID" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="referrerName" label="推荐人用户名" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="leave" label="会员等级" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="ztTotalNum" label="直推人数" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="teamTotalNum" label="团队人数" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="ztHasNum" label="有效直推" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="teamHasNum" label="有效团队人数" align="center" header-align="center"></el-table-column>
                    <el-table-column label="注册时间" align="center" header-align="center">
                        <template slot-scope="scope">{{ scope.row.registerTime | dateYMDHMSFormat }}</template>
                    </el-table-column>
                    <el-table-column prop label="账户状态" align="center" header-align="center">
                        <template slot-scope="scope">
                            <el-tag type="success" v-if="scope.row.state === 0">正常</el-tag>
                            <el-tag type="info" v-if="scope.row.state === 1">禁用</el-tag>
                        </template>
                    </el-table-column>

                    <el-table-column label="操作" align="center" header-align="center" width="220">
                        <template slot-scope="scope">
                            <el-link type="primary"  @click="onEdit(scope.row)" v-if="btnList.edit">编辑</el-link>
                            <el-link type="primary"  @click="onView(scope.row)" v-if="btnList.assestDetail">资产详情</el-link>
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
        <EditUserMange
            :editUserMangeVisible.sync="editUserMangeVisible"
            v-if="editUserMangeVisible"
            :currentItem="currentItem"
            @refreshList="refreshList"
        />
        <UserMangeDetail :UserMangeDetailVisible.sync="UserMangeDetailVisible" v-if="UserMangeDetailVisible" :currentItem="currentItem" />
    </div>
</template>
<script>
import { mixins } from '../../utils/mixins';
// import _ from 'lodash';
// let _ = require('lodash')
import debounce from 'lodash/debounce';
import EditUserMange from './component/editUserMange';
import UserMangeDetail from './component/userMangeDetail';
export default {
    name: 'userMange',
    mixins: [mixins],
    components: { EditUserMange, UserMangeDetail },
    data() {
        return {
            tableData: [],
            form: {},
            memberOption: [],
            editUserMangeVisible: false,
            UserMangeDetailVisible: false,
            currentItem: {}
        };
    },
    created() {
        this.getListInit();
        this.getSelectLeave();
    },

    methods: {
        async getListInit() {
            const res = await this.$api.getUserList({ pageNo: this.pageNo, pageSize: this.pageSize, ...this.form });
            if (res.code === '200') {
                this.tableData = res.data.list;
                this.total = res.data.page.totalNum;
            } else {
                this.$message.error(res.msg);
            }
        },
        async getSelectLeave() {
            const res = await this.$api.getSelectLeave();
            if (res.code === '200') {
                this.memberOption = res.data;
            } else {
                this.$message.error(res.msg);
            }
        },
        handleSelect() {
            this.getListInit();
        },
        onEdit(val) {
             this.currentItem = Object.assign({}, val);
            this.editUserMangeVisible = true;
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
        async onView(val) {
             this.currentItem = Object.assign({}, val);
            const res = await this.$api.getUserDetail({ userId: val.id });
            if (res.code === '200') {
               this.UserMangeDetailVisible = true;
            } else if (res.code === '347') {
                this.$message.info(res.msg);
            }
            
        }
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
