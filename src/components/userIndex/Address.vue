<template>
  <div class="container">
    <div>
      <van-nav-bar
        title="信息填写"
        left-text="返回"
        @click-left="onClickLeft"
      />
    </div>
    <p class="ConsigneeMessage">发货人信息</p>
    <div v-bind:class="{ field: isConsignorField }">
      <transition name="fade" mode="out-in">
        <van-cell-group :style="{width: '90%',margin: 'auto'}"  v-if=" consignorMesShow" key="edit">
          <van-field
            v-model=" consignor.uid"
            required
            disabled
            label="ID"
            right-icon="question-o"
            placeholder="请输入发货人ID号"
            @click-right-icon="$toast('请输入发货人注册的账号，若账号与发货人姓名不符请联系管理员')"
            @blur="checkId"
          />
            <div>
              <van-field
                v-model="  consignor.username"
                required
                label="姓名"
                placeholder="请输入发货人姓名"
                disabled
                :error-message="errorMessage.userInput"
                @blur="checkUser"
              />
              <van-field
                v-model="  consignor.phone"
                type="tel"
                label="电话"
                placeholder="请输入发货人电话"
                required
                disabled
                border
                :error-message="errorMessage.phoneInput"
                @blur="checkPhone"
              />
            </div>
            <van-field
              v-model="consignor.areaCode"
              type="text"
              label="省/市/区"
              placeholder="请输入发货人地址"
              required
              readonly
              :error-message="errorMessage.areaCodeInput"
              @focus="showMap(0)"
            />
            <van-field
              v-model="consignor.village"
              label="详细地址"
              type="textarea"
              placeholder="请输入发货人详细地址"
              :error-message="errorMessage.areaStrInput"
              rows="1"
              autosize
              required
            />
          <van-button type="primary" @click=" consignorChangeShow" class="save-button">确认</van-button>
          <div class="clear"></div>
        </van-cell-group>
        <div class="message" @click=" consignorChangeShow" v-else key="save">
          <p>姓名：<span>{{ consignor.username}}</span></p>
          <p>号码：<span>{{ consignor.phone}}</span></p>
          <p>账号：<span>{{ consignor.uid}}</span></p>
          <div class="head-portrait-container">
            <img src="../assets/img/reset.svg" alt="">
          </div>
        </div>
      </transition>
    </div>
    <p class="ConsigneeMessage">收货人信息</p>
    <div v-bind:class="{ field: isConsigneeField }">
      <transition name="fade" mode="out-in">
      <van-cell-group :style="{width: '90%',margin: 'auto'}"  v-if="consigneeMesShow" key="edit">
        <van-field
          v-model=" consignee.cid"
          required
          label="ID"
          right-icon="question-o"
          placeholder="请输入收货人ID号"
          :error-message="errorMessage.idInput"
          @click-right-icon="$toast('请输入收货人注册的账号，若账号与收货人姓名不符请联系管理员')"
          @blur="checkId"
        />
        <transition-group name="flip-list" tag="div">
          <div v-if="consigneeIdJudge" :key="0">
            <van-field
              v-model=" consignee.username"
              required
              label="姓名"
              placeholder="请输入收货人姓名"
              disabled
              :error-message="errorMessage.userInput"
              @blur="checkUser"
            />
            <van-field
              v-model=" consignee.phone"
              type="tel"
              label="电话"
              placeholder="请输入收货人电话"
              required
              disabled
              :error-message="errorMessage.phoneInput"
              @blur="checkPhone"
            />
          </div>
        <van-field
          :key="1"
          v-model="consignee.areaCode"
          value=""
          type="text"
          label="省/市/区"
          placeholder="请输入收货人地址"
          required
          readonly
          :error-message="errorMessage.areaCodeInput"
          @focus="showMap(1)"
        />
        <van-field
          :key="2"
          v-model="consignee.village"
          label="详细地址"
          type="textarea"
          placeholder="请输入收货人详细地址"
          :error-message="errorMessage.areaStrInput"
          rows="1"
          autosize
          required
        />
          </transition-group>
        <van-button type="primary" @click="consigneeChangeShow" class="save-button">确认</van-button>
        <div class="clear"></div>
      </van-cell-group>
      <div class="message" @click="consigneeChangeShow" v-else key="save">
        <p>姓名：<span>{{consignee.username}}</span></p>
        <p>号码：<span>{{consignee.phone}}</span></p>
        <p>账号：<span>{{consignee.cid}}</span></p>
        <div class="head-portrait-container">
          <img src="../assets/img/reset.svg" alt="">
        </div>
      </div>
      </transition>
    </div>
    <div class="button-container">
    <van-button type="primary" class="top-button" @click="save" :loading="loading">保存</van-button>
      <van-button type="info"  class="bottom-button" @click="setDefault" :loading="loading">设为默认并保存</van-button>
    <van-button type="danger"  class="bottom-button" @click="reset">删除信息</van-button>
    </div>
    <van-popup  v-model="mapShow"
                position="bottom"
                :style="{ height: '40%' }">
      <van-area :area-list="areaList" :areaValue='areaValue' @confirm="setMap" @cancel="showMap"/>
    </van-popup>
  </div>
</template>

<script>
  import  AreaList from '../assets/area';
  import axios from 'axios'

  import { Dialog, Toast } from 'vant'
    export default {
        name: "Address",
      props:{

      },
      data (){
          return{
            isConsigneeField:true,// 背景样式
            isConsignorField:true,
            areaList:AreaList,// 引入地区列表为组件服务
            areaValue:110101,//所属地址，默认为北京市
            roleId:0,// 0 代表发货人 1代表收货人
            consigneeIdJudge:false, // 判断id是否正确
            consignor:{// 发货人
              uid:"1",
              role: "consignor",//角色，发货人
              username: "某憨",//发货人姓名
              phone: "000000000",//电话号码
              areaCode:"广东省广州市番禺区",
              province:"广东省",// 省
              city:"广州市",// 市
              district:"番禺区",// 区
              village: "广东工业大学",//详细地址
            },
            consignee:{//收货人
              cid:"",// 靠用户填写来获取
              role: "consignee",//角色，收货人
              username: "",//收货人姓名，靠用户填写的id获取
              phone: "",//电话号码，靠用户填写的id获取
              areaCode:"",
              province:"",// 省
              city:"",// 市
              district:"",// 区
              village: "",//详细地址
              areaId:""// 地址的编号
            },
            errorMessage: {//错误信息
              userInput:"",
              phoneInput:"",
              areaCodeInput:"",
              areaStrInput:"",
              idInput:""
            },
            mapShow:false,//地区开关
            loading:false,
            consigneeMesShow:true ,// 信息缩写
            consignorMesShow:true // 信息缩写
          }
      },
      methods:{
        onClickLeft() {
          this.$router.go(-1)
        },
        checkId() {// http://education.gdutcat.top:8080/gdutcat/Banner/getBanners.do
          let self = this
          axios.get('http://118.25.85.198:8080/CATStudio/user/findConsigneeInfo.do?authId='+this.consignee.cid)
            .then(function (response) {// 匹配正确
              // 接下来要显示其姓名和电话
              console.log(response)
              if(response.data.code === "200"){
                self.consigneeIdJudge = true
                self.errorMessage.idInput = ""
                self.consignee.username = response.data.data.name
                self.consignee.phone = response.data.data.phone
              }else{
                self.errorMessage.idInput = response.data.msg
              }
            })
            .catch(function (error) {// 匹配错误
              console.log(error);
              self.consigneeIdJudge = false
              self.errorMessage.idInput = "无此ID号或者网络连接有误"
            })
        },
        checkPhone() {
            if(/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/.test(this.consignee.phone)){
              this.errorMessage.phoneInput = ""
            }else{
              this.errorMessage.phoneInput = "请输入正确的手机号码"
            }
        },
        checkUser() {
          if(this.consignee.username == ""){
            this.errorMessage.userInput = "请输入收货人姓名"
          }else(
            this.errorMessage.userInput = ""
          )
        },
        checkAreaCode() {
          if(this.consignee.areaCode == ""){
            this.errorMessage.areaCodeInput = "请输入收货人地址"
          }else{
            this.errorMessage.areaCodeInput = ""
          }
        },
        showMap(roleId){
          this.roleId = roleId
          this.mapShow = !this.mapShow
        },
        setMap(data){
          //地区代码,主要是拿到地区代码来交互，而
          this.areaValue = data[2].code // 修改默认地址
          let areaCode = ""
          // show address detail
          for(let i=0;i<=2;i++){
            // 获取参数
            if(i === 0){// 这一步是为了防止出现 北京市 北京市 朝阳区的情况，将两个合并在一起
              if(data[0].name === data[1].name)
                continue
            }
            areaCode += data[i].name + " "
          }
          // 应该可以使用解构赋值在这里
          if(this.roleId){
            this.consignee.province = data[0].name
            this.consignee.city = data[1].name
            this.consignee.district = data[2].name
            this.consignee.areaCode = areaCode
          }else{
            this.consignor.province = data[0].name
            this.consignor.city = data[1].name
            this.consignor.district = data[2].name
            this.consignor.areaCode = areaCode
          }

          this.mapShow = false
          this.checkAreaCode()
        },
        reset(){
          // 撤销修改
          let self = this
          Dialog.confirm({
            title: '确认删除所填信息'
          }).then(() => {
            axios.get("http://118.25.85.198:8080/CATStudio/area/deleteConsignee.do?areaId="+self.consignee.areaId )
              .then(function (response) {

              })
              .catch(function (err) {
                console.log(err)
              })
            //on confirm
            for(let item in this.consignee){
              if(this.consignee.hasOwnProperty(item)){
                this.consignee[item] = ""
              }
            }
            for(let item in this.errorMessage){
              if(this.errorMessage.hasOwnProperty(item)){
                this.errorMessage[item] = ""
              }
            }
            Toast("删除成功")
            self.$router.go(-1)
          }).catch(() => {

          })
        },
        save() {
          //启用转圈圈，发送数据到后台，若成功Toast并切换回主页
          if(!this.consigneeIdJudge){
            Toast("请输入正确的id")
            return
          }
          let transmitMes = {// 发送的数据
              province:this.consignee.province,
              city:this.consignee.city,
              district:this.consignee.district,
              village:this.consignee.village,
              cid:this.consignee.cid,
              uid:this.consignor.uid
          }
          // 解构赋值
          let url = "http://118.25.85.198:8080/CATStudio/area/addConsigneeArea.do?"
          for(let item in transmitMes){
            if(transmitMes[item] == ""){// 判断输入是否完整
              Toast("请输入完整的地址")
              return
            }else{
              url+= item + "=" + transmitMes[item] + "&"
            }
          }
          this.loading = true
          let self = this
          axios.post(url)
            .then(function (response) {
              self.loading = false
              self.$router.go(-1)
              // 退回上一页并展示
            })
            .catch(function (err) {
              self.loading = false
              console.log(err)
            })
        },
        setDefault(){
          this.save()
          // http://118.25.85.198:8080/CATStudio
          let self = this
          axios.get("http://118.25.85.198:8080/CATStudio/area/updateConsignee.do?uid="+ self.consignor.uid+"&areaId="+self.consignee.areaId)
            .then(function (res) {
              console.log(res)
            })
            .catch(function (err) {
              console.log(err)
            })
        },
        consigneeChangeShow(){
          this.consigneeMesShow = !this.consigneeMesShow
          this.isConsigneeField = !this.isConsigneeField
        },
        consignorChangeShow() {
          this.consignorMesShow = !this.consignorMesShow
          this.isConsignorField = !this.isConsignorField
        }
      },
      created() {
        // 解构赋值
        if (this.$route.query["consignee"]) {// 如果传入了consignee，就自动填入
          this.consignee = this.$route.query["consignee"];
          this.checkId()
        }
      }
    }
</script>

<style scoped>
  .ConsigneeMessage{
    margin: .4rem auto;
    font-size: .35rem;
    color: #8C999F;
    text-indent: .8rem;
  }
  .container{
    background-color: #f8f8f8;
  }
.field{
  transition: 0.8s all ease;
  background-color:  white;
}
.clear{
  content:".";
  display:block;
  height:0;
  clear:both;
  visibility:hidden
}
  .top-button{
    display:block;
    width:90%;
    margin :40px auto 0 auto;
  }
  .bottom-button{
    display:block;
    width:90%;
    margin :20px auto
  }
  .save-button{
    float: right;
    margin: .2rem;
    width: 1.8rem;
  }
  .button-container{
    width: 100%;
    margin-top: 1rem;
  }
  .flip-list-move {
    transition: transform 1s;
  }
  .message{
    position: relative;
    width: 90%;
    padding: 0.2rem;
    border-radius: .2rem;
    margin: .2rem auto;
    background-color: white;
  }
  .message>p{
    font-size: .3rem;
    text-indent: .2rem;
    margin: .15rem auto;
  }
  .message> .head-portrait-container{
    position: absolute;
    right: 5%;
    top:5%;
    width: 1.5rem;
    height: 2.0rem;
  }
  .message span{
    color: #8c999f;
  }
  .head-portrait-container>img{
    position: absolute;
    bottom: .5rem;
    width: 60%;
    height: auto;
  }
  .fade-enter-active, .fade-leave-active {
    transition: all .3s
  }
  .fade-enter, .fade-leave-active {
    opacity: 0;
    transform: translateX(100%);
  }
</style>
