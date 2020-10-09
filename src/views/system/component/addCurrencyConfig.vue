<template>
    <div class="addCurrencyConfig dialogSingle">
        <el-dialog title="添加币种  " :visible.sync="CVisible" width="500px">
            <el-form :model="form" :rules="rules" ref="form" :label-position="labelPosition" label-width="120px">
                <el-form-item label="币种名称" prop="coinName">
                    <el-input v-model="form.coinName" autocomplete="off" class="inputPure" placeholder="请输入币种名称（代号）"></el-input>
                </el-form-item>
                <el-form-item label="区块链类型" prop="blockType">
                    <el-select v-model="form.blockType" placeholder="请选择" class="editSelect">
                        <el-option v-for="item in blockOptions" :key="item.id" :label="item.blockName" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="usdt交易对价格" prop="usdtUnit">
                    <el-input
                        v-model="form.usdtUnit"
                        autocomplete="off"
                        class="inputPure"
                        placeholder="请输入币种交易对价格（AAA/USDT）"
                    ></el-input>
                </el-form-item>
                <el-form-item label="前端是否展示" prop="isShow">
                    <el-select v-model="form.isShow" placeholder="请选择" class="editSelect">
                        <el-option label="是" :value="1"></el-option>
                        <el-option label="否" :value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否允许充币" prop="isReachge">
                    <el-select v-model="form.isReachge" placeholder="请选择" class="editSelect">
                        <el-option label="是" :value="1"></el-option>
                        <el-option label="否" :value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否允许提币" prop="isApply">
                    <el-select v-model="form.isApply" placeholder="请选择" @change="handleSelect" class="editSelect">
                        <el-option label="是" :value="1"></el-option>
                        <el-option label="否" :value="0"></el-option>
                    </el-select>
                </el-form-item>
                <div v-if="this.form.isApply == '1'">
                    <el-form-item label="起提数量" prop="lowWidthdrawNum">
                        <el-input
                            v-model="form.lowWidthdrawNum"
                            autocomplete="off"
                            class="inputPure"
                            placeholder="请输入允许提现最小值"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="提币倍数" prop="widthdrawBs">
                        <el-input
                            v-model="form.widthdrawBs"
                            autocomplete="off"
                            class="inputPure"
                            placeholder="请输入提币数量倍数（允许小数倍）"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="提币手续费比例" prop="widthdrawFree">
                        <el-input
                            v-model="form.widthdrawFree"
                            autocomplete="off"
                            class="inputPure"
                            placeholder="请输入手续费比例（提现扣除）"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="提币手续费最小值" prop="lowFree">
                        <el-input v-model="form.lowFree" autocomplete="off" class="inputPure" placeholder="请输入手续费最小值"></el-input>
                    </el-form-item>
                    <el-form-item label="提币手续费最大值" prop="upFree">
                        <el-input v-model="form.upFree" autocomplete="off" class="inputPure" placeholder="请输入手续费最大值"></el-input>
                    </el-form-item>
                </div>
                <el-form-item label="是否允许内部转账" prop="isInternalTransfer">
                    <el-select v-model="form.isInternalTransfer" placeholder="请选择" @change="handleSelectTrans" class="editSelect">
                        <el-option label="是" :value="1"></el-option>
                        <el-option label="否" :value="0"></el-option>
                    </el-select>
                </el-form-item>
                <div v-if="this.form.isInternalTransfer == '1'">
                    <el-form-item label="起转数量" prop="lowTransferNum">
                        <el-input
                            v-model="form.lowTransferNum"
                            autocomplete="off"
                            class="inputPure"
                            placeholder="请输入允许转账最小值"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="转账倍数" prop="transferBs">
                        <el-input
                            v-model="form.transferBs"
                            autocomplete="off"
                            class="inputPure"
                            placeholder="请输入转账数量倍数（允许小数倍）"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="转账手续费" prop="transFree">
                        <el-input
                            v-model="form.transFree"
                            autocomplete="off"
                            class="inputPure"
                            placeholder=" 请输入转账手续费比例（额外扣除）"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="转账手续费最小值" prop="transLowFree">
                        <el-input
                            v-model="form.transLowFree"
                            autocomplete="off"
                            class="inputPure"
                            placeholder=" 转账手续费最小值"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="转账手续费最大值" prop="transUpFree">
                        <el-input
                            v-model="form.transUpFree"
                            autocomplete="off"
                            class="inputPure"
                            placeholder=" 转账手续费最大值"
                        ></el-input>
                    </el-form-item>
                </div>
                <el-form-item label="logo图片上传" prop="imgUrls">
                    <div>
                        <el-upload
                            :limit="1"
                            :action="logoUrl"
                            :headers="headersObj"
                            :on-success="handleFacesuccess"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :on-exceed="handleExceed"
                            :on-remove="handleRemove"
                        >
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="logoUrl" alt="" />
                        </el-dialog>
                    </div>
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
import { HOST } from '@/config/host.js';
export default {
    props: {
        addCurrencyConfigVisible: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        CVisible: {
            get() {
                return this.addCurrencyConfigVisible;
            },
            set(val) {
                this.$emit('update:addCurrencyConfigVisible', val);
            }
        },
        type: function() {
            if (this.title == '新增安卓版本') {
                return '1';
            } else if (this.title == '新增ios版本') {
                return '2';
            }
        }
    },
    data() {
        return {
            form: {
                logoUrl: ''
            },
            id: '', //
            formLabelWidth: '120',
            labelPosition: 'right',
            rules: {
                coinName: [{ required: true, message: '请输入币种名称', trigger: 'blur' }],
                blockType: [{ required: true, message: '请选择', trigger: 'change' }],
                usdtUnit: [{ required: true, message: 'usdt交易对价格', trigger: 'blur' }],
                isReachge: [{ required: true, message: '请选择', trigger: 'change' }],
                isApply: [{ required: true, message: '请选择', trigger: 'change' }],
                isShow: [{ required: true, message: '请选择', trigger: 'change' }],
                // lowWidthdrawNum: [{ required: true, message: 'usdt交易对价格', trigger: 'blur' }],
                // widthdrawBs: [{ required: true, message: 'usdt交易对价格', trigger: 'blur' }],
                // widthdrawFree: [{ required: true, message: 'usdt交易对价格', trigger: 'blur' }],
                // lowFree: [{ required: true, message: 'usdt交易对价格', trigger: 'blur' }],
                // upFree: [{ required: true, message: 'usdt交易对价格', trigger: 'blur' }],
                isInternalTransfer: [{ required: true, message: '请选择', trigger: 'change' }],
                // lowTransferNum: [{ required: true, message: '起转数量', trigger: 'blur' }],
                // transferBs: [{ required: true, message: '转账倍数', trigger: 'blur' }],
                // transFree: [{ required: true, message: '转账手续费', trigger: 'blur' }],
                // transLowFree: [{ required: true, message: '转账手续费最小值', trigger: 'blur' }],
                // transUpFree: [{ required: true, message: '转账手续费最大值', trigger: 'blur' }]
                //   imgUrls: [{ required: true, message: 'logo', trigger: 'blur' }],
            },
            isUpdate: '',
            logoUrl: `${HOST}/uploadOSS/headImgUpload`,
            headersObj: {
                token: localStorage.getItem('token')
            },
            dialogVisible: false,
            blockOptions: []
        };
    },
    created() {
        this.getBlockConfig();
    },
    methods: {
        async getBlockConfig() {
            const res = await this.$api.getBlockConfig();
            if (res.code === '200') {
                this.blockOptions = res.data.list;
            } else {
                this.$message.error('获取区块链类型失败');
            }
        },
        onCancle() {
            this.$emit('update:addCurrencyConfigVisible', false);
        },
        onSumbit() {
            this.$refs.form.validate(async valid => {
                if (valid) {
                    // this.$emit('update:addCurrencyConfigVisible', false);
                    const res = await this.$api.addCoinConfig(this.form);
                    console.log(res);
                    if (res.code === '200') {
                        this.$message.success('新增成功');
                        this.$emit('refreshList');
                    } else {
                        this.$message.error(res.msg);
                    }
                    this.CVisible = false;
                }
            });
        },
        handleSelect() {
            console.log(this.form.isApply);
        },
        handleSelectTrans() {
            console.log(this.form.isInternalTransfer);
        },
        handleFacesuccess(response) {
            if (response.code == '200') {
                this.$message.success('上传成功');
            }
            console.log(response);
            this.form.logoUrl = response.data[0];
            console.log(this.form.logoUrl);
        },
        handlePictureCardPreview(file) {
            this.logoUrl = file.url;
            this.dialogVisible = true;
        },
        handleExceed(files, fileList) {
            // this.$message.warning(
            //     `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`
            // );
            this.$message.warning(`请最多上传 1 个图片。`);
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        }
    }
};
</script>

<style lang="less" scoped>
div.addCurrencyConfig {
    // /deep/ .el-upload-list--picture-card .el-upload-list__item-actions .el-upload-list__item-delete {
    //     display: none;
    //     // opacity: 0;
    // }
}
</style>
