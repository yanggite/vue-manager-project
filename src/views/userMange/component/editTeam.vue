<template>
    <div class="editTeam dialogSingle">
        <el-dialog title="编辑" :visible.sync="CVisible">
            <el-form :model="form" :rules="rules" ref="form" :label-position="labelPosition" label-width="110px">
                <el-form-item label="UID" :label-width="formLabelWidth" class="displayItem">
                    <span>{{ currentItem.uid }}</span>
                </el-form-item>
                <el-form-item label="用户名" :label-width="formLabelWidth" class="displayItem">
                    <span>{{ currentItem.account }}</span>
                </el-form-item>

                <el-form-item label="归集地址" prop="collectionAddress">
                    <el-select v-model="form.collectionAddress" placeholder="请选择" class="editSelect">
                        <el-option v-for="item in guijiOption" :key="item.id" :label="item.address" :value="item.address"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="打款地址" prop="toAddress">
                    <el-select v-model="form.toAddress" placeholder="请选择" class="editSelect">
                        <el-option v-for="item in dakuanOption" :key="item.id" :label="item.address" :value="item.address"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="onCancle" size="small">取 消</el-button>
                <el-button type="primary" @click="onSumbit" size="small">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import JSEncrypt from '@/utils/jsencrypt.js';

let validPhone = (rule, value, callback) => {
    if (!value) {
        callback(new Error('请输入电话号码'));
    } else if (!phoneReg.test(value)) {
        callback(new Error('请输入正确的11位手机号码'));
    } else {
        callback();
    }
};

export default {
    props: {
        editTeamVisible: {
            type: Boolean,
            default: false
        },
        currentItem: {
            type: Object,
            default: () => {}
        }
    },
    computed: {
        CVisible: {
            get() {
                return this.editTeamVisible;
            },
            set(val) {
                this.$emit('update:editTeamVisible', val);
            }
        }
    },
    data() {
        return {
            form: {
                id: '',
                collectionAddress: '',
                toAddress: ''
            },
            guijiOption: [],
            dakuanOption: [],
            rules: {
                collectionAddress: [{ required: true, message: '请选择', trigger: 'change' }],
                toAddress: [{ required: true, message: '请选择', trigger: 'change' }]
            },
            formLabelWidth: '120',
            labelPosition: 'right'
        };
    },
    created() {
        this.form.id = this.currentItem.id;
        this.form.collectionAddress = this.currentItem.collectionAddress;
        this.form.toAddress = this.currentItem.toAddress;
        this.selectAddress();
    },
    methods: {
        async selectAddress() {
            const res = await this.$api.selectAddress();
            if (res.code === '200') {
                this.guijiOption = res.data;
                this.dakuanOption = res.data;
            } else {
                this.$message.error(res.msg);
            }
        },
        onCancle() {
            this.CVisible = false;
        },
        onSumbit() {
            this.$refs.form.validate(async valid => {
                if (valid) {
                    console.log(this.form);
                    const res = await this.$api.editUserTeam(this.form);
                    if (res.code === '200') {
                        this.$message.success('编辑成功');
                        this.$emit('refreshList');
                    } else {
                        this.$message.error(res.msg);
                    }
                    // this.$emit('refreshList');
                    this.CVisible = false;
                }
            });
        }
    }
};
</script>

<style lang="less" scoped>
div.editTeam {
    .displayItem {
        display: flex;
        justify-content: center;
    }
}
</style>
