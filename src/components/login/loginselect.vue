    <!-- 登录注册选择 -->

<template>
    <div class="hei100 container" @click="login">
        <div class="van-doc-nav-bar van-nav-bar van-hairline--bottom" style="z-index: 1;">
            <div class="van-nav-bar__left">
                <i @click="$router.back(-1)" class="van-icon van-icon-arrow-left van-nav-bar__arrow"></i>
            </div>
            <div class="van-nav-bar__title van-ellipsis">选择</div>
            <div class="van-nav-bar__right"></div>
        </div>
        <section style="text-align:center;">
            <router-link class="van-button van-button--primary van-button--normal btn_pos" to="/login" tag="button" style="width: 50%;margin-bottom: 50px;margin-top: 50%">
                <span class="van-button__text" >登录</span>
            </router-link>
        </section>
        <section style="text-align:center">
            <router-link to="/idselect" tag='span' class="van-button van-button--primary van-button--normal btn_pos" style="width: 50%;margin-bottom: 50px">
                <span class="van-button__text">注册</span>
            </router-link>
        </section>
    </div>
</template>


<script>
    export default {
        data() {
            return {
            }
        },
        methods: {
          login() {
            this.$bus.emit("login", 2)
          }
        },

    }
</script>




<style scoped>



</style>
