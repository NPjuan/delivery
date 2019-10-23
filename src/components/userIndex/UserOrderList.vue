<template>
    <div id="container">
        <normalHeader
          left-text="返回"
          title="订单消息"
          right-text=""
          left-arrow
          @leftClick="headerLeftClick"
        />
    </div>
</template>
<script>
  import g from '../login/global'
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
      },
      mounted() {
          this.$store.state
          console.log(this.$store.state)
      }
    }
</script>

<style scoped>

</style>
