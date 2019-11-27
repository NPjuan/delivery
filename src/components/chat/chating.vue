<!-- //重新设置密码 -->
<template>
    <div class="c-container">
        <div id="chatbox">
            <div id="friendslist">
                <!-- 好友名单集合 -->
                <div id="friends">
                    <!-- 好友单元 -->
                    <div
                        class="friend"
                        v-for="(item,i) in friendsList"
                        :key="i"
                        @click="chat"
                        :data-index="i"
                    >
                        <img v-bind:src="item.src" />
                        <p>
                            <strong>{{item.username}}</strong>
                            <span>{{item.email}}</span>
                        </p>
                        <div :class="{'inactive':item.status==0,'status':item.status==1}"></div>
                    </div>
                </div>

                <!-- 好友搜索 -->
                <div id="search">
                    <input
                        type="text"
                        id="searchfield"
                        placeholder="搜索好友"
                        @keyup.enter="searchFri(searchVal)"
                        v-model="searchVal"
                    />
                </div>
            </div>

            <!-- 聊天界面窗口 -->

            <div id="chatview" class="p1">
                <!-- 聊天头部:封面/头像/名称/邮箱 -->
                <div id="profile">
                    <div id="close">
                        <div class="cy"></div>
                        <div class="cx"></div>
                    </div>
                    <p>用户名</p>
                    <span>xxxxxx@gmail.com</span>
                </div>

                <!-- 聊天内容 -->
                <div id="chat-messages" ref="out">
                    <!-- 时间戳 -->
                    <!-- <label>星期五 2019-11-10</label> -->

                    <!-- 聊天信息单元 -->
                    <div
                        :class="{'message': 1,'right': item.self}"
                        v-for="(item,i) in chatMsg"
                        :key="i"
                    >
                        <img :src="item.src" />
                        <div class="bubble">
                            {{item.msg}}
                            <div class="corner"></div>
                            <span>{{item.time}}</span>
                        </div>
                    </div>
                </div>

                <!-- 聊天发送窗口 -->
                <!-- <div id="sendmessage">
                    <input type="text" placeholder="发送..." />
                    <button id="send"></button>
                </div>-->

                <!-- //旧的,添加 -->

                <!--
                    @keyup.enter
                    键盘监听，绑定Enter按键，使其发送文本 

                    onkeydown:
                    屏蔽原生的Enter效果（屏蔽按下Enter时换行）
                -->

                <div class="sendmessage">
                    <div
                        contenteditable="true"
                        class="chat__input"
                        ref="input"
                        @keyup.enter="send"
                        onkeydown="if(event.keyCode==13){event.keyCode=0;event.returnValue=false;}"
                    ></div>

                    <img
                        src="../../assets/img/camera.svg"
                        alt="发送图片/文件"
                        class="imgBtn"
                        @click.stop="sentImg"
                        width="20px"
                    />
                    <button class="sent" @click="send">发 送</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import g from "../login/global";
export default {
    data() {
        return {
            // ------------
            // 好友信息列表--->>>>
            //      src:头像地址
            //      username:用户昵称
            //      email:邮箱
            //      status:0->不在线 1->忙碌 2->在线
            // ------------
            friendsList: [
                {
                    src: require("../../assets/img/1.jpg"),
                    username: "于翔",
                    email: "854696361@qq.com",
                    status: 2
                },
                {
                    src: require("../../assets/img/2.jpg"),
                    username: "康俊彬",
                    email: "854696361@qq.com",
                    status: 0
                },
                {
                    src: require("../../assets/img/3.jpg"),
                    username: "林乐涛",
                    email: "854696361@qq.com",
                    status: 0
                },
                {
                    src: require("../../assets/img/4.jpg"),
                    username: "佘焙桩",
                    email: "854696361@qq.com",
                    status: 0
                },
                {
                    src: require("../../assets/img/5.jpg"),
                    username: "潘俊渊",
                    email: "854696361@qq.com",
                    status: 0
                },
                {
                    src: require("../../assets/img/6.jpg"),
                    username: "罗艺明",
                    email: "854696361@qq.com",
                    status: 0
                },
                {
                    src: require("../../assets/img/7.jpg"),
                    username: "陈恩秦",
                    email: "854696361@qq.com",
                    status: 0
                },
                {
                    src: require("../../assets/img/8.jpg"),
                    username: "林家云",
                    email: "854696361@qq.com",
                    status: 0
                },
                {
                    src: require("../../assets/img/9.jpg"),
                    username: "田依凡",
                    email: "854696361@qq.com",
                    status: 0
                },
                {
                    src: require("../../assets/img/10.jpg"),
                    username: "蔡荣镔",
                    email: "854696361@qq.com",
                    status: 0
                }
            ],
            // ------------
            // 聊天信息列表--->>>>
            //      msg:聊天内容
            //      src:头像地址
            //      self:是否自己
            //      time:消息时间
            // ------------
            chatMsg: [
                {
                    msg: "来啊啊啊啊啊啊",
                    src: require("../../assets/img/5.jpg"),
                    self: false,
                    time: "3 min"
                },
                {
                    msg: "来啊啊啊啊啊啊",
                    src: require("../../assets/img/1.jpg"),
                    self: true,
                    time: "3 min"
                },
                {
                    msg: "来啊啊啊啊啊啊111111",
                    src: require("../../assets/img/5.jpg"),
                    self: false,
                    time: "3 min"
                },
                {
                    msg: "来啊啊啊啊啊啊",
                    src: require("../../assets/img/1.jpg"),
                    self: true,
                    time: "Now"
                },
                {
                    msg: "来啊啊啊啊啊啊",
                    src: require("../../assets/img/5.jpg"),
                    self: false,
                    time: "Now"
                }
            ],
            _path: "",
            viewBox: "",
            comm: `<div class="chat__msgRow">
                        <div class="chat__message notMine">${this.val}</div>
                    </div>`,

            // 搜索框内容
            searchVal: "",
            //搜索IP地址
            searchIp: "/user/abstractQuery.do",

            //聊天内容
            val: "",
            out: "",
            // id请求地址
            ajaxip:
                "http://192.168.1.107:8080/deliver_war_exploded/chat/login.do",
            //websocket
            path: "ws://192.168.1.107:8080/deliver_war_exploded/ws.do",
            // path: "ws://116.62.46.122:8080/deliver/ws.do",

            socket: "",

            //待发送的图片地址
            imgSrc: "",

            //是否websocket已连接
            chatStatus: false,

            //聊天对象ID
            leftObj: {}
        };
    },

    methods: {
        //点击用户后处理的事件(事件委托)
        chat(e) {
            // console.log(e.target);
            this.chatMsg = [];

            var _target = e.target;

            //如果点击了非div元素则查找其父元素
            while (_target.nodeName.toLowerCase() !== "div") {
                var _target = _target.parentNode;
            }
            const index = parseInt(e.target.dataset.i);
            // 获得引索后，只需要修改data数据就能改变UI了

            //获取聊天对象的信息
            this.leftObj = this.friendsList[_target.dataset.index];

            //若点击了列表中的某好友,则:
            console.log("进入");

            var preloadbg = document.createElement("img");
            // preloadbg.src = "../../assets/img/timeline1.png";
            //获取元素相对于文档的偏移
            var childOffset = $(_target).offset();

            //其父元素的父元素的偏移
            var parentOffset = $(_target)
                .parent()
                .parent()
                .offset();

            // 偏移计算
            var childTop = childOffset.top - parentOffset.top;

            var clone = $(_target)
                //找到其中的img元素
                .find("img")
                //img中的第0个元素
                .eq(0)
                //复制选中的图片
                .clone();
            var top = childTop + 12 + "px";
            $(clone)
                .css({ top: top })
                .addClass("floatingImg")
                .appendTo("#chatbox");

            //增加聊天头部动画
            setTimeout(function() {
                $("#profile p").addClass("animate");
                $("#profile").addClass("animate");
            }, 100);

            //增加聊天内容动画
            setTimeout(function() {
                $("#chat-messages").addClass("animate");

                //关闭箭头增加类,动画1
                $(".cx, .cy").addClass("s1");

                //关闭箭头增加类,动画2
                setTimeout(function() {
                    $(".cx, .cy").addClass("s2");
                }, 100);

                //关闭箭头增加类,动画3
                setTimeout(function() {
                    $(".cx, .cy").addClass("s3");
                }, 200);
            }, 150);

            let wid = document.body.clientWidth / 2;
            let _left = parseInt(wid) - 34 + "px";
            //头像动画居中
            $(".floatingImg").animate(
                {
                    width: "68px",
                    height: "68px",
                    left: _left,
                    top: "-60px"
                },
                200
            );

            //找到其用户名
            var name = $(_target)
                .find("p strong")
                .html();

            //找到其email
            var email = $(_target)
                .find("p span")
                .html();

            // 写入聊天页面
            $("#profile p").html(name);
            $("#profile span").html(email);

            //把对面头像写入聊天内容
            $(".message")
                .not(".right")
                .find("img")
                .attr("src", $(clone).attr("src"));

            //隐藏好友列表
            $("#friendslist").fadeOut();
            //显出聊天列表
            $("#chatview").fadeIn();

            //箭头
            $("#close")
                .unbind("click")
                .click(function() {
                    //移除动画
                    $("#chat-messages, #profile, #profile p").removeClass(
                        "animate"
                    );

                    // 箭头动画
                    $(".cx, .cy").removeClass("s1 s2 s3");

                    //头像回归原位
                    $(".floatingImg").animate(
                        {
                            width: "40px",
                            top: top,
                            left: "12px"
                        },
                        200,
                        function() {
                            $(".floatingImg").remove();
                        }
                    );

                    //关闭聊天,弹出好友列表
                    setTimeout(function() {
                        $("#chatview").fadeOut();
                        $("#friendslist").fadeIn();
                    }, 50);
                });
            setTimeout(() => {
                let chatId = "chat" + this.leftObj.id;
                let chatMsg = localStorage.getItem(chatId);
                let _chatMsg = JSON.parse(chatMsg);
                console.log(_chatMsg);

                if (_chatMsg == null) {
                    console.log("聊天记录为空");
                } else {
                    var Ctemp = new Array();
                    for (let i = 0; i < _chatMsg.length; i++) {
                        Ctemp[i] = _chatMsg[i];
                    }
                }

                this.chatMsg = Ctemp;
                //当内容超出聊天框时滚动条自动滚至聊天底部
            }, 50);
            setTimeout(() => {
                // this.$refs.out.scrollTop = this.$refs.out.scrollHeight;
                console.log(this.$refs.out.scrollTop);
                this.$refs.out.scrollTop = this.$refs.out.scrollHeight;
                console.log(this.$refs.out.scrollHeight);
            }, 100);
        },
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
        },
        //初始化WS
        init() {
            //建立连接
            this.$axios
                .post(this.ajaxip, {
                    id: this.$store.state.userData.user.id
                })
                .then(i => {
                    // 实例化socket;
                    this.socket = new WebSocket(this.path);
                    // 监听socket连接
                    this.socket.onopen = this.open;
                    // 监听socket错误信息
                    this.socket.onerror = this.error;
                    // 监听socket消息
                    this.socket.onmessage = this.getMessage;
                });
        },
        open() {
            console.log("socket连接成功");
            this.chatStatus = true;
        },
        error() {
            console.log("连接错误");
        },
        //监听socket消息
        getMessage(msg) {
            //当内容超出聊天框时滚动条自动滚至聊天底部
            this.$refs.out.scrollTop = this.$refs.out.scrollHeight;
            console.log("WebSocket:收到一条信息", msg);
            //格式转化成json
            var data = $.parseJSON(msg.data);

            //获取对方ID
            let chatId = "chat" + this.leftObj.id;
            let chatMsg = localStorage.getItem(chatId);
            let _chatMsg = JSON.parse(chatMsg);

            let msgAdd = {
                msg: data.msgContent,
                src:
                    data.from == this.$store.state.userData.user.id
                        ? this.$store.state.minIp +
                          this.$store.state.userData.userInfo.avatar
                        : this.leftObj.src,
                self:
                    data.from == this.$store.state.userData.user.id
                        ? true
                        : false,
                time: data.date
            };
            console.log(msgAdd);
            console.log(_chatMsg);
            if (_chatMsg == null) {
                _chatMsg = [];
                _chatMsg.push(msgAdd);
            } else {
                _chatMsg.push(msgAdd);
            }

            localStorage.setItem(chatId, JSON.stringify(_chatMsg));

            //若收到的消息是自己发出的则
            if (data.from == this.$store.state.userData.user.id) {
                return;
            }

            if (data.from != this.leftObj.id) {
                return;
            }

            let msgTemp = {
                msg: data.msgContent,
                src: this.leftObj.src,
                self: false,
                time: data.date
            };
       
            this.chatMsg.push(msgTemp);

            //当内容超出聊天框时滚动条自动滚至聊天底部
            this.$refs.out.scrollTop = this.$refs.out.scrollHeight;
        },
        send() {
            if (this.chatStatus === false) {
                this.$toast("网络请求失败,请稍后再试!");
                return;
            }
            //获取输入框中的文本
            this.val = this.$refs.input.innerHTML;
            if (this.val == "") {
                return;
            }
            //清空文本
            this.$refs.input.innerHTML = "";

            //获取自己的id
            let idstr = this.$store.state.userData.user.id.toString();
            //获取对方的id
            let tostr = this.$store.state.userData.user.id.toString();

            //获取时间
            let ntime = new Date();
            let t_year = ntime.getFullYear();
            let t_month = ntime.getMonth() + 1;
            let t_day = ntime.getDate();
            let time = t_year + "-" + t_month + "-" + t_day;

            let msgTemp = {
                msg: this.val,
                src:
                    this.$store.state.minIp +
                    this.$store.state.userData.userInfo.avatar,
                self: true,
                time: time
            };
            console.log(this.chatMsg);

            if (this.chatMsg == undefined) {
                this.chatMsg = [msgTemp];
            } else {
                this.chatMsg.push(msgTemp);
            }

            var msg = {
                from: idstr,
                msgContent: this.val,
                to: this.leftObj.id.toString()
            };

            this.socket.send(JSON.stringify(msg));
        },
        searchFri(msg) {
            console.log(msg);
            this.$axios
                .post(this.$store.state.ymIp + this.searchIp, {
                    pn: "1",
                    info: msg
                })
                .then(i => {
                    console.log(i);
                    this.friendsList = [];

                    let data = i.data.data.list;

                    for (let j = 0; j < data.length; j++) {
                        let temp = {
                            src:
                                this.$store.state.minIp +
                                data[j].userInfo.avatar,
                            username: data[j].userInfo.name,
                            email: "854696361@qq.com",
                            status: data[j].isOnLine,
                            id: data[j].user.id
                        };
                        this.friendsList.push(temp);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },

        close() {
            console.log("socket已经关闭");
            this.chatStatus = false;
        }
    },
    destroyed() {
        // 销毁监听
        this.socket.onclose = this.close;
    },

    mounted() {
        //初始化
        this.init();

        this.chatMsg = [];
        this.friendsList = [];
    }
};
</script>





<style scoped>
/* 初始化 */
b,
strong {
    font-weight: 700;
}

q {
    quotes: "\201C""\201D""\2018""\2019";
}
svg:not(:root) {
    overflow: hidden;
}

button,
input {
    line-height: normal;
}

/* ----------------------------------------------------- */
.clearfix:before,
.clearfix:after {
    content: " ";
    display: table;
}

.clearfix:after {
    clear: both;
}

.c-container {
    height: 100vh;
    /* overflow: hidden; */
}

/* footer */

.center {
    text-align: center;
}
/****/
.related {
    position: absolute;
    top: 800px;
    left: 0;
    width: 100%;
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
    font-family: "Segoe UI", "Lucida Grande", Helvetica, Arial,
        "Microsoft YaHei", FreeSans, Arimo, "Droid Sans", "wenquanyi micro hei",
        "Hiragino Sans GB", "Hiragino Sans GB W3", "FontAwesome", sans-serif;
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

/* ---------------------------------------------------- */

* {
    margin: 0px;
    padding: 0px;
}
body {
    background: #f0f1f2;
    font: 12px "Open Sans", sans-serif;
}
#view-code {
    color: #89a2b5;
    opacity: 0.7;
    font-size: 14px;
    text-transform: uppercase;
    font-weight: 700;
    text-decoration: none;
    position: absolute;
    top: 660px;
    left: 50%;
    margin-left: -50px;
    z-index: 200;
}
#view-code:hover {
    opacity: 1;
}
#chatbox {
    position: relative;

    width: 100vw;
    height: 100vh;
    background: #fff;

    /* overflow: hidden; */
}

#friendslist {
    position: relative;
    height: 100vh;
}

#friends {
    max-height: 80vh;
    overflow-y: auto;
    overflow-x: hidden;
}
.friend {
    height: 70px;
    border-bottom: 1px solid #e7ebee;
    position: relative;
}
.friend:hover {
    background: #f1f4f6;
    cursor: pointer;
}
.friend img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin: 15px;
    float: left;
}
.floatingImg {
    position: absolute;
    width: 40px;
    border-radius: 50%;
    z-index: 2;
    top: 0;
    left: 12px;
    border: 3px solid #fff;
}
.friend p {
    padding: 15px 0 0 0;
    float: left;
    width: 220px;
}
.friend p strong {
    font-weight: 600;
    font-size: 15px;
    color: #597a96;
}
.friend p span {
    font-size: 13px;
    font-weight: 400;
    color: #aab8c2;
}
.friend .status {
    background: #26c281;
    border-radius: 50%;
    width: 9px;
    height: 9px;
    position: absolute;
    top: 31px;
    right: 17px;
}
.friend .status.away {
    background: #ffce54;
}
.friend .inactive {
    background: #777777;
    border-radius: 50%;
    width: 9px;
    height: 9px;
    position: absolute;
    top: 31px;
    right: 17px;
}
#search {
    position: fixed;
    background: #e3e9ed url("../../assets/img/search.png") -11px 0 no-repeat;
    height: 60px;
    width: 100vw;
    bottom: 0;
}
#searchfield {
    background: #e3e9ed;
    margin: 21px 0 0 55px;
    border: none;
    padding: 0;
    font-size: 14px;
    font-family: "Open Sans", sans-serif;
    font-weight: 400px;
    color: #8198ac;
}
#searchfield:focus {
    outline: 0;
}
#chatview {
    position: fixed;
    width: 100vw;
    z-index: 1;
    top: 0;
    height: 100vh;
    display: none;
    background: #fff;
}
#profile {
    height: 25vh;
    overflow: hidden;
    text-align: center;
    color: #fff;
}
.p1 #profile {
    background: #fff url("../../assets/img/timeline1.png") 0 0 no-repeat;
    background-size: cover;
}
#profile .avatar {
    width: 68px;
    border: 3px solid #fff;
    margin: 23px 0 0;
    border-radius: 50%;
}
#profile p {
    font-weight: 600;
    font-size: 15px;
    margin: 118px 0 -1px;
    opacity: 0;
    -webkit-transition: all 200ms cubic-bezier(0, 0.995, 0.99, 1);
    -moz-transition: all 200ms cubic-bezier(0, 0.995, 0.99, 1);
    -ms-transition: all 200ms cubic-bezier(0, 0.995, 0.99, 1);
    -o-transition: all 200ms cubic-bezier(0, 0.995, 0.99, 1);
    transition: all 200ms cubic-bezier(0, 0.995, 0.99, 1);
}
#profile p.animate {
    margin-top: 97px;
    opacity: 1;
    -webkit-transition: all 200ms cubic-bezier(0, 0.995, 0.99, 1);
    -moz-transition: all 200ms cubic-bezier(0, 0.995, 0.99, 1);
    -ms-transition: all 200ms cubic-bezier(0, 0.995, 0.99, 1);
    -o-transition: all 200ms cubic-bezier(0, 0.995, 0.99, 1);
    transition: all 200ms cubic-bezier(0, 0.995, 0.99, 1);
}
#profile span {
    display: block;
    margin: 10px;
    font-weight: 400;
    font-size: 11px;
}
#chat-messages {
    opacity: 0;
    margin-top: 30px;
    max-height: 66vh;
    overflow-y: auto;
    overflow-x: hidden;
    padding-left: 20px;
    padding-right: 20px;
    -webkit-transition: all 200ms cubic-bezier(0, 0.995, 0.99, 1);
    -moz-transition: all 200ms cubic-bezier(0, 0.995, 0.99, 1);
    -ms-transition: all 200ms cubic-bezier(0, 0.995, 0.99, 1);
    -o-transition: all 200ms cubic-bezier(0, 0.995, 0.99, 1);
    transition: all 200ms cubic-bezier(0, 0.995, 0.99, 1);
}
#chat-messages.animate {
    opacity: 1;
    margin-top: 0;
}
#chat-messages label {
    color: #aab8c2;
    font-weight: 600;
    font-size: 12px;
    text-align: center;
    margin: 15px 0;
    display: block;
}
#chat-messages div.message {
    padding: 0 0 30px 38px;
    clear: both;
    margin-bottom: 45px;
}
#chat-messages div.message.right {
    padding: 0 58px 30px 0;
    margin-right: -19px;
    margin-left: 19px;
}
#chat-messages .message img {
    float: left;
    margin-left: -38px;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    margin-top: 12px;
}
#chat-messages div.message.right img {
    float: right;
    margin-left: 0;
    margin-right: -38px;
}

.message .bubble {
    background: #f0f4f7;
    font-size: 13px;
    font-weight: 600;
    padding: 12px 13px;
    border-radius: 5px 5px 5px 0px;
    color: #8495a3;
    position: relative;
    float: left;
}
#chat-messages div.message.right .bubble {
    float: right;
    border-radius: 5px 5px 0px 5px;
}

#chat-messages :first-child {
    margin-top: 20px;
}
.bubble .corner {
    background: url("../../assets/img/bubble-corner.png") 0 0 no-repeat;
    position: absolute;
    width: 7px;
    height: 7px;
    left: -5px;
    bottom: 0;
}
div.message.right .corner {
    background: url("../../assets/img/bubble-cornerR.png") 0 0 no-repeat;
    left: auto;
    right: -5px;
}

.bubble span {
    color: #aab8c2;
    font-size: 11px;
    position: absolute;
    white-space: nowrap;
    right: 0;
    bottom: -22px;
}
#sendmessage {
    position: relative;
    width: 100vw;
    /* bottom: 0; */
    height: 60px;
    border-top: 1px solid #e7ebee;
    background: #fff;
}
#sendmessage input {
    border: none;
}
#sendmessage input {
    background: #fff;
    margin: 21px 0 0 21px;
    border: none;
    padding: 0;
    font-size: 14px;
    font-family: "Open Sans", sans-serif;
    font-weight: 400px;
    color: #aab8c2;
}
#sendmessage input:focus {
    outline: 0;
}
#sendmessage button {
    background: #fff url("../../assets/img/send.svg") 0 -41px no-repeat;
    width: 30px;
    height: 30px;
    position: absolute;
    right: 15px;
    top: 23px;
    border: none;
}
#sendmessage button:hover {
    cursor: pointer;
    background-position: 0 0;
}
#sendmessage button:focus {
    outline: 0;
}

#close {
    position: absolute;
    top: 8px;
    opacity: 0.8;
    right: 10px;
    width: 20px;
    height: 20px;
    cursor: pointer;
}
#close:hover {
    opacity: 1;
}
.cx,
.cy {
    background: #fff;
    position: absolute;
    width: 0px;
    top: 15px;
    right: 15px;
    height: 3px;
    -webkit-transition: all 250ms ease-in-out;
    -moz-transition: all 250ms ease-in-out;
    -ms-transition: all 250ms ease-in-out;
    -o-transition: all 250ms ease-in-out;
    transition: all 250ms ease-in-out;
}
.cx.s1,
.cy.s1 {
    right: 0;
    width: 20px;
    -webkit-transition: all 100ms ease-out;
    -moz-transition: all 100ms ease-out;
    -ms-transition: all 100ms ease-out;
    -o-transition: all 100ms ease-out;
    transition: all 100ms ease-out;
}
.cy.s2 {
    -ms-transform: rotate(50deg);
    -webkit-transform: rotate(50deg);
    transform: rotate(50deg);
    -webkit-transition: all 100ms ease-out;
    -moz-transition: all 100ms ease-out;
    -ms-transition: all 100ms ease-out;
    -o-transition: all 100ms ease-out;
    transition: all 100ms ease-out;
}
.cy.s3 {
    -ms-transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    -webkit-transition: all 100ms ease-out;
    -moz-transition: all 100ms ease-out;
    -ms-transition: all 100ms ease-out;
    -o-transition: all 100ms ease-out;
    transition: all 100ms ease-out;
}
.cx.s1 {
    right: 0;
    width: 20px;
    -webkit-transition: all 100ms ease-out;
    -moz-transition: all 100ms ease-out;
    -ms-transition: all 100ms ease-out;
    -o-transition: all 100ms ease-out;
    transition: all 100ms ease-out;
}
.cx.s2 {
    -ms-transform: rotate(140deg);
    -webkit-transform: rotate(140deg);
    transform: rotate(140deg);
    -webkit-transition: all 100ms ease-out;
    -moz-transition: all 100ms ease-out;
    -ms-transition: all 100ease-out;
    -o-transition: all 100ms ease-out;
    transition: all 100ms ease-out;
}
.cx.s3 {
    -ms-transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
    transform: rotate(135deg);
    -webkit-transition: all 100ease-out;
    -moz-transition: all 100ms ease-out;
    -ms-transition: all 100ms ease-out;
    -o-transition: all 100ms ease-out;
    transition: all 100ms ease-out;
}
#chatview,
#sendmessage {
    overflow: hidden;
}

/* --------------------------------------------------------------------------- */

.sendmessage {
    position: fixed;
    bottom: 0;
    width: 100vw;
    /* bottom: 0; */
    min-height: 60px;
    border-top: 1px solid #e7ebee;
    z-index: 100;
    background-color: white;
}
.imgBtn {
    position: absolute;
    bottom: 20px;
    left: 15px;
}
.chat__input {
    position: absolute;

    width: 60vw;
    height: 45%;
    /* min-height: 55px; */
    /* padding: 10px 70px 10px 40px; */
    padding: 20px 70px 15px 45px;
    color: #2b2342;
    font-size: 14px;
    /* font-family: "Open Sans", Helvetica, Arial, sans-serif; */
    outline: none;
}
.sent {
    position: absolute;

    font-size: 12px;
    bottom: 11px;
    right: 10px;
    border: none;
    color: white;
    /* letter-spacing: 5px; */
    font-weight: bold;
    padding: 10px 15px;
    background: #1cc6ae;
    border-radius: 5px;
}
</style>
