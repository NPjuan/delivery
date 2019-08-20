<template>
  <div class="invitation">
    <van-cell-group>
      <h1>谁邀请我谁给钱</h1>
      <van-button plain type="primary" size="small" @click="onClickLeft">返回</van-button>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: "inviteLink",
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.invitation {
  width: 100%;
  height: 100rem; /*为了附近订单没有数据时不要显示背景图，挡住*/
  background-color: white;
}
</style>