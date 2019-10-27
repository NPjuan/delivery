<template>
  <div :class="classes">
    <img src="../../assets/image/goBack.svg" class="close" @click="close"/>
    <div class="box">
      <div class="head">
        <p class="head-p"><span style="color: rgb(250,128,10)">订单编号</span> &nbsp&nbsp&nbsp&nbsp 346632180207849472</p>
        <p class="head-p"><span style="color: rgb(250,128,58)">发起时间</span> &nbsp&nbsp&nbsp&nbsp {{startTime}}</p>
        <div class="msg-container" style="padding-top: .1rem">
          <p class="name">发货地址</p>
          <p class="text">广东省东莞市万江区盛世华南西二330</p>
        </div>
        <div class="address-container">
          <div class="svg-container">
            <img src="../../assets/image/user-get.svg" alt="收货人图片" class="address-svg">
            <p class="svg-text">收货人</p>
          </div>
          <div class="address-text">
            <p>潘俊渊 &nbsp&nbsp 13642943515</p>
            <p>广东省东莞市万江区盛世华南西二330</p>
          </div>
        </div>
        <div class="msg-container" style="padding-top: .15rem">
          <p class="name">司机</p>
          <p class="text">严师傅 &nbsp&nbsp 13642943515</p>
        </div>
        <div class="msg-container" style="padding-top: .15rem">
            <p class="name">担保人</p>
            <p class="text">买买提 &nbsp&nbsp 13642943515</p>
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
          let date = new Date(1571755141000);
          return  date.toLocaleString()
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
    z-index: 100;
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
    float: right;
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
