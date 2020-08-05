// pages/babylist/babylist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    childlist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchBabylist()
  },
  fetchBabylist(){
    let that=this
    wx.request({
      url: 'http://121.199.7.204:8085/app1/getChildByOpenId',
      header:{
        "Content-Type":"application/x-www-form-urlencoded;"
      },
      data:{
        openId:1
      },
      method:"POST",
      success(res){
        that.setData({
          childlist:res.data.data
        })
      }
    })
  },
  addBabyInfo(){
    wx.request({
      url: 'http://121.199.7.204:8085/app1/updateChild',
      header:{
        "Content-Type":"application/json"
      },
      data:{
        name:"wangwei"
      },
      method:"POST",
      success(res){
      }
    })
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