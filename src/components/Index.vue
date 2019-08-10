<template>
  <div class="container">
    <transition :name="transitionName">
        <router-view class="child-view" >
        </router-view>
    </transition>
  </div>
</template>

<script>
    export default {
        name: "index",
      data() {
        return {
          searchResult: [],
          getShow: false,
          setShow: false,
          add: false,
          transitionName: "slide-left"// 首先在层级低的

        }
      },
      methods: {
        showPopup() {
          this.getShow = true;
        },
        onClickLeft() {
          this.getShow = false
        },
        onClickRight() {
          this.setShow = true
        }
      },
      watch: {
          // 判断层级关系确定动画
          $route (to, from){
            if (to.meta.index > from.meta.index) {
              this.transitionName = "slide-left";
            } else {
              this.transitionName = "slide-right";
            }
          }
      }
    }
</script>

<style scoped>
 .container{
   width: 100%;
   height: 100%;
   overflow: hidden;
 }

 .child-view {
   position: absolute;
   width:100%;
   transition: all .5s ease;
 }
 .slide-left-enter, .slide-right-leave-active {
   opacity: 0;
   -webkit-transform: translate(100%, 0);
   transform: translate(100%, 0);
 }
 .slide-left-leave-active, .slide-right-enter {
   opacity: 0;
   -webkit-transform: translate(-100%, 0);
   transform: translate(-100%, 0);
 }

</style>
