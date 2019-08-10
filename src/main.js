//main.js是在我们操控的src文件夹中，就是最主要的、总页面的js

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
Vue.config.productionTip = false
//引入vant组件


//轻提示
import { Toast } from 'vant';
Vue.use(Toast);
//按钮
import { Button } from 'vant'
Vue.use(Button)
//选择器
import { Picker } from 'vant';
Vue.use(Picker);
//弹出层
import { Popup } from 'vant';
Vue.use(Popup);
//输入框
import { Field } from 'vant';
Vue.use(Field);
//时间选择器
import { DatetimePicker } from 'vant';
Vue.use(DatetimePicker);
//列表
import { List } from 'vant';
Vue.use(List);
//省市区选择
import { Area } from 'vant';
Vue.use(Area);
//导航栏
import { NavBar } from 'vant';
Vue.use(NavBar);
//单元格
import { Cell, CellGroup } from 'vant';
Vue.use(Cell).use(CellGroup);





/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render:function(createElement){
    return createElement(App)
  },
  template: '<App/>'
})
