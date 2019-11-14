import createPersistedState from 'vuex-persistedstate'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        defaultImg: 'this.src="' + require('../../src/assets/images/default-img.png') + '"', // 默认图片
        defaultHeadImg: 'this.src="' + require('../../src/assets/images/default-head.svg') + '"', // 默认头像
        good: {},

    },
    // 更新商品
    mutations: {

        good(state, v) {

            state.good = v
        },

    },
    actions: {

    },
    getters: {
        set_table_good(state) {
            return state.good.filter(val => Number(val.put_number) > 0);
        },
        set_good(state) {
            return state.good
        },
        defaultImg: state => state.app.defaultImg
    },
    modules: {},
    // plugins: [createPersistedState({
    //     // vuex持久化插件
    //     // storage: window.sessionStorage
    // })]
})