<template>
  <div>
    <div class="msg-list">
      <div v-if="orderList.length" class="list-container" v-for="(value, index, key) in orderList">
        <div class="list"  @click="showDetails(index)">
          <p class="list-head">
            <span class="user-get">东莞市万江区哦力给 收</span>
            <span class="status">待担保订单</span>
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
            <div class="button confirm-button" @click.stop="confirm(index)">
              确认担保
            </div>
            <div class="button reject-button" @click.stop="refuse(index)">
              拒绝担保
            </div>
          </div>
        </div>
      </div>
      <p v-else class="none">
        暂无需要担保的订单
      </p>
    </div>
    <detail :show="show" :detail="detail" @changeShow="show = !show"></detail>
    <layer :show="show" @changeShow="show = false"></layer>
  </div>
</template>

<script>
  import detail from './orderListDetail'
  import layer from './layer'
    export default {
      name: "Surety",
      components: {
        layer,
        detail
      },
      data(){
        return {
          suretyId:"", // 担保人 id 也就是自己的 id
          url:"http://118.25.85.198:8080/deliver",
          iurl:"http://118.25.85.198:8080/",
          title: "待担保订单",
          orderList: [

          ],
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
        },
          show: false
        }
      },
      methods: {
        // 订单详情
        showDetails(index) {
          let self = this
          let userOrderId = self.orderList[index]["id"]
          this.$axios.post(this.url + '/userOrder/findDetail.do',{
            userOrderId: 3            //用户订单id
          })
            .then(function (response) {
              self.detail = response.data.data
              self.show = true
            })
            .catch(function (err) {
              console.log(err)
            })
        },
        confirm(index) {
          let self = this
          // 订单 id
          let userOrderId = this.orderList[index]["userOrderId"]
          console.log(this.orderList)
          this.$axios.post(this.$store.state.url+"/userOrder/suretyConfirm.do",{
            suretyId: 2,              //担保人id
            userOrderId               //想要确认的用户订单id
          })
            .then(function (response) {
              console.log(response)
              self.$toast(response.data.msg)
            })
            .catch(function (error) {
              console.log(error)
            })
        },
        refuse(index) {
          let self = this
          let userOrderId = this.orderList[index]["userOrderId"]
          this.$axios.post(this.$store.state.url+"/userOrder/suretyRefuse.do",{
            suretyId: 2,              //担保人id
            userOrderId               //想要确认的用户订单id
          })
            .then(function (response) {
              self.$toast(response.data.msg)
              console.log(response)
            })
            .catch(function (error) {
              console.log(error)
            })
        }
      },
      // 查找订单
      mounted() {
        let self = this
        let suretyId = this.$store.state.userData.user.id
        this.suretyId = suretyId
        this.$axios.post(this.$store.state.url+"/userOrder/needSurety.do",{
          suretyId: 3 // 目前先用 3 为测试 id
        })
          .then(function (response) {
            self.orderList = response.data.data
            console.log(self.orderList)
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    }
</script>

<style scoped>
  .msg-list{
    height: calc(100vh - 1.2rem);
    margin: 0 auto .5rem auto;
    overflow: auto;
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
    width: 3.6rem;
    height: 100%;
    font-size: .28rem;
    color: gray;
    letter-spacing: .02rem;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:3;
  }
  .button{
    float: right;
    width: 1.2rem;
    height: .5rem;
    line-height: .5rem;
    text-align: center;
    border-radius: 15px;
    margin-top: .25rem;
    font-size: .18rem;
  }
  .confirm-button{
    margin-right: .1rem;
    color: #57c8ac;
    border: 1px solid #57c8ac;
  }
  .reject-button{
    margin-right: .2rem;
    color: #ff6034;
    border: 1px solid #ff6034;
  }
  .none{
    text-align: center;
    font-size: .3rem;
    margin-top: 2rem;
  }
</style>
