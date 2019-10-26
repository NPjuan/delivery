<template>
  <div :class="classes">
    <img src="../../assets/image/goBack.svg" class="close" @click="close"/>
    <div class="box">
      <div class="head">
        <span class="orderId">订单编号 &nbsp&nbsp&nbsp 346632180207849472</span>
        <div class="address-container">
          <div class="svg-container">
            <img src="../../assets/image/getGood.svg" alt="收货人图片" class="address-svg">
            <p>收货人信息</p>
          </div>
          <div class="address-text">
            <p>潘俊渊 &nbsp&nbsp 13642943515</p>
            <p>广东省东莞市万江区盛世华南西二330</p>
          </div>
        </div>
        <div class="driver-container">
          <div class="svg-container">
            <div class="line-driver"></div>
            <p>司机信息</p>
          </div>
          <div class="address-text">
            <p>严师傅 &nbsp&nbsp 13642943515</p>
          </div>
        </div>
        <div class="driver-container">
          <div class="svg-container">
            <div class="line-protect"></div>
            <p>担保人信息</p>
          </div>
          <div class="address-text">
            <p>阿不都·买买提 &nbsp&nbsp 13642943515</p>
          </div>
        </div>
        <div>
          <img src="../../assets/image/driver.svg" alt="">
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
        }
      }
    }
</script>

<style scoped>
  .container{
    position: fixed;
    transition: .4s all ease;
    top: 3.5rem;
    left: 10%;
    width: 80%;
    height: 9rem;
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
  .orderId{
    padding-left: .1rem;
  }
  .address-container{
    padding-top: .2rem;
    font-size: .25rem;
  }
  .svg-container{
    display: inline-block;
    text-align: center;
    width: 25%;
  }
  .svg-container p{
    padding-top: .1rem;
    color: gray;
  }
  .address-svg{
    display: inline-block;
    width: .8rem;
  }
  .driver-container{
    padding-top: .15rem;
  }
  .line-driver{
    display: inline-block;
    background-color: #07c160;
    width: 60%;
    height: .15rem;
  }
  .line-protect{
    display: inline-block;
    background-color: skyblue;
    width: 60%;
    height: .15rem;
  }
  .address-text{
    box-sizing: border-box;
    display: inline-block;
    padding-left: .3rem;
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
