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

// pjy 的个人组件
import normalHeader from './components/userIndex/NormalHeader'
Vue.component("normalHeader",normalHeader)


import VueBus from './vue-bus'

Vue.use(VueBus) // 开启事件车
// yxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// import './css/login.css'
import './css/vue.css'
import './css/vueup.css'
// yxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

Vue.use(AddressEdit).use(Area).use(Button).use(Popup).use(Field).use(Cell).use(CellGroup).use(Dialog).use(NavBar).use(List)
Vue.use(DatetimePicker).use(Uploader).use(Switch).use(Picker).use(Circle).use(Loading).use(Image)

// Vue.use(BaiduMap, {
//   ak: "ANlGUWwHxTnBFsMnbRaTsRfQ6f37SOTo"
// })
// 高德地图
import VueAMap from 'vue-amap';
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: '8f6a4a30720fcafa2780d7ac218e21d9',
  plugin: ['Autocomplete', 'PlaceSearch', 'Scale', 'OverView', 'ToolBar', 'MapType', 'PolyEditor', 'AMap.CircleEditor'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
});

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
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>',


})
