<template>
    <div id="container">
      <normalHeader
          left-text="返回"
          title="订单消息"
          right-text=""
          left-arrow
          @leftClick="headerLeftClick"
        />
      <div style="padding-top:1rem">
        <div class="list-container" v-for="(value, index, key) in orderList">
          <div class="list"  @click="showDetails(index)">
            <p class="list-head">
              <span class="user-get">东莞市万江区潘俊渊 收</span>
              <span class="status">{{value.status | statusFilter}}</span>
            </p>
            <div class="center-container">
              <div class="img-container">
                <img v-if="value.goodsPicture1" :src="iurl+value.goodsPicture1" alt="goodsPicture1" class="img">
                <img v-if="value.goodsPicture2" :src="iurl+value.goodsPicture2" alt="goodsPicture2" class="img">
                <img v-if="value.goodsPicture3" :src="iurl+value.goodsPicture3" alt="goodsPicture3" class="img">
              </div>
              <div class="pay">
                <span style="font-size: .4rem">￥ {{value.pay.toFixed(2).split(".")[0]}}.</span><span style="font-size: .3rem">{{value.pay.toFixed(2).split(".")[1]}}</span>
              </div>
            </div>
            <p style="font-size: .28rem;margin: .1rem auto"></p>
            <div class="bottom-container">
              <div class="text">{{value.description?value.description:'无货物描述'}}</div>
              <div class="detail-button">
                提出申诉
              </div>
            </div>
          </div>
        </div>
      </div>
      <layer :show="detailShow" @changeShow="detailShow = !detailShow"/>
      <detail :show="detailShow" :detail="detail" @changeShow="detailShow = !detailShow"></detail>
    </div>
</template>
<script>

  import g from '../login/global'
  import detail from './orderListDetail'
  import layer from './layer'
    export default {
      name: "UserOrderList",
      components:{
        detail,
        layer
      },
      data() {
          return {
            // 订单信息
            localHost:"http://192.168.1.106:8080",
            url:"http://118.25.85.198:8080/deliver",
            iurl:"http://118.25.85.198:8080",
            orderList: [
            ],
            detailShow:false,
            detail:{
              //司机相关信息
              "driverRelate":{
                "id":1,
                "name":"司机姓名",
                "phone":"司机电话"
              },
              //担保人相关信息
              "suretyRelate":{
                "id":2,
                "name":"担保人姓名",
                "phone":"担保人电话"
              },
              //收货人相关信息
              "contactRelate":{
                "id":3,
                "name":"收货人姓名",
                "phone":"收货人电话"
              },
              //用户订单创建时间
              "createTime":1571755162000,
              //收货地址
              "consigneeArea":{
                "id":1,
                "province":"省",
                "city":"市",
                "district":"区",
                "town":"镇",
                "village":"村",
                "detail":"详细地址"
              },
              //订单编号
              "userOrderNumber":"346632180207849472",
              //发货地址
              "deliverArea":{
                "id":2,
                "province":"省2",
                "city":"市2",
                "district":"区2",
                "town":"镇2",
                "village":"村2",
                "detail":"详细地址2"
              }
            }
          }
      },
      methods:{
        headerLeftClick() {
          this.$router.go(-1)
        },
        showDetails(index) {
          let self = this
          let userOrderId = self.orderList[index]["id"]
          this.$axios.post(this.url + '/userOrder/findDetail.do',{
            userOrderId            //用户订单id
          })
            .then(function (response) {
              console.log(response)
              self.detail = response.data.data
              self.detailShow = !self.detailShow
            })
            .catch(function (err) {
              console.log(err)
            })
        },
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
        let self = this
        this.$axios.post(this.url+"/userOrder/findAll.do",{
          userId: 1
        })
          .then(function (response) {
            console.log(response.data.data)
            self.orderList = response.data.data
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    }
</script>

<style scoped>
  #container{
    overflow: auto;
    max-width: 640px;
    min-width: 320px;
    height: 100vh;
  }
  .list-container{
    box-sizing: border-box;
    height: 3rem;
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
    width: 4rem;
    height: 1.3rem;
  }
  .img{
    display: inline-block;
    float: left;
    height: 100%;
    width: 1.3rem;
    margin-right: .1rem;
  }
  .pay{
    position: absolute;
    right: 0;
    bottom: 0;
    width: 2rem;
  }
  .bottom-container{
    height: 1rem;
  }
  .text{
    float: left;
    padding-top: .15rem;
    display: -webkit-box;
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
    float: right;
    width: 1.5rem;
    height: .6rem;
    line-height: .6rem;
    text-align: center;
    border-radius: 15px;
    margin-top: .15rem;
    margin-right: .1rem;
    color: #57c8ac;
    font-size: .25rem;
    border: 1px solid #57c8ac;
  }
</style>
