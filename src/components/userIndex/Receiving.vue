<template>
<div>
  <div style="height:4rem;background-color: skyblue" @click="test"></div>
</div>
</template>

<script>
  import { log } from './log'
    export default {
      name: "Receiving",
      data() {
        return {
          title: "待收货订单"
        }
      },
      methods:{
        test() {
          /* Promise 其实是一个构造函数， 也就是说，返回值是一个对象
           * 他拥有几个属性，也是他的状态
           * 1. pending:    初始状态，既不是成功，也不是失败状态。
           * 2. fulfilled:  意味着操作成功完成。
           * 3. rejected:   意味着操作失败。
           *
           * Promise.prototype.catch方法是.then(null, rejection)的别名，用于指定发生错误时的回调函数
           * then 方法与catch 方法均会返回一个 Promise 对象（对，即使 return 为某个值，或者 throw error，或者不返回值）
           */
          function fun(resolve, reject){
            let timeOut = Math.random() * 2
            log('set timeout to: ' + timeOut + ' seconds');
            setTimeout(function () {
              if(timeOut < 1){
                console.log('call resolve()...')
                resolve('200 OK',"abc")
              }else{
                console.log('call reject()...')
                reject('timeout in' + timeOut + 'seconds')
              }
            }, 1500)
          }
          // 传递一个函数，并会自动传入两个参数
          let p = new Promise(fun)
          log(p)
          p.then(function (response) {
            console.log(response)
          }, function (error) {
              log('失败')
            })
          log(p)
        }
      }
    }
</script>

<style scoped>

</style>
