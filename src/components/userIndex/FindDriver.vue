<template>
  <div class="container" @click="findDriver">
    <header>
      <span class="go-back-button" @click="goBack">返回</span>
      <span style="height: 100%;line-height: 1rem;font-size: .32rem;">附近司机</span>
    </header>
    <div class="driver-list" v-if="driver.length !== 0">
        <div  class="driver-list-item"  v-for="(value, index ,key) in driver" :index="index">
          <p class="driver-list-item-driver"><span>司机</span><span style="color: #7d7e80;padding-right: .2rem">{{value.name}}</span><span>{{value.license}}</span></p>
          <p class="driver-list-item-date"><span>出发时间</span><span>{{value.startDate}}</span></p>
          <p class="driver-list-item-address"><span>出发地</span><span style="display: inline-block;"><span>{{value.startAddress}}</span></span></p>
          <button class="invite-button" @click="inviteDriver">邀请他</button>
        </div>
    </div>
    <div v-else style="width: 100%;font-size: .3rem;padding-top: 3rem;text-align: center">
      {{ msg }}
    </div>
  </div>
</template>

<script>
    export default {
        name: "FindDriver",
      data() {
          return {
            // http://118.25.85.198:8080/deliver
            // http://47.96.231.75:8080/deliver
            url: "http://118.25.85.198:8080/deliver",
            driver: [],
            userOrderId: [] , // 订单 id
            testDriver:[],
            msg: "暂时还没有顺路司机哦"
          }
      },
      methods: {
        inviteDriver() {
          this.$toast('已向司机发送邀请')
        },
        findDriver() {
          let self = this
          // 从未发布订单
          if(self.userOrderId.length === 0){
            this.msg = "未发布订单，无法寻找顺路司机"
            return
          }
          this.$axios.post(this.url + "/driverOrder/findNear.do",{
            userOrderId: Number(self.userOrderId),
          })
            .then(function (response) {
              self.driver = []
              // 如果查找不到顺路司机
              if(response.data.data == null){
                console.log(self.driver.length)
              }else{
                for(let i=0,len=response.data.data.length;i<len;i++){
                  let { areas, carNumber, carPicture, goOff, name, phone} = response.data.data[i]
                  let mes = {
                    startAddress:areas[0].district + areas[0].town + areas[0].village + areas[0].detail,
                    license:carNumber,
                    carPicture,
                    startDate:self.timeFilter(goOff), //时间过滤器
                    name,
                    phone
                  }
                  self.driver.push(mes)
                }
              }
            })
        },
        timeFilter(timestamp) {
          let date = new Date(timestamp );//时间戳为10位需*1000，时间戳为13位的话不需乘1000
          let Y = date.getFullYear() + '-'
          let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
          let D = (date.getDate() < 10 ? '0'+ (date.getDate()) : date.getDate()) + ' '
          let h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':'
          let m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes())
          return Y+M+D+h+m
        },
        goBack(){
          this.$router.go(-1)
        }
      },
      mounted() {
        // 赋值给当前的 order 数组
        this.userOrderId = this.$route.query.userOrderId
        // 查找司机
        this.findDriver()
      }
    }
</script>

<style scoped>
  .go-back-button{
    position: absolute;
    left:.5rem;
    height:100%;
    line-height: 1rem;
    box-sizing: border-box;
    font-size: .3rem;
    float: left;
    color: skyblue
  }
  header{
    position: fixed;
    background-color: white;
    z-index:10;
    height: 1rem;
    width: 100%;
    text-align: center;
  }
  .invite-button{
    width:1.6rem;
    height:.6rem;
    background-color: skyblue;
    border: none;
    position: absolute;
    bottom: .1rem;
    right: .25rem;
    color: white;
  }
  .container{
    overflow: auto;
    background-color: #f8f8f8;
  }
  .container::-webkit-scrollbar{
    display: none;
  }
  .driver-list{
    margin: 1.2rem .25rem;
  }
  .driver-list-item{
    position: relative;
    width: 100%;
    margin: auto;
    height: 1.6rem;
    padding-top: .2rem;
    background-color: white;
    border-bottom: 1px solid skyblue;
    font-size: .3rem
  }
  .driver-list-item span{
    display: inline-block;
  }
  .driver-list-item span{
    font-size: .25rem;
  }
  .driver-list-item-driver span:first-child{

    padding: .1rem .8rem 0 .3rem;
  }
  .driver-list-item-driver span:last-child{

    color: #7d7e80;
  }
  .driver-list-item-date span:first-child{

    padding: .1rem .2rem 0 .3rem;
  }
  .driver-list-item-date span:last-child{
    padding-left: .1rem;
    color: #7d7e80;
  }
  .driver-list-item-address{
    height: .6rem;
  }
  .driver-list-item-address span:first-child{
    vertical-align: top;
    padding: 0.05rem .2rem 0 .3rem;
  }
  .driver-list-item-address span:last-child{
    display: -webkit-box;
    padding-left: .17rem;
    color: #7d7e80;
    width: 2.95rem;
    margin: 0;
    text-overflow: ellipsis;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;
    overflow: hidden;
  }
</style>
