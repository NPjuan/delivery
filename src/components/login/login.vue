<!-- //登录界面 -->
<template id="page7">
  <div class="hei100">
    <!-- 登录界面 -->

    <img src="..\..\assets\image\userInfo\login_bg.png" width="100vw" style="width:100vw" />

    <!-- 返回键 -->
    <div class="van-nav-bar__left arrow">
      <!-- <i @click="$router.back(-1)" class="van-icon van-icon-arrow-left van-nav-bar__arrow"></i> -->
      <i @click="$router.push('/homepage')" class="van-icon van-icon-arrow-left van-nav-bar__arrow"></i>
    </div>

    <!-- 密码和用户名输入框 -->
    <van-cell-group class="pos_1">
      <van-field
        v-model="username"
        clearable
        label="用户名"
        right-icon="question-o"
        placeholder="请输入用户名"
        left-icon="user-o"
        @click-right-icon="$toast('使用手机号或者id登录')"
      />

      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        left-icon="hotel-o"
      />
    </van-cell-group>

    <!-- 登录按钮 -->
    <div class="pos_1 btn">
      <van-button type="primary" size="large" @click="login">
        <van-loading size="24px" type="spinner" color="white" v-show="show1" />
        {{login_msg}}
      </van-button>
    </div>

    <!-- 找回密码 && 登录 -->
    <div>
      <router-link class="ib" style="float:left" tag="div" to="/password">找回密码</router-link>
      <router-link class="ib" style="float:right" tag="div" to="/idselect">注册</router-link>
    </div>
  </div>
</template>


<script>
import g from "./global";
import { timeout } from "q";
export default {
  data() {
    return {
      pass: false,

      //账号密码
      username: "",
      password: "",

      //登录加载圈圈切换
      show1: false,
      login_msg: "登录",

      //登录地址
      loginip: "/user/login.do"
    };
  },
  mounted() {

  },

  beforeRouteEnter(to, from, next) {
    next();
  },
  beforeRouteLeave(to, from, next) {
    next();
  },
  methods: {
    //登录按钮
    login() {
      //加载圈出现，登录文字隐藏
      this.show1 = true;
      this.login_msg = "";

      this.axios
        .post(this.$store.state.ip + this.loginip, {
          id: this.username,
          password: this.password
        })
        .then(i => {
          this.show1 = false;
          this.login_msg = "登录";

          //保存用户信息
          g.l_user = i.data.data;
          //登录失败
          if (i.data.code == 1) {
            this.$toast.fail(i.data.msg);
          } else {


            //登陆成功
            this.$toast.success(i.data.msg);
            this.pass = true;

            //登录成功状态保存-->已成功
            this.$store.dispatch("userLogin", true);
            this.$store.dispatch("userData", i.data.data);
    
            //localStorage本地存储
            localStorage.setItem("Flag", "isLogin");
            localStorage.setItem('userData', JSON.stringify(i.data.data));

            
            
            //跳转至个人信息页面
            this.$router.push({ path: "/myInfo" });
          }
        })
        .catch(e => {
          console.info(e);
        });
    }
  }
};
</script>




<style scoped>
.loading {
  color: white;
}

.arrow {
  position: absolute;

  top: 2vh;
}

.pos_1 {
  /* width: 90vw; */
  padding-top: 6vh;
}

.btn {
  width: 95vw;

  margin: 0 auto;
}

.ib {
  display: inline-block;
  padding: 20px 10px;
  color: gray;
  font-size: 16px;
}
</style>
