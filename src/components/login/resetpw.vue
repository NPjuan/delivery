<!-- //重新设置密码 -->
<template id="page7">
  <div class="hei100">
    <van-nav-bar title="设置新密码" @click-left="$router.back(-1)" />

    <van-cell-group>
      <van-field
        type="password"
        v-model="password"
        label="密码"
        placeholder="请输入密码"
        :error-message="errormessage2"
        right-icon="question-o"
        @keyup="passwordCheck"
        @click-right-icon="$toast('字母、数字、特殊字符最少2种组合,长度为6-16字符')"
      />

      <van-field
        type="password"
        v-model="password2"
        label="再输入密码"
        placeholder="请再次输入密码"
        :error-message="errormessage"
        @keyup="passwordCheck"
      />
      <div class="text1">**字母、数字、特殊字符最少2种组合,长度为6-16字符**</div>

      <van-button type="primary" @click="next" size="small" class="MyBGColor btncss">完成修改</van-button>
    </van-cell-group>
  </div>
</template>

<script>
import g from "./global";
export default {
  data() {
    return {
      //密码
      password: "",
      //二次密码
      password2: "",

      //错误提示
      errormessage: "",
      errormessage2: "",

      phone: "",

      passwordF1: false,
      passwordF2: false,

      //是否禁用
      disabled: true
    };
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
    },

    passwordCheck() {
      //密码格式验证
      {
        let re = /(?!.*[\u4E00-\u9FA5\s])(?!^[a-zA-Z]+$)(?!^[\d]+$)(?!^[^a-zA-Z\d]+$)^.{6,16}$/;

        //判断密码格式
        if (re.test(this.password)) {
          this.errormessage2 = "";
          this.passwordF1 = true;
        } else {
          this.errormessage2 = "密码不符合规范";
        }

        if (this.password == this.password2 && this.password != "") {
          this.errormessage = "";
          this.passwordF2 = true;
        } else {
          this.errormessage = "密码输入不一致";
          if (this.passwordF1 == true && this.passwordF2 == true) {
            this.disabled = true;
          }
        }
      }
    },

    sent() {
      this.disabled = true;
    },
    next() {
      if (this.passwordF1 && this.passwordF2) {
        let data = {
          phone: this.phone,
          password: this.password2
        };

        this.ajax(data, "/user/updatePassword.do", "resetpw");
      }
    },
    resetpw(i) {
      if (i.code == 0) {
        this.$toast.success("密码修改成功!");
        this.$router.push({
          path: "/login"
        });
      } else {
        this.$toast.fail("密码修改失败!");
      }
    }
  },
  mounted() {
    this.phone = g.pwphone;
  }
};
</script>




<style scoped>
.text1 {
  height: 20px;
  font-size: 12px;
  margin: 10px 0px;
  color: gray;
  text-align: center;
}

.MyBGColor {
  background-color: #009788;
  border: #009788;
  width: 95vw;
  height: 6vh;
}

.btncss {
  width: 100vw;
  margin-top: 3vh;
}

</style>
