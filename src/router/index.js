import Vue from 'vue'
import Router from 'vue-router'
// 一级路由
import Index from '../components/userIndex/Index'
import Friends from '../components/userIndex/Friends'
import Message from '../components/userIndex/Message'
import Home from '../components/userIndex/Home'

// bz
import driver from '../components/driverIndex/driver'
import customer from '../components/driverIndex/customer'
// 二级路由

// 发布行程
import route from '../components/driverindex/choices/route'
// 附件订单
import order from '../components/driverindex/choices/order'
// 附件订单列表
import orderlist from '../components/driverIndex/choices/orderlist'
// 附件订单详情
import orderinfo from '../components/driverIndex/choices/orderinfo'
// 接收邀请
import invitation from '../components/driverIndex/choices/invitation'
//担保人
import guarantee from '../components/driverIndex/choices/guarantee'
// pjy
import HomePage from '../components/userIndex/HomePage'
import ConsigneeAddress from '../components/userIndex/ConsigneeAddress'
import ConsignorAddress from '../components/userIndex/ConsignorAddress'
import FindDriver from '../components/userIndex/FindDriver'
import UserOrderList from '../components/userIndex/UserOrderList'

//yxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
import loginselect from '../components/login/loginselect'
import idselect from "../components/login/idselect"
import pcmsg from "../components/login/pcmsg"
import driverselect from "../components/login/driverselect"
import register from "../components/login/register"
import registersuccess from "../components/login/registersuccess"
import login from "../components/login/login"
import myInfo from "../components/login/myInfo"
import password from "../components/login/password"
import resetpw from "../components/login/resetpw"

import Chat from "../components/chat/chating"


// const Chat = r => require.ensure([], () => r(require('../components/chat/chating')), 'chat')

//聊天页面

//yxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx



Vue.use(Router)
import Demo from "../components/userIndex/demo"
export default new Router({
  routes: [
    // 主页
    {path: "/", name: "indexLink", component: Index, redirect: "/homepage", children: [
        {path: "/demo", meta: { index: 0, keepAlive: true }, name: "demoLink", component: Demo},
        // 默认跳转
        {path: "/homepage", meta: { index: 0}, name: "homepageLink", component: HomePage},
        // 填写收货人地址
        {path: "/consigneeAddress", meta: {index: 1}, name: "consigneeAddressLink", component: ConsigneeAddress},
        // 填写发货人地址
        {path: "/consignorAddress", meta: {index: 1}, name: "consignorAddressLink", component: ConsignorAddress},
        // 寻找附件司机
        {path: "/findDriver", meta: {index: 1}, name: "findDriverLink", component: FindDriver},
        // 订单详情
        {path: "/userOrderList", meta: {index: 1}, name: "userOrderListLink", component: UserOrderList},
        // 司机 bz
        {path:"/index/driver", meta: {index: 1}, name:"driverLink",component:driver,   children:[
            // 发布行程
            {path: "/choices/route", meta: {index: 2}, name: "routeLink", component: route},
            // 附近订单
            {path: "/choices/order", meta: {index: 2}, name: "orderLink", component: order},
            //附近订单列表
            {path:"/choices/orderlist", meta: {index: 2}, name:"listLink",component:orderlist},
            //订单详情页面
            {path:"/choices/orderinfo", meta: {index: 2}, name:"infoLink",component:orderinfo},
            //担保人页面
            {path:"/choices/guarantee", meta: {index: 2}, name:"guaranteeLink",component:guarantee},
            //邀我接单
            {path: "/choices/invitation", meta: {index: 2}, name: "inviteLink", component: invitation},
          ]},
        {path:"/index/customer", meta: {index: 1}, name:"customerLink",component:customer},
      ]},
    // 订单
    {path: "/friends", meta: { index: 0 }, name: "friendsLink", component: Friends},
    // 消息
    {path: "/message",meta: { index: 0 },  name: "messageLink", component: Message},


    // yxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    // 登录注册
      {path:'/idselect', meta: {index: 1,index_:2}, component: idselect,name:"idselectLink"},
      {path:'/register', meta: {index: 1,index_:3}, component:register},
      {path:'/registersuccess', meta: {index: 1,index_:4}, component:registersuccess,name:"registersuccessLink"},
      {path:'/pcmsg', meta: {index: 1,index_:5}, component:pcmsg},
      {path:'/driverselect', meta: {index: 1,index_:6}, component:driverselect},

      {path:'/login', meta: {index: 1,index_:2},  component:login},

      {path:'/myInfo', meta: {index: 1,index_:3},  component:myInfo},

      {path:'/password', meta: {index: 1,index_:3},  component:password},

      {path:'/resetpw', meta: {index: 1,index_:4},  component:resetpw},

      //聊天页面
      {path:'/chat', meta: {index: 1,index_:2},  component:Chat},
    // 通用
    {path: "*", redirect: "/"}
  ]
})
