<template>
  <div class="route">
    <van-cell-group>
      <van-button plain type="default" size="small" @click="returnDriver" class="comebackdriver"><</van-button>
      <p class="remind1">请填写您的行程信息</p>
      <van-field
        class="cell1"
        v-model="areaCode"
        type="text"
        label="出发省/市/区"
        placeholder="选择出发地点"
        :error-message="errorMessage.areaCodeInput"
        @click="showMap"
        required
      />
      <!-- 出发省市区弹出框 -->
      <van-popup v-model="mapShow" position="bottom">
        <van-area :area-list="areaList" :areaValue="areaValue" @confirm="setMap" @cancel="showMap" />
      </van-popup>

      <van-field
        class="cell2"
        v-model="areaStr"
        label="详细地址"
        type="textarea"
        placeholder="请输入详细地址"
        :error-message="errorMessage.areaStrInput"
        rows="1"
        autosize
        required
        @blur="checkStrCode"
      />

      <van-field
        class="cell3"
        v-model="areaCode2"
        type="text"
        label="到达省/市/区"
        placeholder="选择到达地点"
        :error-message="errorMessage2.areaCodeInput"
        @click="showMap2"
        required
      />
      <!-- 到达省市区弹出框 -->
      <van-popup v-model="mapShow2" position="bottom">
        <van-area
          :area-list="areaList2"
          :areaValue="areaValue2"
          @confirm="setMap2"
          @cancel="showMap2"
        />
      </van-popup>

      <van-field
        class="cell4"
        v-model="areaStr2"
        label="详细地址"
        type="textarea"
        placeholder="请输入详细地址"
        :error-message="errorMessage2.areaStrInput"
        rows="1"
        autosize
        required
        @blur="checkStrCode2"
      />
<!-- 起始时间弹出框 -->
      <van-field
        class="cell5"
        v-model="timeCode"
        type="text"
        label="出发起始时间"
        placeholder="选择起始时间"
        :error-message="errorMessage3.timeCodeInput"
        @click="showPopup"
        required
      />

      <van-popup v-model="show3" position="bottom">
        <van-datetime-picker
          v-model="currentDate"
          type="datetime"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="setTime"
          @cancel="showPopup"
        />
      </van-popup>
<!-- 截止时间接触框 -->
      <van-field
        class="cell6"
        v-model="timeCode2"
        type="text"
        label="出发截止时间"
        placeholder="选择截止时间"
        :error-message="errorMessage4.timeCodeInput"
        @click="showPopup2"
        required
      />

      <van-popup v-model="show4" position="bottom">
        <van-datetime-picker
          v-model="currentDate2"
          type="datetime"
          :min-date="minDate2"
          :max-date="maxDate2"
          @confirm="setTime2"
          @cancel="showPopup2"
        />
      </van-popup>

      <van-field
        class="cell7"
        v-model="weight"
        type="text"
        label="最大可携带量"
        placeholder="填写千克数 例如：50"
        required
      />

      <van-button type="primary" size="normal" @click="summitRoute" class="summitRoute">提交信息</van-button>
    </van-cell-group>
  </div>
</template>

<script>
import Arealist from "../../../assets/area";
import Arealist2 from "../../../assets/area";
import axios from "axios";

export default {
  name: "routeLink",
  data() {
    return {
      areaList: Arealist,
      areaValue: 110101,
      areaCode: "",
      province: "",
      city: "",
      district: "",
      areaStr: "",
      errorMessage: {
        areaCodeInput: "",
        areaStrInput: ""
      },
      mapShow: false,

      areaList2: Arealist2,
      areaValue2: 110101,
      areaCode2: "",
      province2: "",
      city2: "",
      district2: "",
      areaStr2: "",
      errorMessage2: {
        areaCodeInput: "",
        areaStrInput: ""
      },
      mapShow2: false,

      timeCode: "",
      show3: false,
      minDate: new Date(),
      maxDate: new Date(2020, 12, 30),
      currentDate: new Date(),
      errorMessage3: {
        timeCodeInput: ""
      },

      timeCode2: "",
      show4: false,
      minDate2: new Date(),
      maxDate2: new Date(2020, 12, 30),
      currentDate2: new Date(),
      errorMessage4: {
        timeCodeInput: ""
      },

      weight: ""
    };
  },

  methods: {
    returnDriver() {//返回到司机页面
      this.$router.go(-1);
    },

    showMap() {//用于是否显示弹出框
      this.mapShow = !this.mapShow;
    },

    setMap(data) {//用于到达省市区选择的值渲染到页面
      this.areaValue = data[2].code;
      let area = "";
      for (let i = 0; i <= 2; i++) {
        if (i == 0) {
          if (data[0].name === data[1].name) continue;
        }
        this.province = data[0].name;
        this.city = data[1].name;
        this.district = data[2].name;
        area += data[i].name + "";
      }
      this.areaCode = area;
      (this.mapShow = false), this.checkAreaCode();
    },
    checkAreaCode() {
      if (this.areaCode == "") {
        this.errorMessage.areaCodeInput = "请输入出发地址";
      } else {
        this.errorMessage.areaCodeInput = "";
      }
    },
    checkStrCode() {
      if (this.areaStr == "") {
        this.errorMessage.areaStrInput = "请输入详细地址";
      } else {
        this.errorMessage.areaStrInput = "";
      }
    },

    showMap2() {//用于是否显示弹出框
      this.mapShow2 = !this.mapShow2;
    },

    setMap2(data) {//用于到达省市区选择的值渲染到页面
      this.areaValue2 = data[2].code;
      let area = "";
      for (let i = 0; i <= 2; i++) {
        if (i == 0) {
          if (data[0].name === data[1].name) continue;
        }
        this.province2 = data[0].name;
        this.city2 = data[1].name;
        this.district2 = data[2].name;
        area += data[i].name + "";
      }
      this.areaCode2 = area;
      (this.mapShow2 = false), this.checkAreaCode2();
    },
    checkAreaCode2() {
      if (this.areaCode2 == "") {
        this.errorMessage2.areaCodeInput = "请输入到达地址";
      } else {
        this.errorMessage2.areaCodeInput = "";
      }
    },
    checkStrCode2() {
      if (this.areaStr2 == "") {
        this.errorMessage2.areaStrInput = "请输入详细地址";
      } else {
        this.errorMessage2.areaStrInput = "";
      }
    },

    showPopup() {//用于是否显示弹出框
      if (!this.show3) {
        this.show3 = true;
      } else {
        this.show3 = false;
      }
    },
    //这个函数，肩负重任，要把时间选择器拿到的值传回给输入框，希望得到字符串或者数字，而不是一个Date对象
    setTime(data) {
      let month = data.getMonth() + 1;
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      let day = data.getDate();
      if (day >= 0 && day <= 9) {
        day = "0" + day;
      }
      let hour = data.getHours();
      if (hour >= 0 && hour <= 9) {
        hour = "0" + hour;
      }
      let minute = data.getMinutes();
      if (minute >= 0 && minute <= 9) {
        minute = "0" + minute;
      }
      let endTimeArr =
        data.getFullYear() +
        "-" +
        month +
        "-" +
        day +
        " " +
        hour +
        ":" +
        minute +
        ":00";

      this.timeCode = endTimeArr;
      this.show3 = false,
      this.checkTimeCode();
    },

    checkTimeCode() {
      if (this.timeCode == "") {
        this.errorMessage3.timeCodeInput = "请输入出发时间";
      } else {
        this.errorMessage3.timeCodeInput = "";
      }
    },

    showPopup2() {
      if (!this.show4) {
        this.show4 = true;
      } else {
        this.show4 = false;
      }
    },
    //这个函数，肩负重任，要把时间选择器拿到的值传回给输入框，希望得到字符串或者数字，而不是一个Date对象
    setTime2(data) {
      let month = data.getMonth() + 1;
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      let day = data.getDate();
      if (day >= 0 && day <= 9) {
        day = "0" + day;
      }
      let hour = data.getHours();
      if (hour >= 0 && hour <= 9) {
        hour = "0" + hour;
      }
      let minute = data.getMinutes();
      if (minute >= 0 && minute <= 9) {
        minute = "0" + minute;
      }
      let endTimeArr =
        data.getFullYear() +
        "-" +
        month +
        "-" +
        day +
        " " +
        hour +
        ":" +
        minute +
        ":00";

      this.timeCode2 = endTimeArr;
      (this.show4 = false), this.checkTimeCode2();
    },

    checkTimeCode2() {//用于是否显示弹出框
      if (this.timeCode2 == "") {
        this.errorMessage4.timeCodeInput = "请输入出发时间";
      } else {
        this.errorMessage4.timeCodeInput = "";
      }
    },

    //提交信息的时候，先创建一个对象，放要存的值，再遍历一下消息，查看是否填写完整,之后传值
    summitRoute() {
      let allMessage = {
        province1: this.province,
        city1: this.city,
        district1: this.district,
        village1: this.areaStr,

        province2: this.province2,
        city2: this.city2,
        district2: this.district2,
        village2: this.areaStr2,

        startTime: new Date(this.timeCode).getTime(),
        endTime: new Date(this.timeCode2).getTime(),

        weight: this.weight
      };
      for (let item in allMessage) {
        if (allMessage[item] == "") {
          alert("请将信息填写完整");
          //信息填写不完整不能进行请求
          return;
        }
      }

      axios
        .post("http://47.96.231.75:8080/deliver/driverOrder/addDriverOrder.do", {
        originalArea:
        { uid:1,
          province: allMessage.province1,
          city: allMessage.city1,
          district: allMessage.district1,
          Town: "七侠镇",
          village: "新手村",
          detail: allMessage.village,
          status:6
        },
          //司机目的地址
         consigneeArea:
         { uid:1,
          province: allMessage.province2,
          city: allMessage.city2,
          district: allMessage.district2,
          town: "小镇",
          village: "高手村",
          detail: allMessage.village,
          status:7}
          ,
          //
          driverOrder:{
          uid:1,
          carry: parseInt(allMessage.weight),
          goOff: allMessage.startTime,
          deadline: allMessage.endTime,
          }

        })
        .then(function(response) {
          //接口返回数据告诉司机发布成功
          if (response.body.code === 0) {
            this.$toast('发布成功');
            this.$router.push("/index/driver"); //暂时先这样,应该跳转到一个页面
          }
          console.log(response)
        })
        .catch(function(err) {
          //还没有可以写的
        });
    } //summit在这里停
  } //在method这里停
};
</script>

<style scoped>
.route {
  width: 100%;
  height: 10rem;
  background-color: white;
}
.remind1 {
  position: absolute;
  left: 30%;
  top: .5rem;
  font-size: .35rem;
  color: #07c160;
  font-weight: bold;
}
.cell1,
.cell3,
.cell5,
.cell7 {
  margin: 0 auto;
  width: 80%;
  border-left: 2px #07c160 solid;
  border-bottom: 2px #07c160 solid;
}

.cell2,
.cell4,
.cell6 {
  margin: 0 auto;
  width: 80%;
  border-right: 2px #07c160 solid;
  border-bottom: 2px #07c160 solid;
}

.comebackdriver {
  position: absolute;
  left: 0;
  min-width: 0.7rem;
  border-style: none;
  color: #07c160;
  font-size: 0.5rem;
}
.summitRoute {
  position: absolute;
  right: 10%;
}
</style>
