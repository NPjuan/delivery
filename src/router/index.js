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
// bz
import driver from '../components/index/driver'
import customer from '../components/index/customer'
// 三级路由
import route from '../components/index/choices/route'
import order from '../components/index/choices/order'
import orderlist from '../components/index/choices/orderlist'
import orderinfo from '../components/index/choices/orderinfo'
import invitation from '../components/index/choices/invitation'
// me
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
        {path: "/findDriver", meta: {index: 1}, name: "findDriverLink", component: FindDriver},
        // 司机 bz
        {path:"/index/driver",name:"driverLink",component:driver,   children:[
            // 发布行程
            {path: "/choices/route", name: "routeLink", component: route},
            // 附近订单
            {path: "/choices/order", name: "orderLink", component: order},
            //附近订单列表
            {path:"/choices/orderlist",name:"listLink",component:orderlist},
            //订单详情页面
            {path:"/choices/orderinfo",name:"infoLink",component:orderinfo},
            //邀我接单
            {path: "/choices/invitation", name: "inviteLink", component: invitation},
          ]},
        {path:"/index/customer",name:"customerLink",component:customer},
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
        {path: "/home/register", name: "registerLink", component: Register}
      ]},
    {path: "*", redirect: "/"}
  ],
  mode:"history"
})
