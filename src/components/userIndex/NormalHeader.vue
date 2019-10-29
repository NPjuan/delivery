<template>
  <header>
    <span class="header-span header-span-left" @click="leftClick">{{leftText}}</span>
    <span class="header-span header-span-center">{{title}}</span>
    <span class="header-span header-span-right" @click="rightClick">{{rightText}}</span>
  </header>
</template>

<script>
    export default {
      name: "NormalHeader",
      props:{
         "left-text": {
           type: String,
           default: "返回",
           required: false
         },
        "right-text": {
          type: String,
          default: "",
          required: false
        },
        "title": {
          type: String,
          default: "",
          required: false
        },
        "left-arrow": {
          type: String,
          default: "",
          required: false
        }
      },
      data() {
          return {

          }
      },
      computed: {
       
      },
      methods: {
        // 事件监听
        leftClick() {
          this.$emit("leftClick")
        },
        rightClick() {
          this.$emit("rightClick")
        }
      }
    }
</script>

<style scoped>
  header{
    position: relative;
    height: 1rem;
    text-align: center;
    background-color: white;
  }
  .header-span{
    position: absolute;
    box-sizing: padding-box;
    height: 100%;
    padding: 0 .5rem;
    line-height: 1rem;
    color: #1989fa;
    font-size: .3rem;
  }
  .header-span-left{
    left: 0;
  }
  .header-span-right{
    right: 0;
  }
  .header-span-center{
    position: unset;
    font-size: .35rem;
    color: #7d7e80;
    margin: 0 auto;
  }
</style>
