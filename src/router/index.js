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

Vue.use(Router)

export default new Router({
  routes: [
    // 主页
    {path: "/", name: "indexLink", component: Index},
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
