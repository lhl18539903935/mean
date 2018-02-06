import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router'
import App from './App'
import Vuex from 'vuex'
import axios from 'axios'
import { sync } from 'vuex-router-sync'
import addressData from './libs/address.js'
import vuePicturePreview from 'vue-picture-preview'
Vue.use(vuePicturePreview)
window.axios = axios
window.addressData=addressData

Vue.use(Vuex)

Vue.use(router)

FastClick.attach(document.body)

Vue.config.productionTip = false

require('es6-promise').polyfill()
let store = new Vuex.Store({
  modules: {}
})

// Vue.http.interceptors.push((request, next) => {
//   console.log(this)//此处this为请求所在页面的Vue实例
//    // modify request
//   request.method = 'POST';//在请求之前可以进行一些预处理和配置

//    // continue to next interceptor

//   next((response) => {//在响应之后传给then之前对response进行修改和逻辑判断。对于token时候已过期的判断，就添加在此处，页面中任何一次http请求都会先调用此处方法

// 　　response.body = '...';
// 　　return response;

//   });
// });

store.registerModule('vux', {
  state: {
    demoScrollTop: 0,
    isLoading: false,
    direction: 'forward',
    supplier_id:0,
    pageName:'乐宝',
    pageHeader:true,
    pageFooter:true,
    src:'',
    src1:'',
    src2:'',
    bg:{white:false,grey:true},
  },
  mutations: {
    setBg(state,bg){
      state.bg=bg
    },
    setPageName(state,pageName){
      state.pageName=pageName
    },
    setsrc(state,src){
      state.src=src
    },
    setsrc1(state,src1){
      state.src1=src1
    },
    setsrc2(state,src2){
      state.src2=src2
    },
    setHeader(state,headerState){
      state.pageHeader=headerState
    },
    setFooter(state,FooterState){
      state.pageFooter=FooterState
    },
    setSupplier_id(state,payload){
      state.supplier_id=9999
    },
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    },
    updateDirection (state, payload) {
      state.direction = payload.direction
    }
  },
  actions: {
    updateDemoPosition ({commit}, top) {
      commit({type: 'updateDemoPosition', top: top})
    }
  }
})
// plugins
import { BusPlugin, DatetimePlugin, LocalePlugin, DevicePlugin, ToastPlugin, AlertPlugin, ConfirmPlugin, LoadingPlugin, AjaxPlugin, AppPlugin } from 'vux'

Vue.use(DevicePlugin)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)
Vue.use(AjaxPlugin)
Vue.use(LocalePlugin)
Vue.use(DatetimePlugin)
Vue.use(BusPlugin)
Vue.use(ToastPlugin)

// test
if (process.env.platform === 'app') {
  Vue.use(AppPlugin, store)
}


Vue.use(store)
sync(store, router)
/* eslint-disable no-new */

const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)

router.beforeEach(function (to, from, next) {
  store.commit('updateLoadingStatus', {isLoading: true})

  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)

  if (toIndex) {
    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
      store.commit('updateDirection', {direction: 'forward'})
    } else {
      store.commit('updateDirection', {direction: 'reverse'})
    }
  } else {
    ++historyCount
    history.setItem('count', historyCount)
    to.path !== '/' && history.setItem(to.path, historyCount)
    store.commit('updateDirection', {direction: 'forward'})
  }

  if (/\/http/.test(to.path)) {
    let url = to.path.split('http')[1]
    window.location.href = `http${url}`
  } else {
    next()
  }
})

router.afterEach(function (to) {
  store.commit('updateLoadingStatus', {isLoading: false})
})
const bus=new Vue();
window.bus=bus
new Vue({
	store,
  router,
  render: h => h(App)
}).$mount('#app-box')
