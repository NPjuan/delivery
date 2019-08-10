<template>
  <div class = "orderlist">
    <van-cell-group>
      <van-button  plain type="default" size="small" @click="returnWhere" class = "comeback"><</van-button>
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
  height:100rem;/*为了附近订单没有数据时不要显示背景图，挡住*/
  background-color: white;
}
.remind2{/*页面中的"以下为附近订单信息“*/
  /* position:absolute; */
  /* top:1rem; */
  color:#07c160;
  font-weight:bold;
}
.ul{/*页面中的ul*/
  height:12rem; 
  overflow: scroll;
}
.liststyle{/*页面中的信息框*/
  position:relative;
  /* 这个top解决问题 */
  top:10px;
  width:90%;
  height:2.5rem;
  margin:.38rem .38rem;
  padding:.2rem .2rem;
  border: 2px solid #07c160;
  border-radius: 10px;
  background-color: #d7fcf3;
  color:black;
}
.listimg{/*矢量图*/
  position:absolute;
  left:0;
  width:.6rem;
  height:.6rem;
}
.cellfirst{/*发货人姓名*/
  box-sizing:content-box;
  margin:3px 20px;
  text-align:left;
  font-weight:510;
}
.cellsecond{/*发货地址*/
   margin:4px 20px;
   text-align:left;
   font-weight:510;
  /* margin:0 auto;*/
}

.comeback{ /*返回按钮*/
  position:absolute;
  left:0;
  min-width:.7rem;
  border-style:none;
  color:#07c160;
  font-size:.5rem;
}
</style>