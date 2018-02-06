// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App.vue'
import { router } from './router/router'
import { store } from './vuex/store'
import './mixin/ajax'  //全局混合


FastClick.attach(document.body)

Vue.config.productionTip = false


Vue.directive('focus', {
    // 当绑定元素插入到 DOM 中。
    inserted: function (el) {
        // 聚焦元素
        el.focus()
    }
})
Vue.directive('blur', {
    // 当绑定元素插入到 DOM 中。
    inserted: function (el) {
        // 聚焦元素
        el.blur()
    }
})




/* eslint-disable no-new */
var app = new Vue({
    router, store,
    render: h => h(App)
}).$mount('#app-box')