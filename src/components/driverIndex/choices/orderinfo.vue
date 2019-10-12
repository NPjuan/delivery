<template>
  <div class="orderinfo">
    <van-cell-group class="cell-group">
      <!-- <button plain type="primary" size="small"  @click="returnwhere" class="returnlast"></button> -->
      <p class="remind3">订单详情</p>
      <ul class="infoul">
        <li >
          <div class="consignor">
            <div class="people1">
              <span >
                <img src="../../../assets/image/个人 (1).png" class="peopleimg1">
              </span>
              <h3 class="title">发货人信息</h3>
            </div >
            <div>
              <p v-cloak class="name">姓名：{{consignor.name}} </p>
              <p v-cloak class="phone">电话：{{consignor.phone}} </p>
              <p v-cloak class="address">地址：{{consignor.address}}</p>
              <p v-cloak class="time-scope">起始时间：{{deliveryStart}}</p>
              <p v-cloak class="time-scope">截止时间：{{deliveryEnd}}</p>
            </div>
          </div>
        </li>
        <li >
          <div class="consignee">
            <div class="people2">
              <span >
                <img src="../../../assets/image/个人 (1).png" class="peopleimg2">
              </span>
              <h3 class="title">收货人信息</h3>
            </div>
            <div>
              <p v-cloak class="name">姓名：{{consignee.name}}</p>
              <p v-cloak class="phone">电话：{{consignee.phone}}</p>
              <p v-cloak class="address">地址：{{consignee.address}}</p>
            </div>
          </div>
        </li>
        <li >
          <div class="goods">
            <div  class="box">
              <span>
                <img src="../../../assets/image/箱子.png" class="boximg">
              </span>
              <h3 class="title">货物信息</h3>
            </div>
            <div class="goodsinfo">
              <p v-cloak class="name">描述：{{description}} </p>
              <ul>
                <li v-for="(item,index) in photo" :key="index">
                  <img :src="photo[index]" alt = "暂无图片" class="goodsphoto">
                </li>
              </ul>
            </div>
          </div>
        </li>
        <li>
          <van-button type="primary"  @click="confirm" class="confirm">确认接单</van-button>
          <van-popup v-model="confirmShow">
            <van-field class = "guarantee"
            v-model = "idStr"
            label = "担保人id"
            type = "textarea"
            placeholder = "请输入担保人id"
            rows="1"
            autosize
            required
            @blur = "checkId"
            />
          </van-popup>
          <van-popup v-model="confirmShow2" class = "confirm-again">
            <van-button type="primary"  @click="confirm1" class = "confirm-last">无需担保人，确认接单</van-button>
          </van-popup>
        </li>
      </ul>
    </van-cell-group>
  </div>
</template>

<script>
// import bus from '../../../assets/eventBus'
import axios from 'axios'
export default {
  name:"infoLink",
  data() {
    return {
    id:this.$route.params.id,//从订单列表页面传过来的点击某个订单时对应的订单id
    orderlist:this.$route.params.orderlist,//所有订单的发货人信息
    index:this.$route.params.index,//此订单的索引，用来找对应发货人的信息
    consignor:{
      name:"",
      phone:"",
      address:""
    },
    consignee:{
      name:"",
      phone:"",
      address:""
    },
    deliveryStart:"",
    deliveryEnd:"",
    description:"",
    photo:[],
    confirmShow:false,
      confirmShow2: false,
    idStr:"",
    };
  },//data结束

  created(){
    this.getDelivelyInfo()//拿到发货人的信息
    this.getOrderInfo()//拿到收货人的信息
  },//create结束

  methods: {
    getOrderInfo(){
      let self = this
      let baseURL = 'http://47.96.231.75:8080' //拿图片时默认要加在图片前面
      axios.defaults.baseURL = 'http://47.96.231.75:8080/deliver'
      axios.post('/userOrder/findDetail.do',{
        userOrderId: self.id,//从orderlist传过来的点击某个订单的时候此订单的id
      })
        .then(function(response){
          if(response.data.msg === "查询成功"){
            self.consignee.name = response.data.data.consigneeName//收货人姓名
            self.consignee.phone = response.data.data.consigneePhone//收货人电话
            //收货人地址
            self.consignee.address = response.data.data.consigneeArea.province+'-'+response.data.data.consigneeArea.city+'-'+response.data.data.consigneeArea.district+'-'+response.data.data.consigneeArea.town+'-'+response.data.data.consigneeArea.village+'-'+response.data.data.consigneeArea.detail
            self.deliveryStart = self.timestampToTime(response.data.data.userOrder.deliveryStart)//起始时间
            self.deliveryEnd = self.timestampToTime(response.data.data.userOrder.deliveryEnd)//截止时间
            self.description = response.data.data.userOrder.description//货物描述
            self.photo[0] = baseURL+response.data.data.userOrder.goodsPicture1//第一张照片
            if(response.data.data.userOrder.goodsPicture2!=null){
              self.photo[1] = baseURL+response.data.data.userOrder.goodsPicture2//第二张照片
                if(response.data.data.userOrder.goodsPicture3!=null){
                  self.photo[2] = baseURL+response.data.data.userOrder.goodsPicture3//第三张照片
                }
            }
          }
        })//then结束
        .catch(function(err){
          alert(err)
        });//catch结束
    },//getOrderInfo函数结束，拿到收货人信息

    getDelivelyInfo(){
      let i = this.index;
      this.consignor.name = this.orderlist[i].name
      this.consignor.phone = this.orderlist[i].phone
      this.consignor.address = this.orderlist[i].area.province+'-'+this.orderlist[i].area.city+'-'+this.orderlist[i].area.district+'-'+this.orderlist[i].area.town+'-'+this.orderlist[i].area.village+'-'+this.orderlist[i].area.detail
    },//getDelivelyInfo函数结束，拿到发货人信息

    timestampToTime(timestamp) {//时间戳转化为日期格式
      var date = new Date(timestamp );//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-';
      var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
      var D = (date.getDate() < 10 ? '0'+ (date.getDate()) : date.getDate()) + ' ';
      var h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':';
      var m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()) + ':';
      var s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());
      return Y+M+D+h+m+s;
    },
    returnwhere(){//路由跳转，从详细信息页面跳转到订单列表页面，把从订单列表传过来的所有订单发货人信息再传回去
      this.$router.push({
        name:"listLink",
        params:{
          nearbyOrderList:this.orderlist
        }
        })                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 .go(-1)
    },
    confirm(){
      let self = this
      axios.defaults.baseURL = 'http://118.25.85.198:8080/deliver'
      axios.post('/order/validateNeedSafety.do',{
        userOrderId: 58,//从orderlist传过来的点击某个订单的时候此订单的id
        driverUid:1
      })
      .then(function(response){
          if(response.data.msg === "不需要担保人"){
            self.confirmShow2 = true;
          }
          if(response.data.msg === "需要担保人"){
            self.confirmShow = true;
          }
      })
    },
    checkId(){
      axios.defaults.baseURL = 'http://118.25.85.198:8080/deliver'
      axios.post('/order/validateSafety.do',{
        userOrderId: 58,
        suretyAuthId: "2222222222"
      })
      .then((response)=>{
          if(response.data.msg == "该担保人符合要求"){
            this.$router.push({//查询成功后路由跳转，传附近订单所有所有发货人信息给orderlist
            name:"guaranteeLink",
            params:{
              guaranteeId:this.idStr,
              guaranteeName:response.data.data.name,
              guaranteePhone:response.data.data.phone,
            }
        })
          }
          else{
            this.$toast("id不存在，请重新填写")
            this.confirmShow = true;
          }
      })

    },
    confirm1(){
      axios.defaults.baseURL = 'http://118.25.85.198:8080/deliver'
      axios.post('/order/receive.do',{
        userOrderId:25,
        driverUid:1,
        suretyAuthId:"4"
      })
        .then((response)=>{
            this.$toast(response.data.msg)
            this.$router.push({
            name:"orderLink",
      })
      })
    }
  }

  }
</script>

<style >
/* 如果一开始插值表达式获取不到数据，那么包含“v-cloak”属性的节点就会执行“display:none”样式，导致页面什么也看不到，当插值表达式获取到数据之后，就会在节点中自动移除“v-cloak”属性，这时样式也就不起作用了，展示了正常的数据。 */

[v-cloak]
{
    display:none;
}
.orderinfo{
  /*overflow: auto;*/
  font-size: .2rem;
  height: 50vh;
  background-color:#f6f8f7;
}
.cell-group{
  background-color:#f6f8f7;
}
.remind3{/*页面中的"以下为订单详情信息*/
  position:relative;
  top:-.8rem;
  color:#07c160;
  /* font-weight:bold; */
  height:1300px;
  font-size: .3rem;
  text-align: center;
  background-color:#f6f8f7;
  padding-top: 12px;
}
.infoul{/*页面中的ul*/
  width:100%;
  position:absolute;
  top:38px;
  height:13rem;
  overflow:scroll;
   /* background-color:red; */
  background-color:#f6f8f7;
}
.consignor{/*页面中的发货人框*/
  width:90%;
  margin:0 auto;
  background-color:white;
  border-radius: 5px;
  height:3.5rem;
}
.people1{/*发货人标题框*/
  position:relative;
  margin-top:2px;
  /* border:1px solid #07c160; */
  /* border-bottom:1px solid #f6f8f7; */
  border-radius:8px;
  height: .5rem;
}
.peopleimg1{/*发货人矢量图*/
  position:absolute;
  /* 原本没有remind3时这个imgtop：84px把元素撑宽了 */
  top:0px;
  left:32%;
  width:.5rem;
  height:.5rem;
}
.title{/*各个本题*/
  line-height: .5rem;
  text-align:center
}
.name,.phone,.address,.time-scope{/*文本框*/
  padding:.15rem .15rem;
  /* border-bottom:1px solid #f6f8f7; */
  text-align:left;
}

.consignee{/*页面中的收货人框*/
  margin:0 auto;
  width:90%;
  background-color:white;
  border-radius: 5px;
  height:2.5rem;

}
.people2{/*收货人标题框*/
  position:relative;
  margin:10px auto;
  /* border:1px solid #07c160; */
  /* border-bottom:1px solid #f6f8f7; */
  border-radius:8px;
  height: .5rem;
}
.peopleimg2{/*收货人矢量图*/
  position:absolute;
  left:32%;
  top:0px;
  width:.5rem;
  height:.5rem;
}
.confirm{
  display: block;
  width: 90%;
  margin: auto;
}
.goods{/*页面中的货物框*/
  margin:0 auto;
  width:90%;
  background-color:white;
  border-radius: 5px;
  height:5.0rem;
}
.box{/*货物标题框*/
  position:relative;
  margin:10px auto;
  /* border:1px solid #07c160; */
  /* border-bottom:1px solid #f6f8f7; */
  border-radius:8px;
  height: .5rem;
  background-color:white;
}
.boximg{/*货物矢量图*/
  position:absolute;
  left:32%;
  width:.5rem;
  height:.5rem;
}

.returnlast{ /*返回按钮*/
  position:relative;
  top:-.9rem;
  left:0;
  border-style:none;
  min-width:.7rem;
  color:#07c160;
  font-size:.5rem;
  background-color:#f6f8f7;
  z-index:2;
}
.goodsphoto{/*拿到的货物的照片*/
  width:33%;
  float:left;
}
.confirm {
  margin:0 16px;
  width:90%;
}
.guarantee{
  width:230px;
}
.confirm-again{
  width:90%;
  margin:0 auto;
}
.confirm-last{
  margin:0 60px;

}
</style>
