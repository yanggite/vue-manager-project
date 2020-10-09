<template>
    <div class="homeIndex">
        <el-row :gutter="20">
            <el-row>
                <el-col :span="3" class="numberCol" :offset="1">
                    <div class="title">用户数据统计</div>
                </el-col>
            </el-row>
            <el-row :gutter="5" class="mgb20">
                <el-col :span="3" class="numberCol">
                    <el-card shadow="hover">
                        <div class="grid-content">
                            <div class="grid-cont-right">
                                <div class="grid-num">{{dataCollection.num1}}</div>
                                <div>会员总数</div>
                            </div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="3" class="numberCol">
                    <el-card shadow="hover">
                        <div class="grid-content">
                            <div class="grid-cont-right">
                                <div class="grid-num">{{dataCollection.num2}}</div>
                                <div>普通会员总数</div>
                            </div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="3" class="numberCol">
                    <el-card shadow="hover">
                        <div class="grid-content">
                            <div class="grid-cont-right">
                                <div class="grid-num">{{dataCollection.num3}}</div>
                                <div>激活会员总数</div>
                            </div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="3" class="numberCol">
                    <el-card shadow="hover">
                        <div class="grid-content">
                            <div class="grid-cont-right">
                                <div class="grid-num">{{dataCollection.num4}}</div>
                                <div>vip会员总数</div>
                            </div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="3" class="numberCol">
                    <el-card shadow="hover">
                        <div class="grid-content">
                            <div class="grid-cont-right">
                                <div class="grid-num">{{dataCollection.num5}}</div>
                                <div>今日新增会员数</div>
                            </div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="3" class="numberCol">
                    <el-card shadow="hover">
                        <div class="grid-content">
                            <div class="grid-cont-right">
                                <div class="grid-num">{{dataCollection.num6}}</div>
                                <div>今日激活会员数</div>
                            </div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="3" class="numberCol">
                    <el-card shadow="hover">
                        <div class="grid-content">
                            <div class="grid-cont-right">
                                <div class="grid-num">{{dataCollection.num7}}</div>
                                <div>今日充币数量</div>
                            </div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="3" class="numberCol">
                    <el-card shadow="hover">
                        <div class="grid-content">
                            <div class="grid-cont-right">
                                <div class="grid-num">{{dataCollection.num8}}</div>
                                <div>今日提币数量</div>
                            </div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="3" class="numberCol">
                    <el-card shadow="hover">
                        <div class="grid-content">
                            <div class="grid-cont-right">
                                <div class="grid-num">{{dataCollection.num9}}</div>
                                <div>累计充币数量</div>
                            </div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="3" class="numberCol">
                    <el-card shadow="hover">
                        <div class="grid-content">
                            <div class="grid-cont-right">
                                <div class="grid-num">{{dataCollection.num10}}</div>
                                <div>累计提币数量</div>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </el-row>
        <el-row :gutter="20">
            <el-row>
                <el-col :offset="1">
                    <div class="title">业务数据统计</div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24" class="numberCol">
                    <schart ref="bar" class="schart" canvasId="bar" :options="barOptions"></schart>
                </el-col>
            </el-row>
        </el-row>
        <el-row :gutter="20">
            <el-row>
                <el-col :span="24" class="numberCol">
                    <schart ref="bar1" class="schart1" canvasId="bar1" :options="barOptions1"></schart>
                </el-col>
            </el-row>
        </el-row>
    </div>
</template>

<script>
import Schart from 'vue-schart';
import bus from '@/utils/bus';
export default {
    name: 'home',
    data() {
        return {
            name: localStorage.getItem('ms_username'),
            dataCollection: {
                num1: 1234,
                num2: 1234,
                num3: 1234,
                num4: 1234,
                num5: 1234,
                num6: 1234,
                num7: 1234,
                num8: 1234,
                num9: 1234,
                num10: 1234
            },
            barOptions: {
                type: 'bar',
                title: {
                    text: '会员统计',
                    position: 'top',
                    number: 20
                },
                bgColor: '#fbfbfb',
                labels: ['2020 2-22', '2020 2-22', '2020 2-22', '2020 2-22', '2020 2-22'],
                datasets: [
                    {
                        label: '新增会员数量',
                        fillColor: '#409eff',
                        data: [234, 278, 270, 190, 230]
                    },
                    {
                        label: '新增激活会员数量',
                        fillColor: '#67c23a',
                        data: [164, 178, 190, 135, 160]
                    }
                ]
            },
            barOptions1: {
                type: 'bar',
                title: {
                    text: '充提统计',
                    number: 20
                },
                bgColor: '#fbfbfb',
                labels: ['2020 2-22', '2020 2-22', '2020 2-22', '2020 2-22', '2020 2-22'],
                datasets: [
                    {
                        label: '充币',
                        fillColor: '#409eff',
                        data: [234, 278, 270, 190, 230]
                    },
                    {
                        label: '提币',
                        fillColor: '#67c23a',
                        data: [164, 178, 190, 135, 160]
                    }
                ]
            }
        };
    },
    components: {
        Schart
    },
    computed: {
        role() {
            return this.name === 'admin' ? '超级管理员' : '普通用户';
        }
    },
    mounted() {
        // new Schart('canvas1', this.lineOptions);
    },
    methods: {}
};
</script>


<style lang="less" scoped>
div.homeIndex {
    padding: 0 15px;
}
.grid-content {
    box-sizing: border-box;
    height: 50px;
    width: 100%;
    text-align: center;
}
/deep/.el-card__body {
    padding: 10px;
}
.grid-cont-right {
    font-size: 14px;
    color: #999;
}
.grid-num {
    font-size: 30px;
    font-weight: bold;
    color: rgb(45, 140, 240);
}
.title {
    margin: 10px 0;
    font-size: 14px;
}

.schart {
    width: 100%;
    height: 400px;
}
.schart1 {
    width: 100%;
    height: 400px;
}
</style>
