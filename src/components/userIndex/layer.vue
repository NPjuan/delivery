<template>
    <div :class="classes" @click="close"  :style="{'backgroundColor': back}"></div>
</template>

<script>
    export default {
      name: "layer",
      props:{
        show:{
          type: Boolean,
          default: false
        },
        color: {
          type: String,
          default: "rgba(0,0,0,.7)"
        }
      },
      data() {
        return {
        }
      },
      methods:{
        close() {
          this.$emit('changeShow' , "");
        }
      },
      computed:{
        back: function() {
          if(this.show){
            return this.color
          }else{
            return 'transparent'
          }
        },
        classes: function () {
          return {
            shadow: true,
            enter: this.show,
            leave: !this.show,
          }
        },
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
    z-index: 105;
  }
  .leave{
    z-index: -5;
  }
</style>
