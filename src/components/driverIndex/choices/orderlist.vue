<template>
  <div class = "orderlist">
    <van-cell-group class="cell-group2">
      <!-- <van-button  plain type="default" size="small" @click="returnWhere" class = "comeback"></van-button> -->
      <p class="remind2">以下为附近订单信息</p>
      <ul class = "ul">
        <!-- 遍历路由得到的所有订单发货人信息 -->
        <li v-for="(item,index) in orderlist" :key="item.userOrderId">
          <router-link :to="{name:'infoLink',params:{id:item.userOrderId,index:index,orderlist}}" >
            <div class="liststyle">
              <span>
                <img src = "../../../assets/image/列表.png"  class="listimg">
              </span>
              <p class = "cellfirst">发货人：{{item.name}}</p>
              <p class = "cellsecond">发货地点：{{item.area.province+'-'+item.area.city+'-'+item.area.district}}<br>{{item.area.town+'-'+item.area.village+'-'+item.area.detail}}</p>
            </div>
          </router-link>
        </li>
      </ul>
    </van-cell-group>
  </div>
</template>

<script>
// import bus from '../../../assets/eventBus'
import axios from 'axios'
export default {
  name:"listLink",
  data() {
    return {
      orderlist:[],//路由得到的所有订单发货人信息，存在数组里
    };
  },

  created(){
    this.getOrderList()//拿到所有订单发货人信息
  },

  methods: {
    getOrderList(){
      this.orderlist = this.$route.params.nearbyOrderList//路由传值，从order组件传过来所有订单发货人信息
    },

    returnWhere(){//路由跳转，返回附近订单页面
      this.$router.push({
        name:"orderLink",
        })                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 .go(-1)
    },
  }
}

</script>

<style >
.orderlist{
  /* 本来这里没有设sbsolute时组件有穿透效果 */
  /* position:relative; */
  width:100%;
  height:18rem;/*为了附近订单没有数据时不要显示背景图，挡住*/
  background-color: #f6f8f7;
  font-size: .2rem;
}
.remind2{/*页面中的"以下为附近订单信息“*/
  position:relative;
  top:-.8rem;
  color:#07c160;
  height:10000px;
  /* font-weight:bold; */
  font-size: .3rem;
  text-align: center;
  background-color:#f6f8f7;
}
.cell-group2{
  background-color:#f6f8f7;
}

.ul{/*页面中的ul*/
  position:absolute;
  top:28px;
  width:100%;
  height:10rem;
  overflow: scroll;
  background-color:#f6f8f7;
}
.liststyle{/*页面中的信息框*/
  position:relative;
  /* 这个top解决问题 */
  top:10px;
  /*width:90%;*/
  /*height:2.5rem;*/
  line-height: 16px;
  margin:.38rem .38rem;
  padding:.2rem .2rem;
  border: 2px solid #f6f8f7;
  border-radius: 10px;
  background-color: white;
  color:black;
}
.listimg{/*矢量图*/
  position:absolute;
  left:.2rem;
  width:.3rem;
  height:.3rem;
}
.cellfirst{/*发货人姓名*/
  box-sizing:content-box;
  margin:3px 20px;
  text-align:left;

}
.cellsecond{/*发货地址*/
   margin:4px 20px;
   text-align:left;

  /* margin:0 auto;*/
}

.comeback{ /*返回按钮*/
  position:absolute;
  left:0;
  min-width:.7rem;
  border-style:none;
  color:#07c160;
  font-size:.5rem;
  z-index:2;
  background-color:#f6f8f7;
}
</style>
