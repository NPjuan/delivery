<template>
  <div class="container">
    <div class="user-from" @click="showAddress('consignor')">
      <div class="left-show">
      <div class="img-container">
        <img src="../../assets/image/user-send.svg" alt="send" style="width: 100%;height: 100%">
      </div>
      <p class="user-text">发货人信息</p>
    </div>
      <div class="right-show" v-if="orPick">
          <span class="span name">
            <span>{{consignor.name}}</span>
          </span>
        <span class="span phone">
            <span>{{consignor.phone}}</span>
          </span>
        <p class="address">{{consignor.areaCode}}</p>
      </div>
      <div v-else class="right-show" style="position: relative">
        <div style="position: absolute;width: 5px;height: 65%;background-color: #57c8ac;left:0;"></div>
        <div style="width: 20%;margin: .2rem auto">
          <img src="../../assets/image/plus.svg" alt="" style="width: 100%;max-width: 2rem">
        </div>
      </div>
  </div>
    <!--<div style="margin:auto;margin-top: -2px;height: 1px;width: 90%;background-color: #7d7e80;"></div>-->
    <div class="user-from" @click="showAddress('consignee')">
      <div class="left-show">
        <div class="img-container">
          <img src="../../assets/image/user-get.svg" alt="get" style="width: 100%;height: 100%">
        </div>
        <p class="user-text">收货人信息</p>
      </div>
      <div class="right-show" v-if="eePick">
        <span class="span name">
          <span>{{consignee.name}}</span>
        </span>
        <span class="span phone">
          <span>{{consignee.phone}}</span>
        </span>
        <p class="address">{{consignee.areaCode}}</p>
      </div>
      <div v-else class="right-show" style="position: relative">
        <div style="position: absolute;width: 5px;height: 65%;background-color: skyblue;left:0;"></div>
        <div style="width: 20%;margin: .2rem auto">
          <img src="../../assets/image/plus.svg" alt="" style="width: 100%;max-width: 2rem">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "demo",
      props: {
        consignor: {
          type:Object
        },
        consignee: {
          type:Object
        },
        orPick:{
          type:Boolean
        },
        eePick:{
          type:Boolean
        }
      },
      methods:{
          showAddress(role){
            this.$emit('showAddress', role)
          }
      }
    }
</script>

<style scoped>
  .container{
    box-sizing: border-box;
    height: 3.2rem;
    border-radius: 3px;
  }
  .user-from{
    box-sizing: border-box;
    width: 95%;
    max-width: 750px;
    min-width: 320px;
    margin: 0 auto;
    height: 1.6rem;
  }
  .left-show{
    box-sizing: border-box;
    float: left;
    height: 100%;
    width: 35%;
    /*border-right: seagreen solid 1px;*/
  }
  .right-show{
    box-sizing: border-box;
    padding-top: .3rem;
    float: left;
    height: 100%;
    width: 65%;
  }
  .img-container{
    width: 25%;
    height: 1rem;
    margin: .1rem auto .1rem auto;
  }
  .user-text{
    text-align: center;
    font-size: .3rem;
    color: gray;
  }
  .span{
    display: inline-block;
    width: auto;
    margin-right: .4rem;
    font-size: .35rem;
    color: gray;
  }

  .address{
    display: -webkit-box;
    font-size: .3rem;
    padding-top: .3rem;
    padding-right: .5rem;
    color: gray;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;
  }
</style>
