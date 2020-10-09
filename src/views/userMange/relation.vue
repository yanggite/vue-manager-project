<template>
    <div class="relation">
        <div class="main">
            <div class="title">
                <el-row>
                    <el-col :span="3">
                        <div class="name">数据列表</div>
                    </el-col>
                </el-row>
            </div>
            <el-card>
                <el-table :data="firstLeveData" style="width: 100%" ref="table">
                    <el-table-tree-column
                        fixed
                        :expand-all="!1"
                        :remote="remote"
                        file-icon="icon icon-file"
                        folder-icon="icon icon-folder"
                        label="账户"
                        prop="account"
                        width="320"
                        treeKey="id"
                        parentKey="pid"
                        header-align="center"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <el-tag type="info">账户 &nbsp;{{ scope.row.account }}</el-tag>
                        </template>
                    </el-table-tree-column>
                    <el-table-column label="直推人数" header-align="center" align="center">
                        <template slot-scope="scope">
                            <el-tag type="primary">直推人数 &nbsp;{{ scope.row.ztTotalNum }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="团队人数" header-align="center" align="center">
                        <template slot-scope="scope">
                            <el-tag type="warning">团队人数 &nbsp;{{ scope.row.totalTeam }}</el-tag>
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
        </div>
    </div>
</template>
<script>
export default {
    name: 'relation',

    data() {
        return {
            tableTreeData: [], //所有数据
            firstLeveData: [] //一级数据
        };
    },
    created() {
        this.getParentIdData();
    },
    methods: {
        remote(row, callback) {
            let childNodes = this.tableTreeData.filter(f => f['pid'] == row['id']);

            childNodes.forEach(node => {
                node.depth = row.depth + 1;
            });
            callback(childNodes);
        },

        getParentIdData(parentId) {
            this.$api.getTeamUserInfo({}).then(res => {
                if (res.code == 200) {
                    this.tableTreeData = res.data;
                    console.log(this.tableTreeData);

                    this.firstLeveData = this.tableTreeData.filter(f => f['pid'] == '0');

                    this.firstLeveData.forEach(function(ele) {
                        ele.depth = 0;
                    });
                    this.tableTreeData.forEach(item => {
                        item.child_num = item.ztTotalNum;
                    });
                } else {
                    this.$message.error('获取数据错误');
                }
            });
        }
    }
};
</script>

<style lang="less" scoped>
@import '@/assets/css/component.less';
      .icon-file {
            margin-left: 80px
        }
 
    

</style>
