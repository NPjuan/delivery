<template>
  <div :class="classes">
    <div class="box">
      <p class="head">请确认您的担保人</p>
      <input type="number" placeholder="输入 ID 寻找担保人" @keyup="findGuarantee(id)"  v-model="id">
      <p v-if="search" class="point-container">
        <span class="point point-1"></span>
        <span class="point point-2"></span>
        <span class="point point-3"></span>
      </p>
      <p v-else-if="err" style="text-align: center;margin-bottom: .1rem">
        未查询到该担保人
      </p>
      <p v-else>
      </p>
      <p class="guarantee" v-for="(value, index) in guarantees" :index="index" @touchstart="change(index)" @touchend="choice(index)" :ref="index">
         <span v-if="value.type" class="new-guarantee">
           {{value.name}} &nbsp&nbsp&nbsp {{value.phone}}
        </span>
        <span v-else>
          {{value.name}} &nbsp&nbsp&nbsp {{value.phone}}
        </span>
      </p>
    </div>
  </div>
</template>

<script>
    export default {
      name: "guarantee",
      props:{
        show:{
          type: Boolean,
          default: false
        }
      },
      data(){
        return {
          guarantees:[
            {
              id:"3",
              name: "潘俊渊",
              phone: "13642943515",
              type: false
              // type 用于判断是否为新增加的担保人
            },
            {
              id:"1111111111",
              name: "某个南",
              phone: "1805201314",
              type: false
            }
          ],
          id:"",
          search: false,
          err: false
        }
      },
      methods:{
        // 匹配担保人 id
        findGuarantee(id) {
          // 正则表达式匹配 10 位数字
          let reg = /^\d{10}$/
          if(id.toString().match(reg) == null){
            this.search = false
            return
          }
          for(let i=0,len = this.guarantees.length;i<len;i++){
            if(this.guarantees[i].id == id){
              this.change(i)
              let timer = null
              let self = this
              timer = setTimeout(function () {
                self.$refs[i][0].style.backgroundColor = "white"
                console.log("b")
              },400)
              return
            }
          }
          this.guarantees.unshift({
              id:3333333333,
              name: "兔子",
              phone: "1234564871",
              type: true
            })
          this.search = false
        },
        // 选择改变样式
        change(index) {
          this.$refs[index][0].style.backgroundColor = "#AFEEEE"
        },
        // 选中确认担保人
        choice(index) {
          this.$refs[index][0].style.backgroundColor = "white"
          let self = this
          // let suretyId = Number(this.guarantees[index].id)
          // let shipperId = Number(this.$store.state.userData.user.id)
          // console.log("aaaaaaaaaaaaaaaaaaaaaaa")
          // console.log(this.$store.state.userData.user.id)
          // console.log(suretyId)
          this.$axios.post(this.$store.state.url+"/userOrder/validateSurety.do",{
            shipperId: 3,              //发货人id
            suretyId: 1                //担保人id
          })
            .then(function (response) {
              console.log(response)
              if(!response.data.data.code){
                // 发布订单
                console.log("b")
                self.$emit("changeShow", self.guarantees[index].id)
              }
            })
            .catch(function (error) {
              console.log(error)
            })
          // this.$emit("changeShow", this.guarantees[index].id)
        }
      },
      computed:{
        // 样式确认
        classes() {
          return {
            container: true,
            enter: this.show,
            leave: !this.show,
          }
        }
      }
    }
</script>

<style scoped>
  .container{
    position: fixed;
    top:4rem;
    width: 5rem;
    max-width: 600px;
    min-width: 150px;
    height: auto;
    max-height: 5rem;
    border-radius: 6px;
    transition: .4s all ease;
  }
  .enter{
    left: 1.25rem;
    background-color: white;
    opacity: 1;
    z-index: 200;
  }
  .leave{
    left: -3rem;
    opacity: 0;
    z-index: -5;
  }
  .head{
    font-size: .3rem;
  }
  .box{
    width: 90%;
    margin: .2rem auto;
  }
  input{
    margin-top: .2rem;
    margin-bottom: .2rem;
    width: 100%;
    height: .55rem;
    text-indent: .5rem;
    border: 1px solid #d3d3d3;
    background-color: transparent;
    border-radius: 6px;
    font-size: .28rem;
  }
  .guarantee{
    height: .5rem;
    line-height: .5rem;
    font-size: .28rem;
    color: gray;
    transition: .2s all ease;
  }
  .new-guarantee{
    position: relative;
    height: .5rem;
    line-height: .5rem;
    font-size: .28rem;
    color: gray;
  }
  .new-guarantee::after{
    position: absolute;
    display: inline-block;
    content: "new";
    color: skyblue;
    top:-.1rem;
    right: -1rem;
  }
  .point-container{
    margin-top: .1rem;
    height: .4rem;
    text-align: center;
  }
  .point{
    display: inline-block;
    margin: 0 .05rem .1rem .05rem;
    width: .15rem;
    height: .15rem;
    background-color: grey;
    border-radius: 50%;
    animation: point-move .6s infinite alternate;
  }
  .point-2{
    animation-delay:.3s;
  }
  .point-3{
    animation-delay:.6s;
  }
  @keyframes point-move{
    from{
      transform: translateY(0);
    }
    to  {
      transform: translateY(-.05rem);
    }
  }
</style>
