// 中央事件车
import {get, post} from './request/http'
const install = (Vue) => {
  const Bus = new Vue({
    methods: {
      emit (event, ...args){
        this.$emit(event, ...args)
      },
      on (event, callback){
        this.$on(event, callback)
      },
      off (event, callback){
        this.$off(event, callback)
      }
    }
  })
  // 事件车放入原型链
  Vue.prototype.$bus = Bus
}

export default install // 向外暴露
