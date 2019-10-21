<!-- //重新设置密码 -->
<template>
  <div class="demo">
    <svg class="sidebar" :viewBox="viewBox">
      <path class="s-path" fill="#fff" :d="_path" />
    </svg>
    <div class="static">
      <div class="static__text">拖动查看聊天目录</div>
    </div>
    <div class="sidebar-content">
      <div class="contact">
        <img src="../../assets/img/1.png" alt class="contact__photo" />
        <span class="contact__name">于翔</span>
        <span class="contact__status online"></span>
      </div>
      <div class="contact">
        <img src="../../assets/img/2.png" alt class="contact__photo" />
        <span class="contact__name">潘俊渊</span>
        <span class="contact__status online"></span>
      </div>
      <div class="contact">
        <img src="../../assets/img/3.png" alt class="contact__photo" />
        <span class="contact__name">佘焙桩</span>
        <span class="contact__status online"></span>
      </div>
      <div class="contact">
        <img src="../../assets/img/4.png" alt class="contact__photo" />
        <span class="contact__name">康俊彬</span>
        <span class="contact__status online"></span>
      </div>
      <div class="contact">
        <img src="../../assets/img/5.png" alt class="contact__photo" />
        <span class="contact__name">罗艺明</span>
        <span class="contact__status online"></span>
      </div>
      <div class="contact">
        <img src="../../assets/img/6.png" alt class="contact__photo" />
        <span class="contact__name">林乐涛</span>
        <span class="contact__status online"></span>
      </div>
      <div class="contact">
        <img src="../../assets/img/7.png" alt class="contact__photo" />
        <span class="contact__name">陈恩秦</span>
        <span class="contact__status"></span>
      </div>
      <div class="contact">
        <img src="../../assets/img/8.png" alt class="contact__photo" />
        <span class="contact__name">林加云</span>
        <span class="contact__status"></span>
      </div>
      <div class="contact">
        <img src="../../assets/img/9.png" alt class="contact__photo" />
        <span class="contact__name">田依凡</span>
        <span class="contact__status"></span>
      </div>
      <div class="contact">
        <img src="../../assets/img/1.png" alt class="contact__photo" />
        <span class="contact__name">蔡荣镔</span>
        <span class="contact__status"></span>
      </div>

      <div class="contact">
        <img src="../../assets/img/1.png" alt class="contact__photo" />
        <span class="contact__name">蔡荣镔</span>
        <span class="contact__status"></span>
      </div>
      <div class="contact">
        <img src="../../assets/img/1.png" alt class="contact__photo" />
        <span class="contact__name">蔡荣镔</span>
        <span class="contact__status"></span>
      </div>
      <div class="contact">
        <img src="../../assets/img/1.png" alt class="contact__photo" />
        <span class="contact__name">蔡荣镔</span>
        <span class="contact__status"></span>
      </div>
      <div class="contact">
        <img src="../../assets/img/1.png" alt class="contact__photo" />
        <span class="contact__name">蔡荣镔</span>
        <span class="contact__status"></span>
      </div>
      <div class="contact">
        <img src="../../assets/img/1.png" alt class="contact__photo" />
        <span class="contact__name">蔡荣镔</span>
        <span class="contact__status"></span>
      </div>
      <div class="contact">
        <img src="../../assets/img/1.png" alt class="contact__photo" />
        <span class="contact__name">蔡荣镔</span>
        <span class="contact__status"></span>
      </div>
      <div class="contact">
        <img src="../../assets/img/1.png" alt class="contact__photo" />
        <span class="contact__name">蔡荣镔</span>
        <span class="contact__status"></span>
      </div>
      <div class="contact">
        <img src="../../assets/img/1.png" alt class="contact__photo" />
        <span class="contact__name">蔡荣镔</span>
        <span class="contact__status"></span>
      </div>
      <div class="contact">
        <img src="../../assets/img/1.png" alt class="contact__photo" />
        <span class="contact__name">蔡荣镔</span>
        <span class="contact__status"></span>
      </div>
      <div class="contact">
        <img src="../../assets/img/1.png" alt class="contact__photo" />
        <span class="contact__name">蔡荣镔</span>
        <span class="contact__status"></span>
      </div>
      <div class="search">
        <img src="../../assets/img/t8TeL1S.png" alt class="search__img" />
        <input type="text" class="search__input" placeholder="搜索..." />
      </div>
    </div>
    <div class="chat">
      <span class="chat__back"></span>
      <span class="chat__status">在线</span>
      <div class="chat__person">
        <span class="chat__online active"></span>
        <span class="chat__name">Huehue Huehue</span>
      </div>

      <!-- 聊天内容 -->
      <div class="chat__messages" ref="out">
        <div class="chat__msgRow">
          <div class="chat__message mine">请问你地址在哪11111111111111111111111111111111111???</div>
        </div>
        <div class="chat__msgRow">
          <div class="chat__message notMine">广东工业大学阿达撒打算打算大声道按时11111111111111111学五号楼!!!</div>
        </div>
        <div class="chat__msgRow">
          <div
            class="chat__message mine"
          >战!!!!!11111111111111111111111111111111111111111111111111111111!!!!!!!~</div>
        </div>
        <div class="chat__msgRow">
          <div class="chat__message notMine">战!!!!!!!!!!!!!!</div>
        </div>
        <div class="chat__msgRow">
          <div class="chat__message mine">战!!!!!!!!!!!!!!!~</div>
        </div>
      </div>

      <!-- 聊天输入框 -->
      <!-- <input type="text" class="chat__input" placeholder="输入消息..." /> -->

      <!--
          @keyup.enter
          键盘监听，绑定Enter按键，使其发送文本 

          onkeydown:
          屏蔽原生的Enter效果（屏蔽按下Enter时换行）
      -->
      <div
        contenteditable="true"
        class="chat__input"
        ref="input"
        @keyup.enter="sent('text')"
        onkeydown="if(event.keyCode==13){event.keyCode=0;event.returnValue=false;}"
      ></div>

      <img src="../../assets/img/cM3yCT9.png" alt="发送图片/文件" class="imgBtn" @click.stop="sentImg" />

      <button class="sent" @click="sent('text')">发送</button>
    </div>

    <!-- //图片发送入口 -->
    <input type="file" class="upimg" ref="upimg" accept="image/*" />
  </div>
</template>

<script>
import stopExecutionOnTimeout from "../../js/stopExecutionOnTimeout.js";
import jquery from "../../js/jquery.min.js";
import main from "../../js/main.js";
import g from "../login/global";
// import  from "module";

export default {
  data() {
    return {
      _path: "",
      viewBox: "",
      comm: `<div class="chat__msgRow">
          <div class="chat__message notMine">${this.val}</div>
        </div>`,
      val: "",
      out: "",

      //websocket
      path: "ws://192.168.1.108:8080/deliver_war_exploded/ws.do",
      socket: "",

      //待发送的图片地址
      imgSrc: ""
    };
  },

  methods: {
    //选中图片并发送
    sentImg() {
      let upimg = this.$refs.upimg;
      upimg.click();
      let _this = this;
      // console.log(this);

      upimg.onchange = function() {
        var file = this.files[0];
        var reader = new FileReader();
        let __this = _this;
        reader.readAsDataURL(file);
        reader.onload = function(e) {
          __this.sent("img", this.result);
        };
      };
      // reads.readAsDataURL(f);
      // //选中图片后的监听函数
      // reads.onload = function(e) {
      //   // this.result;
      //   console.log(this.result);

      // };
    },
    //聊天发送文本
    sent(type, img) {
      console.log(type);
      console.log(img);

      if (this.$refs.input.innerHTML === "" && type === "text") {
        return;
      }

      // 获取聊天总文本
      this.out = this.$refs.out.innerHTML;

      //如果是图片
      if (type === "img") {
        this.comm = `<div class="chat__msgRow" data-v-429d673a>
          <div class="chat__message notMine" data-v-429d673a><img src="${img}" width="200px"></div>
        </div>`;
      }

      //如果是文本
      if (type === "text") {
        //获取输入框中的文本
        this.val = this.$refs.input.innerHTML;
        // console.log(this.val);

        // console.log(this.out);

        //模板文本
        this.comm = `<div class="chat__msgRow" data-v-429d673a>
            <div class="chat__message notMine" data-v-429d673a>${this.val}</div>
          </div>`;

        //清空文本
        this.$refs.input.innerHTML = "";
      }

      this.$refs.out.innerHTML = this.out + this.comm;
      // console.log(this.out);

      //当内容超出聊天框时滚动条自动滚至聊天底部
      this.$refs.out.scrollTop = this.$refs.out.scrollHeight;
      // console.log(this.$refs.out.scrollTop);
    },
    //初始化WS
    init() {
      var data = {
        id: "1"
      };
      var stringData = JSON.stringify(data);
      var ajax = new XMLHttpRequest();
      //请求行(发送方式/发送目标url)
      ajax.open(
        "post",
        "http://192.168.1.108:8080/deliver_war_exploded/chat/login.do"
      );
      //请求头
      ajax.setRequestHeader("Content-type", "application/json;charset=UTF-8");
      ajax.onreadystatechange = () => {
        // if (ajax.readyState == 4) {
          // 接受返回的json
          // var json = JSON.parse(ajax.responseText);
          // window[func](json);
          // this[func](json);
          // 实例化socket;
          // console.log(this);
          console.log(11111);
          
          // this.socket = new WebSocket(this.path);
          // 监听socket连接
          // this.socket.onopen = this.open;
          // // 监听socket错误信息
          // this.socket.onerror = this.error;
          // // 监听socket消息
          // this.socket.onmessage = this.getMessage;
        // }
      };
      // 请求主体(请求发送)
      ajax.send(stringData);

      // setTimeout(()=>{
      //   this.socket = new WebSocket(this.path);
      //     // 监听socket连接
      //     this.socket.onopen = this.open;
      //     // 监听socket错误信息
      //     this.socket.onerror = this.error;
      //     // 监听socket消息
      //     this.socket.onmessage = this.getMessage;


      // },5000);

      // if (typeof WebSocket === "undefined") {
      //   alert("您的浏览器不支持socket");
      // } else {
      //   // 实例化socket
      //   this.socket = new WebSocket(this.path);
      //   // 监听socket连接
      //   this.socket.onopen = this.open;
      //   // 监听socket错误信息
      //   this.socket.onerror = this.error;
      //   // 监听socket消息
      //   this.socket.onmessage = this.getMessage;
      // }
    },
    // open() {
    //   console.log("socket连接成功");
    // },
    // error() {
    //   console.log("连接错误");
    // },
    // getMessage(msg) {
    //   console.log(msg.data);
    // },
    // send() {
    //   this.socket.send(params);
    // },
    // close() {
    //   console.log("socket已经关闭");
    // }
  },
  destroyed() {
    // 销毁监听
    this.socket.onclose = this.close;
  },

  created() {
    //获取屏幕高度
    let _hei = document.documentElement.clientHeight;
    let _wid = document.documentElement.clientWidth;

    var _hei_ = _hei / 1.2;

    _hei = Math.floor(_hei);
    _wid = Math.floor(_wid);

    this._path =
      "M0,0 50,0 a0," +
      Math.floor(_hei / 2) +
      " 0 1,1 0," +
      _hei +
      " L0," +
      _hei;

    this.viewBox = "0 0 " + _wid + " " + _hei;
  },

  mounted() {
    this.phone = g.pwphone;
    console.log(this.prop);

    //初始化
    this.init();
  }
};
</script>




<style scoped>
[class^="icon-"],
[class*=" icon-"] {
  font-family: "icomoon";
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;

  /* Better Font Rendering =========== */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body,
html {
  font-size: 100%;
  padding: 0;
  margin: 0;
}

/* Reset */
*,
*:after,
*:before {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

/* Clearfix hack by Nicolas Gallagher: http://nicolasgallagher.com/micro-clearfix-hack/ */
.clearfix:before,
.clearfix:after {
  content: " ";
  display: table;
}

.clearfix:after {
  clear: both;
}

body {
  background: #f9f7f6;
  color: #404d5b;
  font-weight: 500;
  font-size: 1.05em;
  font-family: "Segoe UI", "Lucida Grande", Helvetica, Arial, "Microsoft YaHei",
    FreeSans, Arimo, "Droid Sans", "wenquanyi micro hei", "Hiragino Sans GB",
    "Hiragino Sans GB W3", "FontAwesome", sans-serif;
}
a {
  color: #2fa0ec;
  text-decoration: none;
  outline: none;
}
a:hover,
a:focus {
  color: #74777b;
}

.htmleaf-container {
  margin: 0 auto;
  text-align: center;
  overflow: hidden;
}
.htmleaf-content {
  font-size: 150%;
  padding: 1em 0;
}

.htmleaf-content h2 {
  margin: 0 0 2em;
  opacity: 0.1;
}

.htmleaf-content p {
  margin: 1em 0;
  padding: 5em 0 0 0;
  font-size: 0.65em;
}
.bgcolor-1 {
  background: #f0efee;
}
.bgcolor-2 {
  background: #f9f9f9;
}
.bgcolor-3 {
  background: #e8e8e8;
} /*light grey*/
.bgcolor-4 {
  background: #2f3238;
  color: #fff;
} /*Dark grey*/
.bgcolor-5 {
  background: #df6659;
  color: #521e18;
} /*pink1*/
.bgcolor-6 {
  background: #2fa8ec;
} /*sky blue*/
.bgcolor-7 {
  background: #d0d6d6;
} /*White tea*/
.bgcolor-8 {
  background: #3d4444;
  color: #fff;
} /*Dark grey2*/
.bgcolor-9 {
  background: #ef3f52;
  color: #fff;
} /*pink2*/
.bgcolor-10 {
  background: #64448f;
  color: #fff;
} /*Violet*/
.bgcolor-11 {
  background: #3755ad;
  color: #fff;
} /*dark blue*/
.bgcolor-12 {
  background: #3498db;
  color: #fff;
} /*light blue*/
/* Header */
.htmleaf-header {
  padding: 1em 190px 1em;
  letter-spacing: -1px;
  text-align: center;
}
.htmleaf-header h1 {
  font-weight: 600;
  font-size: 5em;
  line-height: 1;
  margin-bottom: 0;
  font-family: "Segoe UI", "Lucida Grande", Helvetica, Arial, "Microsoft YaHei",
    FreeSans, Arimo, "Droid Sans", "wenquanyi micro hei", "Hiragino Sans GB",
    "Hiragino Sans GB W3", "FontAwesome", sans-serif;
}
.htmleaf-header h1 span {
  font-family: "Segoe UI", "Lucida Grande", Helvetica, Arial, "Microsoft YaHei",
    FreeSans, Arimo, "Droid Sans", "wenquanyi micro hei", "Hiragino Sans GB",
    "Hiragino Sans GB W3", "FontAwesome", sans-serif;
  display: block;
  font-size: 60%;
  font-weight: 400;
  padding: 0.8em 0 0.5em 0;
  color: #c3c8cd;
}
/*nav*/
.htmleaf-demo a {
  color: #1d7db1;
  text-decoration: none;
}
.htmleaf-demo {
  width: 100%;
  padding-bottom: 1.2em;
}
.htmleaf-demo a {
  display: inline-block;
  margin: 0.5em;
  padding: 0.6em 1em;
  border: 3px solid #1d7db1;
  font-weight: 700;
}
.htmleaf-demo a:hover {
  opacity: 0.6;
}
.htmleaf-demo a.current {
  background: #1d7db1;
  color: #fff;
}
/* Top Navigation Style */
.htmleaf-links {
  position: relative;
  display: inline-block;
  white-space: nowrap;
  font-size: 3.5em;
  text-align: center;
}

.htmleaf-links::after {
  position: absolute;
  top: 0;
  left: 50%;
  margin-left: -1px;
  width: 2px;
  height: 100%;
  background: #dbdbdb;
  content: "";
  -webkit-transform: rotate3d(0, 0, 1, 22.5deg);
  transform: rotate3d(0, 0, 1, 22.5deg);
}

.htmleaf-icon {
  display: inline-block;
  margin: 0.5em;
  padding: 0em 0;
  width: 3.5em;
  text-decoration: none;
}

.htmleaf-icon span {
  display: none;
}

.htmleaf-icon:before {
  margin: 0 5px;
  text-transform: none;
  font-weight: normal;
  font-style: normal;
  font-variant: normal;
  font-family: "icomoon";
  line-height: 1;
  /* speak: none; */
  -webkit-font-smoothing: antialiased;
}
/* footer */
.htmleaf-footer {
  width: 100%;
  padding-top: 10px;
}
.htmleaf-small {
  font-size: 0.8em;
}
.center {
  text-align: center;
}
/****/
.related {
  color: #fff;
  background: #333;
  text-align: center;
  font-size: 1.25em;
  padding: 0.5em 0;
  overflow: hidden;
}

.related > a {
  vertical-align: top;
  width: calc(100% - 20px);
  max-width: 340px;
  display: inline-block;
  text-align: center;
  margin: 20px 10px;
  padding: 25px;
  font-family: "Segoe UI", "Lucida Grande", Helvetica, Arial, "Microsoft YaHei",
    FreeSans, Arimo, "Droid Sans", "wenquanyi micro hei", "Hiragino Sans GB",
    "Hiragino Sans GB W3", "FontAwesome", sans-serif;
}
.related a {
  display: inline-block;
  text-align: left;
  margin: 20px auto;
  padding: 10px 20px;
  opacity: 0.8;
  -webkit-transition: opacity 0.3s;
  transition: opacity 0.3s;
  /* -webkit-backface-visibility: hidden; */
}

.related a:hover,
.related a:active {
  opacity: 1;
}

.related a img {
  max-width: 100%;
  opacity: 0.8;
  border-radius: 4px;
}
.related a:hover img,
.related a:active img {
  opacity: 1;
}
.related h3 {
  font-family: "Microsoft YaHei", sans-serif;
}
.related a h3 {
  font-weight: 300;
  margin-top: 0.15em;
  color: #fff;
}
/* icomoon */
.icon-htmleaf-home-outline:before {
  content: "\e5000";
}

.icon-htmleaf-arrow-forward-outline:before {
  content: "\e5001";
}

@media screen and (max-width: 50em) {
  .htmleaf-header {
    padding: 3em 10% 4em;
  }
  .htmleaf-header h1 {
    font-size: 2em;
  }
}

@media screen and (max-width: 40em) {
  .htmleaf-header h1 {
    font-size: 1.5em;
  }
}

@media screen and (max-width: 30em) {
  .htmleaf-header h1 {
    font-size: 1.2em;
  }
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
body {
  font-size: 62.5%;
  height: 100%;
}

button,
input {
  border: 0;
  outline: none;
}

body {
  background: -webkit-linear-gradient(45deg, #636f85, #6960a0);
  background: linear-gradient(45deg, #636f85, #6960a0);
}

.demo {
  position: relative;
  /* top: 50%; */
  /* left: 50%; */
  /* margin-top: -250px; */
  /* margin-left: -150px; */
  /* width: 300px; */
  width: 100vw;
  height: 100vh;
  box-shadow: 0 10px 50px rgba(0, 0, 0, 0.3);
}

.static {
  height: 100%;
  font-size: 18px;
  font-family: "Open Sans", Helvetica, Arial, sans-serif;
  /* //聊天背景颜色 */
  background: #07c160;
}
.static:before,
.static:after {
  content: "";
  position: absolute;
  left: 70px;
  width: 20px;
  height: 20px;
  margin-left: -10px;
  margin-top: -10px;
  border: 2px solid #fff;
  border-left: none;
  border-bottom: none;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
  -webkit-animation: arrows 1.5s infinite;
  animation: arrows 1.5s infinite;
}
.static:before {
  top: 25vh;
  content: "";
}
.static:after {
  top: 75vh;
  content: "";
}
.static__text {
  width: 90px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -50px;
  -webkit-transform: translate3d(0, -50%, 0);
  transform: translate3d(0, -50%, 0);
  color: #fff;
  -webkit-perspective: 1px;
  perspective: 1px;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.sidebar-content {
  z-index: -1;
  position: absolute;
  top: 0;
  left: 0;
  width: 200px;
  height: 100%;
  padding-top: 10px;
  opacity: 0;
  -webkit-transition: opacity 200ms, z-index 0s 0s;
  transition: opacity 200ms, z-index 0s 0s;
  background-color: #e9eaf3;
  overflow-y: auto;
}
.sidebar-content.active {
  z-index: 2;
  opacity: 1;
}

.contact {
  position: relative;
  width: 100%;
  height: 50px;
  padding-left: 17px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  cursor: pointer;
  overflow: hidden;
}
.contact__photo {
  border-radius: 50%;
  margin-right: 15px;
}
.contact__name {
  font-size: 12px;
  font-family: "Open Sans", Helvetica, Arial, sans-serif;
}
.contact__status {
  position: absolute;
  top: 21px;
  right: 15px;
  width: 8px;
  height: 8px;
  border: 2px solid #00b570;
  border-radius: 50%;
  opacity: 0;
  -webkit-transition: opacity 0.3s;
  transition: opacity 0.3s;
}
.contact__status.online {
  opacity: 1;
}

.search {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 200px;
  height: 55px;
  padding-left: 15px;
  background: #fff;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

svg {
  overflow: visible;
}

.sidebar {
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
}

.s-path {
  cursor: -webkit-grab;
  cursor: grab;
}

.cloned {
  position: absolute;
  z-index: 10;
  -webkit-transition: top 0.3s, left 0.3s;
  transition: top 0.3s, left 0.3s;
  -webkit-transition-delay: 0.2s;
  transition-delay: 0.2s;
  -webkit-transition-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  transition-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
}
.cloned.removed {
  -webkit-transition: opacity 0.2s 0;
  transition: opacity 0.2s 0;
  opacity: 0;
}

.chat {
  display: none;
  z-index: 5;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 25px 0 55px 25px;
  -webkit-transition: opacity 200ms;
  transition: opacity 200ms;
  opacity: 0;
}
.chat.active {
  opacity: 1;
}
.chat.active:before {
  width: 100%;
}
.chat:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background: #1cc6ae;
  width: 0;
  -webkit-transition: width 0.2s;
  transition: width 0.2s;
}
.chat__back {
  position: relative;
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-top: 5px;
  margin-left: -6px;
  cursor: pointer;
}
.chat__back:hover:before {
  -webkit-transform: translateX(-3px) rotate(-45deg);
  -ms-transform: translateX(-3px) rotate(-45deg);
  transform: translateX(-3px) rotate(-45deg);
}
.chat__back:before {
  content: "";
  position: absolute;
  display: block;
  top: 4px;
  left: 6px;
  width: 12px;
  height: 12px;
  border: 2px solid #545675;
  border-right: none;
  border-bottom: none;
  -webkit-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  transform: rotate(-45deg);
  -webkit-transition: -webkit-transform 0.3s;
  transition: transform 0.3s;
}
.chat__status {
  position: absolute;
  top: 3vh;
  right: 65px;
  font-size: 12px;
  font-family: "Open Sans", Helvetica, Arial, sans-serif;
  text-transform: uppercase;
  color: #b1a9a9;
}
.chat__person {
  display: inline-block;
  position: absolute;
  top: 5vh;
  right: 65px;
  font-size: 20px;
  font-family: "Open Sans", Helvetica, Arial, sans-serif;
  color: #36343d;
}
.chat__online {
  position: absolute;
  top: 50%;
  left: -15px;
  margin-top: -3px;
  width: 8px;
  height: 8px;
  border: 2px solid #00b570;
  border-radius: 50%;
  opacity: 0;
  -webkit-transition: opacity 0.3s;
  transition: opacity 0.3s;
}
.chat__online.active {
  opacity: 1;
}
.chat__messages {
  position: absolute;
  /* top: 75px; */
  top: 10vh;
  left: 25px;
  width: 93vw;
  min-height: 10vh;
  max-height: 80vh;
  padding-right: 25px;
  overflow-y: auto;
}
.chat__msgRow {
  margin-bottom: 3vh;
}
.chat__msgRow:after {
  content: "";
  display: table;
  clear: both;
}
.chat__message {
  word-break: break-all;
  word-wrap: break-word;
  display: inline-block;
  max-width: 70vw;
  padding: 10px;
  font-size: 14px;
  font-family: "Open Sans", Helvetica, Arial, sans-serif;
}
.chat__message.mine {
  color: #2b2342;
  border: 1px solid #dfdfdf;
  background: #ffffff;
}
.chat__message.notMine {
  float: right;
  color: #23244e;
  background: #e9eaf3;
}
.chat__input {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  min-height: 55px;
  /* padding: 10px 70px 10px 40px; */
  padding: 20px 70px 15px 40px;
  /* background-image: url("../../assets/img/cM3yCT9.png"); */
  background-repeat: no-repeat;
  background-position: 10px 15px;
  background-color: #e9eaf3;
  color: #2b2342;
  font-size: 14px;
  font-family: "Open Sans", Helvetica, Arial, sans-serif;
  outline: none;
}

.ripple {
  position: absolute;
  width: 100px;
  height: 100px;
  margin-left: -50px;
  margin-top: -50px;
  background: rgba(0, 0, 0, 0.4);
  -webkit-transform: scale(0);
  -ms-transform: scale(0);
  transform: scale(0);
  -webkit-animation: animRipple 0.3s;
  animation: animRipple 0.3s;
  border-radius: 50%;
}

.contact img {
  width: 34px;
  height: 34px;
}

@-webkit-keyframes animRipple {
  to {
    -webkit-transform: scale(2.5);
    transform: scale(2.5);
    opacity: 0;
  }
}

@keyframes animRipple {
  to {
    -webkit-transform: scale(2.5);
    transform: scale(2.5);
    opacity: 0;
  }
}
@-webkit-keyframes arrows {
  to {
    -webkit-transform: translateX(100%) rotate(45deg);
    transform: translateX(100%) rotate(45deg);
    opacity: 0;
  }
}
@keyframes arrows {
  to {
    -webkit-transform: translateX(100%) rotate(45deg);
    transform: translateX(100%) rotate(45deg);
    opacity: 0;
  }
}

.sent {
  position: absolute;

  bottom: 11px;
  right: 10px;
  border: none;
  padding: 10px 15px;
  background: #1cc6ae;
  border-radius: 5px;
}

.imgBtn {
  position: absolute;
  bottom: 15px;
  left: 12px;
}
</style>
