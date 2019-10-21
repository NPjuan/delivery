// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
/*********************************/
import BaiduMap from 'vue-baidu-map'
import axios from 'axios'
import 'vant/lib/index.css';
import {
  AddressEdit,
  Toast,
  Area,
  Popup,
  Button,
  Field,
  NavBar,
  Cell,
  CellGroup,
  Dialog,
  DatetimePicker,
  Uploader,
  Switch,
  List,
  Picker,
  Circle,
  Loading,
  Image,
} from 'vant'




import VueBus from './vue-bus'

Vue.use(VueBus) // 开启事件车
// yxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// import './css/login.css'
import './css/vue.css'
import './css/vueup.css'
// import stopExecutionOnTimeout from "./js/stopExecutionOnTimeout.js"
// import jquery from "./js/jquery.min.js"
// import main from "./js/main.js"
// yxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

Vue.use(AddressEdit).use(Area).use(Button).use(Popup).use(Field).use(Cell).use(CellGroup).use(Dialog).use(NavBar).use(List)
Vue.use(DatetimePicker).use(Uploader).use(Switch).use(Picker).use(Circle).use(Loading).use(Image)

Vue.use(BaiduMap, {
  ak: "ANlGUWwHxTnBFsMnbRaTsRfQ6f37SOTo"
})

Vue.prototype.$axios = axios
Vue.prototype.$toast = Toast
Vue.prototype.$dialog = Dialog
// 为 toast 统一设置持续时间
Toast.setDefaultOptions({
  duration: 1200
})
export const eventBus = new Vue()
/****************************************/

Vue.config.productionTip = false

/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>',


})


/**   yxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */
// Vue.component('remote-script', {
//   render: function (createElement) {
//       var self = this;
//       return createElement('script', {
//           attrs: {
//               type: 'text/javascript',
//               src: this.src
//           },
//           on: {
//               load: function (event) {
//                   self.$emit('load', event);
//               },
//               error: function (event) {
//                   self.$emit('error', event);
//               },
//               readystatechange: function (event) {
//                   if (this.readyState == 'complete') {
//                       self.$emit('load', event);
//                   }
//               }
//           }
//       });
//   },
//   props: {
//       src: {
//           type: String,
//           required: true
//       }
//   }
// });

