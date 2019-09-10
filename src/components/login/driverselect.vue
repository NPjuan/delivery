    <!-- //司机选择界面 -->
<template id="page6">
    <div class="hei100">
        <div class="van-doc-nav-bar van-nav-bar van-hairline--bottom" style="z-index: 1;">
            <div class="van-nav-bar__left">
                <i @click="$router.back(-1)" class="van-icon van-icon-arrow-left van-nav-bar__arrow"></i>
            </div>
            <div class="van-nav-bar__title van-ellipsis">司机信息补充</div>
            <div class="van-nav-bar__right"></div>
        </div>
        <div style="text-align: center">
            <button @click="carselect1" class="van-button van-button--primary van-button--normal cartype">
                                <span class="van-button__text">私家车</span>
                              </button>
            <button @click="carselect2" class="van-button van-button--primary van-button--normal cartype">
                                <span class="van-button__text">货运车</span>
                              </button>
        </div>
        <div>
            <!-- 汽车行驶路线 -->
            <div class="van-cell-group van-hairline--top-bottom description">
                <h2 class="van-doc-demo-block__title">汽车行驶路线描述</h2>
                <div class="van-cell van-field">
                    <div class="van-cell__value">
                        <div class="van-field__body">
                            <textarea v-model="msg" placeholder="请输入留言" rows="1" class="van-field__control" style="height: 96px;" name="description"></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div style="text-align: center">
                <h2 class="van-doc-demo-block__title">上传驾驶证照片</h2>
                <van-uploader preview-size="136px" v-model="fileList1" multiple :after-read="afterRead1" :max-count="1" />
            </div>
            <div style="text-align: center">
                <h2 class="van-doc-demo-block__title">上传汽车照片</h2>
                <van-uploader preview-size="136px" v-model="fileList2" multiple :after-read="afterRead2" :max-count="1" />
            </div>
            <section style="text-align:center">
                <router-link to="/loginselect" tag="button" class="van-button van-button--primary van-button--normal btn_pos" style="width: 100%">
                    <span class="van-button__text">保存</span>
                </router-link>
            </section>
        </div>
    </div>
</template>



<script>
    import g from "./global";
    export default {
        data() {
            return {
                fileList1: [
                    // Uploader 根据文件后缀来判断是否为图片文件
                ],
                fileList2: [
                    // Uploader 根据文件后缀来判断是否为图片文件
                ],
                msg:"",
            };
        },
        methods: {
            //上传驾驶证照片
            afterRead1(file) {
                // 此时可以自行将文件上传至服务器
                console.log(file);
                //创建formdata并存数据
                let data = new FormData();
                data.append("type", "headPortraits");
                data.append("file", file.file);
                //发送ajax
                this.pcajax(
                    data,
                    "/driverInfo/drivingLicence.do",
                    "picsuccess",
                    "drivingLicencePicture"
                );
            },
            //上传汽车照片
            afterRead2(file) {
                // 此时可以自行将文件上传至服务器
                console.log(file);
                //创建formdata并存数据
                let data = new FormData();
                data.append("type", "headPortraits");
                data.append("file", file.file);
                //发送ajax
                this.pcajax(
                    data,
                    "/driverInfo/CardPicture.do",
                    "picsuccess",
                    "carPicture"
                );
            },
            picsuccess(i, key) {
                if (i.code == 0) {
                    //写入图片url(驾照,汽车照片)到user_msg中
                    g.user_msg.driverInfo[key] = i.data;
                } else {
                    alert("图片上传失败!");
                }
            },
            carselect1() {
                let cartype = document.getElementsByClassName("cartype");
                let description = document.getElementsByClassName("description")[0];
                cartype[0].style.backgroundColor = "green";
                cartype[0].style.border = "green";
                cartype[1].style.backgroundColor = "gray";
                cartype[1].style.border = "gray";
                description.style.display = "none";
                g.user_msg.driverInfo.carType = "私家车";
            },
            carselect2() {
                let cartype = document.getElementsByClassName("cartype");
                let description = document.getElementsByClassName("description")[0];
                cartype[1].style.backgroundColor = "green";
                cartype[1].style.border = "green";
                cartype[0].style.backgroundColor = "gray";
                cartype[0].style.border = "gray";
                description.style.display = "block";
                g.user_msg.driverInfo.carType = "客运车";
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
            adregister(i) {
                if (i.code == 0) {
                    alert("注册成功!");
                } else {
                    alert("注册失败!");
                }
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
                }
                //请求主体(请求发送)
                ajax.send(stringData);
            },
        },
        mounted() {
            let btn = document.getElementsByClassName("cartype")[0];
            btn.click();
        },
        beforeRouteLeave(to, from, next) {
            g.user_msg.driverInfo.runningRoute = this.msg;
            this.ajax(g.user_msg, "/userInfo/userInfoRegister.do", "adregister");
            //跳转到登录注册选择页面
            next();
        }
    };
</script>


<style scoped>


</style>