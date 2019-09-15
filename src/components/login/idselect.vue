    <!-- //身份选择 -->
<template id="page2">
  <div class="hei100">
    <div class="van-doc-nav-bar van-nav-bar van-hairline--bottom bg" style="z-index: 1;">
      <div class="van-nav-bar__left">
        <i
          @click="$router.back(-1)"
          class="van-icon van-icon-arrow-left van-nav-bar__arrow"
          style="color:white"
        ></i>
      </div>
      <div class="van-nav-bar__title van-ellipsis" style="color:white">注册选择</div>
      <div class="van-nav-bar__right"></div>
    </div>

    <div class="bg_t text">选择您注册的身份</div>
    <!-- <section style="text-align:center;">
      <router-link
        to="/register?status=1"
        tag="button"
        @click="status1"
        class="van-button van-button--primary van-button--normal btn_pos m_status"
        style="width: 50%;margin-bottom: 50px;margin-top: 20%"
      >
        <span class="van-button__text">用户</span>
      </router-link>
    </section>
    <section style="text-align:center">
      <router-link
        to="/register?status=2"
        @click="status2"
        class="van-button van-button--primary van-button--normal btn_pos m_status"
        tag="button"
        style="width: 50%;margin-bottom: 50px"
      >
        <span class="van-button__text">司机</span>
      </router-link>
    </section>
    <section style="text-align:center">
      <router-link
        to="/register?status=3"
        @click="status3"
        tag="button"
        class="van-button van-button--primary van-button--normal btn_pos m_status"
        style="width: 50%;margin-bottom: 50px"
      >
        <span class="van-button__text">管理员</span>
      </router-link>
    </section> -->

    <div style="text-align:center">
      <router-link class="ids" to="/register?status=1" tag="div">
        <img src="../../assets/image/userinfo/用户.png" alt="用户"  width="70px"/>
        <span>用户</span>
      </router-link>
      <router-link class="ids" to="/register?status=2" tag="div">
        <img src="../../assets/image/userinfo/司机.png" alt="司机" width="70px"/>
        <span>司机</span>
      </router-link>
      <router-link class="ids" to="/register?status=3" tag="div">
        <img src="../../assets/image/userinfo/管理员.png" alt="管理员" width="70px"/>
        <span>管理员</span>
      </router-link>
    </div>



  </div>
</template>



<script>
import g from "./global";
export default {
  data() {
    return {};
  },
  methods: {
    status1() {
      g.user_msg.userInfo.role = "1"; // 1->身份为 "用户"
    },
    status2() {
      g.user_msg.userInfo.role = "2"; // 2->身份为 "司机"
    },
    status3() {
      g.user_msg.userInfo.role = "3"; // 3->身份为 "管理员"
    }
  }
  // beforeRouteLeave (to, from, next) {
  //     // ...
  // }
};
</script>


<style scoped>
.bg {
  background-color: #07c160;
}

.bg_t {
  width: 100%;
  height: 18vh;

  /* border-bottom-right-radius: 50px 20px; */
  /* border-bottom-left-radius: 50px 20px; */
  /* background-color: #07c160; */
}

.text {
  text-align: center;
  font-size: 20px;
  line-height: 200px;
  color: rgb(44, 44, 44);
}

.ids {
  display: inline-block;
  margin: 30px 0px;
  padding: 15px 0px;
  height: 8vh;
  width: 80vw;

  background-color: white;

  text-align: left;
  box-shadow: -1px 1px 8px  rgb(179, 178, 178);
  border-radius: 5px;
}


.ids img{
  padding-left: 20px;
  display: inline-block;
  vertical-align: top;
}

.ids span{
  display: inline-block;  
  font-size: 17px;
  font-weight: bold;
    line-height: 8vh;
    width: 55vw;
    text-align: center;
}


</style>