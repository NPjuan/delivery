<template>
  <div class="hei100 bg">
    <!-- 导航栏 -->
    <van-nav-bar title="设置" left-arrow @click-left="$router.back(-1)" border class="nav" />

    <!-- 用户信息设置 -->
    <van-cell-group>
      <!-- 头像设置 -->
      <van-cell title="头像" is-link border @click="show1=true">
        <van-image round width="24px" height="24px" :src="imgSrc" style="vertical-align: bottom;" />
      </van-cell>
      <!-- id设置 -->
      <van-cell title="ID" :value="id" border />
      <!-- 昵称设置 -->
      <van-cell title="昵称" :value="username" is-link border @click="show2=true" />
      <!-- 性别设置 -->
      <van-cell title="性别" :value="gender" is-link border @click="show3=true" />
      <!-- 手机号设置 -->
      <van-cell title="手机号" :value="phone" is-link border @click="show4=true" />
      <!-- 出生日期设置 -->
      <van-cell title="出生日期" :value="birthday" is-link border />
    </van-cell-group>

    <van-cell-group>
      <van-cell title="修改密码" is-link to="/resetpw" />
    </van-cell-group>
    <van-cell-group>
      <van-cell title="退出登录" style="text-align: center;" @click="cancel" class="cl" />
    </van-cell-group>

    <!-- -------------------弹出选项------------------- -->

    <!-- 头像更换弹出 -->
    <van-action-sheet
      v-model="show1"
      :actions="imgSrcC"
      @select="onSelect1"
      close-on-click-action
      cancel-text="取消"
    />

    <!-- 名称弹出层 -->
    <van-dialog
      v-model="show2"
      title="用户名"
      show-cancel-button
      class="Rusername"
      confirm-button-color="#07c160"
      @confirm="onSelect2"
    >
      <input type="text" placeholder="请输入2~12位用户名" class="inputUsername" />
    </van-dialog>

    <!-- 性别更换弹出 -->
    <van-action-sheet
      v-model="show3"
      :actions="genderC"
      @select="onSelect3"
      close-on-click-action
      cancel-text="取消"
    />

    <!-- 更换手机号弹出 -->
    <van-action-sheet
      v-model="show4"
      :actions="phoneC"
      @select="onSelect4"
      close-on-click-action
      cancel-text="取消"
    />
  </div>
</template>



<script>
export default {
  data() {
    return {
      userData: "", // 用户信息存储

      //头像地址
      imgSrc: "",
      imgSrcC: [{ name: "拍照" }, { name: "从相册中选择" }],
      show1: false,

      //id
      id: "",

      //昵称
      username: "",
      show2: false,

      //性别
      gender: "",
      genderC: [{ name: "男" }, { name: "女" }],
      show3: false,

      //手机号
      phone: "",
      phoneC: [{ name: "更换手机号" }],
      show4: false,

      //出生日期
      birthday: "",
      birthdayC: [{ name: "拍照" }, { name: "从相册中选择" }, { name: "取消" }],
      show5: false
    };
  },
  mounted() {
    //从store中获取信息
    this.userData = this.$store.state.userData;
    {
      //赋值头像
      if (this.userData.userInfo.avatar !== "") {
        let url = "http://47.96.231.75:8080";
        this.imgSrc = url + this.userData.userInfo.avatar;
      }
      //赋值id
      this.id = this.userData.user.authId;

      //赋值用户名
      this.username = this.userData.userInfo.name;

      //赋值性别
      this.gender = this.userData.userInfo.gender;

      //赋值手机
      this.phone = this.userData.user.phone;

      //赋值出生日期
      this.birthday = this.userData.userInfo.birthday;
    }
  },
  beforeRouteEnter(to, from, next) {
    next();
  },
  methods: {
    //   选择头像设置
    onSelect1(item) {
      this.$toast(item.name);
    },
    //确定---->提交更新的用户名
    onSelect2() {},
    //选择性别设置
    onSelect3() {},
    //手机号设置
    onSelect4() {},
    //注销
    //清空用户信息
    cancel() {
      //清除localStorage
      localStorage.removeItem("Flag");
      localStorage.removeItem("userData");

      //清除store
      this.$store.dispatch("userLogin", false);
      this.$store.dispatch("userData", this.userData);

      //登录
      this.$toast.success("注销成功!");
      this.$router.push("/homepage");
    }
  }
};
</script>


<style scoped>
.bg {
  background-color: #f5f5f5;
}
.van-cell-group {
  margin: 2vh auto;
}
.nav {
  background-color: #07c160;
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

.cl:active {
  background-color: #f2f3f5;
}

.Rusername {
  text-align: center;
}

.inputUsername {
  padding-top: 3vh;
  padding-bottom: 1vh;
  border-bottom: 2px solid #07c160;
}
</style>
