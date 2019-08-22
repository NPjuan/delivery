<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view></router-view>
    </transition>
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
  mounted() {
    var fontSizeAuto = function(oriWidth){
      return function(){
        var viewportWidth = document.documentElement.clientWidth;
        if(viewportWidth > 640){ viewportWidth = 640; }
        if(viewportWidth < 320){ viewportWidth = 320; }
        document.documentElement.style.fontSize = viewportWidth/(oriWidth/100) +'px';
      }
    }
    window.onresize = fontSizeAuto(750)();
  },
  watch: {
    $route(to, from) {
      console.log(to);
      let toName = to.name;

      const toIndex = to.meta.index_;
      const fromIndex = from.meta.index_;

      this.transitionName = toIndex < fromIndex ? 'right' : 'left';
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

.router-link-active {
  color: white;
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

