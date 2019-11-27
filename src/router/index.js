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
import Guarantee from '../components/userIndex/Guarantee'
import Surety from '../components/userIndex/Surety'
import Receiving from '../components/userIndex/Receiving'
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
import setting from "../components/login/setting"
import alterphone from "../components/login/alterPhone"
import newphone from "../components/login/newphone"

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
        {path: "/homepage", meta: { index: 0,index_: 0}, name: "homepageLink", component: HomePage},
        // 填写收货人地址
        { path: "/consigneeAddress", meta: { index: 1 }, name: "consigneeAddressLink", component: ConsigneeAddress },
        // 填写发货人地址
        { path: "/consignorAddress", meta: { index: 1 }, name: "consignorAddressLink", component: ConsignorAddress },
        // 寻找附件司机
        {path: "/findDriver", meta: {index: 1}, name: "findDriverLink", component: FindDriver},
        // 订单详情
        {path: "/userOrderList", meta: {index: 1}, name: "userOrderListLink", component: UserOrderList},
        // 寻找担保人信息
        {path: "/Guarantee", meta: {index: 1}, name: "GuaranteeLink", component: Guarantee},
        // 我是担保人
        {path: "/Surety", meta: {index: 1}, name: "SuretyLink", component: Surety},
        // 待收货订单
        {path: "/Receiving", meta: {index: 1}, name: "ReceivingLink", component: Receiving},
        // 司机 bz
        {
          path: "/index/driver", meta: { index: 1, index_: 0,isLogin: true }, name: "driverLink", component: driver, children: [
            // 发布行程
            { path: "/choices/route", meta: { index: 2 }, name: "routeLink", component: route },
            // 附近订单
            { path: "/choices/order", meta: { index: 2 }, name: "orderLink", component: order },
            //附近订单列表
            { path: "/choices/orderlist", meta: { index: 2 }, name: "listLink", component: orderlist },
            //订单详情页面
            { path: "/choices/orderinfo", meta: { index: 2 }, name: "infoLink", component: orderinfo },
            //担保人页面
            { path: "/choices/guarantee", meta: { index: 2 }, name: "guaranteeLink", component: guarantee },
            //邀我接单
            { path: "/choices/invitation", meta: { index: 2 }, name: "inviteLink", component: invitation },
          ]
        },
        { path: "/index/customer", meta: { index: 1 }, name: "customerLink", component: customer },
      ]
    },
    // 订单
    { path: "/friends", meta: { index: 0 }, name: "friendsLink", component: Friends },
    // 消息
    { path: "/message", meta: { index: 0 }, name: "messageLink", component: Message },


    // yxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    // 登录
    { path: '/login', meta: { index: 1, index_: 1, isLogin: false }, component: login },

    //身份选择
    { path: '/idselect', meta: { index: 1, index_: 2 }, component: idselect, name: "idselectLink" },
    //注册
    { path: '/register', meta: { index: 1, index_: 3 }, component: register },
    //注册成功
    { path: '/registersuccess', meta: { index: 1, index_: 4 }, component: registersuccess, name: "registersuccessLink" },
    //信息完善
    { path: '/pcmsg', meta: { index: 1, index_: 5 }, component: pcmsg },
    //司机信息完善
    { path: '/driverselect', meta: { index: 1, index_: 6 }, component: driverselect },

    //个人信息(登录后)
    { path: '/myInfo', meta: { index: 1, index_: 2 }, component: myInfo },

    //修改密码
    { path: '/password', meta: { index: 1, index_: 2 }, component: password },
    //修改密码
    { path: '/resetpw', meta: { index: 1, index_: 3 }, component: resetpw },

    //设置页面
    { path: '/setting', meta: { index: 1, index_: 3 }, component: setting },
    //修改手机页面
    { path: '/alterphone', meta: { index: 1, index_: 4 }, component: alterphone },
    //手机更换页面
    { path: '/newphone', meta: { index: 1, index_: 5 }, component: newphone },
    
    //聊天页面
    { path: '/chat', meta: { index: 1, index_: 1 ,isLogin: true}, component: Chat },
    // 通用
    { path: "*", redirect: "/" }
  ]
})
