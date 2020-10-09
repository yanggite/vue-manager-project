<template>
    <div>
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
    </div>
</template>

<script>
export default {};
</script>

<style></style>
