<template>
  <div id="app">
    <header>
      <span class="head-pic-container"><img src="../src/assets/image/first-show.svg" alt="" class="head-pic"></span>
      <p class="title" style="display: inline-block">捎物</p>
      <div class="nav">
        <router-link to="homepage" class="case" tag="span">我要友捎</router-link><router-link
        to="/index/driver" class="case" tag="span">我要接单</router-link><router-link
        to="/chat" class="case" tag="span">捎物消息</router-link><router-link
        v-if="!login" to="login" class="case" tag="span">登陆注册</router-link><router-link
        v-else to="myinfo" class="case" tag="span">我的</router-link><router-link
        to="userOrderList" class="case" tag="span">历史订单</router-link><router-link
        to="surety" class="case" tag="span">担保信息</router-link>
      </div>
    </header>
    <div style="height: 1.5rem"></div>
    <div style="box-shadow: 0 10px 50px #7d7e80;">
      <transition :name="transitionName">
        <router-view ></router-view>
      </transition>
    </div>
  </div>
</template>


<script>
export default {
  name: "App",
  data() {
    return {
      transitionName: "left"
    };
  },
  created(){

    
    // /yxxxxxxxxxxxxxxxxxxxxxxxxxxx
    //获取用户登录成功后储存的登录标志
    let getFlag = localStorage.getItem("Flag");
    let getData = JSON.parse(localStorage.getItem("userData"));
    //如果登录标志存在且为isLogin，即用户已登录
    if (getFlag === "isLogin") {
      
      //设置vuex登录状态为已登录
      this.$store.state.isLogin = true;
      this.$store.state.userData = getData;
      //如果登录标志不存在，即未登录
    }
    // /yxxxxxxxxxxxxxxxxxxxxxxxxxxx

  },
  mounted() {
    let fontSizeAuto = function(oriWidth){
      return function(){
        let viewportWidth = document.documentElement.clientWidth;
        if(viewportWidth > 640){ viewportWidth = 640; }
        if(viewportWidth < 320){ viewportWidth = 320; }
        document.documentElement.style.fontSize = viewportWidth/(oriWidth/100) +'px';
      }
    }
    window.onresize = fontSizeAuto(750)();
  },
  watch: {
    //页面切换动画
    $route(to, from) {
      const toIndex = to.meta.index_;
      const fromIndex = from.meta.index_;
      this.transitionName = toIndex < fromIndex ? 'right' : 'left';
    }
  },
  computed:{
    login() {
      return this.$store.state.isLogin
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
header{
  position: fixed;
  top: 0;
  left: 0;
  height: 1.5rem;
  width: 100%;
  z-index: 100000;
}
.head-pic-container{
  box-sizing: border-box;
  display: inline-block;
  padding-top: .15rem;
  padding-left: .5rem;
  width: 1rem;
  height: .5rem
}
.head-pic{
  width: 100%;
}
.title{
  font-size: .45rem;
  margin-top: .3rem;
  margin-left: .2rem;
  color: gray;
}
.nav{
  width: 100%;
  height: .8rem;
  padding-top: .2rem;
  overflow-x:auto;
  white-space: nowrap;
}
.case{
  display: inline-block;
  line-height: .4rem;
  width: 25%;
  height: 100%;
  font-size: .3rem;
  text-align: center;
  color: gray;
}

.router-link-active {
  color: seagreen;
  font-weight: bold;
}

/* yxxxxxxxxxxxxxxxxxxxxxxxxxxx */

.app-container {
  padding-top: 40px;
  overflow-x: hidden;
}

/* 向左滚动 */
.left-enter {
  opacity: 0;
  transform: translateX(100%);
}

.left-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  /* 解决上下颤动问题 */
  position: absolute;
}

.left-enter-active,
.left-leave-active {
  transition: all 0.5s ease-in-out;
}

/* 向右滚动 */
.right-enter {
  opacity: 0;
  transform: translateX(-100%);
}

.right-leave-to {
  opacity: 0;
  transform: translateX(100%);
  position: absolute;
  /* 解决上下颤动问题 */
}

.right-enter-active,
.right-leave-active {
  transition: all 0.5s ease-in-out;
}

</style>

