<template id="page7">
  <!-- 找回密码界面 -->
  <div class="hei100">
    <van-nav-bar title="找回密码" left-arrow @click-left="$router.back(-1)" />

    <van-cell-group>
      <van-field v-model="phone" clearable label="手机号" placeholder="请输入您的手机号" @blur="phoneGCheck"  @keyup="checkmsg" :error-message="errormessage"/>

      <van-field
        v-model="sms"
        center
        clearable
        label="短信验证码"
        placeholder="请输入短信验证码"
        @keyup="checkmsg"
        :error-message="errormessage2"
      >
        <van-button
          slot="button"
          size="small"
          type="primary"
          @click="sent"
          :disabled="disabled"
          class="sent"
        >{{codemsg}}</van-button>
      </van-field>

      <van-button type="primary" @click="next" size="large" :disabled="disabled2">下一步</van-button>
    </van-cell-group>
  </div>
</template>

<script>
import g from "./global";
export default {
  data() {
    return {
      //手机号
      phone: "",
      //验证码
      sms: "",
      codemsg: "发送验证码",

      //是否禁用
      disabled: false,
      disabled2: true,
      count: 60,
      errormessage:"",
      errormessage2: "",

      //是否发送过验证码
      codeF:false,
    };
  },

  methods: {
    sent() {
      this.disabled = true;
      //存为json格式
      var data = {
        phone: this.phone
      };
      this.codeF = true;
      //手机号传至后台，并发送验证码
      this.ajax(data, "/user/getPhoneCode.do", "codeSent");
    },
    next() {
      //判断是否输入了验证码
      if (this.sms == "") {
        return;
      }
      let codetime = undefined;
      codetime = new Date().getTime();
      let data = {
        code: this.sms,
        time: codetime,
        codeData: g.user_code.data
      };
      this.ajax(data, "/user/checkPhoneCode.do", "codeCheck");
    },
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
    //收到后台响应并执行返回数据
    codeSent(i) {
      //获取目标元素
      let btn = document.getElementsByClassName("sent")[0];
      //若成功发送验证码
      if (i.code == 0) {
        g.user_code.data = i.data;
        let time = setInterval(() => {
          this.codemsg = this.count + "s重新发送";
          //若倒计时结束,则重置
          if (this.count == 0) {
            this.count = 60;
            this.disabled = false;
            this.codemsg = "发送验证码";
            clearInterval(time);
          }
          this.count--;
        }, 1000);
      } else {
        //验证码发送失败
        this.$toast.fail("验证码发送失败,请稍后再试!");
        this.disabled = false;
      }
    },

    //核对验证码验证的回调函数
    codeCheck(i) {
      if (i.code == 0) {
        // g.register_judge.code = true;
        g.pwphone = this.phone;
        this.$router.push({ path: `/resetpw` });
      } else {
        this.errormessage2 = "验证码错误";
      }
    },
    checkmsg() {
      if (this.sms != "" && this.phone != ""&&!(this.errormessage == "该手机号未注册")&&this.codeF) {
        this.disabled2 = false;
      } else {
        this.disabled2 = true;
      }
    },

    //离开焦点时验证手机格式输入
    phoneGCheck() {
      //手机正则验证
      let re = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
      let tel_value = this.phone;
      //若手机符合格式则验证是否已经注册
      if (re.test(tel_value)) {
        this.errormessage = "";
        var data = {
          phone: tel_value
        };
        //发送手机号至后台并返回查询结果
        this.ajax(data, "/user/checkPhone.do", "phoneCheck");
      } else {
        //若填写格式错误则提示
        this.errormessage = "请输入正确的手机格式";
      }
    },
    //对手机验证返回值进行操作
    phoneCheck(i) {
      if (i.code == 0) {
        this.disabled2 = true;
        this.errormessage = "该手机号未注册,请先注册!"
      } else {
        // g.register_judge.phone = false;
      }
    }
  }
};
</script>




<style scoped>

/* .van-cell-group{
  margin-top: 10vh;
} */
</style>
