<template>
    <div class="appVersion">
        <div class="main">
            <div class="title">
                <el-row>
                    <el-col :span="3">
                        <div class="name">数据列表</div>
                    </el-col>
                    <el-col :span="2">
                        <el-button
                            type="primary"
                            size="mini"
                          
                            @click="handleAddAndroid"
                            v-if="btnList.addAndorid"
                        >新增安卓版本</el-button>
                    </el-col>
                    <el-col :span="2">
                        <el-button
                            type="primary"
                            size="mini"
                        
                            @click="handleAddIos"
                            v-if="btnList.addIos"
                        >新增IOS版本</el-button>
                    </el-col>
                    <el-col :span="4" class="handleBtn">
                        <span class="handleText">类型：</span>
                        <el-select
                            v-model="verValue"
                            placeholder="请选择"
                            size="small"
                            @change="handleSelect"
                        >
                            <el-option label="安卓" value="1"></el-option>
                            <el-option label="ios" value="2"></el-option>
                        </el-select>
                    </el-col>
                </el-row>
            </div>
            <el-card>
                <el-table :data="tableData" style="width: 100%" border>
                    <el-table-column prop="id" label="ID" align="center" header-align="center"></el-table-column>
                    <el-table-column label="更新类型" align="center" header-align="center">
                        <template slot-scope="scope">
                            <span>{{scope.row.type===1?"安卓":"ios"}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="versionNum"
                        label="版本号"
                        align="center"
                        header-align="center"
                    ></el-table-column>
                    <el-table-column label="是否强制更新" align="center" header-align="center">
                        <template slot-scope="scope">
                            <span>{{scope.row.isUpdate===1?"是":"否"}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="pageUrl"
                        label="下载页面地址"
                        align="center"
                        header-align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="downloadUrl"
                        label="安装包地址"
                        align="center"
                        header-align="center"
                    ></el-table-column>
                    <el-table-column prop="extra" label="配置文件" align="center" header-align="center"></el-table-column>
                    <el-table-column label="创建时间" align="center" header-align="center">
                        <template slot-scope="scope">{{scope.row.createTime| dateYMDHMSFormat}}</template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" header-align="center" width="220">
                        <template slot-scope="scope">
                            <el-link                           
                                type="primary"                           
                                @click="onEdit(scope.row)"     
                                 v-if="btnList.edit"                          
                            >编辑</el-link>
                            <el-link                           
                                type="danger"                            
                                @click="onDelect(scope.row)"
                                  v-if="btnList.del"
                            >删除</el-link>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    @size-change="sizeChange($event,getAppVersionList)"
                    @current-change="pageChange($event,getAppVersionList)"
                    :current-page="pageNo"
                    :page-sizes="pageSizeS"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
                    background
                ></el-pagination>
            </el-card>
        </div>
        <AddAppVersion
            :addAppVerVisible.sync="addAppVerVisible"
            v-if="addAppVerVisible"
            :title="title"
            @refreshList="refreshList"
        />
         <EditAppversion
            :editAppVerVisible.sync="editAppVerVisible"
            v-if="editAppVerVisible"
            :currentItem="currentItem"
            @refreshList="refreshList"
        />
    </div>
</template>

<script>
import { mixins } from '../../utils/mixins';
import AddAppVersion from './component/addAppVersion';
import EditAppversion from "./component/editAppversion"
export default {
    name: 'appVersion',
    mixins: [mixins],
    components: { AddAppVersion,EditAppversion },
    data() {
        return {
            tableData: [],
            verValue: '1',
            title: '',
            addAppVerVisible: false,
            editAppVerVisible:false,
            currentItem:{},
        };
    },
    created() {
        this.getAppVersionList();
    },

    methods: {
        async getAppVersionList() {
            const res = await this.$api.getAppVersionList({ pageNo: this.pageNo, pageSize: this.pageSize, type: this.verValue });
            this.tableData = res.data.list;
            this.total = res.data.page.totalNum;
        },
        handleSelect() {
            this.getAppVersionList();
        },
        handleAddAndroid(val) {
            console.log(val);
            this.addAppVerVisible = true;
            this.title = '新增安卓版本';
        },
        handleAddIos(val) {
            this.addAppVerVisible = true;
            this.title = '新增ios版本';
        },
        refreshList() {
            this.getAppVersionList();
        },
        onEdit(val){
              this.currentItem=val;
              this.editAppVerVisible=true;
        },
         async onDelect(item) {
            const result = await this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch((err) => err);
            if (result === 'confirm') {
                //    console.log(item)
                const data= await this.$api.delAppVersionInfo({id:item.id});
                this.$message.success('删除成功');
                this.getAppVersionList()
            } else {
                this.$message.info('你已取消删除操作');
            }
        },
    }
};
</script>

<style lang="less" scoped>
@import '@/assets/css/component.less';
.appVersion {
}
</style>