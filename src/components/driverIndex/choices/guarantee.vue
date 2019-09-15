<template>
<div class="guarantee2">
    <van-cell-group class="cell-group6">
        <!-- <button plain type="primary" size="small"  @click="returnInfo" class="return-info"><</button> -->
        <p class="remind6">担保人信息</p>
        <div class="infomation">
            <div class = "g-body">
              <p v-cloak class="g-id">id：{{guaranteeId}}</p>
              <p v-cloak class="g-name">姓名：{{guaranteeName}}</p>
              <p v-cloak class="g-phone">电话：{{guaranteePhone}}</p>
            </div>
            <van-button type="primary"  @click="confirm2" class="confirm2">确认担保人</van-button>
        </div>
    </van-cell-group>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name:"guaranteeLink",
  data() {
    return {
      guaranteeId:"",
      guaranteeName:"",
      guaranteePhone:""
    };
  },

  created(){
    this.getGuarantee()//拿到所有订单发货人信息
  },

  methods: {
    getGuarantee(){
      this.guaranteeId = this.$route.params.guaranteeId
      this.guaranteeName = this.$route.params.guaranteeName//路由传值，从order组件传过来所有订单发货人信息
      this.guaranteePhone = this.$route.params.guaranteePhone
    },
    returnInfo(){//路由跳转，返回附近订单页面
      this.$router.push({
        name:"infoLink",
        })                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 .go(-1)
    },
    confirm2(){
      axios.defaults.baseURL = 'http://118.25.85.198:8080/deliver'
      axios.post('/order/receive.do',{
        userOrderId:58,
        driverUid:1,
        suretyId:4
      })
        .then((response)=>{
            this.$toast(response.data.msg)
            this.$router.push({
            name:"orderLink",
        })
        })
    }
  }
}
</script>
<style>
.guarantee2{
  font-size: .2rem;
  height:1280px;
  background-color:#f6f8f7;
  width:100%;
}
.cell-group6{
  background-color:#f6f8f7;
}
.remind6{
  position:relative;
  top:-.5rem;
  color:#07c160;
  /* font-weight:bold; */
  font-size: .3rem;
  text-align: center;
   background-color:#f6f8f7;
}
.return-info{ /*返回按钮*/
  position:relative;
  top:-.9rem;
  left:0;
  border-style:none;
  min-width:.7rem;
  color:#07c160;
  font-size:.5rem;
  background-color:#f6f8f7;
  z-index:2;
}
.infomation{/*省市区选择*/ 
  margin:0 auto;
  width:80%;
  font-size:14px;
}
.g-body{
  background-color: white;
  border-radius: 5px;
  height:110px;
}
.g-id,.g-name,.g-phone{/*文本框*/
  padding:.15rem .15rem;
  border-bottom:1px solid #f6f8f7;
  text-align:left;
}
.confirm2{
    width:100%;
    margin :1rem auto
}
</style>