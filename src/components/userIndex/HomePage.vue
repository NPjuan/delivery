<template>
  <div class="container">
    <Amap ref="amap" :role="amapRole"></Amap>
    <div class="content">
      <div class="content-container">
        <!--收，发货地址填写-->
          <demo @showAddress="showAddress" :consignor="consignor" :consignee="consignee" :orPick="judge.consignor.addressPick" :eePick="judge.consignee.addressPick"></demo>
          <!--如果两个地址都填写完毕-->
        <div v-if="!judge.listShow" class="lift"  @click="judge.listShow = !judge.listShow">
          <span class="rotate-span"><img src="../../assets/image/up.svg" alt=""></span>
        </div>
        <div v-if="judge.consignor.addressPick && judge.consignee.addressPick && judge.listShow">
          <div class="lift" @click="judge.listShow = !judge.listShow">
            <span class="rotate-span-down rotate-span"><img src="../../assets/image/up.svg" alt=""></span>
          </div>
          <div class="time-write">
            <span class="time-span">起始时间</span>
            <input type="text" readonly @click="showTime(0)" placeholder="捎货起始时间" v-model="date.startTime" class="time-input">
          </div>
          <!--预约截止时间-->
          <div class="time-write">
            <span class="time-span">截止时间</span>
            <input type="text"  readonly @click="showTime(1)" placeholder="捎货截止时间" v-model="date.endTime" class="time-input">
          </div>
          <div class="pay-write">
            <span class="time-span">金钱</span>
            <input type="number"   placeholder="支付金额"  class="time-input" v-model="deliveryMsg.pay">
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
            <p v-if="!fileList.length" style="font-size: .25rem;color: dimgray;margin-left: 1.62rem">/*请上传至少一张至多三张的照片*/</p>
          </div>
          <div class="msg-write">
            <span class="msg-span">留言</span>
            <div style="display: inline-block;position: relative">
              <pre style=" visibility: hidden;position: absolute;z-index: -100;" ref="pre"></pre>
              <textarea ref="textarea" maxlength="150" @keyup="highAdapt" placeholder="可输入留言,最大字数150"  v-model="deliveryMsg.description"></textarea>
            </div>
          </div>
          <van-button type="primary" class="delivery-button" @click="sendOrder">发单</van-button>
        </div>
      </div>
    </div>
    <!--地址栏-->
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
          <div  class="" @touchstart="pressAddress(index)" :ref="index" @touchend="releaseAddress(index)" v-for="(value, index, key) in addresses" :index="index" :key="key" >
            <div class="address-item">
              <!--因为用户的姓名和电话是登录的时候就已经完成了，所有直接引用-->
              <p class="address-item-user"><span>{{consignor.name}}</span><span>{{consignor.phone}}</span></p>
              <!--通过索引来选择显示的地址-->
              <p class="address-item-address">{{ value.province + value.city + value.district + (value.town?value.town:"") + (value.village?value.village:"") + value.detail }}</p>
              <img src="../../assets/image/modify.svg" alt="" class="address-item-svg" @touchstart="modifyAddress(index)">
            </div>
          </div>
        </div>
        <div v-else class="none-address">
          {{errorMessage.noneAddress}}
        </div>
      </div>
      <div v-else class="address-list">
        <div v-if="addresses.length"  class="" @touchstart="pressAddress(index)" :ref="index" @touchend="releaseAddress(index)" v-for="(value, index, key) in addresses" :key="key" :index="index">
          <div class="address-item">
            <p class="address-item-user"><span>{{value.name}}</span><span>{{value.phone}}</span></p>
            <!--通过索引来选择显示的地址-->
            <p class="address-item-address">{{ value.province + value.city + value.district + (value.town?value.town:"") + (value.village?value.village:"") + value.detail }}</p>
            <img src="../../assets/image/modify.svg" alt="" class="address-item-svg" style="z-index: 50"  @touchstart="modifyAddress(index)">
          </div>
        </div>
        <div v-else class="none-address">
          {{errorMessage.noneAddress}}
        </div>

      </div>
    </van-popup>
    <!--时间选择器-->
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
    <!--我的信息栏-->
    <van-popup
      v-model="show.information"
      closeable
      position="left"
      :style="{ width: '65%', height: '100%' }"
    >
      <!--头像-->
      <div class="user-info-head-img-container">
        <span class="user-info-head-img">
          <img :src="consignor.headPicUrl" alt="" style="width: 1.5rem">
        </span>
      </div>
      <div v-if="judge.loginState">
        <!--姓名-->
        <span class="user-info-name">
          {{consignor.name}}
        </span>
        <!--电话-->
        <span class="user-info-name">
          {{consignor.phone}}
        </span>
        <span v-for="(value, index, key) in userLists" :key="key" class="user-info-item" :index="index" @touchstart="userList(index)" :ref="'user'+index" @touchend="offUserList(index)" @click="funCase(index)">
          <img :src="value.src" :alt="value.alt" class="user-info-item-img">
          {{value.text}}
        </span>
      </div>
      <div v-else>
          <span class="user-info-item">
          尚未登陆，请先去登陆吧
         </span>
      </div>
    </van-popup>
    <van-popup
      v-model="show.more"
      closeable
      position="right"
      :style="{ width: '65%', height: '100%' }"
    >
    </van-popup>
    <layer :show="judge.Shadow" @changeShow="judge.Shadow = !judge.Shadow"/>
    <Guarantee :show="judge.Shadow" @changeShow="deliver"></Guarantee>
  </div>
</template>

<script>

  import  AreaList from '../../assets/area';
  // 登陆状态
  import g from '../login/global'
  // 高德地图
  import Amap from './Amap'
  import Demo from './demo'
  import layer from './layer'
  import Guarantee from './Guarantee'
  export default {
    name: "homepage",
    components:{
      Amap,
      Demo,
      layer,
      Guarantee
    },
    data() {
      return {
        // 0 表示发货地址 1 表示收货地址
        amapRole: 0,
        role: 1,
        loginStatus:"注册信息",
        // 地图信息
        // lt http://118.25.85.198:8080/deliver
        // jb http://47.96.231.75:8080/deliver
        // 192.168.1.102:8080
        url: "http://47.96.231.75:8080/deliver",
        order:{ // 订单信息
          userOrderId: []
        },
        userLists:[ // 个人信息 span
          {
            src: require("../../assets/image/order.svg"), // 图片路径
            text: "订单信息",
            alt: "订单信息"
          },
          {
            src: require("../../assets/image/promise.svg"), // 图片路径
            text: "我的担保",
            alt: "我的担保"
          }
        ],
        fileList:[], // 图片文字数组
        // 图片信息
        file: {
          maxSize: 10485760, // 最大尺寸
          maxCount: 3 // 最大数量
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
          uid: "", // 发货人即用户 id
          deliveryStart:"", // 起始发货时间
          deliveryEnd: "", // 截止收货时间
         // goodsPictures: [], // 上传图片数据
          deliverAreaId: "", // 发货地址
          consigneeAreaId: "", // 收货地址
          description: "", // 留言
          pay:"", // 发布积分
          pid:""  // 担保人 id
        },
        areaList: AreaList,
        // 地址数组，通过对应的 id 来 push 内容
        addresses: [

        ],
        // 发货人，部分内容由登录状态获取
        consignor: {
          cid: "", // 数据库对应的 id
          id: "", // 用户 id
          role: "consignor",// 角色，发货人
          name: "",// 发货人姓名
          phone: "",// 电话号码
          areaCode: "", // 省市区对应的编码
          province:"",// 省
          city:"",// 市
          district:"",// 区
          town: "", // 镇
          village: "",// 村
          detail: "", // 详细地址
          areaId: "", // 地址的编号
          headPicUrl: "http://47.96.231.75:8080/uploads/headPortraits/default.jpg" // 头像的地址
        },
        // 收货人
        consignee: {
          id:"",// 靠用户填写来获取
          role: "consignee",// 角色，收货人
          name: "",// 收货人姓名，靠用户填写的id获取
          phone: "",// 电话号码，靠用户填写的id获取
          areaCode:"", // 省市区对应的编码
          province:"",// 省
          city:"",// 市
          district:"",// 区
          village: "",// 村
          detail: "", // 详细地址
          areaId:""// 地址的编号
        },
        // 展示组件
        show: {
          role: "发货人", // 默认为发货人
          address: false, // 地址组件
          timePick: false, // 时间组件
          information: false, // 个人信息
          more: false // 更多信息
        },
        // 判断组件
        judge: {
          loginState: false, // 是否登陆成功
          click: false, // 是否为点击事件
          role: "consignor", // 默认为发货人
          timeOutEvent: 0, // 长按定时器
          time: 0, // 时间选择 0 为起始时间 1 为截止时间
          address: false,
          consignor: {
            addressPick: false // 是否选择了 发货人 的地址
          },
          consignee: {
            addressPick: false // 是否选择了 收货人 的地址
          },
          listShow : true, // 是否收起下拉列表
          Shadow: false,
          promise: false,
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
      // 用户信息列表触摸
      userList(index) {
        this.$refs['user'+index][0].style.backgroundColor = "#AFEEEE"
      },
      offUserList(index) {
        this.$refs['user'+index][0].style.backgroundColor = "white"
      },
      // 跳转到登陆界面
      login() {
        this.$router.push('/login')
      },
      message() {
        if(!this.$store.state.isLogin){
          this.$toast('请先登陆后使用')
          return
        }
        this.$router.push('/chat')
      },
      // 跳转到司机页面
      driver() {
        if(!this.$store.state.isLogin){
          this.$toast('请先登陆后使用')
          return
        }
        this.$toast('只有注册成为司机才能使用该功能，当前在测试阶段')
        this.$router.push('/index/driver')
      },
      // 上传订单
      sendOrder() {
        if(!this.fileList.length || !this.deliveryMsg.deliveryStart || !this.deliveryMsg.deliveryEnd || !this.deliveryMsg.pay){
          this.$toast('除留言外，请完整填写其他信息')
          return
        }
        // 调用担保人
          this.judge.Shadow = true
      },
      deliver(pId){
        console.log(pId+"aaaaaaaaaaaaa")
        this.judge.Shadow = false
        let self = this
        // 担保人 id
        this.deliveryMsg.pid = pId
        const instance=this.$axios.create({
          withCredentials: true
        })
        instance.post(this.url + '/userOrder/uploadGoodsPictures.do',this.formData)
          .then((res) => {
            let goodsPictures = res.data.data // 获取回复中的 图片 数组
            let deliveryMsg = self.deliveryMsg // 得到 发布的 信息
            console.log(deliveryMsg)
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
      // 查看订单
      funCase(index) {
        // index 值做区分 0 为订单
        if(index == 0){
          this.$router.push(
            {
              path: '/userOrderList'  // 跳转到查找司机页面
            })
        }else if(index == 1){
          this.$router.push(
            {
              path: '/Surety'       // 跳转到查找司机页面
            })
        }
      },
      // 留言框高度自适应
      highAdapt() {
        this.$refs.textarea.style.height = 'auto'
        this.$refs.textarea.style.height =  this.$refs.textarea.scrollHeight + "px"
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
        console.log(this.date.minDate)
        if(!index){
          this.judge.time = 0
        }else if(this.date.sTime == ""){
          this.$toast('请先填写起始起始时间')
          return
        }else {
          this.judge.time = 1
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

      // 时间组件
      timeOnClickRight() {
        // 关闭时间组件
        show.timePick = false
        // 添加格式
      },
      // 打开地址栏
      showAddress(role) {
        // if(!this.judge.login){ // 如果用户没有登陆，则跳转到登陆界面
        //   this.login()
        // }
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
      findAddress() { // 通过用户 id 来寻找地址
        if(!this.$store.state.isLogin){
          this.$toast('请先登陆后使用')
          return
        }else{
          let self = this
          let url
          // 给 url 赋值
          if(self.judge.role == "consignor") {
            url = this.url + "/area/queryAllDeliver.do"
          }else {
            url = this.url + "/area/queryAllConsignee.do"
          }
          this.$axios.post(url,
            {
              uid: Number(self.consignor.cid)
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
        }
      },
      // 地址选择栏
      onClickLeft() {
        this.show.address = false
      },
      onClickRight() {
        // 通过判断角色来进入地址
        // let id,areaId
        // areaId = this[this.judge.role].areaId
        let id = this.consignor.cid
          this.$router.push({
            path:'/' + this.judge.role + 'Address',
            query:{
              id,
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
            id: this.addresses[index].cid?this.addresses[index].cid:this.consignor.cid,
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
        if(role == 'consignor'){
          this.amapRole = 0
        }else{
          this.amapRole = 1
        }
        this.$refs.amap.search(this[role].areaCode)
        this.show.address = false
      },
      // 地址触摸开始
      pressAddress(index) {
        if(this.judge.click){
          return
        }
        let self = this
        // 修改样式
        for(let i=0;i<this.addresses.length;i++){
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
              // self.$refs[index][0].style.display = "none"
              // 上面一步删除是因为如果删除的地址下面还有地址的话，就会让下面一个但是未被删除的地址消失不见，vue会自动改变index
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
                  self.findAddress()
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
      // 初始化函数
      dateInit(){
      let i = new Date()
      let self = this
      this.date.minDate = new Date()
      // 如果到了 50 分过后 直接跳过这个小时
      if (i.getMinutes() >= 50) {
      this.date.minDate.setTime(i.getTime() + 1000 * 60 * 10)
    } else {
      this.date.currentDate = this.date.minDate
    }
    // 设置未来最大持续时间为 20 天
    this.date.maxDate = new Date(
    this.date.minDate.getFullYear(),
    this.date.minDate.getMonth(),
    this.date.minDate.getUTCDate() + 20
  )
    },
      loginInit(){
        if (this.$store.state.isLogin) {
          //  通过 id 得到 姓名
          let data = this.$store.state.userData
          this.deliveryMsg.uid = data.user.id // 发货对应的 id
          this.consignor.cid = data.user.id // 数据库对应的 id 设置地址的时候要用到
          this.consignor.id = data.user.authId
          this.consignor.name = data.userInfo.name
          this.consignor.phone = data.user.phone
          this.consignor.headPicUrl = "http://47.96.231.75:8080" + data.userInfo.avatar,
          this.judge.loginState = true,
            // role 1 为用户
            this.role = data.user.role
        }
      }
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

    //yxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx//
    beforeRouteLeave (to, from, next) {
      if(to.path=="/login"&&this.$store.state.isLogin){
        this.$router.push({
          path: `/myInfo`
        })
        return;
      }
      next();
    },



    mounted() {
        if(this.$store.state.isLogin){
          this.loginStatus = "我的";
        }else{
          this.loginStatus = "登录注册";
        }
      // 初始化时间
      this.dateInit()
      // 初始化登陆状态
      this.loginInit()
      if(this.$store.state.isLogin){
        this.role = this.$store.state.userData.user.role
        // 1 用户
      }
    }
  }
</script>

<style scoped>
  .rotate-span{
    position: relative;
    display: inline-block;
    height: .5rem;
    width: .6rem;
    /*transition: .5s all ease;*/
  }
  .rotate-span-down{
    transform: rotate(180deg);
  }
  @keyframes up {
    from   {
      top: -.1rem;
    }
    to     {
      top: .1rem;
    }
  }
  .rotate-span>img{
    display: inline-block;
    position: absolute;
    width: .4rem;
    top:-.1rem;
    left: .1rem;
    animation: up .7s infinite alternate;
  }
  .user-info-head-img-container{
    position:relative;
    text-align:center;
    height: 1.8rem;
    margin-top: 1rem;
  }
  .user-info-head-img{
    border-radius: 50%;
    display: inline-block;
    width: 1.5rem;
    height: 1rem;
  }
  .user-info-name{
    text-align: center;
    color: #7d7e80;
    font-size: .4rem;
    width: 100%;
    display: inline-block;
    padding-bottom: .25rem
  }
  .user-info-item{
    position:relative;
    text-align: center;
    color: #7d7e80;
    font-size: .35rem;
    width: 100%;
    display: inline-block;
    height: .75rem;
    line-height: .75rem;
    transition: .2s all ease;
  }
  .user-info-item-active{
    background-color: #39a9ed;
  }
  .user-info-item-img{
    position: absolute;
    width: .5rem;
    top: .1rem;
    left: .75rem
  }
  .lift{
    height: .4rem;
    font-size: .25rem;
    text-align: center;
    color: #7d7e80;
    margin-top: -.1rem;
  }
  .search-input-container{
    position: relative;
  }
  .search-input-container>img{
    position: absolute;
    top: .12rem;
    left: .15rem;
    width: .35rem;
    z-index: 1000;
  }
  .delivery-button{
    width: 100%;
    height: .8rem;
    line-height: .8rem;
    margin-top: .1rem;
  }
  .msg-write textarea{
    overflow:hidden;
    resize:none;
    width: 4.2rem;
    font-size: .25rem;
    text-indent: .5rem;
    color: grey;
    padding-top: .10rem;
    border: none
  }
  .msg-write{
    margin-top: .28rem;
  }
  .msg-span{
    position: relative;
    display: inline-block;
    width: 1rem;
    height: .5rem;
    padding: .1rem .25rem 0 .7rem;
    font-size: .25rem;
    vertical-align:top;
    color: grey;
  }
  .picture-span{
    position: relative;
    width: 1.2rem;
    font-size: .25rem;
    padding: .4rem .45rem 0 .65rem;
    color: grey;
  }
  /*改变原有样式*/
  /deep/ .van-uploader__preview-delete{
    font-size: .3rem !important;
  }
  /deep/ .van-uploader__input{
    padding-left: .2rem;
  }
  .time-span{
    position: relative;
    display: inline-block;
    width: 1.2rem;
    height: .5rem;
    padding: .28rem .1rem 0 .65rem;
    font-size: .25rem;
    vertical-align:top;
    color: grey;
  }
  .time-input{
    width: 4.2rem;
    height: .5rem;
    margin-top:.15rem;
    border-bottom:2px solid #f8f8f8;
    text-indent:.45rem;
    font-size: .25rem;
    color:gray;
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
    background-color: white;
    font-size: .4rem;
    text-align: center;
    line-height: .9rem
  }
  .head-span-container{
    position: relative;
    height: .85rem; /* 为了让滚动条消失不见，高度加大并在父元素上 hidden*/
    white-space: nowrap;
  }
  .head-span-container::-webkit-scrollbar {
    display: none;
  }
  header{
    position: fixed;
    top:0;
    left: 0;
    height: 1.6rem;
    width:100%;
    max-width: 640px;
    min-width: 320px;
    background-color: white;
    z-index: 55;
    overflow: hidden;
  }
  .head-span{
    box-sizing: border-box;
    display: inline-block;
    width: 25%;
    height: .5rem;
    padding: .1rem .2rem;
    text-align: center;
    line-height: .5rem;
    font-size: .3rem;
    color: #7d7e80;
    background-color: white;
  }
  .head-span-active{
    color: #39a9ed;
  }
  .head-span-button{
    position:absolute;
    top:.15rem;
    width: 1rem;
    height: 2rem;
  }
  .head-span-button-left{
    left:.5rem;
  }
  .head-span-button-right{
    right:.5rem;
  }
  .head-span-button-img{
    width: .55rem;
    position: absolute;
    top:.05rem;
    left:.2rem;
  }
  .container{
    position: relative;
    width: 100%;
    max-width: 640px;
    min-width: 320px;
    height: calc(100vh - 1.5rem);
    overflow: hidden;
  }
  .content{
    position: absolute;
    margin-left: .325rem;
    bottom: .2rem;
    width: 90%;
    height: auto;
    z-index: 5;
    transition: .5s all ease;
  }
  .content-container{
    width: 100%;
    border-radius: 10px;
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
    height: .8rem;
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
    padding-top: 0.05rem;
    margin-top: .1rem;
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
</style>
