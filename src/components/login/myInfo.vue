<template>
  <div class="hei100">
    <div class="out">
      <div class="context">
        <!-- //头像 -->
        <div class="headpc dis_bl">
          <img :src="headPic" alt="头像" width="64px" />
        </div>
        <div class="userInfo dis_bl">
          <div class="f_s_big username">{{username}}</div>
          <div class="otherInfo">
            <div class="dis_bl f_s_te">{{role}}</div>
            <div class="dis_bl f_s_te">id: {{id}}</div>
            <div class="dis_bl userSet"></div>
          </div>
        </div>
      </div>

      <div class="context_C">
          <div></div>
          <div></div>
          <div></div>
      </div>


    </div>
  </div>
</template>



<script>
export default {
  data() {
    return {
      username: "YulRW",
      headPic: "http://47.96.231.75:8080/uploads/headPortraits/default.jpg",
      role: "司机",
      id: "334851"
    };
  },
  methods: {
    ajax(data, url, func) {
      var ajax = new XMLHttpRequest();
      var stringData = JSON.stringify(data);
      ajax.open("post", "http://47.96.231.75:8080/deliver" + url);
      ajax.setRequestHeader("Content-type", "application/json;charset=UTF-8");
      ajax.onreadystatechange = () => {
        if (ajax.readyState == 4 && ajax.status == 200) {
          var json = JSON.parse(ajax.responseText);
          this[func](json);
        }
      };
      ajax.send(stringData);
    }
  },
  mounted() {}
};
</script>


<style scoped>
/* 快捷 */

.dis_bl {
  display: inline-block;
}

.f_s_big {
  font-size: 20px;
  font-weight: bold;
}

.f_s_te {
  font-size: 15px;
  color: #7f7f7f;
}

/* 样式 */
.headpc {
  border-radius: 5px;

  vertical-align: top;
  overflow: hidden;
}

.userInfo {
  border: transparent;
  padding: 5px 10px;
  height: 64px;
}

.username {
  padding: 5px 0px;
  padding-top: 2px;
}

.otherInfo {
  padding: 10px 0px;
}

.out {
  height: 100vh;
  background-color: #ededed;
}
.context {
  height: 70px;
  padding: 20px 30px;
  padding-top: 70px;
  background-color: #ffffff;
  border-bottom: rgb(214, 214, 214) 1px solid;
}

.userSet {
  float: right;

  width: 15px;
  height: 15px;
  background-image: url("../../assets/image/userInfo/右箭头.svg");
  background-position: 50% 50%;
  background-size: 20px;

  vertical-align: sub;
}

.context_C{
  height: 40px;
  background-color: white;
  margin-top: 20px;
  padding: 5px 10px ;

}

/* we */
</style>
