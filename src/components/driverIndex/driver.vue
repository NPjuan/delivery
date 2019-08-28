<template>
  <div class="carimage">
    
    <!-- <van-button type="primary"  @click="returnChoices">返回</van-button> -->
    <!-- router-link默认渲染为a标签,这两个router-link在组件切换后依旧存在 -->
    <header>
      <span style="height: 100%;line-height: 1rem;font-size: .32rem;">司机页面</span>
    </header>
    
    <van-button plain type="default" size="small" @click="goHomePage" class="go-back-button"><</van-button>
    <div style="padding-top: 1rem">
      <router-link to="/choices/route">发布行程</router-link>
      <router-link to="/choices/order">附近订单</router-link>
      <router-link to="/choices/invitation">邀我友捎</router-link>
    </div>
      <!-- 路由匹配到的组件将显示在下面这里，在同个页面，切换显示不同组件的相应内容，同时地址栏的地址是会变的 -->
      <transition mode="out-in">
        <router-view></router-view>
      </transition>

  </div>
</template>

<script>
export default {
  name: "driverLink",
  methods: {
    // 回到主页
    goHomePage () {
      this.$router.push("/")
    }
  }

};
</script>

<style scoped>
/* scoped 属性是一个布尔属性。如果使用该属性，则样式仅仅应用到 style 元素的父元素及其子元素。 */
/* 添加了scoped属性的组件，为了达到组件样式模块化，做了两个处理： */
/* 给HTML的DOM节点加一个不重复data属性(形如：data-v-2311c06a)来表示他的唯一性
在每句css选择器的末尾（编译后的生成的css语句）加一个当前组件的data属性选择器（如[data-v-2311c06a]）来私有化样式
大家都知道css样式有一个优先级的说法，scoped的这一操作，虽然达到了组件样式模块化的目的，但是会造成一种后果：每个样式的权重加重了：理论上我们要去修改这个样式，需要更高的权重去覆盖这个样式。这是增加复杂度的其中一个维度。 */
.go-back-button{
  position: absolute;
  left: 0;
  top:1.15rem;
  min-width: 0.2rem;
  border-style: none;
  color: #07c160;
  font-size: 0.3rem;
  background-color:#f6f8f7;
}
header{
  position: fixed;
  background-color: white;
  z-index:10;
  height: 1rem;
  width: 100%;
  text-align: center;
}
a {
  width: 33%;
  height: 50px;
  line-height: 50px;
  color: black;
  text-decoration: none;
  float: left;
  font-size: .3rem;
  text-align: center;
}
.router-link-active {
  color: green;
}
/* button {
  position: fixed;
  bottom: 100px;
  right: 0;
  height: 35px;
  background-color: rgb(32, 187, 135);
} */

.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateX(150px);
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.carimage {
  height: 8rem;
  width: 100%;
  background-size: 100% 100%;
  background-image: url(../../assets/image/car.png);
  background-repeat: no-repeat;
}
</style>
