
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);


const store = new Vuex.Store({

    // 设置属性
    state: {
        isLogin: false,
        ip:"http://47.96.231.75:8080/deliver",
        // 乐涛服务器地址
        url:"http://118.25.85.198:8080/deliver",
        userData:{},
        // 定位数组
        point: []
    },

    // 获取属性的状态
    getters: {
        //获取登录状态
        isLogin: state => state.isLogin,
    },

    // 设置属性状态
    mutations: {
        //保存登录状态
        userStatus(state, flag) {
            state.isLogin = flag;
        },

        // 用户数据
        userD(state, data) {
            state.userData = data;
        },
    },

    // 应用mutations
    actions: {
        //获取登录状态
        userLogin({ commit }, flag) {
            commit("userStatus", flag);
        },
        // 用户数据
        userData({commit}, data) {
            commit("userD", data);
        },
    }

})
export default store
