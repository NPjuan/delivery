<template>
  <div class="container">
    <div class="user-from">
    <div class="left-show">
      <div class="img-container">
        <img src="../../assets/image/user-send.svg" alt="send" style="width: 100%">
      </div>
      <p class="user-text">发货人信息</p>
    </div>
    <div class="right-show">
        <span class="span name">
          <span>阿不都.买买提</span>
        </span>
      <span class="span phone">
          <span>13642943515</span>
        </span>
      <p class="address">地址</p>
    </div>
  </div>
    <div class="user-from">
      <div class="left-show">
        <div class="img-container">
          <img src="../../assets/image/user-get.svg" alt="send" style="width: 100%">
        </div>
        <p class="user-text">收货人信息</p>
      </div>
      <div class="right-show">
        <span class="span name">
          <span>潘俊渊</span>
        </span>
        <span class="span phone">
          <span>13642943515</span>
        </span>
        <p class="address">广东工业大学教学5号楼大石头广东工业大学教学5号楼大石头</p>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "demo"
    }
</script>

<style scoped>
  .container{
    box-sizing: border-box;
    height: 3.8rem;
    border: 1px darkseagreen solid;
    border-radius: 10px;
  }
  .user-from{
    box-sizing: border-box;
    height: 1.9rem;
    border-bottom: 1px seagreen solid;
  }
  .left-show{
    box-sizing: border-box;
    float: left;
    height: 100%;
    width: 35%;
    /*border-right: seagreen solid 1px;*/
  }
  .right-show{
    float: left;
    height: 100%;
    width: 65%;
  }
  .img-container{
    width: 40%;
    height: 1rem;
    margin: .2rem auto .1rem auto;
  }
  .user-text{
    padding-top: .1rem;
    text-align: center;
    font-size: .3rem;
    color: gray;
  }
  .span{
    display: inline-block;
    width: auto;
    margin-top: .3rem;
    margin-right: .4rem;
    font-size: .35rem;
    color: gray;
  }
  .name{
  }
  .address{
    font-size: .3rem;
    padding-top: .4rem;
    padding-right: .5rem;
    display: -webkit-box;
    color: gray;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;
  }
</style>
