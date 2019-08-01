<template>
  <div>
    <h1>个人信息</h1>
    <div class="user">
      <router-link to="/home/login">登录</router-link>
      <router-link to="/home/register">注册</router-link>
    </div>
    <router-view>

    </router-view>
  </div>
</template>

<script>
    export default {
        name: "Home"
    }
</script>

<style scoped>
h1{
  text-align: center;
}
  a{
    float: right;
    display: inline-block;
    height: 80px;
    width: 120px;
    text-align: center;
    line-height: 80px;
    background-color: darkseagreen;
    text-decoration: none;
    color: black;
  }
.router-link-active{
  color: white;
}
  .user{
    margin: 20px auto;
    width: 100%;
    height: 80px;
  }
</style>
