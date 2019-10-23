(function (root) {
  // container
  function container() {
    var list = []
    var index = 0;
    // 驱动
    var fire = function (data) {
      var len = list.length
      for(;index<len;index++){
        list[index].apply(data[0], data[1])
      }
    }

    var self = {
      add: function (func) {
        // 变为真正的数组
         var args = Array.prototype.slice.call(arguments)
        args.forEach(function () {
          // 类型判断，是否函数
          if(toString.call(func) === "[object Function]"){
            list.push(func)
          }
        })
      },
      // 处理自定义参数 上下文对象  resolve()  reject() 语法糖
      fire: function (func) {
        self.fireWith(this, arguments)
      },
      fireWith:function (context, args) {
        var ret = [context, args]
        fire(ret)
      }
    }
    return self
  }
  // 工具函数
  // root.container = container

  function Promise() {
    // resolve === fire  done === add
    var tuples = [
      ["resolve", "done", container(), "resolved"],
      ["reject", "fail", container(), "rejected"],
      ["notify", "progress", container()]
    ]
    var stateS = "pedding"
    // 内置规则  状态的凝固 权限的分配
    var RULES = {
      state: function () {
        return stateS
      },
      then: function () {

      },
      promise: function (obj) { // 只有 add权限
          return obj != null ? Object.assign(obj,RULES): RULES
      }
    }
    var state = {}
    // resolve reject
    tuples.forEach(function (tuple, i) {
      var holder = tuple[2]
      var stateString = tuple[3]
      // 权限分配RULES[done fail progress] == self.add
      RULES[tuple[1]] = holder.add
      if(stateString){
        // 成功 失败 状态凝固
          holder.add(function () {
            // 添加一个函数用来设置最终状态
            stateS = stateString
          })
      }
      // 权限分配 state[presolve reject notify] === self.fire 语法糖
      state[tuple[0]] = function () {
        state[tuple[0]+"With"](this === state? RULES : this, arguments)
      }
      state[tuple[0]+"With"] = holder.fireWith()
    })
    // you add fire 权限 给state分配权限
    RULES.promise(state)
    return state
    // state.resolve() 成功
  }
  // 工具
  function when(result){
    return result.promise()
  }
  root.Promise = Promise
})(this)
