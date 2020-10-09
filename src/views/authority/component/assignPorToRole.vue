<template>
    <div class="assignPorToRole dialogTree">
        <el-dialog title="分配权限" :visible.sync="CVisible" class="dialogueV" close="closeDialog">
            <span>分配权限</span>
            <el-tree
                :data="treeData"
                show-checkbox
                node-key="id"
                :default-checked-keys="checkedLeaf"
                :props="treeProps"
                default-expand-all
                ref="treeRef"
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
        assignPorVisible: {
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
                children: 'powers',
                label: 'title'
            },
            treeData: [],
            checkedLeaf: [],
            updateLeafIds: [],
            roleId:"",
        };
    },
    computed: {
        CVisible: {
            get() {
                return this.assignPorVisible;
            },
            set(val) {
                this.$emit('update:assignPorVisible', val);
            }
        }
    },
    created() {
        this.getTreeInit();
    },

    methods: {
        async getTreeInit() {
            this.roleId=this.currentUser.id
            const res = await this.$api.getPowerRole(this.currentUser.id);
            if (res.code === '200') {
                this.treeData = res.data;
                console.log(res.data);
                // this.getCheckedLeaf(res.data,this.checkedLeaf);
                this.checkedLeaf = this.getCheckedLeaf(res.data);
                console.log(this.checkedLeaf);
            } else {
                this.$message.error(res.msg);
            }
        },
        onCancle() {
            this.$emit('update:assignPorVisible', false);
        },
        onSumbit() {
            this.$emit('update:assignPorVisible', false);
            this.updateLeafIds = this.$refs.treeRef.getCheckedKeys();
            this.updatePower( this.updateLeafIds)
        },
        //递归获取所有选中的值
        getCheckedLeaf(list) {
            let arr = [];
            arr = list.filter(e => e.isLay).map(e => e.id);
            for (let v of list) {
                if (v.powers && v.powers.length) {
                    arr = [...arr, ...this.getCheckedLeaf(v.powers)];
                }
            }
            return arr;
        },
   
        async updatePower(updateLeafIds) {
               const res=await this.$api.updatePower({roleId:this.roleId,ids:updateLeafIds});
               console.log(res)
               if(res.code==="200"){
                   this.$message.success("分配权限成功")
               }else{
                   this.$message.error("分配权限失败")
               }
        },
        closeDialog() {
            this.updateLeafIds=[];
        }
    }
};
</script>

<style lang="less" scoped>
.assignPorToRole {
    width: 200px !important;
}
</style>
