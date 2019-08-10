<template>
  <div>
    <h1>个人信息</h1>
    <div class="user">
      <router-link to="/home/login">登录</router-link>
      <router-link to="/home/register">注册</router-link>
    </div>
    <router-view>
    </router-view>
    <input type="button" value="开启摄像头" @click="getMedia">
    <video ref="video" src="" style="width: 300px;height: 300px;" autoplay></video>
    <canvas ref="canvas" style="width:300px;height:300px"></canvas>
    <button ref="snap" @click="takePhotoes">拍照</button>

  </div>
</template>

<script>
    export default {
        name: "Home",
      data(){
          return{

          }
      },
      methods:{
          takePhotoes() {
            let video =this.$refs.video
            let canvas = this.$refs.canvas
            let ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0, 300, 300);
        },
        getMedia() {
          let constraints = {
            video: {width: 300, height: 300},
            audio: false
          };
          //获得video摄像头区域
          let video = this.$refs.video
          //这里介绍新的方法，返回一个 Promise对象
          // 这个Promise对象返回成功后的回调函数带一个 MediaStream 对象作为其参数
          // then()是Promise对象里的方法
          // then()方法是异步执行，当then()前的方法执行完后再执行then()内部的程序
          // 避免数据没有获取到
          let promise = navigator.mediaDevices.getUserMedia(constraints);
          promise.then(function (MediaStream) {
            if ("srcObject" in video) {
              video.srcObject = MediaStream;
            } else {
              //避免在新的浏览器中使用它，因为它正在被弃用。
              video.src = window.URL.createObjectURL(MediaStream);
            }
            video.play();
          }).catch(function (err) {
            console.log(err)
          })
        }
      }
    }
</script>

<style scoped>
h1{
  text-align: center;
}
  a{
    float: right;
    display: inline-block;
    height: 80px;
    width: 120px;
    text-align: center;
    line-height: 80px;
    background-color: darkseagreen;
    text-decoration: none;
    color: black;
  }
.router-link-active{
  color: white;
}
  .user{
    margin: 20px auto;
    width: 100%;
    height: 80px;
  }
</style>
