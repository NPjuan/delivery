<!-- 手机号注册 -->
<template id="page3">
  <div class="hei100">
    <!-- 导航栏 -->
    <van-nav-bar title="注册" left-arrow @click-left="$router.back(-1)" border class="nav" />

    <section class="van-doc-demo-section demo-field test111">
      <section class="van-doc-demo-block">
        <h2 class="van-doc-demo-block__title" style="color:#009788">手机注册</h2>
        <div class="van-cell-group van-hairline--top-bottom">
          <div class="van-cell van-field">
            <div class="van-cell__value van-cell__value--alone">
              <div class="van-field__body">
                <input
                  @blur="phoneGCheck"
                  type="text"
                  placeholder="请输入手机号"
                  class="van-field__control phone"
                  name="phone"
                  v-model="userphone"
                />
              </div>
              <div class="van-field__error-message tip"></div>
            </div>
          </div>
        </div>
      </section>
      <div class="test_drag ver_m10">
        <div class="test_bg"></div>
        <div class="test_text" style="font-size:15px">请拖动滑块验证</div>
        <div class="test_btn" style="font-size:20px">>></div>
      </div>
      <section class="van-doc-demo-block showoff">
        <!-- <h2 class="van-doc-demo-block__title">插入按钮</h2> -->
        <div class="van-cell-group van-hairline--top-bottom">
          <div class="van-cell van-cell--center van-field">
            <!-- <div class="van-cell__title van-field__label"> -->
            <!-- <span>短信验证码</span> -->
            <!-- </div> -->
            <div class="van-cell__value">
              <div class="van-field__body">
                <input
                  @blur="YZcheck"
                  type="text"
                  placeholder="请输入六位数字短信验证码"
                  name="code"
                  class="van-field__control"
                  onkeyup="this.value=this.value.replace(/\D/g,'')"
                  onafterpaste="this.value=this.value.replace(/\D/g,'')"
                  maxlength="6"
                  v-model="code"
                />
                <div class="van-field__button">
                  <button
                    class="van-button van-button--primary van-button--small sent"
                    @click="sentCode"
                  >
                    <span class="van-button__text">发送验证码</span>
                  </button>
                </div>
              </div>
              <div class="van-field__error-message tip"></div>
            </div>
          </div>
        </div>
      </section>
      <section class="van-doc-demo-block showoff">
        <h2 class="van-doc-demo-block__title" style="color:#009788">密码</h2>
        <div class="van-cell-group van-hairline--top-bottom">
          <div class="van-cell van-field">
            <div class="van-cell__value van-cell__value--alone">
              <div class="van-field__body">
                <input
                  type="password"
                  placeholder="请输入密码"
                  class="van-field__control"
                  name="password"
                  v-model="password"
                  @keyup="passwordCheck1"
                  @focus="passwordMsg"
                />
              </div>
              <div class="van-field__error-message tipp"></div>
            </div>
          </div>
        </div>
      </section>
      <section class="van-doc-demo-block showoff">
        <div class="van-cell-group van-hairline--top-bottom">
          <div class="van-cell van-field">
            <div class="van-cell__value van-cell__value--alone">
              <div class="van-field__body">
                <input
                  type="password"
                  placeholder="请再次确认密码"
                  name="password"
                  class="van-field__control"
                  v-model="password2"
                  @keyup="passwordCheck2"
                />
              </div>
              <div class="van-field__error-message tipp"></div>
            </div>
          </div>
        </div>

        <van-cell-group class="administratoron">
          <van-field
            v-model="evidence"
            :error="errorTip1"
            required
            clearable
            label="管理员证明"
            right-icon="question-o"
            placeholder="请填写管理员证明"
            @click-right-icon="$toast('填写相关的证明,用来核实管理员身份')"
          />
        </van-cell-group>
      </section>

      <van-button type="primary" size="small" @click="register" class="MyBGColor btncss btn_sent">注册</van-button>
    </section>
  </div>
</template>


<script>
//引用模块进来
import g from "./global";
export default {
  data() {
    return {
      registerip: "/user/register.do",
      phoneCheckip: "/user/checkPhone.do",
      sentCodeip: "/user/getPhoneCode.do",
      codeCheckip: "/user/checkPhoneCode.do",
      evidence: "",
      count: 60,
      errorTip1: false,
      //手机号填写值
      userphone: "",
      //密码填写值
      password: "",
      password2: "",
      //验证码填写值
      code: "",

      //验证填写值
      phoneC: false,
      password1C: false,
      password2C: false,
      codeC: false
    };
  },
  methods: {
    // 提交注册
    register() {
      //获取目标元素
      let up = document.getElementsByClassName("btn_sent")[0];
      let phone = document.getElementsByName("phone")[0];
      let pw = document.getElementsByName("password")[0];
      //判断是否填写
      let ju = this.phoneC && this.password1C && this.password2C && this.codeC;
      console.log("ju" == ju);
      console.log(this.password1C);
      console.log(this.password2C);

      if (ju) {
        console.log(1111111111111111);

        //开启管理员入口
        if (g.user_msg.userInfo.role == "3") {
          if (this.evidence == "") {
            this.errorTip1 = true;
            return;
          }
          data.evidence = this.evidence;
        }

        //发送注册请求
        this.axios
          .post(this.$store.state.ip + this.registerip, {
            //用户注册手机号
            phone: this.userphone,
            //用户密码
            password: this.password,
            //用户身份
            registerRole: g.user_msg.userInfo.role
          })
          .then(i => {
            //注册成功
            if (i.data.code == 0) {
              this.$toast.success(i.data.msg);
              g.user_id = i.data.data.userAuthId;
              g.user_msg.userInfo.uid = i.data.data.userId;
              g.user_msg.area.uid = i.data.data.userId;
              this.$router.push("/registersuccess");
            } else {
              this.$toast.fail(i.data.msg);
              return;
            }
          })
          .catch(e => {
            console.info(e);
          });
      } else {
        //若有信息未填写则提示
        if (!this.phoneC) {
          let tip = document.getElementsByClassName("tip")[0];
          tip.innerHTML = "请输入注册手机号";
          tip.style.color = "red";
        }
        if (!this.codeC) {
          let tip = document.getElementsByClassName("tip")[1];
          tip.innerHTML = "请输入正确验证码";
          tip.style.color = "red";
        }
        if (!this.password1C) {
          let tip = document.getElementsByClassName("tipp")[0];
          tip.innerHTML = "请输入密码";
          tip.style.color = "red";
        }
        if (!this.password2C) {
          let tip = document.getElementsByClassName("tipp")[1];
          tip.innerHTML = "密码请填写一致";
          tip.style.color = "red";
        }
      }
    },
    //离开焦点时验证手机格式输入
    phoneGCheck() {
      let tip = document.getElementsByClassName("tip")[0];
      //离开焦点时验证手机格式输入
      //手机正则验证
      let re = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
      //若手机符合格式则验证是否已经注册
      if (re.test(this.userphone)) {
        this.axios
          .post(this.$store.state.ip + this.phoneCheckip, {
            //用户注册手机号
            phone: this.userphone
          })
          .then(i => {
            //注册成功
            if (i.data.code == 0) {
              tip.innerHTML = i.data.msg;
              tip.style.color = "green";
              console.log("手机号成功");
              this.phoneC = true;
            } else {
              tip.innerHTML = i.data.msg;
              tip.style.color = "red";
              this.phoneC = false;
            }
          })
          .catch(e => {
            console.info(e);
          });
      } else {
        //若填写格式错误则提示
        tip.innerHTML = "请输入正确的手机格式";
        tip.style.color = "red";
      }
    },
    //手机注册滑动验证
    test_drag() {
      var box = document.getElementsByClassName("test_drag")[0];
      var bg = document.getElementsByClassName("test_bg")[0];
      var text = document.getElementsByClassName("test_text")[0];
      var btn = document.getElementsByClassName("test_btn")[0];
      var success = false; //是否通过验证的初始化
      var distance = box.offsetWidth - btn.offsetWidth; //滑动成功的距离
      btn.ontouchstart = function(e) {
        //清除后面设置的过渡动画属性
        btn.style.transition = "";
        bg.style.transition = "";
        //获得手指按下时水平位置
        var downed = e.touches[0].clientX;
        document.ontouchmove = function(e) {
          //获得手指/手指移动时的水平位置
          // var moved = e.clientX;(pc端)
          var moved = e.touches[0].clientX;
          //手指的偏移量（手指移动时的位置 - 手指按下时的位置）
          var shifting = moved - downed;
          // console.log(shifting)
          //判断 手指拖动后的水平距离 与 滑动成功的距离 的关系
          if (shifting > distance) {
            shifting = distance; //如果滑块滑过终点，则停留在终点位置
          } else if (shifting < 0) {
            shifting = 0; //如果滑块滑过起点的左侧，则重置为起点位置
          }
          //根据手指移动的距离来动态设置滑块的偏移量和背景颜色的宽度
          btn.style.left = shifting + "px";
          bg.style.width = shifting + 20 + "px";
          //判断是否滑到了滑块成功的距离
          if (shifting == distance) {
            //滑动成功后开启输入密码的窗口
            let show = document.getElementsByClassName("showoff");
            show[0].style.display = "block";
            show[1].style.display = "block";
            show[2].style.display = "block";
            //通过验证 设置状态
            success = true;
            //滑动成功后的样式
            text.style.color = "white";
            btn.innerHTML = "✔";
            btn.style.color = "#009788";
            bg.style.backgroundColor = "#009788";
            text.innerHTML = "验证通过";
            //清除手指按下事件和移动事件
            // btn.onmousedown = null;
            // document.onmousemove = null;
            //pc端
            btn.ontouchstart = null;
            document.ontouchmove = null;
          }
        };
        document.ontouchend = function(e) {
          //如果手指松开时，已经滑到了终点，则验证通过
          if (success) {
            return;
          } else {
            //如果手指松开时，没有滑到终点，则滑块初始化位置
            btn.style.left = 0;
            bg.style.width = 0;
            btn.style.transition = "left 1s";
            bg.style.transition = "width 1s";
          }
          document.ontouchmove = null;
          document.ontouchup = null;
        };
      };
    },
    //验证码
    sentCode() {
      let btn = document.getElementsByClassName("sent")[0];
      if (btn.style.backgroundColor == "gray") {
        return;
      } else {
        this.axios
          .post(this.$store.state.ip + this.sentCodeip, {
            //发送验证码至手机
            phone: this.userphone
          })
          .then(i => {
            //验证码成功
            if (i.data.code == 0) {
              g.user_code.data = i.data.data;
              let time = setInterval(() => {
                btn.style.backgroundColor = "gray";
                btn.style.border = "gray";
                btn.innerHTML = this.count + "s重新发送";
                //若倒计时结束,则重置
                if (this.count == 0) {
                  this.count = 60;
                  btn.style.backgroundColor = "#009788";
                  btn.style.border = "#009788";
                  btn.innerHTML = "发送验证码";
                  clearInterval(time);
                }
                this.count--;
              }, 1000);
            } else {
              //验证码发送失败
              this.$toast.fail("验证码发送失败,请稍后再试!");
            }
          })
          .catch(e => {
            console.info(e);
          });
      }
    },
    //验证码验证
    YZcheck() {
      if (this.code == "") {
        return;
      }
      var codetime = new Date().getTime();

      this.axios
        .post(this.$store.state.ip + this.codeCheckip, {
          code: this.code,
          time: codetime,
          codeData: g.user_code.data
        })
        .then(i => {
          //验证码成功
          if (i.data.code == 0) {
            console.log("验证码成功");
            this.codeC = true;
          } else {
            let tip = document.getElementsByClassName("tip")[1];
            tip.innerHTML = i.msg;
            tip.style.color = "red";
            this.codeC = false;
          }
        })
        .catch(e => {
          console.info(e);
        });
    },
    passwordCheck1() {
      //密码验证正则
      let re = /(?!.*[\u4E00-\u9FA5\s])(?!^[a-zA-Z]+$)(?!^[\d]+$)(?!^[^a-zA-Z\d]+$)^.{6,16}$/;
      let tipp = document.getElementsByClassName("tipp");
      if (re.test(this.password)) {
        tipp[0].innerHTML = "密码符合规范";
        tipp[0].style.color = "green";
        this.password1C = true;
      } else {
        tipp[0].innerHTML = "密码不符合规范";
        tipp[0].style.color = "red";
        this.password1C = false;
      }
    },
    passwordCheck2() {
      let tipp = document.getElementsByClassName("tipp");
      if (this.password == this.password2 && this.password2 != "") {
        tipp[1].innerHTML = "密码输入一致";
        tipp[1].style.color = "green";
        this.password2C = true;
        console.log("密码2成功");
      } else {
        tipp[1].innerHTML = "密码输入不一致";
        tipp[1].style.color = "red";
        this.password2C = false;
      }
    },
    //提示
    passwordMsg() {
      let tipp = document.getElementsByClassName("tipp");
      //聚焦时显示密码格式
      tipp[0].innerHTML = "字母、数字、特殊字符最少2种组合,长度为6-16字符";
      tipp[0].style.color = "gray";
    },
    show() {
      let show = document.getElementsByClassName("administratoron")[0];
      if (g.user_msg.userInfo.role == "3") {
        show.style.display = "block";
      }
    }
  },
  created() {
    g.user_msg.userInfo.role = this.$route.query.status;
  },
  mounted() {
    this.show();
    this.test_drag();
  },
  beforeRouteLeave(to, from, next) {
    //获取目标元素
    next();
  }
};
</script>




<style scoped>
.test_drag {
  position: relative;

  height: 40px;
  background-color: white;

  line-height: 40px;
}

.test_bg {
  position: absolute;

  width: 0px;
  height: 100%;
  background-color: #afd2bf;
}

.test_text {
  position: absolute;

  width: 100%;
  height: 100%;
  color: #8d999f;

  text-align: center;

  user-select: none;
}

.test_btn {
  position: absolute;

  width: 40px;
  height: 34px;
  border: 3px solid #009788;
  background-color: #fff;

  color: #009788;
  font-weight: bolder;
  text-align: center;
  line-height: 38px;

  user-select: none;
  cursor: move;
}

.MyBGColor {
  background-color: #009788;
  width: 95vw;
  height: 6vh;
}

.btncss {
  width: 100vw;
  margin-top: 3vh;
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

.sent{
  background-color: #009788;
  border: #009788;
}
</style>
