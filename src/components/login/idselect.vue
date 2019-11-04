    <!-- //身份选择 -->
<template id="page2">
  <div class="hei100">
    <!-- 导航栏 -->
    <van-nav-bar title="注册选择" left-arrow @click-left="$router.back(-1)" border class="nav" />

    <div class="bg_t text" >你好!请选择您注册的身份</div>

    <div class="out">
      <router-link  to="/register?status=1" tag="div" class="nids">
        <div class="f1">
          <img src="../../assets/image/userinfo/user.png" alt="用户" width="70px" />
        </div>
        <div class="f2">用户</div>
      </router-link>

      <router-link  to="/register?status=2" tag="div" class="nids">
        <div class="f1">
          <img src="../../assets/image/userinfo/driver.png" alt="司机" width="70px" />
        </div>
        <div class="f2">司机</div>
      </router-link>

      <router-link  to="/register?status=3" tag="div" class="nids">
        <div class="f1">
          <img src="../../assets/image/userinfo/administrator.png" alt="管理员" width="70px" />
        </div>
        <div class="f2">管理员</div>
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
    back() {
      this.$router.back(-1);
    },
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
  line-height: 18vh;
  color:#009788;
}
.nids {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  flex-wrap: nowrap;

  margin: 30px auto;
  padding: 15px 0px;
  height: 8vh;
  width: 80vw;

  background-color: white;
  box-shadow: -1px 1px 8px rgb(179, 178, 178);
  border-radius: 5px;
}

  .f1{
    flex:3;
    /* margin: 0 auto; */
  }

   .f1 img{
     margin: 0 auto;
   }

  .f2{
    flex:7;
    text-align: center;
    font-size: 25px;
  }


  .nav {
  background-color: #009788;
  height: 56px;
  line-height: 56px;
}

.nav div {
  height: 56px;
}

.nav .van-nav-bar__title {
  color: white;
  font-size: 17px;
}

.nav .van-icon-arrow-left {
  color: white;
  font-size: 24px;
}

</style>