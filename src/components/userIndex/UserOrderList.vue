<template>
    <div id="container">
      <normalHeader
        left-text="返回"
        title="订单消息"
        right-text=""
        left-arrow
        @leftClick="headerLeftClick"
      />
      <div>

      </div>
    </div>
</template>

<script>

    export default {
        name: "UserOrderList",
      data() {
          return {
            // 订单信息
            orderList: [],
          }
      },
      methods:{
        headerLeftClick() {
            this.$router.go(-1)
          },
        headerRightClick() {

        }
      }
    }
</script>

<style scoped>

</style>
