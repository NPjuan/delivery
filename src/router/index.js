import Vue from 'vue'
import Router from 'vue-router'
// 一级路由
import Index from '../components/Index'
import Friends from '../components/Friends'
import Message from '../components/Message'
import Home from '../components/Home'

// 二级路由 我的
import Login from '../components/home/Login'
import Register from '../components/home/Register'

import HomePage from '../components/HomePage'
import ConsigneeAddress from '../components/ConsigneeAddress'
import ConsignorAddress from '../components/ConsignorAddress'
import FindDriver from '../components/FindDriver'

Vue.use(Router)

export default new Router({
  routes: [
    // 主页
    {path: "/", name: "indexLink", component: Index, redirect: "/homepage", children: [
      // 默认跳转
        {path: "/homepage", meta: { index: 0 }, name: "homepageLink", component: HomePage},
        // 填写收货人地址
        {path: "/consigneeAddress", meta: {index: 1}, name: "consigneeAddressLink", component: ConsigneeAddress},
        // 填写发货人地址
        {path: "/consignorAddress", meta: {index: 1}, name: "consignorAddressLink", component: ConsignorAddress},
        // 寻找附件司机
        {path: "/findDriver", meta: {index: 1}, name: "findDriverLink", component: FindDriver}
      ]},
    // 订单
    {path: "/friends", name: "friendsLink", component: Friends},
    // 消息
    {path: "/message", name: "messageLink", component: Message},
    // 我的
    {path: "/home", name: "homeLink", component:Home, redirect: "/home/login",  children: [
        // 登录
        {path: "/home/login", name: "loginLink", component: Login},
        // 注册
        {path: "/home/register", name: "registerLink", component: Register},
      ]},
    {path: "*", redirect: "/"}
  ],
  mode:"history"
})
