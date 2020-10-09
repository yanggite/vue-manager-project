<template>
    <div class="assignPorToRole dialogTree">
        <el-dialog title="分配按钮权限" :visible.sync="CVisible" class="dialogueV" close="closeDialog">
            <span>分配按钮权限</span>
            <el-tree
                :data="treeData"
                show-checkbox
                node-key="bid"
                :default-checked-keys="checkedLeaf"
                :props="treeProps"
                default-expand-all
                ref="treeRef"
                value="id"
                @check-change="getCheckedKeys"
            ></el-tree>

            <div slot="footer" class="dialog-footer">
                <el-button @click="onCancle" size="small">取 消</el-button>
                <el-button type="primary" @click="onSumbit" size="small">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: {
        assignBtnVisible: {
            type: Boolean,
            default: false
        },
        currentUser: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            treeProps: {
                children: 'buttons',
                label: 'description'
            },
            treeData: [],
            checkedLeaf: [],
            updateLeafIds: [],
            roleId: ''
        };
    },
    computed: {
        CVisible: {
            get() {
                return this.assignBtnVisible;
            },
            set(val) {
                this.$emit('update:assignBtnVisible', val);
            }
        }
    },
    created() {
        this.getTreeInit();
    },

    methods: {
        async getTreeInit() {
            this.roleId = this.currentUser.id;
            const res = await this.$api.getBtnRole(this.currentUser.id);
            if (res.code === '200') {
                this.treeData = res.data;
                this.checkedLeaf = this.getCheckedLeaf(res.data);
                console.log(this.checkedLeaf);
            } else {
                this.$message.error(res.msg);
            }
        },
        onCancle() {
            this.$emit('update:assignBtnVisible', false);
        },
        onSumbit() {
            this.$emit('update:assignBtnVisible', false);

            this.updateLeafIds = this.$refs.treeRef.getCheckedKeys();
            // console.log( this.updateLeafIds)
            this.updatePower(this.updateLeafIds);
        },
        //递归获取所有选中的值
        getCheckedLeaf(list) {
            // console.log(list);

            let newArr = [];
            let ids = [];
            // let newObj={};
            for (let i = 0; i < list.length; i++) {
                let newObj = {};
                newObj.buttons = list[i].buttons;
                newArr.push(newObj);
            }
            // console.log(newArr);

            for (let j = 0; j < newArr.length; j++) {
                for (let k = 0; k < newArr[j].buttons.length; k++) {
                    // console.log("id="+newArr[j].buttons[k].id,newArr[j].buttons[k].isLay )
                    if (newArr[j].buttons[k].isLay == 1) {
                        // ids.push(newArr[j].buttons[k].id);
                          ids.push(newArr[j].buttons[k].bid);
                    }
                }
            }
            return ids;
        },
        async updatePower(updateLeafIds) {
            const res = await this.$api.updateBtn({ roleId: this.roleId, ids: updateLeafIds });
            // console.log(res);
            if (res.code === '200') {
                this.$message.success('分配权限成功');
            } else {
                this.$message.error('分配权限失败');
            }
        },
        closeDialog() {
            this.updateLeafIds = [];
        },
        getCheckedKeys() {
            // console.log('getCheckedKeys', this.$refs.treeRef.getCheckedKeys());
            // console.log('getHalfCheckedKeys', this.$refs.treeRef.getHalfCheckedKeys());
            // console.log("id",this.$refs.treeRef)
        },
        //设置node-key 渲染时加父级pid，向后端传递时去掉
        //设置treeData，每一级buton下面的id对应的设置为pid
    }
};
</script>

<style lang="less" scoped>
.assignPorToRole {
    width: 200px !important;
}
</style>
