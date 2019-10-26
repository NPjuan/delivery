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
        <div class="list" v-for="(value, index, key) in orderList">
          <p class="list-head">
            <span class="user-get">东莞市万江区潘俊渊 收</span>
            <span class="status">{{value.status | statusFilter}}</span>
          </p>
          <div class="center-container">
            <div class="img-container">
              <img v-if="value.goodsPicture1" :src="url+'goodsPicture1'" alt="goodsPicture1" class="img">
              <img v-if="value.goodsPicture2" :src="url+'goodsPicture2'" alt="goodsPicture2" class="img">
              <img v-if="value.goodsPicture3" :src="url+'goodsPicture3'" alt="goodsPicture3" class="img">
            </div>
            <div class="pay">
              <span style="font-size: .45rem">￥ {{value.pay.toString().split(".")[0]}}</span>{{value.pay.toString().split(".")[1]}}
            </div>
          </div>
          <p style="font-size: .28rem;margin: .1rem auto">货物描述:</p>
          <div class="bottom-container">
            <div class="text">{{value.description?value.description:'无货物描述'}}</div>
            <div class="detail-button" @click="detailShow = !detailShow">
              详细信息
            </div>
          </div>
        </div>
      </div>
      <background :show="detailShow" @changeShow="detailShow = !detailShow"/>
      <detail :show="detailShow" @changeShow="detailShow = !detailShow"></detail>
    </div>
</template>
<script>

  import g from '../login/global'
  import detail from './orderListDetail'
  import background from './shadow'
    export default {
      name: "UserOrderList",
      components:{
        detail,
        background
      },
      data() {
          return {
            // 订单信息
            localHost:"http://192.168.1.106:8080",
            url:"http://47.96.231.75:8080/deliver",
            orderList: [
              {
                "id":6,                             //用户订单id
                "description":"",
                "status":"1",                       //status为"0"时等待担保人确认/拒绝，status为"1"时等待被司机接单，status为"2"时担保人拒绝担保，单，status为"3"时已被司机接单，status为"4"时收货人确认收货
                "pay":100,                          //费用
                "goodsPicture1":"/uploads/goodsPictures/货物图片1.jpg",
                "goodsPicture2":"/uploads/goodsPictures/货物图片2.jpg",
                "goodsPicture3":null
              }
            ],
            detailShow:false
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
        }
      },
      filters: {
          statusFilter(value) {
            if(value == 0){
              return "等待担保人回应"
            }else if(value == 1){
              return "等待被司机接单"
            }else if(value == 2){
              return "担保人拒绝担保"
            }else if(value == 3){
              return "已被司机接单"
            }else if(value == 4){
              return "收货人确认收货"
            }

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
    width: 4.2rem;
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
