<!-- //登录界面 -->
<template id="page7">
    <div class="hei100">
        <div class="van-doc-nav-bar van-nav-bar van-hairline--bottom" style="z-index: 1;">
            <div class="van-nav-bar__left">
                <i @click="$router.back(-1)" class="van-icon van-icon-arrow-left van-nav-bar__arrow">
                            </i>
            </div>
            <div class="van-nav-bar__title van-ellipsis">个人登录</div>
            <div class="van-nav-bar__right"></div>
        </div>
        <section class="van-doc-demo-block">
            <h2 class="van-doc-demo-block__title">登录个人用户</h2>
            <div class="van-cell-group van-hairline--top-bottom">
                <div class="van-cell van-cell--required van-field">
                    <div class="van-cell__title van-field__label"><span>用户名</span></div>
                    <div class="van-cell__value">
                        <div class="van-field__body"><input v-model="username" type="text" placeholder="请输入用户名" class="van-field__control">
                            <div class="van-field__right-icon"><i class="van-icon van-icon-question-o">
                                                <!----></i></div>
                        </div>
                    </div>
                </div>
                <div class="van-cell van-cell--required van-field">
                    <div class="van-cell__title van-field__label"><span>密码</span></div>
                    <div class="van-cell__value">
                        <div class="van-field__body"><input v-model="password" type="password" placeholder="请输入密码" class="van-field__control"></div>
                    </div>
                </div>
            </div>
        </section>
        <button @click="login" style="width: 100%" class="van-button van-button--primary van-button--normal btn_pos">
                        <span class="van-button__text">登录</span>
                    </button>
    </div>
</template>




<script>
    export default {
        data() {
            return {
                username: "",
                password: "",
            }
        },
        methods: {
            login() {
                var data = {
                    "id":this.username,
                    "password" :this.password,
                }

                this.ajax(data, "/user/login.do", "loginss");
            },
            loginss(i){
                alert(i.msg);
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
        },
    }
</script>




<style scoped>

</style>