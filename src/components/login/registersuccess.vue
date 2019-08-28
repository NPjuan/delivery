 <!-- 注册成功页面 -->
<template id="page4">
    <div class="hei100">
        <div class="van-doc-nav-bar van-nav-bar van-hairline--bottom" style="z-index: 1;">
            <div class="van-nav-bar__left">
                <i @click="$router.back(-1)" class="van-icon van-icon-arrow-left van-nav-bar__arrow">
                            </i>
            </div>
            <div class="van-nav-bar__title van-ellipsis">注册成功</div>
            <div class="van-nav-bar__right"></div>
        </div>
        <section class="van-doc-demo-section demo-field" style="text-align:center">
            <div style="text-align: center;margin-top: 45%;background-color: white;padding: 20px 0">
                <h2 style="text-align: center">注册成功</h2>
                <h4 style="text-align: center">你的个人id是:</h4>
                <h4 class="user_id " style="text-align: center;color: green;font-weight: bold"></h4>
                <h5 style="text-align: center">个人id是用户的唯一身份凭证,可用于今后的登录</h5>
            </div>
            <router-link to="/pcmsg" class="van-button van-button--primary van-button--normal btn_pos">
                <span class="van-button__text">完善个人信息</span>
            </router-link>
        </section>
    </div>
</template>



<script>
    import g from './global'
    export default {}
</script>




<style scoped>




</style>