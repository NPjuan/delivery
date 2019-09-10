import axios from 'axios'
import { Toast } from 'vant'//这里我用的是vant组件的弹窗

//默认请求地址
axios.defaults.baseURL = 'http://shopping.com/'

//请求超时时间
axios.defaults.timeout = 10000

//请求头
axios.defaults.headers.post['Content=Type']='application/json'

//请求拦截
axios.interceptors.request.use(
    config => {
        return config
    },
    error => {
        return Promise.error(error)
    }
)

//响应拦截器
axios.interceptors.response.use(
    response => {
        // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据 
        // 否则的话抛出错误
        if(response.status === 200){
            return Promise.resolve(response)
        } else {
            return Promise.reject(response)
        }
    },
    // 服务器状态码不是2开头的的情况 
    // 这里可以跟你们的后台开发人员协商好统一的错误状态码  
    // 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
    error => {
        if(error.response.status){
            switch (error.response.status){
                // 401: 未登录  
                // 未登录则跳转登录页面，并携带当前页面的路径  
                // 在登录成功后返回当前页面，这一步需要在登录页操作
                //case 401:
                case 404:
                    Toast({
                        message:'网络请求不存在',
                        duration:1500,
                        forbidClick:true
                    })
                    break
                case 400:
                    Toast({
                        message:'服务器繁忙',
                        duration:1500,
                        forbidClick:true
                    })
                    break
                default:
                    Toast({
                        message:'其它提示',
                        duration:1500,
                        forbidClick:true
                    })  
            }
            return Promise.reject(error.response)
        }
    }
)
/** 
 * get方法，对应get请求
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */

 export function get(url,params=''){
     return new Promise((resolve,reject)=>{
         axios.get(url,{
             params
         }).then(res=>{
             resolve(res.data)
         }).catch(err => {
             reject(err.data)
         })
     })
 }

 /**  
  * post方法，对应post请求  
  * @param {String} url [请求的url地址]  
  * @param {Object} params [请求时携带的参数]  
  */

 export function post(url,params){
    return new Promise((resolve,reject)=>{
        axios.post(url,{
            params
        }).then(res=>{
            resolve(res.data)
        }).catch(err => {
            reject(err.data)
        })
    })
}