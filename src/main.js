// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
/*********************************/
import BaiduMap from 'vue-baidu-map'
import axios from 'axios'
import 'vant/lib/index.css';
import { AddressEdit, Toast, Area, Popup, Button, Field, NavBar, Cell, CellGroup, Dialog, DatetimePicker, Uploader, Switch,  List ,Picker} from 'vant'


// yxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// import './css/login.css'
 import './css/vue.css'
import './css/vueup.css'
// yxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

Vue.use(AddressEdit).use(Area).use(Button).use(Popup).use(Field).use(Cell).use(CellGroup).use(Dialog).use(NavBar).use(List)
Vue.use(DatetimePicker).use(Uploader).use(Switch).use(Picker)

Vue.use(BaiduMap, {
  ak: "ANlGUWwHxTnBFsMnbRaTsRfQ6f37SOTo"
})

Vue.prototype.$axios = axios
Vue.prototype.$toast = Toast
Vue.prototype.$dialog = Dialog
// 为 toast 统一设置持续时间
Toast.setDefaultOptions({
  duration:1200
})
export const eventBus = new Vue()
/****************************************/

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',

})
