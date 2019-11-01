<template>
<div>
  <normalHeader :title="title" @leftClick="router.go(-1)"></normalHeader>
</div>
</template>

<script>
    export default {
      name: "Receiving",
      data() {
        return {
          title: "待收货订单"
        }
      }
    }
</script>

<style scoped>

</style>
