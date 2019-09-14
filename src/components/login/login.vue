<!-- //登录界面 -->
<template id="page7">
  <div class="hei100">
    <!-- <div class="van-doc-nav-bar van-nav-bar van-hairline--bottom" style="z-index: 1;">
      <div class="van-nav-bar__left">
        <i @click="$router.back(-1)" class="van-icon van-icon-arrow-left van-nav-bar__arrow"></i>
      </div>
      <div class="van-nav-bar__title van-ellipsis">个人登录</div>
      <div class="van-nav-bar__right"></div>
    </div>-->

    <img src="..\..\assets\image\userInfo\login_bg.png" width="100vw" style="width:100vw" />
    <div class="van-nav-bar__left arrow">
      <i @click="$router.back(-1)" class="van-icon van-icon-arrow-left van-nav-bar__arrow"></i>
    </div>

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

    <div class="pos_1">
      <van-button type="primary" size="large" to="/myInfo">
        <van-loading size="24px" type="spinner" color="white" v-show="show1" />
        {{login}}
      </van-button>
    </div>
  </div>
</template>








<script>
import g from "./global";
export default {
  data() {
    return {
      pass: false,
      username: "",
      password: "",
      show1: false,
      login: "登录"
    };
  },

  beforeRouteLeave(to, from, next) {
    console.log(to);

    if (to.path == "/loginselect") {
      next();
      return;
    }

    if (this.pass == true) {
      g.login_status = true;
      next();
    }
    // ...
    var data = {
      id: this.username,
      password: this.password
    };
    this.show1 = true;
    this.login = "";
    this.ajax(data, "/user/login.do", "loginss");
  },
  methods: {
    loginss(i) {
      g.l_user = i.data;
      console.log(g.l_user);
      if (i.code == 1) {
        this.$toast.fail(i.msg);
        this.show1 = false;
        this.login = "登录";
      } else {
        this.$toast.success(i.msg);
        console.log(this.pass);
        this.pass = true;

        this.$router.push({ path: "/myInfo" });
      }
    },
    ajax(data, url, func) {
      //创建ajax
      var ajax = new XMLHttpRequest();
      var stringData = JSON.stringify(data);
      //请求行(发送方式/发送目标url)
      ajax.open("post", "http://47.96.231.75:8080/deliver" + url);
      //   ajax.open("post", "http://192.168.1.102:8080" + url);
      //请求头
      ajax.setRequestHeader("Content-type", "application/json;charset=UTF-8");
      //回调函数
      ajax.onreadystatechange = () => {
        if (ajax.readyState == 4 && ajax.status == 200) {
          //接受返回的json
          var json = JSON.parse(ajax.responseText);
          // window[func](json);
          this[func](json);
        }
      };
      //请求主体(请求发送)
      ajax.send(stringData);
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
  padding-top: 3vh;
}
</style>