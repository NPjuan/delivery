<template>
  <div id="app">
    <header>
      <span class="head-pic-container"><img src="../src/assets/image/first-show.svg" alt="" class="head-pic"></span>
      <p class="title" style="display: inline-block">捎物</p>
      <div class="search-container" @click="searchShow = true">
        <searchInput ></searchInput>
      </div>
      <div class="nav">
        <router-link
          v-for="(value, index, key) in routerLink"
          :to="value.path"
          :key="index"
          class="case"
          tag="span">
          {{value.name}}
        </router-link>
      </div>
    </header>
    <div style="height: 1.5rem"></div>
    <div class="out">
      <transition :name="transitionName">
        <router-view ></router-view>
      </transition>
    </div>
    <layer :show="searchShow" @changeShow="searchShow = false" :color="color"></layer>
  </div>
</template>


<script>
  import layer from './components/userIndex/layer'
  import searchInput from './components/userIndex/mapSearch'
  export default {
    name: "App",
    components:{
      searchInput,
      layer
    },
    data() {
    return {
      transitionName: "left",
      searchShow: false,
      color: "rgba(255, 255, 255, .6)"
    };
  },
    mounted() {
    console.log(this.$store.state.isLogin)
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
    $route(to, from) {
      const toIndex = to.meta.index_;
      const fromIndex = from.meta.index_;
      this.transitionName = toIndex < fromIndex ? 'right' : 'left';
    }
  },
    computed:{
    routerLink () {
      if(this.$store.state.isLogin){
        return  [
          {
            path: "/homepage",
            name: "我要友捎"
          },
          {
            path: "/index/driver",
            name: "我要接单"
          },
          {
            path: "/chat",
            name: "友捎消息"
          },
          {
            path: "/myinfo",
            name: "我的"
          },
          {
            path: "/userOrderList",
            name: "历史订单"
          },
          {
            path: "/surety",
            name: "担保信息"
          }
        ]
      }else{
        return [
          {
            path: "/homepage",
            name: "我要友捎"
          },
          {
            path: "/index/driver",
            name: "我要接单"
          },
          {
            path: "/chat",
            name: "我要友捎"
          },
          {
            path: "/login",
            name: "登陆注册"
          },
          {
            path: "/userOrderList",
            name: "历史订单"
          },
          {
            path: "/surety",
            name: "担保信息"
          }
        ]
      }
    }
  }
  };
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#app{
  position: relative;
}
header{
  position: fixed;
  top: 0;
  left: 0;
  height: 1.5rem;
  width: 100%;
  z-index: 125;
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
.search-container{
  display: inline-block;
  position: absolute;
  top: .2rem;
  width: 4.2rem;
  height: .6rem;
  margin-left: .5rem;
  z-index: 105;
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
.out{
  box-shadow: 0 10px 50px #7d7e80;
  height: 100vh;
  z-index: 100001
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

/* .slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 500ms;
  position: absolute;
}

.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
} */

/* .v-enter{
  opacity: 0;
  transform: translateX(100%);

}

.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);



  解决上下颤动问题
  position: absolute;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease-in-out;
} */
</style>

