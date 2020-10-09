<template>
    <div class="addShop">
        添加商品
        <el-card>
            <el-form :model="form" :rules="rules" ref="form" :label-position="labelPosition" label-width="110px">
                <el-form-item label="语言种类" prop="language">
                    <el-select v-model="form.language" placeholder="请选择" class="editSelect" @change="languageChange">
                        <el-option v-for="item in languageOption" :key="item.id" :label="item.title" :value="item.flag"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商品名称" prop="shopName">
                    <el-input v-model="form.shopName" autocomplete="off" class="inputPure"></el-input>
                </el-form-item>
                <el-form-item label="副标题" prop="shopTitle">
                    <el-input v-model="form.shopTitle" autocomplete="off" class="inputPure"></el-input>
                </el-form-item>
                <el-form-item label="商品分类" prop="shopTypeId">
                    <el-select v-model="form.shopTypeId" placeholder="请选择" class="editSelect">
                        <el-option v-for="item in shopTypeOption" :key="item.id" :label="item.typeName" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商品介绍" prop="content">
                    <el-input
                        v-model="form.content"
                        type="textarea"
                        :rows="8"
                        autocomplete="off"
                        class="inputPure"
                        maxlength="500"
                    ></el-input>
                </el-form-item>
                <el-form-item label="计价单位" prop="coinId">
                    <el-select v-model="form.coinId" placeholder="请选择" class="editSelectid">
                        <el-option v-for="item in coinOption" :key="item.id" :label="item.coinName" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="购买金额" prop="coinNum">
                    <el-input v-model="form.coinNum" autocomplete="off" class="inputPure"></el-input>
                </el-form-item>
                <el-form-item label="市场价" prop="marketValue">
                    <el-input v-model="form.marketValue" autocomplete="off" class="inputPure"></el-input>
                    <p class="ptips">市场价以美金为单位展示</p>
                </el-form-item>
                <el-form-item label="商品库存" prop="shopNum">
                    <el-input v-model="form.shopNum" autocomplete="off" class="inputPure"></el-input>
                    <p class="ptips">编辑时为新增库存数量，默认为空不添加可售库存数</p>
                </el-form-item>
                <el-form-item label="成本价" prop="costValue">
                    <el-input v-model="form.costValue" autocomplete="off" class="inputPure"></el-input>
                    <p class="ptips">采购成本，单位（$）</p>
                </el-form-item>
                <el-form-item label="收款账户" prop="collectionAccount">
                    <el-input v-model="form.collectionAccount" autocomplete="off" class="inputPure"></el-input>
                </el-form-item>
                <el-form-item label="预设商品" prop="isNotice">
                    <template slot-scope="scope">
                        <el-switch
                            v-model="form.isNotice"
                            :active-value="1"
                            :inactive-value="0"
                            @change="onSwitch($event, scope.row)"
                        ></el-switch>
                    </template>
                    <p class="ptips">如果设置为预告商品，商品无法进行购买。</p>
                </el-form-item>
                <el-form-item label="商品上架" prop="isUp">
                    <template slot-scope="scope">
                        <el-switch
                            v-model="form.isUp"
                            :active-value="1"
                            :inactive-value="0"
                            @change="onSwitchUP($event, scope.row)"
                        ></el-switch>
                    </template>
                </el-form-item>
                <el-form-item label="秒杀促销" prop="isSeckill">
                    <el-radio-group v-model="form.isSeckill" @change="saleChange">
                        <el-radio label="0">否</el-radio>
                        <el-radio label="1">是</el-radio>
                    </el-radio-group>
                </el-form-item>
                <div v-show="this.form.isSeckill === '1'">
                    <el-form-item label="" prop="seckillStartTime">
                        <div class="saleTime">
                            <el-date-picker
                                v-model="form.seckillStartTime"
                                type="date"
                                placeholder="开始时间"
                                clearable
                                value-format="yyyy-MM-dd"
                            ></el-date-picker>
                        </div>
                    </el-form-item>
                    <el-form-item label="" prop="seckillEndTime">
                        <div class="saleTime">
                            <el-date-picker
                                v-model="form.seckillEndTime"
                                type="date"
                                placeholder="结束时间"
                                clearable
                                value-format="yyyy-MM-dd"
                            ></el-date-picker>
                        </div>
                    </el-form-item>
                    <el-form-item label="商品限购" prop="limitNum">
                        <el-input v-model="form.limitNum" autocomplete="off" class="inputPure" placeholder="输入商品限购数量"></el-input>
                    </el-form-item>
                    <el-form-item label="秒杀价" prop="seckillNum">
                        <el-input v-model="form.seckillNum" autocomplete="off" class="inputPure" placeholder="输入秒杀价"></el-input>
                        <p class="ptips">此处需填写金额)未填写则按售价购买 ，价格均以上方计价单位为单位</p>
                    </el-form-item>
                </div>
                <el-form-item label="会员价格" prop="isLeaveValue">
                    <el-radio-group v-model="form.isLeaveValue">
                        <el-radio label="0">否</el-radio>
                        <el-radio label="1">是</el-radio>
                    </el-radio-group>
                </el-form-item>

                <div class="vipLevel" v-show="this.form.isLeaveValue === '1'">
                    <el-form-item prop="leaveValueList">
                        <table>
                            <tr>
                                <!-- <th class="">vip1</th>
                            <th class="">vip2</th>
                            <th class="">vip3</th> -->
                                <th v-for="item in leaveValueList" :key="item.id" :dataset="item.id">{{ item.leaveName }}</th>
                            </tr>
                            <tr>
                                <!-- <td><el-input v-model="form.vipOneValue" autocomplete="off"></el-input></td>
                            <td><el-input v-model="form.vipTwoValue" autocomplete="off"></el-input></td>
                            <td><el-input v-model="form.vipThreeValue" autocomplete="off"></el-input></td> -->
                                <td v-for="item in leaveValueList" :key="item.id" :dataset="item.id">
                                    <el-input v-model="item.value" autocomplete="off">{{ item }}</el-input>
                                </td>
                            </tr>
                        </table>
                    </el-form-item>
                </div>
                <el-form-item label="返利拨付币种" prop="rCoinId">
                    <el-select v-model="form.rCoinId" placeholder="请选择" class="editSelectid">
                        <el-option v-for="item in coinOption" :key="item.id" :label="item.coinName" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="返利拨付总额" prop="rCoinAmount">
                    <el-input
                        v-model="form.rCoinAmount"
                        autocomplete="off"
                        class="inputPure"
                        placeholder="拨付总额，0代表不拨付"
                    ></el-input>
                </el-form-item>
                <el-form-item label="返利拨付总额" prop="pi">
                    <el-input
                        v-model="form.pi"
                        type="number"
                        oninput="if(value<0)value=0;if(value>1)value=1;if(value.length>4)value=value.slice(0,6);"
                        autocomplete="off"
                        class="inputPure"
                        placeholder="输入日拨付比例（0-1）"
                    ></el-input>
                </el-form-item>
                <el-form-item label="商品图片" v-if="editStatus">
                    <div>
                        <el-image v-model="form.imgList" autocomplete="off" class="inputPure"></el-image>
                    </div>
                </el-form-item>
                <el-form-item label="上传图片" prop="imgList">
                    <div>
                        <el-upload
                            multiple
                            :limit="3"
                            :action="imgUrl"
                            :headers="headersObj"
                            :on-success="handleFacesuccess"
                            list-type="picture-card"
                            :on-exceed="handleExceed"
                        >
                            <i class="el-icon-plus"></i>
                        </el-upload>
                    </div>
                </el-form-item>

                <el-form-item> <el-button type="primary" @click="onSumbit">保存商品信息</el-button> </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import { HOST } from '@/config/host.js';
export default {
    data() {
        return {
            form: {
                language: '',
                shopName: '', //商品名
                shopTitle: '', //商品标题
                shopTypeId: '', //商品类型
                content: '', // 商品详情
                coinId: '', //  计价单位
                imgList: [], //   商品图片
                coinNum: '', // 购买金额
                marketValue: '', //  市场价
                shopNum: '', //  商品库存
                costValue: '', //  成本价
                collectionAccount: '', // 收款账户
                isNotice: '', //    预告商品    0.否，1.是
                isUp: '', // 商品上架     0.否，1.是
                isSeckill: '0', // 秒杀商品       0.否，1.是
                seckillStartTime: '', //秒杀开始时间
                seckillEndTime: '', // 秒杀结束时间
                limitNum: '', // 限购数量
                seckillNum: '', // 秒杀价
                isLeaveValue: '0', // 是否有会员价  0.否，1.是

                leaveValueList: [],
                rCoinId: '', //返利币种id
                rCoinAmount: '', //  返利总额
                pi: '' // 返利日比例
            },
            imgUrl: `${HOST}/uploadOSS/headImgUpload`,
            headersObj: {
                token: localStorage.getItem('token')
            },
            shopTypeOption: [],
            rules: {
                language: [{ required: true, message: '请选择语言', trigger: 'change' }],
                shopName: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
                isNotice: [{ required: true, message: '请选择预设商品', trigger: 'change' }],
                isUp: [{ required: true, message: '请选择上架', trigger: 'change' }],
                isSeckill: [{ required: true, message: '请选择', trigger: 'change' }],
                isLeaveValue: [{ required: true, message: '请选择', trigger: 'change' }],
                shopTypeId: [{ required: true, message: '请选择商品分类', trigger: 'change' }]
                // coinNum: [{ required: true, message: '请输入购买金额', trigger: 'blur' }],
                // shopNum: [{ required: true, message: '请输入商品库存', trigger: 'blur' }],
                // shopTitle: [{ required: true, message: '请输入商品标题', trigger: 'blur' }],
                // language: [{ required: true, message: '请选择', trigger: 'change' }],
                // shopTypeId: [{ required: true, message: '请选择', trigger: 'change' }],
                // content: [{ required: true, message: '请输入', trigger: 'blur' }],
                // coinId: [{ required: true, message: '请输入', trigger: 'blur' }],
                // coinNum: [{ required: true, message: '请输入', trigger: 'blur' }],
                // marketValue: [{ required: true, message: '请输入', trigger: 'blur' }],
                // shopNum: [{ required: true, message: '请输入', trigger: 'blur' }],
                // costValue: [{ required: true, message: '请输入', trigger: 'blur' }],
                // collectionAccount: [{ required: true, message: '请输入', trigger: 'blur' }],
                // isNotice: [{ required: true, message: '请输入', trigger: 'blur' }],
                // isUp: [{ required: true, message: '请输入', trigger: 'change' }],
                // isSeckill: [{ required: true, message: '请选择', trigger: 'change' }],
                // seckillStartTime: [{ required: true, message: '请选择', trigger: 'change' }],
                // seckillEndTime: [{ required: true, message: '请选择', trigger: 'change' }],
                // limitNum: [{ required: true, message: '请输入', trigger: 'blur' }],
                // isLeaveValue: [{ required: true, message: '请选择', trigger: 'change' }],
                // // leaveValueList: [{ required: true, message: '请输入', trigger: 'blur' }],
                // rCoinId: [{ required: true, message: '请选择', trigger: 'change' }],
                // rCoinAmount: [{ required: true, message: '请输入', trigger: 'blur' }],
                // pi: [{ required: true, message: '请输入', trigger: 'blur' }],
                // imgList: [{ required: true, message: '请上传图片' }]
            },
            formLabelWidth: '120',
            labelPosition: 'right',
            coinOption: [],
            languageOption: [],
            editId: '',
            editStatus: false,
            leaveValueList: []
        };
    },
    created() {
        this.getSelectLanguage();
        this.getSelectCoin();
        if (this.$route.query.id) {
            this.editId = this.$route.query.id;
            this.editStatus = true;
            console.log(this.editId);
            this.getShopBaseInfoById(this.editId);
        }
        this.getShopSelectLeave();
    },
    methods: {
        getShopSelectLeave() {
            this.$api
                .getShopSelectLeave()
                .then(res => {
                    if (res.code === '200') {
                        this.leaveValueList = res.data;
                        this.form.leaveValueList = res.data;

                        // this.form.leaveValueList.forEach(item=>{
                        //     for(let index in item){
                        //        if(index==='value'){

                        //             item[index]=0
                        //        }
                        //     }
                        // })
                    } else {
                        return this.$message.error('获取会员等级错误');
                    }
                })
                .catch(err => err);
        },

        async getShopBaseInfoById(id) {
            const {
                code,
                data: { imgList, shopBaseInfo, shopDetail }
            } = await this.$api.getShopBaseInfoById({ id });
            console.log(imgList);
            this.form = Object.assign({}, imgList, shopBaseInfo, shopDetail);
            console.log(this.form);
            // const { data } = await this.$api.getShopBaseInfoById({ id });
            // console.log(data);
        },
        async getSelectCoin() {
            const res = await this.$api.getSelectCoin();

            if (res.code === '200') {
                this.coinOption = res.data;
            } else {
                this.$message.error(res.msg);
            }
        },
        async getSelectLanguage() {
            const res = await this.$api.getSelectLanguage();
            if (res.code === '200') {
                this.languageOption = res.data;
            } else {
                this.$message.error(res.msg);
            }
        },
        async languageChange(value) {
            console.log(value);
            if (value) {
                const res = await this.$api.getSelectProductCategory({ language: value });
                if (res.code === '200') {
                    this.shopTypeOption = res.data;
                } else {
                    this.$message.error('此类语言暂无产品分类');
                }
            }
        },
        onSwitch() {},
        onSwitchUP() {},
        onSumbit() {
            this.$refs.form.validate(async valid => {
                if (valid) {
                    // console.log(this.form);
                    // console.log(this.form.leaveValueList);
                    // this.form.leaveValueList.forEach(item => {
                    //     console.log(item);
                    // });
                    const res = await this.$api.addCommodity(this.form);
                    if (res.code === '200') {
                        this.$message.success('添加成功');
                        this.$router.push('/admin/getShop');
                    } else {
                        this.$message.error(res.msg);
                    }
                }
            });
        },
        handleFacesuccess(response) {
            if (response.code == '200') {
                this.$message.success('上传成功');
            }
            console.log(response);
            this.form.imgList.push(response.data[0]);
            console.log(this.form.imgList);
        },
        // handlePictureCardPreview(file) {
        //     this.imgList = file.url;
        //     this.dialogVisible = true;
        // },
        handleExceed(files, fileList) {
            // this.$message.warning(
            //     `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`
            // );
            this.$message.warning(`请最多上传 3 个图片。`);
        },
        saleChange() {
            console.log(this.form.isSeckill);
        }
    }
};
</script>

<style lang="less" scoped>
div.addShop {
    /deep/div.el-card {
        padding-left: 10%;
    }
    .ptips {
        font-size: 12px;
        color: #999999;
    }
    .saleTime {
        // margin-left: 10px;
    }

    .vipLevel {
        margin-bottom: 30px;
        margin-left: 100px;
        table {
            border-collapse: collapse;
            border-spacing: 0;
            th {
                border: 1px solid #999999;
                background-color: #b4bbc5;
                line-height: 40px;
            }
            td {
                border: 1px solid #999999;
            }
            /deep/ .el-input__inner {
                border: none;
            }
            // tr{
            //     border: 1px solid;
            // }
        }
    }
    // /deep/.el-form-item__content {
    //     display: flex;
    // }
    .inputPure {
        width: 218px;
    }
}
</style>
