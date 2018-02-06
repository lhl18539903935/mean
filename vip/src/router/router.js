import Vue from 'vue'
import Router from 'vue-router'
import {store} from "../vuex/store"
import Index from '../views/index.vue'
import notF from '../views/404.vue'
import test from '../views/test.vue'

import Home from './home'
import Shop from './shop'
import Order from './order'
import User from './user'
import Cart from './cart'

Vue.use(Router)

const routes = [
    {
        path:'/',
        component:Index,
        redirect:'/home',
        children:[
            Home,
            Shop,
            Order,
            Cart,
            User
        ]
    },
    {
        path:'*',
        component:notF
    },
    {
        path:'/test',
        component:test
    }
]



export const router = new Router({
    routes,
    mode: 'history',
    scrollBehavior (to, from, savedPosition) {
        if(savedPosition){
            // 解决锚点返回首页问题
            router.push({path:'/home'})
        }
        if (to.hash) {
            return {
                selector: to.hash
            }
        }
    }
})

router.beforeEach(function (to, from, next) {
    //跳转之前
    store.commit('setPageHeader',true)
    store.commit('setPageFooter',true)
    store.commit('updateLoadingStatus', {isLoading: true})
    next()
})

router.afterEach(function (to) {
    //跳转之后
    store.commit('isPath',to.path)
    // setTimeout(()=>{
        store.commit('updateLoadingStatus', {isLoading: false})
    // },500)
})
