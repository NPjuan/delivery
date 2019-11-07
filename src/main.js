// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
/*********************************/
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store'
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
  ActionSheet,
} from 'vant'

// pjy 的个人组件
import normalHeader from './components/userIndex/NormalHeader'
Vue.component("normalHeader",normalHeader)


import VueBus from './vue-bus'

Vue.use(VueAxios, axios)
Vue.use(VueBus) // 开启事件车

import './css/vue.css'
import './css/vueup.css'

Vue.use(AddressEdit).use(Area).use(Button).use(Popup).use(Field).use(Cell).use(CellGroup).use(Dialog).use(NavBar).use(List)
Vue.use(DatetimePicker).use(Uploader).use(Switch).use(Picker).use(Circle).use(Loading).use(Image).use(ActionSheet)

// 高德地图
import VueAMap from 'vue-amap';
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: '8f6a4a30720fcafa2780d7ac218e21d9',
  plugin: ['Autocomplete', 'PlaceSearch', 'Scale', 'OverView', 'ToolBar', 'MapType', 'PolyEditor', 'AMap.CircleEditor', 'Driving'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4',
  uiVersion: '1.0.11' // 版本号
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
var vm = new Vue({
  el: '#app',
  store,
  router,
  components: {
    App
  },
  template: '<App/>',


})

router.beforeEach((to, from, next) => {

  //获取用户登录成功后储存的登录标志
  let getFlag = localStorage.getItem("Flag");
  let getData = JSON.parse(localStorage.getItem('userData'));

  //如果登录标志存在且为isLogin，即用户已登录
  if (getFlag === "isLogin") {
    //设置vuex登录状态为已登录
    store.state.isLogin = true;
    store.state.userData = getData;
    next();
    //如果登录标志不存在，即未登录
  } else {
    //用户想进入需要登录的页面，则定向回登录界面
    if (to.meta.isLogin) {
      next({
        path: '/login',
      })
      //提示
      this.$toast.message("请先登录");
      //用户进入无需登录的界面，则跳转继续
    } else {
      next()
    }
  }
});

router.afterEach(route => {
  window.scroll(0, 0);
});



