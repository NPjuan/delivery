<template>
    <div id="container">
        <normalHeader
          left-text="返回"
          title="订单消息"
          right-text=""
          left-arrow
          @leftClick="headerLeftClick"
        />
      <div class="list-container">
        <div class="list">
          <p class="list-head">
            <span class="user-get">东莞市万江区潘俊渊 收</span>
            <span class="status">已完成订单</span>
          </p>
          <div class="center-container">
            <div class="img-container">
              <img src="../../assets/image/user-send.svg" alt="" class="img">
              <img src="../../assets/image/user-send.svg" alt="" class="img">
              <img src="../../assets/image/user-send.svg" alt="" class="img">
            </div>
            <div class="pay">
              <span style="font-size: .45rem">￥ 50</span>.00
            </div>
          </div>
          <p style="font-size: .28rem;margin: .1rem auto">货物描述:</p>
          <div class="bottom-container">
            <div class="text">潘俊渊啊手动阀手动阀发电上网发射点发顺丰的发生的发射点发</div>
            <div class="detail-button">
              详细信息
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>

  import g from '../login/global'

    export default {
        name: "UserOrderList",
      data() {
          return {
            // 订单信息
            localHost:"http://192.168.1.106:8080",
            url:"http://47.96.231.75:8080/deliver",
            orderList: [],
          }
      },
      methods:{
        headerLeftClick() {
          this.$axios.post(this.localHost+"/userOrder/findAll.do",{
            userId: 1
          })
            .then(function (response) {
              console.log(response)
            })
            .catch(function (error) {
              console.log(error)
            })
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
  #container{
    max-width: 640px;
    min-width: 320px;
  }
  .list-container{
    box-sizing: border-box;
    height: 3.5rem;
    width: 95%;
    margin: .2rem auto;
    border: 1px solid transparent;
    border-radius: 10px;
    background-color: white;
  }
  .list{
    height: 90%;
    width: 95%;
    margin: .1rem auto;
  }
  .list-head{
    box-sizing: border-box;
    position: relative;
    background-color: white;
    height: .5rem;
    line-height: .5rem;
    font-size: .28rem;
  }
  .user-get{
    position: absolute;
    left: 0;
  }
  .status{
    position: absolute;
    right: 0;
    color: #ef3f52;
  }
  .center-container{
    position: relative;
    height: 1.2rem;
  }
  .img-container{
    margin-right: -.1rem;
    width: 4.1rem;
    height: 1.2rem;
  }
  .img{
    display: inline-block;
    height: 100%;
    width: 1.2rem;
    margin-right: .1rem;
  }
  .pay{
    position: absolute;
    right: 0;
    bottom: 0;
    width: 2rem;
    font-size: .35rem;
  }
  .bottom-container{
    height: 1rem;
  }
  .text{
    float: left;
    display: -webkit-box;
    text-indent: .46rem;
    width: 4rem;
    height: 100%;
    font-size: .28rem;
    color: gray;
    letter-spacing: .02rem;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:3;
  }
  .detail-button{
    line-height: .8rem;
    text-align: center;
    float: right;
    width: 2rem;
    height: .8rem;
    border-radius: 5px;
    margin-right: .25rem;
    color: white;
    font-size: .3rem;
    background-color: #57c8ac;
  }
</style>
