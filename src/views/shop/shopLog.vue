<template>
    <div class="shopLog">
       shopLog
    </div>
</template>
<script>
import { mixins } from '../../utils/mixins';
export default {
    name: 'shopLog',
    mixins: [mixins],
    data() {
        return {
            tableData: []
        };
    },
    created() {
        this.getListInit();
    },
    methods: {
        async getListInit() {
            // const res = await this.$api.getListInit({ pageNo: this.pageNo, pageSize: this.pageSize });
            // this.tableData = res.data.list;
            // this.total = res.data.page.totalNum;
        }
    }
};
</script>

<style lang="less" scoped>
@import '@/assets/css/component.less';
</style>
