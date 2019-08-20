<template>
  <div class="container">
    <van-nav-bar
      title="地址填写"
      left-text="返回"
      @click-left="onClickLeft"
    />
    <p class="message">发货人信息</p>
    <div class="field">
        <van-cell-group  class="cell-group">
          <van-field
            v-model=" consignor.name"
            label="姓名"
            placeholder="发货人姓名"
            right-icon="question-o"
            @click-right-icon="$toast('若发货人姓名与账号主人姓名不符 \n 请联系管理员')"
            required
            disabled
          />
          <van-field
            v-model="  consignor.phone"
            type="tel"
            label="电话"
            placeholder="发货人电话"
            required
            disabled
          />
          <van-field
            v-model="consignor.areaCode"
            type="text"
            label="省/市/区"
            placeholder="请输入发货人地址"
            required
            readonly
            :error-message="errorMessage.areaCode"
            @focus="mapShow = !mapShow"
          />
          <van-field
            :key="2"
            v-model=" consignor.town"
            type="text"
            label="镇"
            placeholder="可输入发货人地区的镇"
          />
          <van-field
            :key="3"
            v-model=" consignor.village"
            type="text"
            label="村"
            placeholder="可输入发货人地区的村"
          />
          <van-field
            :key="4"
            v-model="consignor.detail"
            label="详细地址"
            type="textarea"
            placeholder="请输入发货人详细地址"
            :error-message="errorMessage.areaDetail"
            rows="1"
            autosize
            required
            @blur="checkAreaDetail"
          />
          <div class="default">
            <p>是否设置为默认地址</p>
            <div class="default-button">
              <van-switch v-model="judge.status"/>
            </div>
          </div>
        </van-cell-group>
    </div>
    <van-button type="primary" @click="save" class="save-button" :loading="loading">保存</van-button>
    <van-popup  v-model="mapShow"
                position="bottom"
                :style="{ height: '40%' }">
      <van-area :area-list="AreaList" :areaValue='AreaValue' @confirm="setMap" @cancel="mapShow = !mapShow"/>
    </van-popup>
  </div>
</template>

<script>
  import  AreaList from '../../assets/area'; // 地址列表
  export default {
    name: "ConsignorAddress",
    data() {
      return {
        url: "http://192.168.1.103:8080",
        AreaList, // 地址信息
        AreaValue:110101, // 默认为北京市 北京市 东城区 也可以后期导入选择
        mapShow: false, // 地址控件展示
        loading: false, // 保存按钮发送数据时的状态
        consignor:{ // 发货人，通过用户登录来获取 id，姓名，电话目前固定不可再此修改，只能通过其他方式改变
          id:1, // 发货人 id
          role: "consignor", // 角色，发货人
          name: "", // 发货人姓名
          phone: "", // 电话号码
          areaCode:"",
          province:"", // 省
          city:"", // 市
          district:"", // 区
          town:"", // 镇
          village: "", // 村
          detail: "" // 详细地址
        },
        errorMessage: { // 错误信息
          areaCode:"",
          areaDetail:"",
        },
        judge: {
          status: false, // 是否保存为默认地址
          areaCode: false,  // 判断地址是否填写，false即为未填写
          areaDetail: false // 判断详细地址是否填写
        }
      }
    },
    methods: {
      // 返回上一层
      onClickLeft() {
        this.$router.go(-1)
      },
      // 判断地址栏是否填写
      checkAreaCode() {
        if(this.consignor.areaCode){ // 如果填写正确，通过
          this.judge.areaCode = true
          this.errorMessage.areaCode = ""
        }else{
          this.judge.areaCode = false
          this.errorMessage.areaCode = "请输入地址"
        }
      },
      // 判断详细地址是否填写
      checkAreaDetail() {
        if(this.consignor.detail){ // 如果填写正确，通过
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
        // 给 consignor 属性赋值
        this.consignor.province = data[0].name
        this.consignor.city = data[1].name
        this.consignor.district = data[2].name
        this.consignor.areaCode = areaCode
        // 地址栏消失，检查是否填写完毕
        this.mapShow = false
        this.checkAreaCode()
      },
      save() {
        // 回调函数中调用 this
        let self = this
        //启用转圈圈，发送数据到后台，若成功Toast并切换回主页
        this.loading = true
        // 判断是否所有信息均以填写完毕
        for(let item in this.judge) {
          // 寻找非继承属性，如果有一个为空则退出并提升
          if(item == "status") continue
          // status 不做判断
          if(this.judge.hasOwnProperty(item)){
            if(!this.judge[item]){
              this.loading = false
              this.$toast("请输入完整的信息")
              return
            }
          }
        }
        // 接口地址
        let url = this.url + "/area/addDeliver.do"
        // 发送的数据
        let transmitMes = {
          uid:this.consignor.id,
          province:this.consignor.province,
          city:this.consignor.city,
          district:this.consignor.district,
          town:this.consignor.town,
          village:this.consignor.village,
          detail: this.consignor.detail
        }
        this.$axios.post(url,transmitMes)
          .then(function (response) {
            console.log(response)
            console.log(self.$route.query.uid)
            if(self.judge.status){
              self.$axios.post("http://192.168.1.103:8080/area/updateDeliver.do",{
                uid: Number(self.$route.query.uid),    //登陆用户id
                areaId: response.data.data             // 地址 id
              })
                .then(function (res) {
                  console.log(res)
                })
            }
            self.loading = false
            // 回到上层
            // self.$router.go(-1)
          })
          .catch(function (err) {
            self.loading = false
            console.log(err)
          })
      },
      checkId() {
        let self = this
        this.$axios.get("http://118.25.85.198:8080/CATStudio/user/findConsigneeInfo.do",{
          params: {
            authId : self.consignor.id,
          }
        })
          .then(function (response) {
            if(response.data.code == 400){
              self.judge.id = false
              self.errorMessage.id = response.data.msg
              // 修改为空
              self.consignor.name = ""
              self.consignor.phone = ""
            }else {
              self.judge.id = true
              self.errorMessage.id = ""
              self.consignor.name = response.data.data.name
              self.consignor.phone = response.data.data.phone
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
    },
    // 根据父组件传来的 id 进行匹配，若匹配失败则弹出网络错误并返回父组件
    mounted() {
      console.log(this.$route.query.uid)
      this.consignor.id = this.$route.query.uid
      this.checkId()
    }
  }
</script>

<style scoped>
  .default{
    margin: 10px 0
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
