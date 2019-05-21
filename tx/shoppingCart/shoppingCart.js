Page({

  /**
   * 页面的初始数据
   */
  data: {
    select_all: false,
    arr: [],
    totalMoney: 0,
    key: 0,
    choice: false,
    number: 1, //数量
    ticket: [
      { youhuiquanid: 1, youhuiquan: '80的' },
      { youhuiquanid: 2, youhuiquan: '180的' },
      { youhuiquanid: 3, youhuiquan: '820的' }
    ],
    goodList: [
      {
        goodname: "2123121",
        content: "5454",
        price: "1",
        num: "5",

      },
      {
        goodname: "2123121",
        content: "5454",
        price: "1",
        num: "5",

      },
      {
        goodname: "2123121",
        content: "5454",
        price: "1",
        num: "5",

      }

    ], //商品列表
  },
  // 全选
  select_all: function () {
    let that = this
    let arr = []; //存放选中id的数组
    let totalMoney = this.data.totalMoney
    let goodList = this.data.goodList
    totalMoney = 0
    for (let i = 0; i < that.data.goodList.length; i++) {
      that.data.goodList[i].checked = (!that.data.select_all)
      arr.push(that.data.goodList[i])
      if (that.data.goodList[i].checked == false) {
        arr = []

      } else {
        totalMoney = totalMoney + goodList[i].num * goodList[i].price
      }
    }
    // console.log(arr)
    that.setData({
      select_all: (!that.data.select_all),
      goodList: that.data.goodList,
      arr: arr,
      totalMoney: totalMoney
    })
  },

  // 删除
  deleteGood: function (e) {
    let goodList = this.data.goodList
    let arr = this.data.arr
    let newArr = []
    let totalMoney = this.data.totalMoney
    totalMoney = 0
    let money = 0;
    newArr = goodList.filter(function (v) {
      return arr.indexOf(v) == -1
    })
    // for (let i = 0; i < newArr.length; i++) {
    //   totalMoney = totalMoney + parseFloat(newArr[i].price) * newArr[i].number
    // }
    this.setData({
      goodList: newArr,
      totalMoney: money
    })
  },

  // 单个选中
  checkboxChange: function (e) {

    let that = this

    let index = e.detail.value
    let totalMoney = this.data.totalMoney
    let goodList = that.data.goodList
    totalMoney = 0
    let arr = []
    for (let i = 0; i < index.length; i++) {
      arr.push(goodList[index[i]])
    }
    for (let i = 0; i < arr.length; i++) {
      totalMoney = arr[i].num * arr[i].price + totalMoney
    }
    that.setData({
      arr: arr,
      totalMoney: totalMoney,
    })
  },
  // 减少数量
  minus: function (e) {
    const index = e.currentTarget.dataset.index;
    let totalMoney = this.data.totalMoney
    let arr = this.data.arr
    let number = e.currentTarget.dataset.num
    if (number <= 0) {
      number = 0
    } else {
      number--
    }
    let n = `goodList[${index}].num`
    this.setData({
      [n]: number,
    })
    totalMoney = 0
    for (let i = 0; i < arr.length; i++) {
      totalMoney = totalMoney + arr[i].num * arr[i].price
    }
    this.setData({
      totalMoney: totalMoney
    })
  },
  // 增加数量
  add: function (e) {
    const index = e.currentTarget.dataset.index;
    let number = e.currentTarget.dataset.num
    let totalMoney = this.data.totalMoney
    let arr = this.data.arr
    number++
    let n = `goodList[${index}].num`
    this.setData({
      [n]: number,
    })
    totalMoney = 0
    for (let i = 0; i < arr.length; i++) {
      totalMoney = totalMoney + arr[i].num * arr[i].price
    }
    this.setData({
      totalMoney: totalMoney
    })
  },
  // 选择优惠券
  bindPickerChange: function (e) {

    console.log('picker发送选择改变，携带值为', e.detail.value)
    console.log('下标是:', e)

      this.setData({
        key: e.detail.value
      })
    
   
    // const index = e.currentTarget.dataset.index
    // this.data.ticket[index] = e.detail.value
    // this.setData({
    //   // ticket: this.data.ticket
    //   key: e.detail.value
    // })
    //   wx.request({
    //     url: 'http://www.aoxiansheng.cn/Home/Index/xuanzeyouhuiquan',
    //     data: {
    //       id: this.data.ticket[e.detail.value].youhuiquanid

    //     },
    //     method: "POST",
    //     header: {
    //       'content-type': 'application/x-www-form-urlencoded'
    //     },
    //     success: res => {
    //       console.log(res.data)
    //     }
    //   })
  },
  // 结算
  buy: function (e) {
    wx.navigateTo({
      url: "/pages/orderDetails/orderDetails",
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // let that = this
    // wx.showLoading({
    //   title: '正在加载',
    // })
    // // 优惠券
    // wx.request({
    //   url: 'http://www.aoxiansheng.cn/Home/Index/quan',
    //   data: {
    //     token: wx.getStorageSync('token')
    //   },
    //   method: "POST",
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded'
    //   },
    //   success: res => {
    //     // console.log(res.data)
    //     let ticket = res.data.data
    //     let goodList = that.data.goodList
    //     // ticket.unshift({
    //     //   youhuiquanid: 0,
    //     //   youhuiquan: '请选择'
    //     // })
    //     that.setData({
    //       ticket: ticket,
    //     })

    //   }
    // })
    // wx.request({
    //   url: 'http://www.aoxiansheng.cn/Home/Index/shopcar',
    //   data: {
    //     token: wx.getStorageSync('token')
    //   },
    //   method: "POST",
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded'
    //   },
    //   success: res => {
    //     wx.hideLoading()
    //     // console.log(res.data.data)
    //     that.setData({
    //       goodList: res.data.data
    //     })
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})