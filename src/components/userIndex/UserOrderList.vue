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
          // let cname = "name"
          // let ckArray = document.cookie.split(";")
          // for(var i = 0; i <ckArray.length; i++) {
          //   let a =ckArray[i].split("=")
          //   // 去除Cookie前面的空格
          //   while (a[0].charAt(0) == ' ') {
          //     a[0] = a[0].substring(1);
          //   }
          //   if(a[0]==cname) {
          //     console.log(a[0])
          //     return a[1]
          //   }
          //   let exp = new Date()
          //   exp.setTime(exp.getTime()-1)
          //   document.cookie = cname + "=" + a[1]+";expires="+exp.toUTCString()
          //   alert(document.cookie)
          // }
          },
        headerRightClick() {

        }
      }
    }
</script>

<style scoped>

</style>
