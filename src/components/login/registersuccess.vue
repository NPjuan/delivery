 <!-- 注册成功页面 -->
<template id="page4">
  <div class="hei100">
    <!-- 导航栏 -->
    <van-nav-bar title="注册成功" border class="nav" />

    <div style="text-align:center;padding-top:5vh;">
      <img
        src="../../assets/image/userinfo/success.png"
        alt="success"
        width="200px"
        style="display:inline-block"
      />
    </div>
    <div class="bg_t text" style="color:black">注册成功</div>

    <section class="van-doc-demo-section demo-field" style="text-align:center">
      <div style="text-align: center;margin-top: 10%;padding: 20px 0">
        <h4 style="text-align: center;font-size:25px" class="pad_10">你的个人id是:</h4>
        <h4
          class="user_id pad_10"
          style="text-align: center;color: #009788;font-weight: bold;font-size:30px"
        >{{id}}</h4>
        <h5 class="pad_10 tip">个人id是用户的唯一身份凭证,可用于今后的登录</h5>
      </div>

      <van-button
        type="primary"
        size="small"
        @click="$router.push('/pcmsg')"
        class="MyBGColor btncss"
      >完善个人信息</van-button>
    </section>
  </div>
</template>


<script>
import g from "./global";
export default {
  data() {
    return {
      id: ""
    };
  },
  created() {
    this.id = g.user_id;
  }
};
</script>




<style scoped>
.bg_g {
  background-color: #07c160;
}

.text {
  text-align: center;
  font-size: 25px;
  color: white;
}

.pad_10 {
  padding: 10px 0px;
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

.MyBGColor {
  background-color: #009788;
  width: 95vw;
  height: 6vh;
}

.btncss {
  border: #009788;
  width: 95vw;
  height: 6vh;
}

.tip{
  text-align: center;
  color:gray;
  font-size:12px;
}
</style>