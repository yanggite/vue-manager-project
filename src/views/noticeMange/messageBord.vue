<template>
    <div class="messageBord">
        <div class="searchBox">
            <el-card>
                <el-row>
                    <el-col :span="4">
                        <div class="searchInput">
                            UID：
                            <el-input size="small" placeholder="UID" v-model="form.userId" @input="searchDebounce" clearable></el-input>
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
                            回复：
                            <el-select v-model="form.status" placeholder="请选择" size="small" @change="searchDebounce" clearable>
                                <el-option :value="1" label="已回复"></el-option>
                                <el-option :value="0" label="未回复"></el-option>
                            </el-select>
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div class="searchInput">
                            留言开始时间：
                            <el-date-picker
                                v-model="form.startTime"
                                type="date"
                                placeholder="留言开始时间"
                                clearable
                                @change="searchDebounce"
                                value-format="yyyy-MM-dd"
                                size="small"
                            ></el-date-picker>
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div class="searchInput">
                            留言结束时间：
                            <el-date-picker
                                v-model="form.endTime"
                                type="date"
                                placeholder="留言结束时间"
                                clearable
                                @change="searchDebounce"
                                value-format="yyyy-MM-dd"
                                size="small"
                            ></el-date-picker>
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
                    <el-table-column prop="title" label="标题" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="userId" label="UID" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="nickName" label="用户名" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="content" label="留言内容" align="center" header-align="center"></el-table-column>
                    <el-table-column label="状态" align="center" header-align="center">
                        <template slot-scope="scope">
                            <el-tag type="info" v-if="scope.row.status === 0">未回复</el-tag>
                            <el-tag type="success" v-if="scope.row.status === 1">已回复</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" header-align="center" width="200">
                        <template slot-scope="scope">
                            <el-link  type="primary"  @click="onResponse(scope.row)" v-if="btnList.response&&scope.row.status===0">回复</el-link>
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
        <ResMessage :resMessageVisible.sync="resMessageVisible" v-if="resMessageVisible" :currentItem="currentItem" @refreshList="refreshList"/>
    </div>
</template>

<script>
import { mixins } from '@/utils/mixins';
import debounce from 'lodash/debounce';
import ResMessage from './component/resMessage';

export default {
    name: 'messageBord',
    mixins: [mixins],
    components: { ResMessage },
    data() {
        return {
            resMessageVisible:false,
            currentItem: {},
            tableData: [],
            form: {}
        };
    },
    created() {
        this.getListInit();
    },
    methods: {
        async getListInit() {
            const res = await this.$api.getMessageBoardsList({ pageNo: this.pageNo, pageSize: this.pageSize, ...this.form });
            // console.log(res);
            if (res.code === '200') {
                this.tableData = res.data.list;
                this.total = res.data.page.totalNum;
            } else {
                this.$message.error(res.msg);
            }
        },
        // refreshList() {
        //     this.getListInit();
        // },
        onResponse(val) {
            this.currentItem = Object.assign({}, val);
            this.resMessageVisible = true;
        },
        searchDebounce: debounce(function() {
            this.getListInit();
        }, 1000),
 
    }
};
</script>

<style lang="less" scoped>
@import '@/assets/css/component.less';
.messageBord {
    .searchBox {
        align-items: center;

        font-size: 12px;

        .el-row {
            width: 100%;
            .searchInput {
                display: flex;
                align-items: center;
                .el-input {
                    width: 160px;
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
