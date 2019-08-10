<template>
  <div id="app">
    <router-view>

    </router-view>
    <!--<footer>-->
      <!--<router-link to="/" exact>友捎</router-link>-->
      <!--<router-link to="/message">消息</router-link>-->
      <!--<router-link to="/friends">好友</router-link>-->
      <!--<router-link to="/home">我的</router-link>-->
    <!--</footer>-->
  </div>
</template>


<script>
export default {
  name: 'App',
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
footer{
  position: fixed;
  bottom: 0;
  width: 750px;
  height: 10rem;
  text-align: center;
  background-color: darkseagreen;
}
  footer>a{
    float: left;
    display: inline-block;
    height: 100px;
    line-height: 100px;
    width: 25%;
    color: black;
    text-decoration: none;
  }
  .router-link-active{
    color: white;
  }
</style>
