<template>
  <div class="container">
    <van-nav-bar
      title="地址填写"
      left-text="返回"
      @click-left="onClickLeft"
    />
    <p class="message">收货人信息</p>
    <div class="field">
        <van-cell-group  class="cell-group">
            <van-field
              v-model=" consignee.id"
              required
              label="ID"
              right-icon="question-o"
              placeholder="请输入收货人ID号"
              :error-message="errorMessage.id"
              @click-right-icon="$toast('请输入收货人注册的账号 \n 若账号与收货人姓名不符请联系管理员')"
              @blur="checkId"
            />
          <transition-group name="flip-list" tag="div">
            <div v-if="judge.id" :key="0">
              <van-field
                v-model=" consignee.name"
                type="text"
                label="姓名"
                placeholder="请输入收货人姓名"
                required
                disabled
              />
              <van-field
                v-model=" consignee.phone"
                type="tel"
                label="电话"
                placeholder="请输入收货人电话"
                required
                disabled
              />
            </div>
            <van-field
              :key="1"
              v-model="consignee.areaCode"
              type="text"
              label="省/市/区"
              placeholder="请输入收货人地址"
              required
              readonly
              :error-message="errorMessage.areaCode"
              @focus="mapShow = true"
            />
            <van-field
              :key="2"
              v-model=" consignee.town"
              type="text"
              label="镇"
              placeholder="可输入收货人地区的镇"
            />
            <van-field
              :key="3"
              v-model=" consignee.village"
              type="text"
              label="村"
              placeholder="可输入收货人地区的村"
            />
            <van-field
              :key="4"
              v-model="consignee.detail"
              label="详细地址"
              type="textarea"
              placeholder="请输入收货人详细地址,例如某某小区，门牌号等"
              :error-message="errorMessage.areaDetail"
              rows="1"
              autosize
              required
              @blur="checkAreaDetail"
            />
          </transition-group>
             <div class="default">
               <p>是否设置为默认地址</p>
               <div class="default-button">
                 <van-switch v-model="judge.status" @change="defaultAddress" />
               </div>
             </div>
        </van-cell-group>
    </div>
    <van-button type="primary" @click="save" class="save-button" :loading="loading">保存</van-button>
    <van-popup  v-model="mapShow"
                position="bottom"
                :style="{ height: '40%' }">
      <van-area :area-list="AreaList" :areaValue='AreaValue' @confirm="setMap" @cancel="mapShow = false"/>
    </van-popup>
  </div>
</template>

<script>
  import  AreaList from '../../assets/area'; // 地址列表
    export default {
        name: "ConsigneeAddress",
        data() {
          return {
            //  http://118.25.85.198:8080/deliver
            url: "http://118.25.85.198:8080/deliver",
            AreaList, // 地址信息
            AreaValue:110101, // 默认为北京市 北京市 东城区 也可以后期导入选择
            mapShow: false, // 地址控件展示
            loading: false, // 保存按钮发送数据时的状态
            consignee:{ // 收货人
              id:"", // 收货人 id
              role: "consignee", // 角色，收货人
              name: "", // 收货人姓名
              phone: "", // 电话号码
              areaCode:"",
              province:"", // 省
              city:"", // 市
              district:"", // 区
              town:"", // 镇
              village: "", // 村
              detail: "",// 详细地址
              status: "", // 状态地址
              cid: "" // 查找用的id
            },
            errorMessage: { // 错误信息
              id:"",
              areaCode:"",
              areaDetail:"",
            },
            judge: {
              status: false, // 是否设为默认地址
              id:false, // id 是否填写正确。false为失败
              areaCode: false,  // 地址
              areaDetail: false // 详细地址
            }
          }
        },
        methods: {
          // 修改默认地址
          defaultAddress(check) {
            console.log(this.judge.status)
          },
          // 返回上一层
          onClickLeft() {
            this.$router.go(-1)
          },
          // 判断 id 是否填写正确
          checkId() {
            console.log("检查id")
            let self = this
            this.$axios.get(this.url + "/user/findConsigneeInfo.do",{
              params: {
                authId : self.consignee.id,
              }
            })
              .then(function (response) {
                if(response.data.code == 1){
                  self.judge.id = false
                  self.errorMessage.id = response.data.msg
                  // 修改为空
                  self.consignee.name = ""
                  self.consignee.phone = ""
                  console.log(response)
                //else if(response.data.code == 0) {
                //   // self.errorMessage.id = "该用户没有收货资格"
                }else {
                  self.judge.id = true
                  self.errorMessage.id = ""
                  self.consignee.name = response.data.data.name
                  self.consignee.phone = response.data.data.phone
                  self.consignee.cid = response.data.data.cid
                }
              })
              .catch(function (err) {
                self.judge.id = false
                self.errorMessage.id = "查询不到该用户"
                // 修改为空
                self.consignee.name = ""
                self.consignee.phone = ""
                console.log(err)
              })
          },
          // 判断地址栏是否填写
          checkAreaCode() {
            if(this.consignee.areaCode){ // 如果填写正确，通过
              this.judge.areaCode = true
              this.errorMessage.areaCode = ""
            }else{
              this.judge.areaCode = false
              this.errorMessage.areaCode = "请输入地址"
            }
          },
          // 判断详细地址是否填写
          checkAreaDetail() {
            if(this.consignee.detail){ // 如果填写正确，通过
              this.judge.areaDetail = true
              this.errorMessage.areaDetail = ""
            }else{
              this.judge.areaDetail = false
              this.errorMessage.areaDetail = "请输入详细地址"
            }
          },
          // 地址设置
          setMap(data){
            //地区代码,主要是拿到地区代码来交互
            this.AreaValue = data[2].code // 修改展现地址栏的默认地址
            let areaCode = ""
            // 这一步是为了防止出现 北京市 北京市 朝阳区的情况，将两个合并在一起
            if(data[0].name === data[1].name){
              areaCode = data[1].name+data[2].name
            }else{
              areaCode = data[0].name+data[1].name+data[2].name
            }
            // 给 consignee 属性赋值
            this.consignee.province = data[0].name
            this.consignee.city = data[1].name
            this.consignee.district = data[2].name
            // 目前没有镇的选项
            this.consignee.areaCode = areaCode
            // 地址栏消失，检查是否填写完毕
            this.mapShow = false
            this.checkAreaCode()
          },
          save() {
            // 判断是否所有信息均以填写完毕
            for(let item in this.judge) {
              // 寻找非继承属性，如果有一个为空则退出并提升
              if(this.judge.hasOwnProperty(item)){
                if(item == "status") continue
                if(!this.judge[item]){
                  this.$toast("请输入完整的信息")
                  return
                }
              }
            }
            // 回调函数中调用 this
            let self = this
            //启用转圈圈，发送数据到后台，若成功Toast并切换回主页
            this.loading = true
            // 接口地址
            let url = this.url + "/area/addConsignee.do"
            // let url = "http://192.168.1.103:8080/userOrder/findNear.do"
            // 发送的数据
            let transmitMes = {
              uid:this.$route.query.id, // 发货人 id 从 homepage处获得 ，又或者可以从登陆状态获得
              cid:this.consignee.cid, // 收货人 id
              province:this.consignee.province,
              city:this.consignee.city,
              district:this.consignee.district,
              town:this.consignee.town, // 镇可以为空
              village:this.consignee.village, // 村可以为空
              detail:this.consignee.detail
            }
            this.$axios.post(url,transmitMes)
              .then(function (response) {
                console.log(response.data.data)
                self.loading = false
                if(self.judge.status){
                  self.$axios.post(self.url + "/area/updateConsignee.do",{
                    uid: Number(self.$route.query.id),    //登陆用户id
                    areaId: response.data.data             // 地址 id
                  })
                    .then(function (res) {
                      console.log(res)
                    })
                }

                // 回到上层
                 self.$router.go(-1)
              })
              .catch(function (err) {
                self.loading = false
                console.log(err)
              })
          },
        },
      mounted() {
          // 依次赋值给当前对象
        // this.$route.id = 用户的 id 可以拿来取用
        console.log(this.$route.query.id)
        console.log("-------query--------------")
        /*******************************/
        /************************************/
        // 判断是否有 mes 属性，有则说明时带参数传递并且功能应该为修改默认地址
        if(this.$route.query.hasOwnProperty("mes")){
          let mes = this.$route.query.mes
          this.consignee.areaCode = mes.province + mes.city + mes.district
          this.consignee = mes
          // 这一步放在下面覆盖掉上面的 id 赋值
          this.consignee.id = this.$route.query.id
          this.judge.id = true
        }
      }
    }
</script>

<style scoped>
  .default{
    margin: 10px 0;
    background-color: white;
  }
  .default::after{
    content: ".";
    display: block;
    height: 0;
    clear: both;
  }
  .default p{
    font-size: 14px;
    padding-left:14px;
    height:44px;
    line-height: 44px;
    float: left
  }
  .default-button{
    float: right;
    margin-top: .1rem
  }
  .container{
    background-color: #f8f8f8;
    overflow: auto;
  }
  .message{
    margin: .4rem auto;
    text-indent: .8rem;
    font-size: .35rem;
    color: #8C999F;
  }
  .field{
    background-color:  white;
  }
  .cell-group{
    width: 90%;
    margin: auto;
  }
  .cell-group:after{
    display: block;
    height: 0;
    clear: both;
    content: ".";
  }
  .save-button{
    display:block;
    width:90%;
    margin :1rem auto
  }
</style>
