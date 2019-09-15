 <!-- 注册成功页面 -->
<template id="page4">
    <div class="hei100">
        <div class="van-doc-nav-bar van-nav-bar van-hairline--bottom bg_g" style="z-index: 1;" >
            <div class="van-nav-bar__left">
                <i @click="$router.back(-1)" class="van-icon van-icon-arrow-left van-nav-bar__arrow" style="color:white">
                            </i>
            </div>
            <div class="van-nav-bar__title van-ellipsis" style="color:white">注册成功</div>
            <div class="van-nav-bar__right"></div>

        </div>




        <div style="text-align:center">
            <img src="../../assets/image/userinfo/success.png" alt="success" width="200px" style="display:inline-block">



        </div>
        <div class="bg_t text" style="color:black">

        注册成功

        </div>

        <section class="van-doc-demo-section demo-field" style="text-align:center">
            <div style="text-align: center;margin-top: 10%;padding: 20px 0">
                <h4 style="text-align: center;font-size:25px" class="pad_10">你的个人id是:</h4>
                <h4 class="user_id pad_10" style="text-align: center;color: green;font-weight: bold;font-size:30px"></h4>
                <h5 style="text-align: center;color:gray" class="pad_10">个人id是用户的唯一身份凭证,可用于今后的登录</h5>
            </div>
            <router-link to="/pcmsg" class="van-button van-button--primary van-button--normal btn_pos" style="width:100%">
                <span class="van-button__text" >完善个人信息</span>
            </router-link>
        </section>
    </div>
</template>



<script>
    import g from './global'
    export default {}
</script>




<style scoped>


    .bg_g {
        background-color: #07c160;
    }

    .bg_t{
        /* width: 100%;
        height: 25vh;

        border-bottom-right-radius: 50px 20px;
        border-bottom-left-radius:50px 20px;
        background-color: #07c160; */
    }

    .text{
        text-align: center;
        font-size: 25px;
        color: white;
    }

    .pad_10{
        padding: 10px 0px;
    }




</style>