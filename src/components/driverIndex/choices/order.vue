<template>
  <div class="order" >
    <van-cell-group >
      <van-button plain type="primary" size="small"  @click="returndriver" class = "returndriver"></van-button>
      <p class = "remind">请先输入您的具体位置</p>
      <van-field class="cellone"
        v-model = "areaCode"
        type = "text"
        label="出发省/市/区"
        placeholder="选择出发地点"
        :error-message="errorMessage.areaCodeInput"
        @click="showMap"
        required
      />
    <!-- 省市区弹出框 -->
      <van-popup v-model="mapShow" position="bottom">
        <van-area
        :area-list = "areaList"
        :areaValue = "areaValue"
         @confirm = "setMap"
         @cancel = "showMap"/>
      </van-popup>

      <van-field class="celltwo"
        v-model = "areaStr"
        label = "详细地址"
        type = "textarea"
        placeholder = "请输入详细地址"
        :error-message="errorMessage.areaStrInput"
        rows="1"
        autosize
        required
        @blur = "checkStrCode"
      />

      <van-button type="primary"  @click="summit" class="summit">提交信息</van-button>
    </van-cell-group>
  </div>
</template>

<script>
import Arealist from '../../../assets/area'
import axios from 'axios'
export default {
  name: "orderLink",
  data() {
    return {
    areaList:Arealist,//js传来的省市区的列表
    areaValue:110101,//默认市东城区
    areaCode:"",
    province:"",
    city:"",
    district:"",
    areaStr:"",
    errorMessage:{
      areaCodeInput:"",
      areaStrInput:""
    },
    mapShow:false,



    //这是从后台拿过来的data数据，是所有附近订单的数据
    //是一个数组，有很多对象
    //要传去给orderlist组件
    nearbyOrderList:[],

    }

  },
  methods: {
    showMap(){//用于是否显示弹出框
      this.mapShow = !this.mapShow
    },


    setMap(data){//用于省市区选择的值渲染到页面
      this.areaValue = data[2].code
      let area = ""
      for(let i=0;i<=2;i++){
        if(i==0){
          if(data[0].name === data [1].name)
          continue
        }
        this.province = data[0].name
        this.city = data[1].name
        this.district = data[2].name
        area += data[i].name + ""
      }
      this.areaCode = area
      this.mapShow = false,
      this.checkAreaCode()

    },



    checkAreaCode(){
      if(this.areaCode == ""){
        this.errorMessage.areaCodeInput = "请输入出发地址"
      }else{
        this.errorMessage.areaCodeInput = ""
      }
    },


    checkStrCode(){
      if(this.areaStr == ""){
        this.errorMessage.areaStrInput = "请输入详细地址"
      }else{
        this.errorMessage.areaStrInput = ""
      }
    },


    //提交信息的时候，先创建一个对象，放要存的值，再遍历一下消息，查看是否填写完整,之后传值
    summit(){
      let self = this
      let addressMessage = {
        province1:self.province,
        city1:self.city,
        district1:self.district,
        village1:self.areaStr,
      }
      for(let item in addressMessage){
        if(addressMessage[item] == ""){
          alert('请将信息填写完整')
          //信息填写不完整不能进行请求
          return
        }
      }

      axios.post('http://47.96.231.75:8080/deliver/userOrder/findNear.do',{
      //传给接口的值
      province:addressMessage.province1,
      city:addressMessage.city1,
      district:addressMessage.district1,
      town:"七侠镇",
      village:"高手村"

      }).then(function(response){//接口返回数据告诉司机查询成功
        if(response.data.code == 0){
          alert(response.data.msg)
          self.nearbyOrderList = response.data.data
          // console.log(self.nearbyOrderList)
          self.length = response.data.data.length
          // console.log(self.length)


        self.$router.push({//查询成功后路由跳转，传附近订单所有所有发货人信息给orderlist
          name:"listLink",
          params:{
            nearbyOrderList:self.nearbyOrderList
          }
        })

        }//if结束

        }).catch(function(err){
          alert(err)
      });//axios结束

    },//summit结束

    returndriver(){//返回按钮，返回到我是司机页面
      this.$router.push({
         name:"driverLink",
    })}

  }//method结束

}
</script>

<style scoped>

.order{
  width:100%;
  height:100rem;/*为了附近订单没有数据时不要显示背景图，挡住*/
  background-color: white;
}
.remind{/*页面中的"请先输入您的具体位置*/
  position:absolute;
  left:30%;
  top:5rem;
  color:#07c160;
  font-weight:bold;
  font-size: 35rem;
  text-align: center;
}
.cellone{/*省市区选择*/
  margin:0 auto;
  width:80%;
  border-right: 2px #07c160 solid;
  border-bottom: 2px #07c160 solid;
}
.celltwo{/*详细地址填写*/
  margin:0 auto;
  width:80%;
  border-left: 2px #07c160 solid;
  border-bottom: 2px #07c160 solid;
}
.returndriver{/*返回按钮*/
  position:absolute;
  left:0;
  border-style:none;
  min-width:.7rem;
  color:#07c160;
  font-size:.5rem;

}
.summit{/*提交按钮*/
  position:absolute;
  right:10%;
}

</style>
