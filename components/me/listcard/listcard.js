// components/me/listcard/listcard.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imageurl:{
      type:String,
      value:"../../../images/people_icon.png"
    },
    name:{
      type:String,
      value:"监护人"
    },
    pageurl:{
      type:String,
      value:""
    }
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
    topage(){
      console.log(this.data.pageurl)
      if(this.pageurl===""){
        return
      }else{
        wx.navigateTo({
          url: this.data.pageurl,
        })
      }
    }
  }
})
