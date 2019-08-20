<template>
  <div >
    <h1>首页</h1>
    <router-link to="home/test">what</router-link>
    <router-view></router-view>
    <button @click="showPopup" id="send-button" ref="send-button">
      捎货信息填写
    </button>
    <van-popup
      v-model="show"
      position="bottom"
      :style="{ height: '40%' }">
        <van-nav-bar
          title="捎货信息"
          left-text="返回"
          right-text="新增信息" ，
          @click-left="onClickLeft"
          @click-right="onClickRight"
        />
        <div v-if="add" class="address-list">
          <div class="add-container" v-for="(item, index) in addresses" :id="'add'+ index" @click="addContainer($event, index)">
            <div style="display:inline-block;height: 100%;width:auto"@touchstart="goTouchStart($event)" @touchmove="goTouchMove($event)" @touchend="goTouchEnd($event)" >
              <div class="add-container-people">
                <p class="add-container-people-role">发货人<span class="name">{{item.consignor.username}}</span></p>
                <p class="add-container-people-role-message"><span class="phone">{{item.consignor.phone}}</span></p>
                <p class="add-container-people-role-address">{{item.consignor.village}}</p>
              </div>
              <div class="add-container-arrow">
                <img src="../assets/img/arrow.svg" alt="arrow">
              </div>
              <div class="add-container-people">
                <p class="add-container-people-role">收货人<span class="name">{{item.consignee.username}}</span></p>
                <p class="add-container-people-role-message"><span class="phone">{{item.consignee.phone}}</span></p>
                <p class="add-container-people-role-address">{{item.consignee.village}}</p>
              </div>

              <div class="add-container-radio-box" v-model="addPick"><!--v-for时传入参数-->
                <img src="../assets/img/correct1.svg" alt="correct" style="z-index: 1">
                <img src="../assets/img/correct2.svg" alt="correct">
              </div>
            </div>
          </div>
        </div>
        <div v-else class="none-address">
          {{noneAddress}}
        </div>
    </van-popup>
  </div>
</template>

<script>
  import  AreaList from '../assets/area';
  import axios from 'axios'
  import { eventBus } from "../main"
  export default {
    name: "homepage",
    data() {
      return {
        noneAddress:"暂无信息，请先填写信息",
        areaList:AreaList,
        searchResult: [],
        show: false,// 弹出层
        add:false,// 是否有捎货信息
        addPick:-1,// 选择的地址,-1代表没有选择
        addresses:[

        ], // 数组，通过用户的id来选择其地址
        timeOutEvent:0
      }
    },
    methods: {
      addContainer(event, index){
        if(event.target.className === "add-container-radio-box" || event.target.alt==="correct"){
          console.log(1)
          this.selectAddress(index)
        }else{
          this.$router.push({
            path: "/address",
            query:this.addresses[index]
          })
        }
      },
      showPopup() {
        this.show = true;
        this.getAddress()
      },
      onClickLeft() {
        this.show = false
      },
      onClickRight() {
        this.$router.push({path: "/address"})
      },
      selectAddress(index) {// 单选框
        if(this.addPick === index){
          return
        }else {
          this.addPick = index // 确定所选地址
          let container = document.getElementById("add" + index)

          let radioBoxes = document.getElementsByClassName("add-container-radio-box")
          let radioBox = container.getElementsByClassName("add-container-radio-box")[0]
          for (let i=0,len = radioBoxes.length;i<len;i++) { // 改回来未选择的颜色
            radioBoxes[i].style.backgroundColor = "white"
            radioBoxes[i].getElementsByTagName("img")[0].style.zIndex = "1"
          }
          radioBox.style.backgroundColor = "#07c160" // 称为选择的颜色
          radioBox.getElementsByTagName("img")[0].style.zIndex = "-1"
        }
      },
      getAddress(){
        let self = this
        axios.get('http://118.25.85.198:8080/CATStudio/area/queryAllConsignee.do?uid=1')
          .then(function (response) {
            // 构造函数，创建一个新的
            let c = {
              uid:"1",
              role: "consignor",
              username: "潘某",
              phone: "13642943515",
              areaCode:"广东省广州市番禺区",
              province:"广东省",
              city:"广州市",
              district:"番禺区",
              village: "广东工业大学",
            }
            for(let i=0,len=response.data.data.length;i<len;i++) {
              let consignee = new self.Consignee(response.data.data[i])
              axios.get('http://118.25.85.198:8080/CATStudio/user/findConsigneeInfo.do?authId='+response.data.data[i].cid)
                .then(function (res) {
                  consignee.username = res.data.data.name
                  consignee.phone = res.data.data.phone
                })
                .catch(function (err) {
                  consignee.username = err.data.msg
                  consignee.phone = err.data.code
                })
              let consignor = new self.Consignor(c)
              self.addresses.push({
                consignee,
                consignor
              })
            }
            // 如果地址栏不为空，显示地址
            if(self.addresses.length !== 0){
              self.add = true
            }else{
              self.noneAddress = "暂无信息，请先填写信息"
            }
          })
          .catch(function (err) {
            console.log(err)
            self.noneAddress = "网络错误，请检查网络设置"
          })
      },
      Consignee(obj) {
        this.cid = obj.cid
        this.role = "consignee"
        this.province = obj.province
        this.city = obj.city
        this.district = obj.district
        this.village = obj.village
        this.status = obj.status
        this.areaCode = obj.province + obj.city + obj.district
        this.id = obj.id
      },
      Consignor(obj) {
        this.username = obj.username
        this.phone = obj.phone
        this.uid = obj.uid
        this.role = "consignor"
        this.province = obj.province
        this.city = obj.city
        this.district = obj.district
        this.village = obj.village
        this.status = obj.status //obj是后台传回来的对象，通过构造函数来传入状态
        if(obj.province === obj.city){// 如果出现了北京市 北京市 东城区这样的情况，过滤一下
          this.areaCode = obj.city + obj.district
        }else{
          this.areaCode = obj.province  + obj.city + obj.district
        }
      },
      goTouchStart(e){
        let that = this;
        clearTimeout(this.timeOutEvent);//清除定时器
        this.timeOutEvent = 0;
        this.timeOutEvent = setTimeout(function(){
          //执行长按要执行的内容，
          let touch = e.touches
          console.log(touch)
        },1500);//这里设置定时
      },
      //手释放，如果在500毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
      goTouchEnd(e){
        clearTimeout(this.timeOutEvent);
        if(this.timeOutEvent!==0){
          //这里写要执行的内容（尤如onclick事件）
        }
      },
      //如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按
      goTouchMove(e){
        clearTimeout(this.timeOutEvent);//清除定时器
        this.timeOutEvent = 0;
      },
    },
    created(){// 请求默认地址
      this.getAddress()
    },
    beforeRouteEnter(to, from, next){
      if(from.path === "/address"){
        next(vm=>{
           setTimeout(function () {
            vm.show = true
          },500)
        })
      }else{
        next()
      }
    }
  }
</script>

<style scoped>
  .add-container{
    margin: auto;
    height: 2rem;
    border-bottom: 2px solid #f8f8f8;
  }
  .add-container-people{
    height: 100%;
    width: 2.8rem;
    background-color: white;
    float: left;
  }
  .add-container-people-role .name{
    padding-left: 0.2rem;
    color:gray;
  }
  .add-container-people-role-message{
    letter-spacing:0.025rem;
    padding: 0.03rem 0.2rem;
    font-size: 0.25rem;
    color:gray;
  }
  .add-container-people-role-address{
    padding: 0.15rem 0.2rem 0;
    font-size: 0.25rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;
    color:gray;
  }
  .add-container-people-role{
    padding: 0.2rem 0 0.1rem 0.2rem;
    font-size: 0.28rem;
    font-weight: bold
  }
  .add-container-arrow{
    position: relative;
    width: 0.7rem;
    height: 100%;
    float: left
  }
  .add-container-arrow img{
    position: absolute;
    top: 25%;
    left: -65%;
    width: 1.2rem;
  }
  .add-container-radio-box{
    overflow: hidden;
    position: relative;
    height: 100%;
    width: 1.15rem;
    float: right;
    background-color: white;
  }
  .add-container-radio-box img{
    position: absolute;
    top:30%;
    left: 16%;
    width: 0.8rem;
  }
  .none-address{
    text-align: center;
    padding-top: 1.6rem;
    font-size: .3rem;
  }
  #send-button{
    width: 200px;
    height: 80px;
    font-size: 32px;
    cursor: pointer;
    border: 1px solid #e6e6e6;
    border-radius: 40px;
    background-color: white;
  }
</style>
