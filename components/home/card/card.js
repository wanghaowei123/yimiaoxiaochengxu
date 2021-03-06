// components/home/card/card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    card:{
      type:Object
    },
    num:Number,
    fee:String,
    type:String,
    name:String,
    vid:Number,
    child:Object,
    parent:Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toyiminfo(){
      let card=this.data.card
      wx.setStorageSync('yiminfo', card)
      wx.navigateTo({
        url: '/pages/yiminfo/index',
      })
    },
    //待确认
    submit(){
      this.triggerEvent('submityuyue',this.data.card)
    },
    //预约
    subscribe(e){
      if(e.currentTarget.dataset.stock==0){
        wx.showToast({
          title: '暂无库存',
          icon: 'none',
          duration: 2000
        })
        return
      }

      //先判断用户是否登录
      var openid = wx.getStorageSync('openid')
      if(!openid){
        wx.showToast({
          title: '请前往登录',
          icon: 'none',
          duration: 2000
        })
      }
      //在判断用户是否有监护人
      if(!this.data.parent){
        wx.showToast({
          title: '请添加监护人',
          icon: 'none',
          duration: 2000
        })
        return
      }
      //在判断是否有儿童
      if(!this.data.child){
        wx.showToast({
          title: '请选择儿童',
          icon: 'none',
          duration: 2000
        })
        return
      }
      console.log(this.data.card)
      let card = Object.assign({}, this.data.card)
      card.type = 2
      wx.setStorageSync('cardInfo', card)
      //跳到预约页面
      wx.navigateTo({
        url: '/pages/sub/index',
      })
    },
  }
})
