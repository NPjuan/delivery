
<template>
<!-- 总的组件 -->
  <div id="app">
    <router-view>

    </router-view>
    <footer>
      <router-link to="/" exact>友捎</router-link>
      <router-link to="/message">消息</router-link>
      <router-link to="/friends">好友</router-link>
      <router-link to="/home">我的</router-link>
    </footer>
  </div>
</template>


<script>
export default {
  name: 'App',
}
</script>

<style>
/* html{
  font-size:20px;
} */
*{
  margin: 0;
  padding: 0;
}
footer{
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 20px;
  text-align: center;
  background-color: darkseagreen;
  font-size:.35rem
}
  footer>a{
    
    float: left;
    display: inline-block;
    height: 20px;
    line-height: 20px;
    width: 25%;
    color: black;
    text-decoration: none;
    /* 15px */
    /* font-size:1.5rem; */
  }
  .router-link-active{
    color: white;
  }

</style>
