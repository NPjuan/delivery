<template>
    <div :class="classes" @click="close"></div>
</template>

<script>
    export default {
      name: "shadow",
      props:{
        show:{
          type: Boolean
        }
      },
      methods:{
        close() {
          this.$emit('changeShow' , "");
        }
      },
      computed:{
        classes: function () {
          return {
            shadow: true,
            enter: this.show,
            leave: !this.show
          }
        }
      }
    }
</script>

<style scoped>
  .shadow{
    position: fixed;
    top: 0;
    left: 0;
    transition: .5s all ease;
    height: 100vh;
    width: 100vw;
  }
  .enter{
    background-color: rgba(0,0,0,.7);
    z-index: 50;
  }
  .leave{
    background-color: transparent;
    z-index: -5;
  }
</style>
