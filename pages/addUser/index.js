// pages/addUser/index.js
import {getProvide,getTowns,getVillage,saveParent,getParent} from '../../utils/api'
let ajax = require('../../utils/ajax.js')
Page({

  /**
   * 页面的初始数据
   */
  
  
  data: {
    wxuserInfo:null,
    sex:1,
    userInfo:null,
    name:"",
    mobile:"",
    idCard:"",
    address:"",
    cityCode:"",
    city:null,
    area:null,
    areaCode:"",
    streetCode:"",
    committee:null,
    committeeCode:"",
    street:null,
    sexArr: [{"name": "男", "value": 1, "checked": false},{"name": "女", "value": 2, "checked": true}],
    index: 0,
    region: ['广东省', '广州市', '海珠区'],
    customItem: '全部',
    isSel:false,
    town:[],
    cityarry:["石家庄市","张家口市"
    ],
    cityindex:0,
    areaindex:0,
    commiIndex:0,
    streetindex:0,
    scityarry:[],
    totalrigion:[],
    sarealist:[],
    arealist:[],
    totalstreetrigion:[],
    commitarry:[],
    scommitarry:[],
    streetlist:[],
    sstreetlist:[]

  },
  //保存监护人信息
  saveDetail() {
    let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    if (this.data.name == '' || this.data.name == null) {
      wx.showToast({
        title: '姓名不能为空',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    
    if ((this.data.idCard != '' && this.data.idCard != null) && !reg.test(this.data.idCard)) {
      wx.showToast({
        title: '身份证格式不正确',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    
    let parentId=wx.getStorageSync('parentId')
    let data={
        name: this.data.name,
        mobile: this.data.mobile,
        sex: this.data.sex,
        idCard: this.data.idCard,
        provinceCode:13,
        province: "河北省",
        cityCode:this.data.cityCode,
        city: this.data.region[1],
        areaCode:this.data.areaCode,
        area:this.data.area,
        streetCode:this.data.streetCode,
        street:this.data.street,
        committee:this.data.committee,
        committeeCode:this.data.committeeCode,
        address: this.data.address,
        id:parentId
      }
      wx.request({
        url: 'https://vaccing.51vipsh.com/app1/updateAdult',
        header:{
          "Content-Type":"application/json"
        },
        data:data,
        method:"POST",
        success(res){
          wx.reLaunch({
            url: '/pages/me/me',
          })
          
        }
      })
  },
  getparents(){
    let that=this
    let openid=wx.getStorageSync('openid')
    setTimeout(()=>{
    },1000)
    
    if(!openid){
      return
    }
    wx.request({
      url: 'http://121.199.7.204:8085/app1/getAdultByOpenid',
      header:{
        "Content-Type":"application/x-www-form-urlencoded;"
      },
      data:{
        openId:openid
      },
      method:"POST",
      success(res){
         let parent=res.data.data
         let arr=that.data.sexArr
         if(parent.sex==1){
          arr[0].checked=true
          arr[1].checked=false
         }else{
          arr[0].checked=false
          arr[1].checked=true
         }
         that.setData({
          sexArr:arr
        })
         that.setData({
          name: parent.name,
          mobile: parent.mobile,
          sex: parent.sex,
          idCard: parent.idCard,
          provinceCode:13,
          province: "河北省",
          cityCode:parent.cityCode,
          city: parent.city,
          areaCode:parent.areaCode,
          area:parent.area,
          streetCode:parent.streetCode,
          street:parent.street,
          committee:parent.committee,
          committeeCode:parent.committeeCode,
          address: parent.address,
          id:parent.id
         })
         
      }
    })
  },
  //性别选择
  radioChange(e) {
    let sex = e.detail.value
    this.setData({
      sex
    })
  },
  bindName(e) {
    this.setData({
      name: e.detail.value
    })
  },
  bindmobile(e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  bindCard(e) {
    this.setData({
      idCard: e.detail.value
    })
  },
  getareaCodeList(cityCode){
    let arealist=[]
    let sarealist=[]
    this.data.totalrigion.forEach(item=>{
      let flag=false
      if(item.c_code==cityCode){
        flag=arealist.includes(item.t_name); 
        if(!flag){
          arealist.push(item.t_name)
          sarealist.push(item)
        }
      }
      
    })
    this.setData({
      arealist,
      sarealist
    })
  },
  getstreetCodeList(areaCode){
    this.getstreetlist(areaCode)
  },
  dealstreetRegion(data){
    let totalstreetrigion=data
    let commitarry=[]
    let scommitarry=[]
    data.forEach(item=>{
      let flag=false
      flag=commitarry.includes(item.c_name); 
      if(!flag){
        commitarry.push(item.c_name)
        scommitarry.push(item)
      }
    })
    this.setData({
      commitarry,
      scommitarry,
      totalstreetrigion
    })
  },
  bindCommitChange(e){
    let committeeCode
    let committee=this.data.commitarry[e.detail.value]
    this.data.scommitarry.forEach(item=>{
      if(item.c_name==committee){
        committeeCode=item.c_code
        //获取县
        this.getStreetCodeList(committeeCode)
      }
    })
    this.setData({
      committee,
      committeeCode
    })
  },
  bindStreetChange(e){
    let streetCode
    let street=this.data.streetlist[e.detail.value]
    this.data.sstreetlist.forEach(item=>{
      if(item.t_name==street){
        streetCode=item.t_code
      }
    })
    this.setData({
      street,
      streetCode
    })
  },
  getStreetCodeList(commitCode){
    let streetlist=[]
    let sstreetlist=[]
    this.data.totalstreetrigion.forEach(item=>{
      let flag=false
      if(item.c_code==commitCode){
        flag=streetlist.includes(item.t_name); 
        if(!flag){
          streetlist.push(item.t_name)
          sstreetlist.push(item)
        }
      }
      
    })
    this.setData({
      streetlist,
      sstreetlist
    })
  },
  getstreetlist(areaCode){
    let that=this
    wx.request({
      url: 'http://121.199.7.204:8085/app1/getAddress',
      header:{
        "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
      },
      data:{
        parent_code:areaCode
      },
      method:"POST",
      success(res){
        that.dealstreetRegion(res.data.data)
      }
    })
  },
  bindAreaChange(e){
    let areaCode
    let area=this.data.arealist[e.detail.value]
    this.data.sarealist.forEach(item=>{
      if(item.t_name==area){
        areaCode=item.t_code
        this.getstreetCodeList(areaCode)
      }
    })
    this.setData({
      area,
      areaCode
    })
  },
  bindCityChange(e){
    let cityCode
    let city=this.data.cityarry[e.detail.value]
    this.data.scityarry.forEach(item=>{
      if(item.c_name==city){
        cityCode=item.c_code
        //获取县
        this.getareaCodeList(cityCode)
      }
    })
    this.setData({
      city,
      cityCode
    })
    
  },
  bindAddress(e) {
    this.setData({
      address: e.detail.value
    })
  },
  //添加父母资料
addParentInfo(){
   wx.request({
     url: 'http://121.199.7.204:8085/app1/updateAdult',
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
 bindPickerChange: function (e) {
  this.setData({
    index: e.detail.value
  })
},
//选择省市区
bindRegionChange: function (e) {
  this.setData({
    region: e.detail.value,
    isSel: true
  })
  // this.bindTown();
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },
  dealRegion(data){
    let totalrigion=data
    let cityarry=[]
    let scityarry=[]
    data.forEach(item=>{
      let flag=false
      flag=cityarry.includes(item.c_name); 
      if(!flag){
        cityarry.push(item.c_name)
        scityarry.push(item)
      }
    })
    this.setData({
      cityarry,
      scityarry,
      totalrigion
    })
  },
  getArealist(){
    let that=this
    wx.request({
      url: 'http://121.199.7.204:8085/app1/getAddress',
      header:{
        "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
      },
      data:{
        parent_code:13
      },
      method:"POST",
      success(res){
        that.dealRegion(res.data.data)
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
    let that=this
    let userInfo = wx.getStorageSync('userInfo')
    this.setData({
      userInfo: userInfo
    })
    this.getArealist()
    this.getparents()
    wx.getUserInfo({
      success:res=>{
        that.setData({
          wxuserInfo: res.userInfo
        })
      }
    })
  },
})