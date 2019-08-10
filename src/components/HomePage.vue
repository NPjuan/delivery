<template>
  <div class="container">
    <header>
      <div class="head-fun-container">
        <span class="search-input-container">
          <img src="../assets/img/search.svg" alt="">
          <input type="text"placeholder="地址搜索" class="search-input">
        </span>
      </div>
      <div class="head-span-container">
        <!--点击 span 跳转页面-->
        <!--这里不可以换行显示否则或出现间隙需要用更多的 css 来兼容-->
        <span class="head-span">我要友捎</span><span class="head-span">我要接单</span><span class="head-span">我的订单</span><span class="head-span">消息</span><span class="head-span">我要接单</span><span class="head-span">我要接单</span>
      </div>
    </header>
    <baidu-map id="map" :center="map.center" :zoom=map.zoom :scroll-wheel-zoom=map.scrollWheelZoom @ready="handler">
      <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT " :showAddressBar="true" :autoLocation="map.annotation"></bm-geolocation>
    </baidu-map>
    <div class="content">
      <div class="content-container">
        <!--发货地址填写-->
        <div class="address-write" @click="showAddress('consignor')">
          <span>发货地址</span>
          <div v-if="judge.consignor.addressPick" class="address-show-container">
            <div class="address-show">
              <p class="address-show-user"><span>{{consignor.name}}</span><span>{{consignor.phone}}</span></p>
              <p class="address-show-address">{{consignor.areaCode}}</p>
            </div>
          </div>
          <div v-else class="address-show-container">
            <div class="address-show-container-img">
              <img src="../assets/img/plus.svg" alt="">
            </div>
          </div>
        </div>
        <!--收货地址填写-->
        <div class="address-write" @click="showAddress('consignee')">
          <span>收货地址</span>
          <div v-if="judge.consignee.addressPick" class="address-show-container">
            <div class="address-show">
              <p class="address-show-user"><span>{{consignee.name}}</span><span>{{consignee.phone}}</span></p>
              <p class="address-show-address">{{consignee.areaCode}}</p>
            </div>
          </div>
          <div v-else class="address-show-container">
            <div class="address-show-container-img">
              <img src="../assets/img/plus.svg" alt="">
            </div>
          </div>
        </div>
        <!--预约出发时间-->
        <!--如果两个地址都填写完毕-->
           <div v-if="!judge.listShow" class="lift"  @click="judge.listShow = !judge.listShow">展开信息填写栏</div>
        <div v-if="judge.consignor.addressPick && judge.consignee.addressPick && judge.listShow">
          <div class="lift" @click="judge.listShow = !judge.listShow">收起信息填写栏</div>
          <div class="time-write">
            <span class="time-span">起始时间</span>
            <input type="text"  @click="showTime(0)" placeholder="捎货起始时间" v-model="date.startTime" class="time-input">
          </div>
          <!--预约截止时间-->
          <div class="time-write">
            <span class="time-span">截止时间</span>
            <input type="text"  @click="showTime(1)" placeholder="捎货截止时间" v-model="date.endTime" class="time-input">
          </div>
          <div class="picture-write" style="display: inline-block;">
            <span class="picture-span">货物照片</span>
            <van-uploader
              :after-read="afterRead"
              v-model="fileList"
              capture
              :max-count="file.maxCount"
              :max-size="file.maxSize"
              preview-size="1.2rem"
              @oversize="$toast('请限制照片大小在10m以下')"
            />
            <p v-if="!fileList.length" style="font-size: .25rem;color: grey;margin-left: 1.62rem">请上传至少一张至多三张的照片</p>
          </div>
          <div class="msg-write">
            <span class="msg-span">留言</span>
            <div style="display: inline-block;position: relative">
              <pre style=" visibility: hidden;position: absolute;z-index: -100;" ref="pre"></pre>
              <textarea ref="textarea" maxlength="150" @keyup="highAdapt" placeholder="可输入留言,最大字数150"  v-model="deliveryMsg.description"></textarea>
            </div>
          </div>
          <van-button type="primary" class="delivery-button" @click="delivery">发单</van-button>
        </div>
      </div>
    </div>
    <van-popup
      v-model="show.address"
      position="bottom"
      :style="{ height: '60%' }">
      <van-nav-bar
        :title="show.role + '地址'"
        left-text="返回"
        right-text="新增地址"
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
      <!--通过 findAddress 能否返回地址决定展现-->
      <!--如果返回的地址不为空，则显示-->
      <div v-if="judge.role == 'consignor'" class="address-list">
        <!--:class="{'address-active': judge.addressPick}"-->
        <div v-if="addresses.length">
          <div  class="" @touchstart="pressAddress(index)" :ref="index" @touchend="releaseAddress(index)" v-for="(value, index, key) in addresses" :index="index">
            <div class="address-item">
              <!--因为用户的姓名和电话是登录的时候就已经完成了，所有直接引用-->
              <p class="address-item-user"><span>{{consignor.name}}</span><span>{{consignor.phone}}</span></p>
              <!--通过索引来选择显示的地址-->
              <p class="address-item-address">{{ value.province + value.city + value.district + (value.town?value.town:"") + (value.village?value.village:"") + value.detail }}</p>
              <img src="../assets/img/modify.svg" alt="" class="address-item-svg" @touchstart="modifyAddress(index)">
            </div>
          </div>
        </div>
        <div v-else class="none-address">
          {{errorMessage.noneAddress}}
        </div>
      </div>
      <div v-else class="address-list">
        <!--:class="{'address-active': judge.addressPick}"-->
        <!--<input type="text" placeholder="请输入收货人id来选择地址" class="consignee-id-input" v-model="consignee.id" @keyup="searchAddress">-->
        <div  class="" @touchstart="pressAddress(index)" :ref="index" @touchend="releaseAddress(index)" v-for="(value, index, key) in addresses" :index="index">
          <div class="address-item">
            <p class="address-item-user"><span>{{value.name}}</span><span>{{value.phone}}</span></p>
            <!--通过索引来选择显示的地址-->
            <p class="address-item-address">{{ value.province + value.city + value.district + (value.town?value.town:"") + (value.village?value.village:"") + value.detail }}</p>
            <img src="../assets/img/modify.svg" alt="" class="address-item-svg" style="z-index: 50"  @touchstart="modifyAddress(index)">
          </div>
        </div>
      </div>
    </van-popup>
    <van-popup
      v-model="show.timePick"
      position="bottom"
      :style="{ height: '40%' }">
      <van-datetime-picker
        v-model="date.currentDate"
        :min-date="date.minDate"
        :max-date="date.maxDate"
        :filter="dateFilter"
        @confirm="endTimeChange"
        @cancel="show.timePick = false"
      />
    </van-popup>
    <img src="../assets/img/Origin.svg" alt="">
  </div>
</template>

<script>
  import  AreaList from '../assets/area';
  import { eventBus } from "../main"
  export default {
    name: "homepage",
    data() {
      return {
        // 地图信息
        url: "http://192.168.1.103:8080",
        order:{ // 订单信息
          userOrderId: []
        },
        fileList:[],
        map: {
          map:"", // 地图对象
          mk2: "", // 收货人地址 marker
          driving: "", // 驾车路线
          center: {lng: 0, lat: 0}, // 经纬度
          zoom: 15, // 放大等级
          scrollWheelZoom: true, // 是否启用滚轮调节缩放， 手机端无用， PC 端有用
          autoLocation: true ,// 是否启用自动定位
          polyline: "" //行车路线
        },
        // 图片信息
        file: {
          maxSize: 1048576,
          maxCount: 3
        },
        // 时间信息
        date: {
          currentDate: new Date(),
          minDate: new Date(), // 截止时间不可以比起始时间要找
          maxDate: "", // 最大时间为起始日期过 20 天
          startTime: "", // 展示的时间
          endTime: "",  // 展示的时间
          sTime: "", // 起始时间的 Date 对象表示
          eTime: "" // 截止时间的
        },
        // 发物信息
        deliveryMsg: {
          uid: 1, // 发货人
          deliveryStart:"", // 起始发货时间
          deliveryEnd: "", // 截止收货时间
         // goodsPictures: [], // 上传图片数据
          deliverAreaId: "", // 发货地址
          consigneeAreaId: "", // 收货地址
          description: "", // 留言
          pay:1000
        },
        areaList: AreaList,
        // 地址数组，通过对应的 id 来 push 内容
        addresses: [

        ],
        // 发货人，部分内容由登录状态获取
        consignor: {
          id:1,
          role: "consignor",// 角色，发货人
          name: "1",// 发货人姓名
          phone: "18666305518",// 电话号码
          areaCode: "",
          province:"",// 省
          city:"",// 市
          district:"",// 区
          town: "", // 镇
          village: "",// 村
          detial: "", // 详细地址
          areaId: "" // 地址的编号
        },
        // 收货人
        consignee: {
          id:"",// 靠用户填写来获取
          role: "consignee",// 角色，收货人
          name: "",// 收货人姓名，靠用户填写的id获取
          phone: "",// 电话号码，靠用户填写的id获取
          areaCode:"",
          province:"",// 省
          city:"",// 市
          district:"",// 区
          village: "",// 村
          detial: "", // 详细地址
          areaId:""// 地址的编号
        },
        // 展示组件
        show: {
          role: "发货人", // 默认为发货人
          address: false, // 地址组件
          timePick: false // 时间组件
        },
        // 判断矩阵
        judge: {
          click: false, // 是否为点击事件
          role: "consignor", // 默认为发货人
          // addressPick: false, // 地址栏是否被点击
          timeOutEvent: 0, // 长按定时器
          time: 0, // 时间选择 0 为起始时间 1 为截止时间
          address: false,
          consignor: {
            addressPick: false // 是否选择了 发货人 的地址
          },
          consignee: {
            addressPick: false // 是否选择了 收货人 的地址
          },
          listShow : true // 是否收起下拉列表
        },
        // 错误信息
        errorMessage: {
          noneAddress: "暂无地址，请先填写地址信息"
        },
        // 图片传递参数用 formData
        formData:new FormData(),

      }
    },
    methods: {
      // 上传
      delivery() {
        let self = this
        const instance=this.$axios.create({
          withCredentials: true
        })
        instance.post(this.url + '/userOrder/uploadGoodsPictures.do',this.formData)
          .then((res) => {
            let goodsPictures = res.data.data // 获取回复中的 图片 数组
            let deliveryMsg = self.deliveryMsg // 得到 发布的 信息
            instance.post(self.url + "/userOrder/addUserOrder.do",
              {
                deliveryMsg,
                goodsPictures
              }
            )
              .then(function (response) {
                // 订单
                self.order.userOrderId.push(response.data.data)

                // 跳转到查找附件司机的页面
                 self.$router.push(
                   {
                     path: '/findDriver',// 跳转到查找司机页面
                     query:{
                       userOrderId:self.order.userOrderId
                     } // 传递 orderId 数组
                 })
              })
          })
          .catch(err=>{
            console.log(err)
          })
      },
      highAdapt() {
        this.$refs.textarea.style.height = 'auto'
        this.$refs.textarea.style.height =  this.$refs.textarea.scrollHeight + "px"
        console.log(this.$refs.textarea.scrollHeight + "px")
      },
      // 图片上传
      afterRead(file) {
        let content = file.file;
        this.formData.append('goodsPictures', content)

      },
      // 时间过滤器，只能显示 10 为倍数的分钟
      dateFilter(type, options) {
        if (type === 'minute') {
          return options.filter(option => option % 10 === 0)
        }
        return options
      },
      // 展示时间控件
      showTime(index) {
        if(!index){
          this.judge.time = 0
          this.date.minDate = new Date()
        }else if(this.date.sTime == ""){
          this.$toast('请先填写起始起始时间')
          return
        }else {
          this.judge.time = 1
          this.date.minDate = new Date()
        }
        this.show.timePick = true
      },
      endTimeChange(value) {
        // 起始时间一定要小于截止时间
        if(this.judge.time){
          if(value.valueOf() <= this.date.sTime? this.date.sTime.valueOf():0){
            this.$toast('截止日期不能小于起始日期')
            return
          }
          this.date.eTime = value // 确定起始时间的 date 对象
        }else{

          if(value.valueOf() > this.date.eTime? this.date.eTime.valueOf():0){
            this.$toast('截止日期不能小于起始日期')
            return
          }
          this.date.sTime = value // 确定起始时间的 date 对象
        }
        let y = value.getFullYear()
        let m = value.getMonth() + 1 // vant 组件的月份居然是从 0 开始计数的
        let d = value.getUTCDate() + 1
        let h = value.getHours()
        let minute = value.getMinutes()
        if(m < 10){
          m = "0"+m
        }
        if(d < 10){
          d = "0"+d
        }
        if(h < 10){
          h = "0"+h
        }
        if(minute == 0){
          minute = "0"+0
        }else if(minute<10) {
          minute = 10
        }else if(minute%10!=0){
          minute = (parseInt(minute/10)+1)*10
        }
        if(!this.judge.time){
          this.date.startTime = m+" 月 "+d+" 号 "+" "+h+" : "+minute
          this.deliveryMsg.deliveryStart = value.getTime()
        }else{
          this.date.endTime = m+" 月 "+d+" 号 "+" "+h+" : "+minute
          this.deliveryMsg.deliveryEnd = value.getTime() // y+"-"+m+"-"+d+" "+h+":"+minute+":"+"00"
        }
        this.show.timePick = false
      },
      // 百度地图创建
      // 时间组件
      timeOnClickRight() {
        // 关闭时间组件
        show.timePick = false
        // 添加格式
      },
      // 打开地址栏
      showAddress(role) {
        if(role == 'consignor'){
          this.show.role = "发货"
          this.judge.role = role
        }else{
          this.show.role = "收货"
          this.judge.role = role
        }
        // 请求地址
        this.findAddress()

      },
      // 通过 role 请求地址
      findAddress() {
        let self = this
        let url
        if(self.judge.role == "consignor") {
          url = this.url + "/area/queryAllDeliver.do"
        }else {
          url = this.url + "/area/queryAllConsignee.do"
        }
        this.$axios.post(url,
        {
          uid: Number(self.consignor.id)
        }
          ).then(function (response) {
            // 重新设置地址数组
            self.addresses = []
            for(let i=0,len=response.data.data.length;i<len;i++){
              self.addresses.push(response.data.data[i])
            }
            // 展现地址栏
            self.show.address = true
          })
            .catch(function (err) {
              console.log(err)
            })
      },
      // 地址选择栏
      onClickLeft() {
        this.show.address = false
      },
      onClickRight() {
        // 通过判断角色来进入地址
        // let id,areaId
        // areaId = this[this.judge.role].areaId
        let uid = this.consignor.id
        this.$router.push({
            path:'/' + this.judge.role + 'Address',
            query:{
              uid,
            }
          })
        // this.$router.push("/consignorAddress")
      },
      // 点击选择或者跳转
      // 修改地址
      modifyAddress(index) {
        this.judge.click = true
        this.$router.push({
          path:'/' + this.judge.role + 'Address',
          query: {
            mes : this.addresses[index],
            // 用户 id
            id: this.addresses[index].cid,
            areaId: this.addresses[index].id
          }
        })
      },
      // 选择地址 在 releaseAddress 内调用
      choiceAddress(index) {
        // 根据 role 来选择填充数据
        let role = this.judge.role
        // 如果是 收货人 则要接收两个参数
        if(role == 'consignee'){
          this[role].name = this.addresses[index].name
          this[role].phone = this.addresses[index].phone
          this[role].areaId = this.addresses[index].id // 地址 id
          this.deliveryMsg.consigneeAreaId = this.addresses[index].id
        }else{
          this[role].areaId = this.addresses[index].id // 地址 id
          this.deliveryMsg.deliverAreaId = this.addresses[index].id
        }
        console.log(this.addresses[index].id)
        console.log("地址id")
        this[role].province = this.addresses[index].province
        this[role].city = this.addresses[index].city
        this[role].district = this.addresses[index].district
        this[role].town = this.addresses[index].town?this.addresses[index].town: ""
        this[role].village = this.addresses[index].village?this.addresses[index].village: ""
        this[role].detail = this.addresses[index].detail?this.addresses[index].detail: ""
        this[role].areaCode = this[role].province
            + this[role].city
            + this[role].district
            + this[role].town
            + this[role].village
            + this[role].detail
        this.judge[role].addressPick = true
        this.show.address = false
      },
      // 地址触摸开始
      pressAddress(index) {
        if(this.judge.click){
          return
        }
        let self = this
        // 修改样式
        for(let i =0;i<this.addresses.length;i++){
          if(i == index){
            this.$refs[i][0].className = "address-active"
          }else{
            this.$refs[i][0].className = ""
          }
        }
        // 清除定时器
        clearTimeout(this.judge.timeOutEvent)
        // 重设定时器
        this.judge.timeOutEvent = 0
        this.judge.timeOutEvent = setTimeout(function () {
          self.$dialog.confirm({
            title: "是否要删除地址"
          })
            // 删除地址 再次渲染地址栏组件
            .then(function () {
              //先直接消失
              let areaId = self.addresses[index].id
              self.$refs[index][0].style.display = "none"
              self.$axios.post(self.url + "/area/deleteArea.do",{
                  // 传入地址 id
                  areaId: areaId
              })
                .then(function (response) {
                  // 如果用户删除的是已经选择了的地址，就让他消失
                  // self.addresses[index].id+"删除掉的areaId"
                  // self[self.judge.role].areaId + "已经选择的areaId"
                  if(self[self.judge.role].areaId = self.addresses[index].id){
                    //  addressPick 改为 false 不能让用户继续用
                    self.judge[self.judge.role].addressPick = false
                  }
                  self.findAddress()
                })
                .catch(function (err) {
                  console.log(err)
                })
            })
            // 取消则什么也不做
            .catch(function () {
              self.findAddress()
            })
          // code
        }, 1000)
      },
      // 地址触摸结束
      releaseAddress(index) {
        // 如果判断为点击事件的话
        if(this.judge.click){
          this.judge.click = false
          return
        }
        // 修改样式
        this.$refs[index][0].className = ""
        // 重设定时器
        clearTimeout(this.judge.timeOutEvent);
        this.judge.timeOutEvent = 0
        // 选择地址
        this.choiceAddress(index)
      },
      handler({BMap, map}) {
        let self = this
        this.map.map = map
        this.map.center.lng = 113.401
        this.map.center.lat = 23.044
        this.map.zoom = 13
        // 必须用 require 来请求地址否则报错
        // new BMap.Size 用来控制展现区域大小
        // imageSize 用来控制图片大小
        let originIcon = new BMap.Icon(require("../assets/img/Origin.svg"), new BMap.Size(30,30),{
          imageSize: new BMap.Size(30,30)
        })
        map.addEventListener("click", this.showInfo)
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r){
        	if(this.getStatus() == BMAP_STATUS_SUCCESS){
            var mk = new BMap.Marker(r.point,{icon: originIcon});
            map.addOverlay(mk);
            map.panTo(r.point);
            self.map.center.lng = r.point.lng
            self.map.center.lat = r.point.lat
        		console.log('您的位置：'+r.point.lng+','+r.point.lat);
        	}
        	else {
        		alert('failed'+this.getStatus());
        	}
        },{enableHighAccuracy: true})
        this.map.driving = new BMap.DrivingRoute(
          map,
          {renderOptions:{map: map, autoViewport: false},
            onPolylinesSet:function(routes) {
              let searchRoute = routes[0].getPolyline();//导航路线
              // map.addOverlay(searchRoute);
            },
            onMarkersSet:function(routes) {
              map.removeOverlay(routes[0].marker); //删除起点
              map.removeOverlay(routes[1].marker);//删除终点
            }
          })
        this.map.driving.setSearchCompleteCallback(function(){
          let driving = self.map.driving
          var plan = driving.getResults().getPlan(0);
          for(var i=0;i<plan.getNumRoutes();i+=2){
            var pts =plan.getRoute(i).getPath();
            //重点在这   这个地方是关于修改颜色的
            var polyline = new BMap.Polyline(pts,{ strokeColor: "deepskyblue", strokeWeight: 5, strokeOpacity: 1 });
            map.addOverlay(polyline);
          }
        })
      },
      showInfo(e) {
        // this.map.center.lat = e.point.lat
        // this.map.center.lng = e.point.lng
        console.log('您的位置：'+this.map.center.lng+','+this.map.center.lat);
        let map = this.map.map
        map.removeOverlay(this.map.mk2)
        let destinationIcon = new BMap.Icon(require("../assets/img/Destination.svg"), new BMap.Size(30,30),{
          imageSize: new BMap.Size(30,30),
        })
        this.map.mk2 = new BMap.Marker(new BMap.Point(e.point.lng, e.point.lat),{icon: destinationIcon})
        map.addOverlay(this.map.mk2)
        // 地址浮现
        this.map.driving.search(new BMap.Point(this.map.center.lng, this.map.center.lat), new BMap.Point(e.point.lng, e.point.lat));
        // this.map.driving.setMarkersSetCallback(function (result) {
        //   console.log(result)
        //   map.removeOverlay(routes[0].marker);
        //   map.removeOverlay(routes[routes.length-1].marker);
        // })
      }
      // Consignee(obj) {
      //   this.id = ""
      //   this.role = "consignee"
      //   this.province = ""
      //   this.city = ""
      //   this.district = ""
      //   this.village = ""
      //   this.status = ""
      //   this.areaCode = ""
      //   this.areaId = ""
      // },
      // Consignor(obj) {
      //   this.name = ""
      //   this.phone = ""
      //   this.uid = ""
      //   this.role = "consignor"
      //   this.province = ""
      //   this.city = ""
      //   this.district = obj.district
      //   this.village = obj.village
      //   this.status = obj.status //obj是后台传回来的对象，通过构造函数来传入状态
      //   if(obj.province === obj.city){// 如果出现了北京市 北京市 东城区这样的情况，过滤一下
      //     this.areaCode = obj.city + obj.district
      //   }else{
      //     this.areaCode = obj.province  + obj.city + obj.district
      //   }
      // },
    },
    // 如果是从地址栏跳转过来则打开选择地址的组件
    beforeRouteEnter(to, from, next){
      // 如果是从填写地址跳转过来则自动弹出下拉地址选择栏
      if(from.path == "/consigneeAddress"){
        next(vm=>{
           setTimeout(function () {
            vm.showAddress("consignee")
          },500)
        })
      }else if(from.path == "/consignorAddress"){
        next(vm=>{
          setTimeout(function () {
            vm.showAddress("consignor")
          },500)
        })
      }else {
        next()
      }
    },
    mounted() {
      let i = new Date()
      this.date.minDate = new Date()
      // 如果到了 50 分过后 直接跳过这个小时
      if(i.getMinutes()>=50){
       this.date.minDate.setTime(i.getTime() + 1000*60*10)
      }else{
        this.date.currentDate = this.date.minDate
      }
    // 设置未来最大持续时间为 20 天
      this.date.maxDate = new Date (
        this.date.minDate.getFullYear(),
        this.date.minDate.getMonth(),
        this.date.minDate.getUTCDate()+20
      )
      /*******************百度地图*****************************/
    },
  }
</script>

<style scoped>
  .lift{
    font-size: .25rem;
    text-align: center;
    color: #7d7e80;
    margin-top: .25rem 0
  }
  .search-input{
    position: relative;
    width: 2rem;
    height: .5rem;
    color: #323233;
    font-size: .25rem;
    text-indent: .65rem;
    border-radius: .25rem;
  }
  .search-input-container{
    position: relative;
  }
  .search-input-container>img{
    position: absolute;
    top: .15rem;
    left: .15rem;
    width: .35rem;
    z-index: 1000;
  }
  .delivery-button{
    width: 100%;
    height: .8rem;
    line-height: .8rem;
    margin-top: .4rem
  }
  .consignee-id-input{
    width: 100%;
    height: .5rem;
    font-size: .25rem;
    text-align: center;
    padding: .15rem 0;
    border-bottom: 2px solid #f8f8f8
  }
  .msg-write textarea{
    overflow:hidden;
    resize:none;
    width: 4.2rem;
    font-size: .25rem;
    text-indent: .05rem;
    color: grey;
    margin-top: .1rem;
    border: none
  }
  .msg-write{
    margin-top: .2rem;
  }
  .msg-span{
    position: relative;
    display: inline-block;
    width: 1rem;
    height: .5rem;
    padding: .1rem .25rem 0 .25rem;
    font-size: .25rem;
    vertical-align:top;
    color: #323233;
  }
  .picture-span{
    position: relative;
    padding: .4rem .25rem 0 .25rem;
    font-size: .25rem;
    vertical-align:top;
    color: #323233;
  }
  .picture-span::before{
    position: absolute;
    left:.1rem;
    top: .35rem;
    content: '*';
    color: red;
  }
  /*改变原有样式*/
  /deep/ .van-uploader__preview-delete{
    font-size: .3rem !important;
  }
  .time-span::before{
    position: absolute;
    left:.1rem;
    top: .35rem;
    content: '*';
    color: red;
  }
  .time-span{
    position: relative;
    display: inline-block;
    width: 1rem;
    height: .5rem;
    padding: .38rem .25rem 0 .25rem;
    font-size: .25rem;
    vertical-align:top;
    color: #323233;
  }
  .time-input{
    width: 4.2rem;
    height: .5rem;
    margin-top:.3rem;
    border-bottom:2px solid #f8f8f8;
    text-indent:.1rem;
    font-size: .25rem;
    color:gray;
  }
  .address-show-container-img{
    position: relative;
    width: 100%;
    height: 100%;
  }
  .address-show-container-img>img{
    position: absolute;
    top:.25rem;
    left: 1.75rem;
    width: .6rem;
  }
  .address-show-container{
    display: inline-block;
    height: 1.1rem;
    width: 4rem;
    padding: .2rem .1rem;
    border-bottom: 2px solid #f8f8f8;
  }
  .address-show-address{
    display: -webkit-box;
    margin-top: .15rem;
    font-size: .25rem;
    color: gray;
    letter-spacing: .02rem;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;
  }
  .address-show-user{
    font-size: .3rem;
  }
  .address-show-user>span:first-child{
    margin-right: .3rem;
  }
  .address-write{
    height: 1.5rem;
  }
  .address-write>span{
    position: relative;
    display: inline-block;
    width: 1rem;
    height: 1.1rem;
    padding: .23rem .25rem 0 .25rem;
    vertical-align:top;
    font-size: .25rem;
    color: #323233;
  }
  .address-write>span::before{
    position: absolute;
    top:.2rem;
    left: .1rem;
    content: "*";
    color: red;
  }
  .head-fun-container{
    position: relative;
    height: .9rem;
    background-color: darkseagreen;
    font-size: .4rem;
    text-align: center;
    line-height: .9rem
  }
  .head-span-container{
    position: relative;
    height: .85rem; /* 为了让滚动条消失不见，高度加大并在父元素上 hidden*/
    white-space: nowrap;
    overflow-x: scroll;
  }
  .head-span-container::-webkit-scrollbar {
    display: none;
  }
  header{
    position: fixed;
    top:0;
    height: 1.6rem;
    width:100%;
    background-color: white;
    z-index: 55;
    overflow: hidden;
  }
  .head-span{
    display: inline-block;
    width: 1.4rem;
    height: .5rem;
    padding: .1rem .2rem;
    text-align: center;
    line-height: .5rem;
    font-size: .3rem;
    background-color: skyblue;
  }
  .container{
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
  }
  #map{
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    overflow: hidden;
  }
  .content{
    position: absolute;
    bottom: .2rem;
    width: 100%;
    z-index: 5;
  }
  .content-container{
    width: 90%;
    margin: auto;
    background-color: white;
  }
  .none-address{
    position: relative;
    text-align: center;
    padding-top: 1.6rem;
    font-size: .3rem;
  }
  .address-active{
    background-color: #f8f8f8;
  }
  .address-item{
    position: relative;
    width:6rem;
    height: 1rem;
    padding: .25rem .6rem .25rem .2rem;
    margin: auto;
    border-bottom: 2px #f8f8f8 solid;
  }
  .address-item-user{
    font-size: .3rem;
  }
  .address-item-address{
    display: -webkit-box;
    padding-right: .5rem;
    margin-top: .15rem;
    font-size: .25rem;
    color: gray;
    letter-spacing: .02rem;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;
  }
  .address-item-svg{
    position: absolute;
    top:.5rem;
    right: .6rem;
    width: .5rem;
  }
  .address-item-user>span:nth-child(1){
    margin-right: .3rem;
  }
  .list-enter-active, .list-leave-active {
    transition: all .5s ease;
  }
  .list-enter, .list-leave-to {
    opacity: 0;
    transform: translateX(350px);
  }
</style>
