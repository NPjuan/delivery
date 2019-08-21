    <!-- //身份选择 -->
<template id="page2">
    <div class="hei100">
        <div class="van-doc-nav-bar van-nav-bar van-hairline--bottom" style="z-index: 1;">
            <div class="van-nav-bar__left"><i @click="$router.back(-1)" class="van-icon van-icon-arrow-left van-nav-bar__arrow">
                            </i>
            </div>
            <div class="van-nav-bar__title van-ellipsis">注册选择</div>
            <div class="van-nav-bar__right"></div>
        </div>
        <section style="text-align:center;">
            <router-link to="/register?status=用户" tag='button' @click="status1" class="van-button van-button--primary van-button--normal btn_pos m_status" style="width: 50%;margin-bottom: 50px;margin-top: 50%">
                <span class="van-button__text">用户</span>
            </router-link>
        </section>
        <section style="text-align:center">
            <router-link to="/register?status=司机" @click="status2" class="van-button van-button--primary van-button--normal btn_pos m_status"  tag='button' style="width: 50%;margin-bottom: 50px">
                <span class="van-button__text">司机</span>
            </router-link>
        </section>
        <section style="text-align:center">
            <router-link to="/register?status=管理员" @click="status3" tag='button' class="van-button van-button--primary van-button--normal btn_pos m_status" style="width: 50%;margin-bottom: 50px">
                <span class="van-button__text">管理员</span>
            </router-link>
        </section>
    </div>
</template>



<script>
    import g from './global'
    export default {
        data() {
            return {
            }
        },
        methods: {
            status1() {
                g.user_msg.userInfo.role = "用户";
            },
            status2() {
                g.user_msg.userInfo.role = "司机";
            },
            status3() {
                g.user_msg.userInfo.role = "管理员";
            },
        },
        // beforeRouteLeave (to, from, next) {
        //     // ...
        // }

    }
</script>


<style scoped>


</style>