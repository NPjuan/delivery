

<!--<template>-->
  <!--<div class="RL_outdiv">-->
    <!--&lt;!&ndash; 内层div(登录注册) &ndash;&gt;-->
    <!--<div class="RL_indiv">-->
      <!--<transition>-->
        <!--<router-view>-->
        <!--</router-view>-->
      <!--</transition>-->
      <!--&lt;!&ndash; 登录注册选择 &ndash;&gt;-->
      <!--&lt;!&ndash; 身份选择 &ndash;&gt;-->
      <!--&lt;!&ndash; 注册 &ndash;&gt;-->
      <!--&lt;!&ndash; 个人信息页面(注册成功) &ndash;&gt;-->
      <!--&lt;!&ndash; 个人信息填写 &ndash;&gt;-->
      <!--&lt;!&ndash; 司机选择 &ndash;&gt;-->
    <!--</div>-->
  <!--</div>-->
<!--</template>-->
  <!--<template id="page1">-->
    <!--<div class="hei100">-->
      <!--<div class="van-doc-nav-bar van-nav-bar van-hairline&#45;&#45;bottom" style="z-index: 1;">-->
        <!--<div class="van-nav-bar__left">-->
          <!--<i @click="$router.back(-1)" class="van-icon van-icon-arrow-left van-nav-bar__arrow">-->
          <!--</i>-->


        <!--</div>-->
        <!--<div class="van-nav-bar__title van-ellipsis">选择</div>-->
        <!--<div class="van-nav-bar__right"></div>-->
      <!--</div>-->


      <!--<section style="text-align:center;">-->

        <!--<router-link class="van-button van-button&#45;&#45;primary van-button&#45;&#45;normal btn_pos" to="/login" tag="button"-->
                     <!--style="width: 50%;margin-bottom: 50px;margin-top: 50%">-->
          <!--<span class="van-button__text">登录</span>-->
        <!--</router-link>-->

      <!--</section>-->


      <!--<section style="text-align:center">-->
        <!--<router-link to="/idselect" tag='span' class="van-button van-button&#45;&#45;primary van-button&#45;&#45;normal btn_pos"-->
                     <!--style="width: 50%;margin-bottom: 50px">-->
          <!--<span class="van-button__text">注册</span>-->
        <!--</router-link>-->


      <!--</section>-->
    <!--</div>-->
  <!--</template>-->
  <!--&lt;!&ndash; //身份选择 &ndash;&gt;-->
  <!--<template id="page2">-->
    <!--<div class="hei100">-->
      <!--<div class="van-doc-nav-bar van-nav-bar van-hairline&#45;&#45;bottom" style="z-index: 1;">-->
        <!--<div class="van-nav-bar__left"><i @click="$router.back(-1)"-->
                                          <!--class="van-icon van-icon-arrow-left van-nav-bar__arrow">-->
        <!--</i>-->
        <!--</div>-->
        <!--<div class="van-nav-bar__title van-ellipsis">注册选择</div>-->
        <!--<div class="van-nav-bar__right"></div>-->
      <!--</div>-->


      <!--<section style="text-align:center;">-->

        <!--<router-link to="/register" tag='button'-->
                     <!--class="van-button van-button&#45;&#45;primary van-button&#45;&#45;normal btn_pos m_status"-->
                     <!--style="width: 50%;margin-bottom: 50px;margin-top: 50%">-->
          <!--<span class="van-button__text">用户</span>-->
        <!--</router-link>-->

      <!--</section>-->

      <!--<section style="text-align:center">-->



        <!--<router-link class="van-button van-button&#45;&#45;primary van-button&#45;&#45;normal btn_pos m_status" to="/register"-->
                     <!--tag='button' style="width: 50%;margin-bottom: 50px">-->

          <!--<span class="van-button__text">司机</span>-->
        <!--</router-link>-->


      <!--</section>-->

      <!--<section style="text-align:center">-->

        <!--<router-link to="/register" tag='button'-->
                     <!--class="van-button van-button&#45;&#45;primary van-button&#45;&#45;normal btn_pos m_status"-->
                     <!--style="width: 50%;margin-bottom: 50px">-->
          <!--<span class="van-button__text">管理员</span>-->
        <!--</router-link>-->

      <!--</section>-->




    <!--</div>-->

  <!--</template>-->
  <!--&lt;!&ndash; 手机号注册 &ndash;&gt;-->
  <!--<template id="page3">-->

    <!--<div class="hei100">-->
      <!--<div class="van-doc-nav-bar van-nav-bar van-hairline&#45;&#45;bottom" style="z-index: 1;">-->
        <!--<div class="van-nav-bar__left">-->
          <!--<i @click="$router.back(-1)" class="van-icon van-icon-arrow-left van-nav-bar__arrow">-->
          <!--</i>-->
        <!--</div>-->
        <!--<div class="van-nav-bar__title van-ellipsis">注册</div>-->
        <!--<div class="van-nav-bar__right"></div>-->
      <!--</div>-->
      <!--<section class="van-doc-demo-section demo-field test111">-->

        <!--<section class="van-doc-demo-block">-->
          <!--<h2 class="van-doc-demo-block__title">手机注册</h2>-->
          <!--<div class="van-cell-group van-hairline&#45;&#45;top-bottom">-->
            <!--<div class="van-cell van-field">-->
              <!--<div class="van-cell__value van-cell__value&#45;&#45;alone">-->
                <!--<div class="van-field__body">-->
                  <!--<input type="text" placeholder="请输入手机号" class="van-field__control phone"-->
                         <!--name="phone">-->

                <!--</div>-->
                <!--<div class="van-field__error-message tip"></div>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</section>-->


        <!--<div class="test_drag ver_m10 ">-->
          <!--<div class="test_bg"></div>-->
          <!--<div class="test_text">请拖动滑块验证</div>-->
          <!--<div class="test_btn">>></div>-->
        <!--</div>-->

        <!--<section class="van-doc-demo-block showoff">-->
          <!--&lt;!&ndash; <h2 class="van-doc-demo-block__title">插入按钮</h2> &ndash;&gt;-->
          <!--<div class="van-cell-group van-hairline&#45;&#45;top-bottom">-->
            <!--<div class="van-cell van-cell&#45;&#45;center van-field">-->
              <!--&lt;!&ndash; <div class="van-cell__title van-field__label"> &ndash;&gt;-->
              <!--&lt;!&ndash; <span>短信验证码</span> &ndash;&gt;-->
              <!--&lt;!&ndash; </div> &ndash;&gt;-->
              <!--<div class="van-cell__value">-->
                <!--<div class="van-field__body">-->
                  <!--<input type="text" placeholder="请输入短信验证码" name="code" class="van-field__control">-->
                  <!--<div class="van-field__button">-->
                    <!--<button class="van-button van-button&#45;&#45;primary van-button&#45;&#45;small sent">-->
                                            <!--<span class="van-button__text">-->
                                                <!--发送验证码-->
                                            <!--</span>-->
                    <!--</button>-->
                  <!--</div>-->
                <!--</div>-->
                <!--<div class="van-field__error-message tip"></div>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</section>-->


        <!--<section class="van-doc-demo-block showoff">-->
          <!--<h2 class="van-doc-demo-block__title">密码</h2>-->
          <!--<div class="van-cell-group van-hairline&#45;&#45;top-bottom">-->
            <!--<div class="van-cell van-field">-->
              <!--<div class="van-cell__value van-cell__value&#45;&#45;alone">-->
                <!--<div class="van-field__body">-->
                  <!--<input type="password" placeholder="请输入密码" class="van-field__control"-->
                         <!--name="password">-->
                <!--</div>-->
                <!--<div class="van-field__error-message tipp"></div>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</section>-->


        <!--<section class="van-doc-demo-block showoff">-->
          <!--<div class="van-cell-group van-hairline&#45;&#45;top-bottom">-->
            <!--<div class="van-cell van-field">-->
              <!--<div class="van-cell__value van-cell__value&#45;&#45;alone">-->
                <!--<div class="van-field__body">-->
                  <!--<input type="password" placeholder="请再次确认密码" name="password"-->
                         <!--class="van-field__control">-->
                <!--</div>-->
                <!--<div class="van-field__error-message tipp"></div>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</section>-->

        <!--<section style="text-align:center">-->

          <!--<router-link to="/registersuccess" style="width: 100%;"-->
                       <!--class="van-button van-button&#45;&#45;primary van-button&#45;&#45;normal btn_pos btn_sent">-->
            <!--<span class="van-button__text">注册</span>-->
          <!--</router-link>-->

        <!--</section>-->
      <!--</section>-->
    <!--</div>-->

  <!--</template>-->
  <!--&lt;!&ndash; 注册成功页面 &ndash;&gt;-->
  <!--<template id="page4">-->
    <!--<div class="hei100">-->
      <!--<div class="van-doc-nav-bar van-nav-bar van-hairline&#45;&#45;bottom" style="z-index: 1;">-->
        <!--<div class="van-nav-bar__left">-->
          <!--<i @click="$router.back(-1)" class="van-icon van-icon-arrow-left van-nav-bar__arrow">-->
          <!--</i>-->


        <!--</div>-->
        <!--<div class="van-nav-bar__title van-ellipsis">注册成功</div>-->
        <!--<div class="van-nav-bar__right"></div>-->
      <!--</div>-->
      <!--<section class="van-doc-demo-section demo-field" style="text-align:center">-->
        <!--<div style="text-align: center;margin-top: 45%;background-color: white;padding: 20px 0">-->

          <!--<h2 style="text-align: center">注册成功</h2>-->


          <!--<h4 style="text-align: center">你的个人id是:</h4>-->
          <!--<h4 class="user_id " style="text-align: center;color: green;font-weight: bold"></h4>-->

          <!--<h5 style="text-align: center">个人id是用户的唯一身份凭证,可用于今后的登录</h5>-->


        <!--</div>-->

        <!--<router-link to="/pcmsg" class="van-button van-button&#45;&#45;primary van-button&#45;&#45;normal btn_pos">-->
          <!--<span class="van-button__text">完善个人信息</span>-->
        <!--</router-link>-->



      <!--</section>-->
    <!--</div>-->
  <!--</template>-->
  <!--&lt;!&ndash; 个人信息填写页面 &ndash;&gt;-->
  <!--<template id="page5">-->
    <!--<div class="hei100">-->
      <!--<div class="van-doc-nav-bar van-nav-bar van-hairline&#45;&#45;bottom" style="z-index: 1;">-->
        <!--<div class="van-nav-bar__left"><i @click="$router.back(-1)"-->
                                          <!--class="van-icon van-icon-arrow-left van-nav-bar__arrow">-->
        <!--</i>-->
        <!--</div>-->
        <!--<div class="van-nav-bar__title van-ellipsis">个人信息</div>-->
        <!--<div class="van-nav-bar__right"></div>-->
      <!--</div>-->
      <!--<section class="van-doc-demo-section demo-field">-->




        <!--<section class="van-doc-demo-block" style="text-align: center">-->
          <!--<h2 class="van-doc-demo-block__title">头像</h2>-->
          <!--<div class="van-uploader">-->
            <!--<div class="van-uploader__wrapper">-->
              <!--<div class="van-uploader__upload"><i-->
                <!--class="van-icon van-icon-plus van-uploader__upload-icon">-->
              <!--</i>-->
                <!--<input multiple="multiple" type="file" accept="image/*" class="van-uploader__input"-->
                       <!--name="msg_pic">-->
                <!--<img src="" name="img" width="100%">-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</section>-->




        <!--<div class="van-cell-group van-hairline&#45;&#45;top-bottom">-->
          <!--<div class="van-cell van-cell&#45;&#45;required van-field">-->
            <!--<div class="van-cell__title van-field__label"><span>用户名</span></div>-->
            <!--<div class="van-cell__value">-->
              <!--<div class="van-field__body"><input type="text" placeholder="请输入用户名"-->
                                                  <!--class="van-field__control" name="msg_user">-->
                <!--<div class="van-field__right-icon"><i class="van-icon van-icon-question-o">-->
                <!--</i>-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->





          <!--<div class="van-cell van-cell&#45;&#45;required van-field sty11">-->
            <!--<div class="van-cell__title van-field__label"><span>地域</span></div>-->
            <!--<div class="van-cell__value">-->
              <!--<div class="van-field__body"><input type="password" placeholder="请输入省市区"-->
                                                  <!--class="van-field__control" name="msg_password"></div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->


        <!--<div class="van-cell van-cell&#45;&#45;required van-field sty11 administratoroff">-->
          <!--<div class="van-cell__title van-field__label">-->
            <!--<span>出生日期</span>-->
          <!--</div>-->
          <!--<div class="van-cell__value">-->
            <!--<div class="van-field__body">-->

              <!--<div class="van-field__control select_2 form-control " aria-describedby="sizing-addon1">-->

              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->

        <!--<div class="van-cell van-cell&#45;&#45;required van-field administratoroff">-->
          <!--<div class="van-cell__title van-field__label"><span>身份证号码</span></div>-->
          <!--<div class="van-cell__value">-->
            <!--<div class="van-field__body">-->
              <!--<input type="text" placeholder="请输入身份证号" class="van-field__control" name="msg_iid">-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->


        <!--<section class="van-doc-demo-block administratoroff" style="text-align: center">-->
          <!--<h2 class="van-doc-demo-block__title van-cell&#45;&#45;required">上传手持身份证照片</h2>-->
          <!--<div class="van-uploader">-->
            <!--<div class="van-uploader__wrapper">-->
              <!--<div class="van-uploader__upload" style="width: 136px">-->
                <!--<i class="van-icon van-icon-plus van-uploader__upload-icon">-->
                <!--</i>-->
                <!--<input multiple="multiple" type="file" accept="image/*" class="van-uploader__input"-->
                       <!--name="msg_pic">-->
                <!--<img src="" name="img" width="100%">-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</section>-->


        <!--<div class="van-cell van-cell&#45;&#45;required van-field administratoron">-->
          <!--<div class="van-cell__title van-field__label"><span>管理员证明</span></div>-->
          <!--<div class="van-cell__value">-->
            <!--<div class="van-field__body"><input type="text" placeholder="请填写证明" class="van-field__control"-->
                                                <!--name="msg_user">-->
              <!--<div class="van-field__right-icon"><i class="van-icon van-icon-question-o">-->
              <!--</i>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->

        <!--<section style="text-align:center">-->
          <!--<router-link to="/driverselect" tag="button" style="width: 100%"-->
                       <!--class="van-button van-button&#45;&#45;primary van-button&#45;&#45;normal btn_pos">-->
            <!--<span class="van-button__text">保存</span>-->
          <!--</router-link>-->
        <!--</section>-->


      <!--</section>-->


    <!--</div>-->
  <!--</template>-->
  <!--&lt;!&ndash; //司机选择界面 &ndash;&gt;-->
  <!--<template id="page6">-->
    <!--<div class="hei100">-->


      <!--<div class="van-doc-nav-bar van-nav-bar van-hairline&#45;&#45;bottom" style="z-index: 1;">-->
        <!--<div class="van-nav-bar__left">-->
          <!--<i @click="$router.back(-1)" class="van-icon van-icon-arrow-left van-nav-bar__arrow">-->
          <!--</i>-->
        <!--</div>-->
        <!--<div class="van-nav-bar__title van-ellipsis">司机信息补充</div>-->
        <!--<div class="van-nav-bar__right"></div>-->
      <!--</div>-->


      <!--<div style="text-align: center">-->

        <!--<button class="van-button van-button&#45;&#45;primary van-button&#45;&#45;normal cartype">-->
          <!--<span class="van-button__text">私家车</span>-->
        <!--</button>-->

        <!--<button class="van-button van-button&#45;&#45;primary van-button&#45;&#45;normal cartype">-->
          <!--<span class="van-button__text">货运车</span>-->
        <!--</button>-->


      <!--</div>-->




      <!--<div>-->

        <!--&lt;!&ndash; 汽车行驶路线 &ndash;&gt;-->
        <!--&lt;!&ndash; // &ndash;&gt;-->
        <!--&lt;!&ndash; // &ndash;&gt;-->
        <!--&lt;!&ndash; // &ndash;&gt;-->
        <!--<div class="van-cell-group van-hairline&#45;&#45;top-bottom description">-->
          <!--<h2 class="van-doc-demo-block__title">汽车行驶路线描述</h2>-->
          <!--<div class="van-cell van-field">-->
            <!--<div class="van-cell__value">-->
              <!--<div class="van-field__body"><textarea placeholder="请输入留言" rows="1"-->
                                                     <!--class="van-field__control" style="height: 96px;" name="description"></textarea>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->




        <!--<section class="van-doc-demo-block" style="text-align: center">-->
          <!--<h2 class="van-doc-demo-block__title">上传驾驶证照片</h2>-->
          <!--<div class="van-uploader">-->
            <!--<div class="van-uploader__wrapper">-->
              <!--<div class="van-uploader__upload" style="width: 136px ;margin: 0px"><i-->
                <!--class="van-icon van-icon-plus van-uploader__upload-icon">-->
              <!--</i>-->
                <!--<input multiple="multiple" type="file" accept="image/*" class="van-uploader__input"-->
                       <!--name="msg_pic">-->
                <!--<img src="" name="img" width="100%">-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</section>-->


        <!--<section class="van-doc-demo-block" style="text-align: center;margin-bottom: 30px;">-->
          <!--<h2 class="van-doc-demo-block__title">上传汽车照片</h2>-->
          <!--<div class="van-uploader">-->
            <!--<div class="van-uploader__wrapper">-->
              <!--<div class="van-uploader__upload" style="width: 136px;margin: 0px"><i-->
                <!--class="van-icon van-icon-plus van-uploader__upload-icon">-->
              <!--</i>-->
                <!--<input multiple="multiple" type="file" accept="image/*" class="van-uploader__input"-->
                       <!--name="msg_pic">-->
                <!--<img src="" name="img" width="100%">-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</section>-->

        <!--<section style="text-align:center">-->
          <!--<router-link to="/loginselect" tag="button"-->
                       <!--class="van-button van-button&#45;&#45;primary van-button&#45;&#45;normal btn_pos" style="width: 100%">-->
            <!--<span class="van-button__text">保存</span>-->
          <!--</router-link>-->
        <!--</section>-->

      <!--</div>-->

    <!--</div>-->

  <!--</template>-->
  <!--&lt;!&ndash;登陆界面&ndash;&gt;-->
  <!--<template id="page7">-->
    <!--<div class="hei100">-->
      <!--<div class="van-doc-nav-bar van-nav-bar van-hairline&#45;&#45;bottom" style="z-index: 1;">-->
        <!--<div class="van-nav-bar__left">-->
          <!--<i @click="$router.back(-1)" class="van-icon van-icon-arrow-left van-nav-bar__arrow">-->
          <!--</i>-->
        <!--</div>-->
        <!--<div class="van-nav-bar__title van-ellipsis">个人登录</div>-->
        <!--<div class="van-nav-bar__right"></div>-->
      <!--</div>-->


      <!--<section class="van-doc-demo-block">-->
        <!--<h2 class="van-doc-demo-block__title">自定义类型</h2>-->
        <!--<div class="van-cell-group van-hairline&#45;&#45;top-bottom">-->
          <!--<div class="van-cell van-cell&#45;&#45;required van-field">-->
            <!--<div class="van-cell__title van-field__label"><span>用户名</span></div>-->
            <!--<div class="van-cell__value">-->
              <!--<div class="van-field__body"><input type="text" placeholder="请输入用户名"-->
                                                  <!--class="van-field__control">-->
                <!--<div class="van-field__right-icon"><i class="van-icon van-icon-question-o">-->
                  <!--&lt;!&ndash;&ndash;&gt;</i></div>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="van-cell van-cell&#45;&#45;required van-field">-->
            <!--<div class="van-cell__title van-field__label"><span>密码</span></div>-->
            <!--<div class="van-cell__value">-->
              <!--<div class="van-field__body"><input type="password" placeholder="请输入密码"-->
                                                  <!--class="van-field__control"></div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</section>-->

      <!--<button style="width: 100%" class="van-button van-button&#45;&#45;primary van-button&#45;&#45;normal btn_pos">-->
        <!--<span class="van-button__text">登录</span>-->
      <!--</button>-->

    <!--</div>-->
  <!--</template>-->
  <!--&lt;!&ndash;登陆界面&ndash;&gt;-->

<!--<script>-->
  <!--// import "../../assets/css/bootstrap.min.css";-->
  <!--// import "../../assets/css/login.css";-->
  <!--// import "../../assets/css/mobileSelect.css";-->
  <!--// import "../../assets/css/usully.css";-->
  <!--// import "../../assets/css/vueup.css";-->
  <!--// import "../../assets/css/vue.css";-->
  <!--//登录-->
  <!--import {register_judge, user_msg, user_id, user_code, user_r_msg}from '../../assets/js/pre'-->
  <!--import router from '../../router'-->
  <!--import Router from 'vue-router'-->
  <!--var login = {-->
    <!--template: "#page7",-->
    <!--mounted: function () {-->
      <!--var head = document.getElementsByTagName('head')[0];-->
      <!--var script = document.createElement('script');-->
      <!--script.src = "./js/page7.js";-->
      <!--head.appendChild(script);-->
    <!--}-->
  <!--}-->
  <!--//登录注册选择-->
  <!--var loginselect = {-->
    <!--template: "#page1",-->
    <!--mounted: function () {-->
      <!--var head = document.getElementsByTagName('head')[0];-->
      <!--var script = document.createElement('script');-->
      <!--script.src = "./js/page1.js";-->
      <!--head.appendChild(script);-->
    <!--}-->

  <!--}-->
  <!--//身份选择-->
  <!--var idselect ={-->
    <!--template: "#page2",-->

    <!--mounted: function () {-->
      <!--var head = document.getElementsByTagName('head')[0];-->
      <!--var script = document.createElement('script');-->
      <!--script.src = "./js/page2.js";-->
      <!--head.appendChild(script);-->
    <!--}-->

  <!--}-->
  <!--//手机号注册界面-->
  <!--var register = {-->
    <!--template: "#page3",-->

    <!--mounted: function () {-->
      <!--var head = document.getElementsByTagName('head')[0];-->
      <!--var script = document.createElement('script');-->
      <!--script.src = "./js/page3.js";-->
      <!--head.appendChild(script);-->
    <!--}-->

  <!--}-->
  <!--//注册成功界面-->
  <!--var registersuccess = {-->
    <!--template: "#page4",-->

    <!--mounted: function () {-->
      <!--var head = document.getElementsByTagName('head')[0];-->
      <!--var script = document.createElement('script');-->
      <!--script.src = "./js/page4.js";-->
      <!--head.appendChild(script);-->
    <!--}-->

  <!--}-->
  <!--//个人信息填写界面-->
  <!--var pcmsg = {-->
    <!--template: "#page5",-->

    <!--mounted: function () {-->
      <!--var head = document.getElementsByTagName('head')[0];-->
      <!--var script = document.createElement('script');-->
      <!--script.src = "./js/page5.js";-->
      <!--head.appendChild(script);-->


      <!--let adoff = document.getElementsByClassName("administratoroff");-->
      <!--let adon = document.getElementsByClassName("administratoron");-->
      <!--if (user_r_msg.status == "管理员") {-->

        <!--adoff[0].style.display = "none";-->
        <!--adoff[1].style.display = "none";-->
        <!--adoff[2].style.display = "none";-->
        <!--adon[0].style.display = "block";-->


      <!--}-->


    <!--}-->

  <!--}-->
  <!--//司机选择界面-->
  <!--var driverselect = {-->
    <!--template: "#page6",-->
    <!--mounted: function () {-->
      <!--var head = document.getElementsByTagName('head')[0];-->
      <!--var script = document.createElement('script');-->
      <!--script.src = "./js/page6.js";-->
      <!--head.appendChild(script);-->
    <!--}-->
  <!--}-->
  <!--// 路由-->
  <!--const routerObj = new VueRouter({-->
    <!--routes: [-->
      <!--//默认开启-->
      <!--{-->
        <!--path: '/',-->
        <!--redirect: '/loginselect'-->
      <!--},-->
      <!--//登录注册界面选择-->
      <!--{-->
        <!--path: '/loginselect',-->
        <!--component: loginselect,-->

        <!--beforeEnter(to, from, next) {-->
          <!--if (from.path == "/") {-->
            <!--next();-->
          <!--}-->
          <!--// ...-->
          <!--if (from.path == "/driverselect") {-->

            <!--ajax(user_msg, "/userInfo/userInfoRegister.do", "registerfinish");-->
            <!--next();-->
          <!--}-->
        <!--}-->

      <!--},-->

      <!--//身份选择-->
      <!--{-->
        <!--path: "/idselect",-->
        <!--component: idselect-->
      <!--},-->
      <!--//手机号注册界面-->
      <!--{-->
        <!--path: "/register",-->
        <!--component: register,-->

      <!--},-->
      <!--//注册成功界面-->
      <!--{-->
        <!--path: "/registersuccess",-->
        <!--component: registersuccess,-->
        <!--beforeEnter: function (to, from, next) {-->

          <!--let up = document.getElementsByClassName("btn_sent")[0];-->
          <!--let phone = document.getElementsByName("phone")[0];-->
          <!--let pw = document.getElementsByName("password")[0];-->
          <!--let ju = register_judge.phone && register_judge.password1 &&-->
            <!--register_judge.password2 && register_judge.code &&-->
            <!--register_judge;-->

          <!--if (11) {-->

            <!--let data = {-->
              <!--//用户注册手机号-->
              <!--phone: phone.value,-->
              <!--//用户密码-->
              <!--password: pw.value,-->
              <!--//用户身份-->
              <!--registerRole: register_judge.identity-->
            <!--}-->

            <!--ajax(data, "/user/register.do", "registerAfter");-->
            <!--next();-->

          <!--} else {-->
            <!--if (!register_judge.phone) {-->
              <!--let tip = document.getElementsByClassName("tip")[0];-->
              <!--tip.innerHTML = "请输入注册手机号";-->
              <!--tip.style.color = "red";-->
            <!--}-->


            <!--if (!register_judge.code) {-->
              <!--let tip = document.getElementsByClassName("tip")[1];-->
              <!--tip.innerHTML = "请输入正确验证码";-->
              <!--tip.style.color = "red";-->

            <!--}-->

            <!--if (!register_judge.password1) {-->
              <!--let tip = document.getElementsByClassName("tipp")[0];-->
              <!--tip.innerHTML = "请输入密码";-->
              <!--tip.style.color = "red";-->
            <!--}-->

            <!--if (!register_judge.password2) {-->
              <!--let tip = document.getElementsByClassName("tipp")[1];-->
              <!--tip.innerHTML = "密码请填写一致";-->
              <!--tip.style.color = "red";-->

            <!--}-->






          <!--}-->

        <!--}-->
      <!--},-->
      <!--//个人信息填写界面-->
      <!--{-->
        <!--path: "/pcmsg",-->
        <!--component: pcmsg,-->


      <!--},-->
      <!--//司机信息界面-->
      <!--{-->
        <!--path: "/driverselect",-->
        <!--component: driverselect,-->

        <!--beforeEnter: function (to, from, next) {-->
          <!--let name = document.getElementsByName("msg_user")[0];-->
          <!--// let msg_password = document.getElementsByName("msg_password")[0];-->
          <!--let id = document.getElementsByName("msg_iid")[0];-->
          <!--let birthdayv = document.getElementsByClassName("select_2")[0];-->
          <!--// let description = document.getElementsByName("description")[0];-->
          <!--var ju = name.value && id.value && birthdayv.textContent && user_msg-->
            <!--.identityCardPicture;-->

          <!--if (11) {-->
            <!--user_msg.userInfo.name = name.value;-->
            <!--user_msg.userInfo.identityCard = id.value;-->
            <!--user_msg.userInfo.birthday = birthdayv.textContent;-->
            <!--// user_msg.runningRoute = description.value;-->
            <!--next();-->

          <!--} else {-->
            <!--alert("请核实信息!");-->
          <!--}-->
        <!--}-->





      <!--},-->

      <!--{-->

        <!--path: "/login",-->
        <!--component: login-->
      <!--}-->
    <!--],-->
    <!--mode: "history"-->
  <!--});-->
    <!--export default {-->
        <!--name: ".RL_outdiv",-->
      <!--components: {-->
        <!--// 登陆-->
        <!--login,-->
        <!--// 登陆注册选择-->
        <!--loginselect,-->
        <!--// 身份选择-->
        <!--idselect,-->
        <!--// 手机号注册页面-->
        <!--register,-->
        <!--// 注册成功界面-->
        <!--registersuccess,-->
        <!--// 个人信息填写界面-->
        <!--pcmsg,-->
        <!--// 司机选择界面-->
        <!--driverselect,-->
      <!--},-->
      <!--data() {-->
          <!--return {-->
            <!--register_judge,-->
            <!--user_msg,-->
            <!--user_id,-->
            <!--user_code,-->
            <!--user_r_msg-->
          <!--}-->
      <!--},-->
      <!--methods: {-->
      <!--},-->
      <!--router: routerObj-->
    <!--}-->
<!--</script>-->

<!--<style scoped>-->
<!--</style>-->
