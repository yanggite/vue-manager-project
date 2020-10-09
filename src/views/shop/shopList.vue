<template>
    <div class="shopList">
        <div class="searchBox">
            <el-card>
                <el-row>
                    <el-col :span="4">
                        <div class="searchInput">
                            订单编号：
                            <el-input
                                size="small"
                                placeholder="商品名称"
                                v-model="form.shopName"
                                @input="searchDebounce"
                                clearable
                            ></el-input>
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
                    <el-col :span="3" :offset="18">
                        <el-button size="small" type="primary" @click="addCommodity" v-if="btnList.add">添加商品</el-button>
                    </el-col>
                </el-row>
            </div>
            <el-card>
                <el-table :data="tableData" style="width: 100%" border>
                    <el-table-column type="index" width="50"></el-table-column>
                    <el-table-column prop="id" label="编号" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="shopImg" label="商品图片" align="center" header-align="center">
                        <template slot-scope="scope">
                            <el-image :src="scope.row.shopImg" alt=""></el-image>
                        </template>
                    </el-table-column>
                    <el-table-column prop="shopName" label="商品名称" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="coinNum" label="价格" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="" label="上架" align="center" header-align="center">
                        <template slot-scope="scope">
                            <el-switch
                                v-model="scope.row.isUp"
                                :active-value="1"
                                :inactive-value="0"
                                @change="onSwitch($event, scope.row)"
                              
                            ></el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column prop="sort" label="排序" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="shopNum" label="库存" align="center" header-align="center"></el-table-column>
                    <el-table-column prop="shopSalesNum" label="销量" align="center" header-align="center"></el-table-column>
                    <el-table-column label="操作" align="center" header-align="center" width="280">
                        <template slot-scope="scope">
                            <!-- <el-link type="info" @click="onView(scope.row)">查看</el-link> -->
                            <el-link type="primary" @click="onEdit(scope.row)" v-if="btnList.edit">编辑</el-link>
                            <!-- <el-link type="warning" @click="ToShopLog">日志</el-link> -->
                            <el-link type="warning" @click="onDelect(scope.row)" v-if="btnList.del">删除</el-link>
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

        <ShopView :shopViewVisible.sync="shopViewVisible" v-if="shopViewVisible" :currentItem="currentItem" @refreshList="refreshList" />
        <EditComponent :editVisible.sync="editVisible" v-if="editVisible" :currentItem="currentItem" @refreshList="refreshList" />
      
    </div>
</template>
<script>
import { mixins } from '../../utils/mixins';
import debounce from 'lodash/debounce';
import ShopView from './component/shopView';
import EditComponent from './component/editComponent';

export default {
    name: 'shopList',
    mixins: [mixins],
    components: { ShopView, EditComponent },
    data() {
        return {
            tableData: [],
            form: {},
            currentItem: {},
            shopViewVisible: false,
            editVisible: false,
            // addShopVisible:false
        };
    },
    created() {
        this.getListInit();
    },

    methods: {
        async getListInit() {
            const res = await this.$api.getShopBaseInfo({ pageNo: this.pageNo, pageSize: this.pageSize, ...this.form });
            // console.log(res);
            if (res.code === '200') {
                this.tableData = res.data.list;
                this.total = res.data.page.totalNum;
            } else {
                this.$message.error(res.msg);
            }
        },

        searchDebounce: debounce(function() {
            this.getListInit(1);
        }, 1000),
        refreshList() {
            this.getListInit();
        },
        onView(val) {
            // this.currentItem = Object.assign({}, val); //浅拷贝
            this.currentItem = JSON.parse(JSON.stringify(val)); //深拷贝
            this.shopViewVisible = true;
        },
        onEdit(val) {
            // this.currentItem = JSON.parse(JSON.stringify(val));
            // this.editVisible = true;
            this.$router.push({
                path:"/admin/editShop",
                query:{id:val.id}
            })
        },
        ToShopLog() {
            this.$router.push('/admin/getShopLog');
        },
        async onSwitch(val, { id }) {
            console.log(val)
            const res = await this.$api.editCommodityByIsUpdate({ id, isUp: val });
            if (res.code === '200') {
                this.$message.success('设置状态成功');
            } else if (res.code === '321') {
                this.$message.info(res.msg);
            } else {
                this.$message.error('设置状态失败');
            }
        },
        async onDelect(item) {
            const result = await this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(err => err);
            if (result === 'confirm') {
                //    console.log(item)
                const res = await this.$api.delShop({ id: item.id });
                console.log(res);
                if (res.code === '200') {
                    this.$message.success('删除成功');
                    this.getListInit();
                } else {
                    this.$message.error('删除失败');
                }
            } else {
                this.$message.info('你已取消删除操作');
            }
        },
        addCommodity(){
            // this.addShopVisible=true;
            this.$router.push("/admin/addShop")
        }
    }
};
</script>

<style lang="less" scoped>
@import '@/assets/css/component.less';
.shopList {
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
