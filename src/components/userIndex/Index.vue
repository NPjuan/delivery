<template>
  <div class="container">
   <!--<h1>首页</h1>-->
  <!--<router-link to="/index/driver" class = "driver">我是司机</router-link>-->
  <!--<router-link to="/index/customer" class = "customer">我是用户</router-link>-->
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
  /******a 标签************/
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
  /****** a 标签激活************/
  .router-link-active{
    background-color: rgb(38, 129, 38);
    color: white;
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
