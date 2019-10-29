<template>
    <div :class="classes" @click="close"></div>
</template>

<script>
    export default {
      name: "layer",
      props:{
        show:{
          type: Boolean,
          default: false
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
    height: 100vh;
    width: 100vw;
    transition: .5s all ease;
  }
  .enter{
    background-color: rgba(0,0,0,.7);
    z-index: 100;
  }
  .leave{
    background-color: transparent;
    z-index: -5;
  }
</style>
