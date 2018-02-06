import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state = {
    isLoading: false,
    userId:'',
    address:'', // 地址
    city:'', // 城市
    shoppingCart:'', //购物车
    pageHeader:false,
    pageFooter:false,
    headInformation:{name:'',iconClass:''},
    isHome:true,
    isShop:true,
    isCart:true,
    isOrder:true,
    isUser:true,
    evaluate:0, //已未评价 0,1
    orderIndex:0 // 全部/待付/待用/待评/退款，0/1/2/3/4
}

export const store = new Vuex.Store({})

store.registerModule('vux', { // 名字自己定义
    state,
    mutations:{
        isPath(state,path){ //footer-nav
            if(path.indexOf('/home') > -1){
                state.isHome = false
            }else {
                state.isHome = true
            }
            if(path.indexOf('/shop') > -1){
                state.isShop = false
            }else {
                state.isShop = true
            }
            if(path.indexOf('/order') > -1){
                state.isOrder = false
            }else {
                state.isOrder = true
            }
            if(path.indexOf('/cart') > -1){
                state.isCart = false
            }else {
                state.isCart = true
            }
            if(path.indexOf('/user') > -1){
                state.isUser = false
            }else {
                state.isUser = true
            }
            if(path.indexOf('/city') > -1){
                state.pageHeader = false
                state.pageFooter = false
            }
        },
        updateLoadingStatus (state, payload) {
            state.isLoading = payload.isLoading
        },
        setUderId(state,userId){
            state.userId = userId
        },
        setAddress(state,address){
            state.address = address
        },
        setCity(state,city){
            state.city = city
        },
        setShoppingCart(state,shoppingCart){
            state.shoppingCart = shoppingCart
        },
        setPageFooter(state,pageFooter){
            state.pageFooter = pageFooter
        },
        setPageHeader(state,pageHeader){
            // 切换header,
            // pageHeader=false时使用私有header
            // pageHeader=true时使用通用header
            // home,city,search 页面为false
            state.pageHeader = pageHeader
        },
        setHeaderTitle(state,headInformation){
            // 通用header的标题、图标切换
            let headTitle = '' // 用户刷新使用sessionStorage的数据
            sessionStorage.setItem('headTitle',headInformation.name)
            state.headInformation.name = headInformation.name
            if(headInformation.iconClass){
                state.headInformation.iconClass = headInformation.iconClass
            }
        },
        setEvaluate(state,evaluate){
            state.evaluate = evaluate
        },
        setOrderIndex(state,orderIndex){
            state.orderIndex = orderIndex
        }
    }
})

