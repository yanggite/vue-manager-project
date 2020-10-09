export const mixins = {
  data() {
    return {
      total: 0,
      pageNo: 1,
      pageSize: 10,
      pageSizeS: [10, 20, 50, 100],
      btnList: {
        add: false,
        edit: false,
        del: false,
        response: false,
        //充提管理模块
        coinDetail: false,
        handleDebt: false,
        abolish: false,//取消
        pay: false,
        batchAbolish: false,
        bathchPay: false,
        detail: false, //未写
        //app版本管理
        addAndorid: false,
        addIos: false,
        assestDetail:false,
        view:false,
        editState:false,
        deliveryState:false,
        exported:false,
      }
    }
  },
  created() {
    this.getBtnPower(this.$route.path);
    // this.resetFalse()
  },
  mounted() { },
  methods: {
    pageChange(e, fun) {
      this.pageNo = e
      fun()
    },
    sizeChange(e, fun) {
      this.pageSize = e
      fun()
    },
    refreshList() {
      this.getListInit()
    },
    async getBtnPower(val) {
      const res = await this.$api.getBtnPower({ url: val })
      if (res.code === '200') {
        this.handleBtnList(res.data)
      } else if (res.code === '500') {
        this.$message.error('获取按钮权限错误')
      }
    },
    handleBtnList(val) {
      if (val) {
        let btnArr = []
        val.filter(item => {
          btnArr.push(item.btnName)
        })
        console.log(btnArr)
        btnArr.find(item => {
          if (item == '新增') {
            this.btnList.add = true
          } else if (item == '编辑') {
            this.btnList.edit = true
          } else if (item == '删除') {
            this.btnList.del = true
          } else if (item == "回复") {
            this.btnList.response = true
          }
          //充提
          else if (item == "充币详情") {
            this.btnList.coinDetail = true
          }
          else if (item == "手动上账") {
            this.btnList.handleDebt = true
          }
          else if (item == "批量打款") {
            this.btnList.bathchPay = true
          }
          else if (item == "批量取消") {
            this.btnList.batchAbolish = true
          } else if (item == "打款") {
            this.btnList.pay = true
          } else if (item == "取消") {
            this.btnList.abolish = true
          } else if (item == "详情") {
            this.btnList.detail = true
          } else if (item == "新增安卓版本") {
            this.btnList.addAndorid = true
          } else if (item == "新增IOS版本") {
            this.btnList.addIos = true
          } else if (item == "修改") {
            this.btnList.edit = true
          }else if (item == "资产详情") {
            this.btnList.assestDetail = true
          }
          else if (item == "查看订单") {
            this.btnList.view = true
          }
          else if (item == "修改状态") {
            this.btnList.editState = true
          }
          else if (item == "发货状态") {
            this.btnList.deliveryState = true
          }
          else if (item == "导出") {
            this.btnList.exported = true
          }
          else if (item == "添加商品") {
            this.btnList.add = true
          }
        })
      }
    },
    // resetFalse(){
    //   for(let index in this.btnList){
    //     // console.log(index)
    //     console.log(this.btnList[index])
     
    //   }

    // }
  },
}

