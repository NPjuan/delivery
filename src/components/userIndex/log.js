// Pjy 的个人函数库
// export {
//   // console.log 的 简化
//   log
// }

// console.log 的 简化
function log(text) {
  console.log(text)
}

// 自定义 Promise 模块
// (function (params) {
//   /*
//   * Promise 构造函数
//   * executor 执行者函数
//   */
//   const PENDING = 'pending'
//   const RESOLVED = 'resolved'
//   const REJECTED = 'rejected'
//   function Promise(executor) {
//     const self = this
//     self.status = PENDING
//     self.data = undefined
//     self.callbacks = []
//     function resolve(value) {
//       // 为什么要这一步呢，状态凝固不可以再改变
//       // resolve(value)
//       // reject(value) 经过上一步，这一步是没有意义的
//       if(self.status !== PENDING){
//         return
//       }
//       // 配置 promise
//       self.status = RESOLVED
//       self.data = value
//       // 如果在状态改变前通过 then or catch 配置回调函数后，就放入任务队列中
//       if(self.callbacks.length > 0){
//         setTimeout(() => {
//           self.callbacks.forEach(callbacksObj => {
//             callbacksObj.onResolved(value)
//           })
//         })
//       }
//     }
//     function reject(reason) {
//       if(self.status !== PENDING){
//         return
//       }
//       self.status = REJECTED
//       self.data = reason
//       if(self.callbacks.length > 0){
//         setTimeout(() => {
//           self.callbacks.forEach(callbacksObj => {
//             callbacksObj.onRejected(reason)
//           })
//         })
//       }
//     }
//
//     try{
//       executor(resolve, reject)
//     }catch (error) {
//       // 如果抛出异常， 状态变为 rejected
//       reject(error)
//     }
//   }
//   // 根据 settled 函数同步或异步执行，决定 then 函数的用法
//   // 如果 settled 是同步， 则立即将 then 中对应的回调函数放入任务队列
//   // 若为异步，则配置回调函数，等待状态改变
//   // 其次 then 返回一个 promise, 本文中定义其为 'then promise'
//   // 该 'then promise' 的结果由 then 中的回调函数所决定
//   // 假如 '前者 promise' 状态为 pending 则 then promise 也是 pending
//   // 假如 then 回调函数的返回值不为 promise，则 then promise 状态为resolved
//   // 假如 then 回调函数中抛出了错误， 则 then promise 状态为 rejected
//   // 假如 then 回调函数里返回值为 promise ，这里定义为 'return promise'，则根据 return promise 来决定then promise 的状态
//   // 则立即将 then 里的回调函数放入任务队列
//   Promise.prototype.then = function(onResolved, onRejected){
//     const self = this
//     // 先配置回调函数
//     // 并无论如何，返回一个 promise
//     // 这里定义调用 then 方法的 promise 为前者，并观察 onResolved or onRejected 中返回了什么
//     return new Promise((resolve, reject) =>{
//       // 如果resolve函数是在回调中配置的
//       // 如果前者 promise 的状态未凝固，证明回调函数尚未执行，则配置回调函数
//       if(self.status === PENDING){
//         self.callbacks.push({
//           onResolved,
//           onRejected
//         })
//       }else if(self.status === RESOLVED){
//         // 如果前者 promise 状态已经凝固，代表已经执行 resolve 完毕
//         // 放入回调队列
//         setTimeout(() => {
//           // 如果抛出异常， return 的 promise 就会失败
//           // 如果回调函数返回的不是 promise 即成功
//           // 如果回调函数返回 promise 该 promise 的结果决定
//           try {
//             const result = onResolved(self.data) // 执行配置函数并获得其返回值
//             if(result instanceof  Promise){ // 如果返回值是 promise
//               // 递归，一直到有结果为止
//               // result.then(
//               //   value => {
//               //     resolve(value)
//               //     // result 成功， 让 前者 的 promise 也成功
//               //   },
//               //   // result 失败， 让 前者 的 promise 也失败
//               //   reason => {
//               //     reject(reason)
//               //   }
//               result.then(resolve, reject)
//             }else {
//               // 如果回调函数返回的不是 promise， return 的 promise 就回成功
//               resolve(result)
//             }
//           }catch (error) {
//             reject(error)
//           }
//         })
//       }else{
//         setTimeout(() => {
//           // 如果抛出异常， return 的 promise 就会失败
//           // 如果回调函数返回的不是 promise 即成功
//           // 如果回调函数返回 promise 该 promise 的结果决定
//           try {
//             const result = onRejected(self.data) // 执行配置函数并获得其返回值
//             if(result instanceof  Promise){ // 如果返回值是 promise
//               // 递归，一直到有结果为止
//               // result.then(
//               //   value => {
//               //     resolve(value)
//               //     // result 成功， 让 前者 的 promise 也成功
//               //   },
//               //   // result 失败， 让 前者 的 promise 也失败
//               //   reason => {
//               //     reject(reason)
//               //   }
//               result.then(resolve, reject)
//             }else {
//               // 如果回调函数返回的不是 promise， return 的 promise 就回成功
//               resolve(result)
//             }
//           }catch (error) {
//             reject(error)
//           }
//         })
//       }
//     })
//   }
//
//   Promise.prototype.catch = function(onRejected){
//
//   }
//
//   Promise.resolve = function(value){
//
//   }
//
//   Promise.reject = function(value){
//
//   }
//
//   Promise.all = function(promises){
//
//   }
//
//   Promise.race = function(promises){
//
//   }
//
//
//   // 向外暴露 Promise
//   window.Promise = Promise
// })(window)

