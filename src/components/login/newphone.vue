<template>
    <div class="hei100 bg">
        <!-- 导航栏 -->
        <van-nav-bar title="修改" left-arrow @click-left="$router.back(-1)" border class="nav" />

        <van-cell-group>
            <!-- 标题 -->
            <h2 class="van-doc-demo-block__title">新手机号</h2>

            <!-- //手机号输入 -->
            <van-field
                v-model="userphone"
                clearable
                label="新手机号"
                right-icon="question-o"
                placeholder="请输入更换后手机号"
                @click-right-icon="$toast('输入更换后的手机号')"
            />
            <!-- 验证码 -->
            <van-field v-model="code" type="text" label="验证码" placeholder="请输入新手机号的验证码">
                <van-button
                    slot="button"
                    size="small"
                    type="primary"
                    class="sentBtn"
                    :disabled="disabled1"
                    @click="sentC(userphone)"
                >{{sent_msg}}</van-button>
            </van-field>
            <!-- 密码输入框 -->
            <van-field
                type="password"
                v-model="password"
                clearable
                label="新密码"
                placeholder="请输入新的密码"
            />
        </van-cell-group>
        <div style="text-align:center;">
            <van-button type="primary" size="normal" class="MyBGColor btncss" @click="check">更换</van-button>
        </div>
    </div>
</template>



<script>
export default {
    data() {
        return {
            //修改信息
            //修改手机号
            /**
            *例如:  {
                        "id":178,
                        "phone":"15625046019"
                    }
            */
            alterPhoneIP: "/user/updatePhone.do",
            //发送验证码接口
            sentCodeip: "/user/getPhoneCode.do",
            //验证码验证接口
            codeCheckip: "/user/checkPhoneCode.do",

            userphone: "",
            password: "",
            code: "",
            sent_msg: "发送验证码",

            //按钮禁用
            disabled1: false,
            //倒计时
            countdown: 60,

            codeData: ""
        };
    },
    mounted() {},
    beforeRouteEnter(to, from, next) {
        next();
    },
    methods: {
        //发送验证码
        sentC(userphone) {
            //开始
            if (this.countdown == 60) {
                this.disabled1 = true;
                this.axios
                    .post(this.$store.state.ip + this.sentCodeip, {
                        phone: userphone
                    })
                    .then(i => {
                        if (i.data.code == 0) {
                            this.$toast(i.data.msg + "\n请查收验证码");
                            this.codeData = i.data.data;
                        } else {
                            //发送失败
                            this.$toast(i.data.msg + "请稍后再试!");
                        }
                    });
            }
            //结束
            if (this.countdown == 0) {
                this.disabled1 = false;
                this.sent_msg = "发送验证码";
                this.countdown = 60;
                return;
            } else {
                //正在计时
                this.sent_msg = "重新发送" + this.countdown + "s";
                this.countdown--;
            }
            setTimeout(() => {
                this.sentC();
            }, 1000);
        },
        //核实验证码
        check() {
            let codetime = new Date().getTime();
            this.axios
                .post(this.$store.state.ip + this.codeCheckip, {
                    code: this.code,
                    time: codetime,
                    codeData: this.codeData
                })
                .then(i => {
                    if (i.data.code == 0) {
                        //验证码成功后,更换手机号
                        this.axios
                            .post(this.$store.state.ip + this.alterPhoneIP, {
                                id: this.$store.state.userData.user.id,
                                phone: this.userphone,
                                password: this.password
                            })
                            .then(i => {
                                //验证码成功
                                if (i.data.code == 0) {
                                    this.$toast("更换手机号成功!");
                                    this.$router.push("/myInfo");
                                } else {
                                    this.$toast(i.data.msg);
                                }
                            });
                    } else {
                        this.$toast(i.data.msg + "请核实输入的验证码!");
                    }
                })
                .catch(e => {
                    console.info(e);
                });
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

.van-doc-demo-block__title {
    margin: 0;
    padding: 2vh 15px 15px;
    background-color: #f5f5f5;
    color: #009788;
    font-weight: normal;
    font-size: 14px;
}

.sentBtn {
    background-color: #009788;
    border: none;
}

.MyBGColor {
    margin-top: 4vh;
    background-color: #009788;
    width: 95vw;
    height: 6vh;
    line-height: 6vh;
}

.btncss {
    border: #009788;
    width: 95vw;
    height: 6vh;
}
</style>
