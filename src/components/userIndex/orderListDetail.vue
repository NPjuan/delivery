<template>
  <div :class="classes">
    <img src="../../assets/image/goBack.svg" class="close" @click="close"/>
    <div class="box">
      <div class="head">
        <p class="head-p"><span style="color: rgb(250,128,10)">订单编号</span> &nbsp&nbsp {{detail.userOrderNumber}}</p>
        <p class="head-p"><span style="color: rgb(250,128,58)">发起时间</span> &nbsp&nbsp {{startTime}}</p>
        <div class="msg-container" style="padding-top: .1rem">
          <p class="name">发货地址</p>
          <p class="text">{{sendAddress}}</p>
        </div>
        <div class="address-container">
          <div class="svg-container">
            <img src="../../assets/image/user-get.svg" alt="收货人图片" class="address-svg">
            <p class="svg-text">收货人</p>
          </div>
          <div class="address-text">
            <p>{{detail.contactRelate.name}} &nbsp&nbsp {{detail.contactRelate.phone}}</p>
            <p>{{getAddress}}</p>
          </div>
        </div>
        <div class="msg-container" style="padding-top: .15rem">
          <p class="name">司机</p>
          <p class="text" v-if="detail.driverRelate">{{detail.driverRelate.name}} &nbsp&nbsp {{detail.driverRelate.phone}}</p>
          <p class="text" v-else>尚未有司机接单</p>
        </div>
        <div class="msg-container" style="padding-top: .15rem">
            <p class="name">担保人</p>
            <p class="text">{{detail.suretyRelate.name}} &nbsp&nbsp {{detail.suretyRelate.phone}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "orderListDetail",
      props:{
        show:{
          type: Boolean
        },
        detail:{
          type: Object,
          default: {
            //司机相关信息
            "driverRelate":{
              "id":1,
              "name":"司机姓名",
              "phone":"司机电话"
            },
            //担保人相关信息
            "suretyRelate":{
              "id":2,
              "name":"担保人姓名",
              "phone":"担保人电话"
            },
            //收货人相关信息
            "contactRelate":{
              "id":3,
              "name":"收货人姓名",
              "phone":"收货人电话"
            },
            //用户订单创建时间
            "createTime":1571755162000,
            //收货地址
            "consigneeArea":{
              "id":1,
              "province":"省",
              "city":"市",
              "district":"区",
              "town":"镇",
              "village":"村",
              "detail":"详细地址"
            },
            //订单编号
            "userOrderNumber":"346632180207849472",
            //发货地址
            "deliverArea":{
              "id":2,
              "province":"省2",
              "city":"市2",
              "district":"区2",
              "town":"镇2",
              "village":"村2",
              "detail":"详细地址2"
            }
          }
        }
      },
      methods:{
        close() {
          this.$emit('changeShow' , "");
        }
      },
      computed: {
        classes: function () {
          return {
            container: true,
            enter: this.show,
            leave: !this.show
          }
        },
        startTime() {
          // 根据毫秒数构建 Date 对象
          let date = new Date(this.detail.createTime);
          return  date.toLocaleString()
        },
        sendAddress() {
          return (this.detail.deliverArea.city ? this.detail.deliverArea.city:"")
            + (this.detail.deliverArea.district ? this.detail.deliverArea.district:"")
            + (this.detail.deliverArea.down ? this.detail.deliverArea.down :"")
            + (this.detail.deliverArea.detail ? this.detail.deliverArea.detail:"")
        },
        getAddress(){
          return (this.detail.consigneeArea.city ? this.detail.consigneeArea.city:"")
            + (this.detail.consigneeArea.district ? this.detail.consigneeArea.district:"")
            + (this.detail.consigneeArea.down ? this.detail.consigneeArea.down :"")
            + (this.detail.consigneeArea.detail ? this.detail.consigneeArea.detail:"")
        }
      }
    }
</script>

<style scoped>
  .container{
    position: fixed;
    transition: .4s all ease;
    top: 4rem;
    left: 10%;
    width: 80%;
    height: auto;
    padding-bottom: .4rem;
    background-color: white;
    border-radius:10px;
    font-size: .25rem;
  }
  .enter{
    left: 10%;
    z-index: 115;
  }
  .leave{
    background-color: transparent;
    left: 110%;
    z-index: -5;
  }
  .box{
    width: 95%;
    height: 95%;
    margin: .3rem auto;
  }
  .head{
    position: relative;
    height: .5rem;
  }
  .head-p{
    padding-left: .18rem;
    padding-bottom: .1rem;
  }
  .address-container{
    padding-top: .18rem;
    font-size: .25rem;
  }
  .svg-container{
    display: inline-block;
    text-align: center;
    width: 25%;
  }
  .svg-text{
    padding-top: .05rem;
    color: gray;
  }
  .address-svg{
    display: inline-block;
    width: .8rem;
  }
  .address-text{
    box-sizing: border-box;
    padding-left: .1rem;
    float: right;
    width: 75%;
  }
  .name{
    box-sizing: border-box;
    float: left;
    width: 25%;
    text-align: center;
    color: grey;
  }
  .msg-container{
    box-sizing: border-box;
    margin-top: .2rem;
    height: .4rem;
  }
  .text{
    box-sizing: border-box;
    display: inline-block;
    padding-left: .1rem;
    width: 75%;
    float: right;
  }
  .address-text p{
    padding-top: .15rem;
  }
  .close{
    position: absolute;
    top:-.5rem;
    right: -.4rem;
    display: inline-block;
    box-sizing: border-box;
    width: .5rem;
    height: .5rem;
    text-align: center;
    line-height: .48rem;
  }
</style>
