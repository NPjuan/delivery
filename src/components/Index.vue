<template>
    <div class="people-choices">
      <!-- <van-cell-group> -->
      <router-link to="/index/driver" class = "driver">我是司机</router-link>
      <router-link to="/index/customer" class = "customer">我是用户</router-link>

      
      <!-- </van-cell-group> -->
      <router-view>

      </router-view>
            <!-- <van-image
  width="100"
  height="60"
  src="https://img.yzcdn.cn/vant/cat.jpeg"
/> -->
</div>
</template>

<script>
    export default {
        name: "Index",
        // data:{
        //   src:'https://img.yzcdn.cn/vant/cat.jpeg'
        // }
    }
</script>

<style scoped>   

   *{
        margin: 0;
        padding: 0;
    }


    .people-choices{
      /* background-size: 100% 100%;
    background-image: url(../assets/image/cooperation.png);
    background-repeat:no-repeat; */

        position:fixed;
        top:0;
        width:100%;
        height:500px;
        text-align:center;
        font-size:.35rem;
        /* background-color:rgb(61, 168, 61); */  
    }
    a{
    float: left;
    display: inline-block;
    /* border-right-style:solid; */
    height:36px;
    line-height: 36px;
    width: 50%;
    color: black;
    text-decoration: none;
    /* font-size:1.5rem; */
    background-color:rgb(139, 209, 139);
  }
  .router-link-active{
  background-color: rgb(38, 129, 38);
    color: white;
  }
    /* .aa{ background-size: 100% 100%;
    background-image: url(../../assets/image/car.png);
    background-repeat:no-repeat;

    height:500px;
    width:100%;
    } */
</style>
