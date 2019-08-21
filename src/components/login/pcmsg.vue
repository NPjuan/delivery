    <!-- 个人信息填写页面 -->
<template id="page5">
    <div class="hei100">
        <div class="van-doc-nav-bar van-nav-bar van-hairline--bottom" style="z-index: 1;">
            <div class="van-nav-bar__left">
                <i @click="$router.back(-1)" class="van-icon van-icon-arrow-left van-nav-bar__arrow"></i>
            </div>
            <div class="van-nav-bar__title van-ellipsis">个人信息</div>
            <div class="van-nav-bar__right"></div>
        </div>
        <section class="van-doc-demo-section demo-field">
            <div style="text-align: center;">
                <h2 class="van-doc-demo-block__title">头像</h2>
                <van-uploader v-model="fileList1" multiple :after-read="afterRead1" :max-count="1" />
            </div>
            <div class="van-cell-group van-hairline--top-bottom">
                <div class="van-cell van-cell--required van-field">
                    <div class="van-cell__title van-field__label">
                        <span>用户名</span>
                    </div>
                    <div class="van-cell__value">
                        <div class="van-field__body">
                            <input type="text" placeholder="请输入用户名" class="van-field__control" name="msg_user" />
                            <div class="van-field__right-icon">
                                <i class="van-icon van-icon-question-o"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="van-cell van-cell--required van-field sty11">
                    <div class="van-cell__title van-field__label">
                        <span>地域</span>
                    </div>
                    <div class="van-cell__value">
                        <div class="van-field__body">
                            <van-button type="primary" @click="showPopup" id="btn1">
                                {{setadd}}
                            </van-button>
                        </div>
                    </div>
                </div>
            </div>
            <van-popup v-model="show" position="bottom">
                <van-area :area-list="areaList" value="110101" @confirm="setArea" />
            </van-popup>
            <div class="van-cell van-cell--required van-field sty11 administratoroff">
                <div class="van-cell__title van-field__label">
                    <span>出生日期</span>
                </div>
                <div class="van-cell__value">
                    <div class="van-field__body">
                        <van-button type="primary" @click="showPopup2" id="btn2">
                            {{birtext}}
                        </van-button>
                    </div>
                </div>
            </div>
            <van-popup v-model="show2" position="bottom">
                <van-datetime-picker v-model="currentDate" type="date" @confirm="birtime" />
            </van-popup>
            <div class="van-cell van-cell--required van-field administratoroff">
                <div class="van-cell__title van-field__label">
                    <span>身份证号码</span>
                </div>
                <div class="van-cell__value">
                    <div class="van-field__body">
                        <input type="text" placeholder="请输入身份证号" class="van-field__control" name="msg_iid" />
                    </div>
                </div>
            </div>
            <div style="text-align: center">
                <h2 class="van-doc-demo-block__title">上传手持身份证照片</h2>
                <van-uploader preview-size="136px" v-model="fileList2" multiple :after-read="afterRead2" :max-count="1" />
            </div>
            <section style="text-align:center">
                <router-link :to="ids" tag="button" id="_TP" style="width: 100%" class="van-button van-button--primary van-button--normal btn_pos">
                    <span class="van-button__text">保存</span>
                </router-link>
            </section>
        </section>
    </div>
</template>



<script>
    import areaList from '../../assets/area'; // 引入地址列表
    import g from "./global";
    export default {
        data() {
            return {
                pictureFile: "",
                fileList1: [
                    // Uploader 根据文件后缀来判断是否为图片文件
                ],
                fileList2: [
                    // Uploader 根据文件后缀来判断是否为图片文件
                ],
                ids: "/loginselect",
                show: false,
                show2: false,
                areaList,
                setadd: "选择所在地",
                birtext: "选择你的出生日期",
                currentDate: new Date(),
            };
        },
        methods: {
            // 设置出生日期
            birtime(data) {
                g.user_msg.userInfo.birthday = data;
                let month = data.getMonth() + 1;
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                let day = data.getDate();
                if (day >= 0 && day <= 9) {
                    day = "0" + day;
                }
                let year = data.getFullYear();
                this.birtext = year+'-'+month+'-'+day;
                this.show2 = false;
            },
            //确定后设置地址
            setArea(data) {
                //设置省
                g.user_msg.area.province = data[0].name;
                //设置市
                g.user_msg.area.city = data[1].name;
                //设置区
                g.user_msg.area.district = data[2].name;
                this.setadd = data[0].name + '-' + data[1].name + '-' + data[2].name;
                this.show = false;
            },
            showPopup2() {
                this.show2 = true;
            },
            showPopup() {
                this.show = true;
            },
            //上传头像
            afterRead1(file) {
                // 此时可以自行将文件上传至服务器
                console.log(file);
                //创建formdata并存数据
                let data = new FormData();
                data.append("type", "headPortraits");
                data.append("file", file.file);
                //发送ajax
                this.pcajax(data, "/userInfo/headPortraits.do", "picsuccess1", "avatar");
            },
            //上传身份证照片
            afterRead2(file) {
                // 此时可以自行将文件上传至服务器
                console.log(file);
                //创建formdata并存数据
                let data = new FormData();
                data.append("type", "identityCardPicture");
                data.append("file", file.file);
                //发送ajax
                this.pcajax(
                    data,
                    "/userInfo/identityCardPicture.do",
                    "picsuccess1",
                    "identityCardPicture"
                );
            },
            ajax(data, url, func) {
                //创建ajax
                var ajax = new XMLHttpRequest();
                var stringData = JSON.stringify(data);
                //请求行(发送方式/发送目标url)
                ajax.open("post", "http://47.96.231.75:8080/deliver" + url);
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
            },
            pcajax(data, url, func, key) {
                //创建ajax
                var ajax = new XMLHttpRequest();
                //请求行(发送方式/发送目标url)
                ajax.open("post", "http://47.96.231.75:8080/deliver" + url);
                //回调函数
                ajax.onreadystatechange = () => {
                    if (ajax.readyState == 4 && ajax.status == 200) {
                        //接受返回的json
                        var json = JSON.parse(ajax.responseText);
                        this[func](json, key);
                    }
                };
                ajax.send(data);
            },
            // 拍照 / 选择图片预览
            //头像预览函数
            picsuccess1(i, key) {
                if (i.code == 0) {
                    //写入图片url(头像,身份证)到user_msg中
                    g.user_msg.userInfo[key] = i.data;
                } else {
                    alert("头像上传失败!");
                }
            },
            //注册ajax发送后的回调函数
            adregister(i) {
                if (i.code == 0) {
                    alert("注册成功!");
                    //跳转到登录注册选择页面
                    // next();
                } else {
                    alert("注册失败!");
                }
            }
        },
        created() {
            if (g.user_msg.userInfo.role == "司机") {
                this.ids = "/driverselect";
            }
        },
        mounted() {
            //如果为管理员身份则显示对应的管理员输入口
            console.log(g.user_msg);
            let adoff = document.getElementsByClassName("administratoroff");
            let adon = document.getElementsByClassName("administratoron");
            if (g.user_msg.userInfo.role == "管理员") {
                adoff[0].style.display = "none";
                adoff[1].style.display = "none";
                adoff[2].style.display = "none";
            }
        },
        beforeRouteLeave(to, from, next) {
            console.log("开启离开填写信息页面");
            //填写完个人信息后保存执行:
            //获取用户名值
            let name = document.getElementsByName("msg_user")[0];
            //获取身份证号
            let id = document.getElementsByName("msg_iid")[0];
            //获取生日
            let birthdayv = document.getElementsByClassName("select_2")[0];
            // let description = document.getElementsByName("description")[0];
            //判断是否填写非空
            var ju =
                name.value &&
                id.value &&
                birthdayv.textContent &&
                g.user_msg.userInfo.identityCardPicture;
            //填写信息写入user_msg对象---↓↓↓↓↓↓↓↓
            //获取并写入用户名
            g.user_msg.userInfo.name = name.value;
            //获取并写入身份证号
            g.user_msg.userInfo.identityCard = id.value;
            //获取并写入出生日期
            g.user_msg.userInfo.birthday = birthdayv.textContent;
            console.log(name.value);
            console.log(g.user_msg.userInfo.role);
            //判断身份
            if (g.user_msg.userInfo.role == "管理员" && name.value) {
                //如果身份是管理员并且写了用户名
                console.log("成功-管理员");
                let ad_msg = {
                    userInfo: {
                        avatar: g.user_msg.userInfo.avatar,
                        uid: g.user_msg.userInfo.uid,
                        name: name.value,
                        gender: "男",
                        role: g.user_msg.userInfo.role
                    },
                    area: {
                        uid: g.user_msg.area.uid,
                        province: g.user_msg.area.province,
                        city: g.user_msg.area.city,
                        district: g.user_msg.area.district,
                        status: g.user_msg.area.status
                    }
                };
                this.ajax(ad_msg, "/userInfo/userInfoRegister.do", "adregister");
                next();
            }
            if (g.user_msg.userInfo.role == "用户" && name.value && id.value) {
                //如果身份是用户并且写了用户名和身份证号
                let ad_msg = {
                    userInfo: g.user_msg.userInfo,
                    area: g.user_msg.area
                };
                this.ajax(ad_msg, "/userInfo/userInfoRegister.do", "adregister");
                next();
            }
            if (g.user_msg.userInfo.role == "司机" && name.value && id.value) {
                //如果身份是司机并且写了用户名和身份证号
                next();
            }
        }
    };
</script>




<style scoped>

    #btn1 {
        width: 100%;
        background-color: white;
        color: #797979;
        border: none;
        text-align: left;
        padding: 0;
        height: 24px;
        line-height: normal;
    }
    #btn2 {
        width: 100%;
        background-color: white;
        color: #797979;
        border: none;
        text-align: left;
        padding: 0;
        height: 24px;
        line-height: normal;
    }



</style>