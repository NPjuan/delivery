<template>
  <div class="hei100">
    <div class="out">
      <van-nav-bar title="我的" left-arrow @click-left="$router.push('/homepage')" border class="nav" />

      <van-skeleton title avatar :row="3" avatar-size="65px" :loading="loading">
        <div class="context">
          <div class="headpc dis_bl">
            <img :src="headPic" alt="头像" width="64px" />
          </div>
          <div class="userInfo dis_bl">
            <div class="f_s_big username">{{username}}</div>
            <div class="otherInfo">
              <div class="dis_bl f_s_te">{{role}}</div>
              <div class="dis_bl f_s_te">id: {{id}}</div>
              <div class="dis_bl" id="userset"></div>
            </div>
          </div>
        </div>
      </van-skeleton>

      <van-cell-group>
        <van-cell title="钱包" icon="gold-coin-o" is-link to="/setting" />
        <van-cell title="订单" icon="notes-o" is-link to="/setting" />
        <van-cell title="积分" icon="points" is-link to="/setting" />
        <van-cell title="消息" icon="comment-circle-o" is-link to="/setting" />
      </van-cell-group>

      <van-cell-group>
        <van-cell title="设置" icon="setting-o" is-link to="/setting" />
      </van-cell-group>
    </div>
  </div>
</template>



<script>
import g from "./global";

export default {
  data() {
    return {
      username: "用户名",
      headPic: "http://47.96.231.75:8080/uploads/headPortraits/default.jpg",
      role: "身份",
      id: "id",
      userData: "",

      //正在加载
      loading: true
    };
  },
  mounted() {
    //从store中获取信息
    this.userData = this.$store.state.userData;

    //赋值用户名
    this.username = this.userData.userInfo.name;

    //赋值头像
    if (this.userData.userInfo.avatar !== "") {
      let url = "http://47.96.231.75:8080";
      this.headPic = url + this.userData.userInfo.avatar;
    }

    //赋值身份
    if (this.userData.user.role == 0) {
      this.role = "游客";
    } else if (this.userData.user.role == 1) {
      this.role = "用户";
    } else if (this.userData.user.role == 2) {
      this.role = "司机";
    } else if (this.userData.user.role == 3) {
      this.role = "管理员";
    }

    //赋值id
    this.id = this.userData.user.authId;

    //加载完毕
    this.loading = false;
  },
  beforeRouteEnter(to, from, next) {

    next();
  },
  methods: {
    ajax(data, url, func) {
      var ajax = new XMLHttpRequest();
      var stringData = JSON.stringify(data);
      ajax.open("post", "http://47.96.231.75:8080/deliver" + url);
      ajax.setRequestHeader("Content-type", "application/json;charset=UTF-8");
      ajax.onreadystatechange = () => {
        if (ajax.readyState == 4 && ajax.status == 200) {
          var json = JSON.parse(ajax.responseText);
          this[func](json);
        }
      };
      ajax.send(stringData);
    }
  }
};
</script>


<style scoped>
/* 快捷 */

.mt_0 {
  margin-top: 0 !important;
}

.dis_bl {
  display: inline-block;
}

.f_s_big {
  font-size: 20px;
  font-weight: bold;
}

.f_s_te {
  font-size: 15px;
  color: #7f7f7f;
}

/* 样式 */
.headpc {
  border-radius: 5px;

  vertical-align: top;
  overflow: hidden;
}

.userInfo {
  border: transparent;
  padding: 5px 10px;
  height: 64px;
}

.username {
  padding: 5px 0px;
  padding-top: 2px;
}

.otherInfo {
  padding: 10px 0px;
}

.out {
  height: 100vh;
  background-color: #ededed;
}
.context {
  height: 70px;
  padding: 20px 30px;
  padding-top: 70px;
  background-color: #ffffff;
  border-bottom: rgb(214, 214, 214) 1px solid;
}

#userSet {
  float: right;

  width: 15px;
  height: 15px;
  background-image: url("../../assets/image/userInfo/右箭头.svg");
  background-position: 50% 50%;
  background-size: 20px;

  vertical-align: sub;
}

.context_C {
  height: 40px;
  background-color: white;
  margin-top: 20px;
  padding: 5px 10px;
}

.context_C > div {
  /* height: 100%; */
  line-height: 40px;
  vertical-align: middle;
}

.van-cell-group {
  margin: 2vh auto;
}

.van-skeleton {
  padding-top: 2vh;
  padding-bottom: 2vh;
  background-color: white;
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

/* we */
</style>
