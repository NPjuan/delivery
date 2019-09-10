<!-- 手机号注册 -->
<template id="page3">
  <div class="hei100">
    <div class="van-doc-nav-bar van-nav-bar van-hairline--bottom" style="z-index: 1;">
      <div class="van-nav-bar__left">
        <i @click="$router.back(-1)" class="van-icon van-icon-arrow-left van-nav-bar__arrow"></i>
      </div>
      <div class="van-nav-bar__title van-ellipsis">注册</div>
      <div class="van-nav-bar__right"></div>
    </div>
    <section class="van-doc-demo-section demo-field test111">
      <section class="van-doc-demo-block">
        <h2 class="van-doc-demo-block__title">手机注册</h2>
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
                />
              </div>
              <div class="van-field__error-message tip"></div>
            </div>
          </div>
        </div>
      </section>
      <div class="test_drag ver_m10">
        <div class="test_bg"></div>
        <div class="test_text">请拖动滑块验证</div>
        <div class="test_btn">>></div>
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
                />
                <div class="van-field__button">
                  <button class="van-button van-button--primary van-button--small sent">
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
        <h2 class="van-doc-demo-block__title">密码</h2>
        <div class="van-cell-group van-hairline--top-bottom">
          <div class="van-cell van-field">
            <div class="van-cell__value van-cell__value--alone">
              <div class="van-field__body">
                <input
                  type="password"
                  placeholder="请输入密码"
                  class="van-field__control"
                  name="password"
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
      <section style="text-align:center">
        <router-link
          to="/registersuccess"
          style="width: 100%;"
          class="van-button van-button--primary van-button--normal btn_pos btn_sent"
        >
          <span class="van-button__text">注册</span>
        </router-link>
      </section>
    </section>
  </div>
</template>


<script>
//引用模块进来
import g from "./global";
export default {
  data() {
    return {
      evidence: "",
      count: 60,
      errorTip1:false,
    };
  },
  methods: {
    ajax(data, url, func) {
      //创建ajax
      var ajax = new XMLHttpRequest();
      var stringData = JSON.stringify(data);
      //请求行(发送方式/发送目标url)
      // ajax.open("post", "http://192.168.1.104:8080" + url);
      ajax.open("post", "http://47.96.231.75:8080/deliver" + url);
      //请求头
      // ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
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
    },
    //离开焦点时验证手机格式输入
    phoneGCheck() {
      //手机输入验证
      //获取目标元素
      console.log("发送手机检查是否被使用");
      let phone = document.getElementsByClassName("phone")[0];
      //获取提示数组
      let tip = document.getElementsByClassName("tip")[0];
      //离开焦点时验证手机格式输入
      //手机正则验证
      let re = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
      let tel_value = phone.value;
      //若手机符合格式则验证是否已经注册
      if (re.test(tel_value)) {
        var data = {
          phone: tel_value
        };
        //发送手机号至后台并返回查询结果
        this.ajax(data, "/user/checkPhone.do", "phoneCheck");
      } else {
        //若填写格式错误则提示
        tip.innerHTML = "请输入正确的手机格式";
        tip.style.color = "red";
      }
    },
    //对手机验证返回值进行操作
    phoneCheck(i) {
      let tip = document.getElementsByClassName("tip")[0];
      if (i.code == 0) {
        tip.innerHTML = i.msg;
        tip.style.color = "green";
        g.register_judge.phone = true;
      } else {
        tip.innerHTML = i.msg;
        tip.style.color = "red";
        g.register_judge.phone = false;
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
            btn.style.color = "green";
            bg.style.backgroundColor = "#07c160";
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
    YZtime() {
      //验证码发送和倒计时
      //获取目标元素
      let phone = document.getElementsByClassName("phone")[0];
      let btn = document.getElementsByClassName("sent")[0];
      //点击按钮发送验证码
      btn.onclick = () => {
        console.log("点击发送验证码");
        if (btn.style.backgroundColor == "gray") {
          return;
        }
        //存为json格式
        var data = {
          phone: phone.value
        };
        //手机号传至后台，并发送验证码
        this.ajax(data, "/user/getPhoneCode.do", "codeSent");
      };
    },
    //收到后台响应并执行返回数据
    codeSent(i) {
      //获取目标元素
      let btn = document.getElementsByClassName("sent")[0];
      //若成功发送验证码
      if (i.code == 0) {
        g.user_code.data = i.data;
        let time = setInterval(() => {
          console.log(this.count);
          btn.style.backgroundColor = "gray";
          btn.innerHTML = this.count + "s重新发送";
          //若倒计时结束,则重置
          if (this.count == 0) {
            this.count = 60;
            btn.style.backgroundColor = "#07c160";
            btn.innerHTML = "发送验证码";
            clearInterval(time);
          }
          this.count--;
        }, 1000);
      } else {
        //验证码发送失败
        this.$toast.fail('验证码发送失败,请稍后再试!');
      }
    },
    //验证码验证
    YZcheck() {
      let code = document.getElementsByName("code")[0];
        if(code.value ==''){
          return;
        }
      var codetime = undefined;
      codetime = new Date().getTime();
      var data = {
        code: code.value,
        time: codetime,
        codeData: g.user_code.data
      };
      this.ajax(data, "/user/checkPhoneCode.do", "codeCheck");
    },
    //核对验证码验证的回调函数
    codeCheck(i) {
      if (i.code == 0) {
        g.register_judge.code = true;
      } else {
        let tip = document.getElementsByClassName("tip")[1];
        tip.innerHTML = i.msg;
        tip.style.color = "red";
        g.register_judge.code = false;
      }
    },
    //密码验证
    passwordCheck() {
      //密码格式验证
      {
        let re = /(?!.*[\u4E00-\u9FA5\s])(?!^[a-zA-Z]+$)(?!^[\d]+$)(?!^[^a-zA-Z\d]+$)^.{6,16}$/;
        let tipp = document.getElementsByClassName("tipp");
        let pw = document.getElementsByName("password");
        //聚焦时显示密码格式
        pw[0].onfocus = function() {
          tipp[0].innerHTML = "字母、数字、特殊字符最少2种组合,长度为6-16字符";
          tipp[0].style.color = "gray";
        };
        pw[0].onkeyup = function() {
          if (re.test(pw[0].value)) {
            tipp[0].innerHTML = "密码符合规范";
            tipp[0].style.color = "green";
            g.register_judge.password1 = true;
          } else {
            tipp[0].innerHTML = "密码不符合规范";
            tipp[0].style.color = "red";
            g.register_judge.password1 = false;
          }
        };
        pw[1].onblur = function() {
          if (pw[0].value == pw[1].value && pw[1].value != "") {
            tipp[1].innerHTML = "密码输入一致";
            tipp[1].style.color = "green";
            g.register_judge.password2 = true;
          } else {
            tipp[1].innerHTML = "密码输入不一致";
            tipp[1].style.color = "red";
            g.register_judge.password2 = false;
          }
        };
      }
    },
    //提交注册
    //提交注册后的回调函数
    registerAfter(i) {
      if (i.code == 0) {
        g.user_id = i.data.userAuthId;
        g.user_msg.userInfo.uid = i.data.userId;
        g.user_msg.area.uid = i.data.userId;
        let idd = document.getElementsByClassName("user_id")[0];
        idd.innerHTML = g.user_id;
        // alert("注册成功!");
      } else {
        // alert("注册失败");
      }
    },
    show() {
      let show = document.getElementsByClassName("administratoron")[0];
      if (g.user_msg.userInfo.role == "管理员") {
        show.style.display = "block";
      }
    }
  },
  mounted() {
    console.log(g.user_msg.userInfo.role);
    this.show();
    this.YZtime();
    this.test_drag();
    this.passwordCheck();
    console.log(g.user_msg);
  },
  created() {
    g.user_msg.userInfo.role = this.$route.query.status;
  },
  beforeRouteLeave(to, from, next) {
    //获取目标元素
    console.log(to.name);
    if ((to.name == "registersuccessLink")) {
      let up = document.getElementsByClassName("btn_sent")[0];
      let phone = document.getElementsByName("phone")[0];
      let pw = document.getElementsByName("password")[0];
      let ju =
        g.register_judge.phone &&
        g.register_judge.password1 &&
        g.register_judge.password2 &&
        g.register_judge.code &&
        g.register_judge;
      if (ju) {
        let data = {
          //用户注册手机号
          phone: phone.value,
          //用户密码
          password: pw.value,
          //用户身份
          registerRole: g.user_msg.userInfo.role
        };
        if (g.user_msg.userInfo.role == "管理员") {
          if(this.evidence == ''){
            this.errorTip1 = true;
            return;
          }
          data.evidence = this.evidence;
        }
        this.ajax(data, "/user/register.do", "registerAfter");
        next();
      } else {
        //若有信息未填写则提示
        if (!g.register_judge.phone) {
          let tip = document.getElementsByClassName("tip")[0];
          tip.innerHTML = "请输入注册手机号";
          tip.style.color = "red";
        }
        if (!g.register_judge.code) {
          let tip = document.getElementsByClassName("tip")[1];
          tip.innerHTML = "请输入正确验证码";
          tip.style.color = "red";
        }
        if (!g.register_judge.password1) {
          let tip = document.getElementsByClassName("tipp")[0];
          tip.innerHTML = "请输入密码";
          tip.style.color = "red";
        }
        if (!g.register_judge.password2) {
          let tip = document.getElementsByClassName("tipp")[1];
          tip.innerHTML = "密码请填写一致";
          tip.style.color = "red";
        }
      }
      return;
    }

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
  height: 40px;
  border: 1px solid #afd2bf;
  background-color: #fff;

  color: #afd2bf;
  font-weight: bolder;
  text-align: center;
  line-height: 38px;

  user-select: none;
  cursor: move;
}
</style>
