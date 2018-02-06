import Vue from 'vue'
import Router from 'vue-router'
import index from '../app/index.vue'//主页

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['../app/login.vue'], resolve)
    },
    {
      path: '/findpwd',
      name: 'findpwd',
      component: resolve => require(['../app/findpwd.vue'], resolve)
    },
    {
      path: '/register',
      name: 'register',
      component: resolve => require(['../app/register.vue'], resolve)
    },
    {
      path: '/register_detail',
      name: 'register_detail',
      component: resolve => require(['../app/register_detail.vue'], resolve)
    },
    {
      path: '/emplace',
      name: 'emplace',
      component: resolve => require(['../app/emplace.vue'], resolve)
    },
    {
      path: '/activity',
      name: 'activity',
      component: resolve => require(['../app/activity.vue'], resolve)
    },
    {
      path: '/contract',
      name: 'contract',
      component: resolve => require(['../app/contract.vue'], resolve)
    },
    {
      path: '/sureContract',
      name: 'sureContract',
      component: resolve => require(['../app/sureContract.vue'], resolve)
    },
    {
      path: '/license',
      name: 'license',
      meta:{alive:true},
      component: resolve => require(['../app/license.vue'], resolve)
    },
    {
      path: '/Nolicense',
      name: 'Nolicense',
      component: resolve => require(['../app/Nolicense.vue'], resolve)
    },
    {
      path: '/appendMsg',
      name: 'appendMsg',
      component: resolve => require(['../app/appendMsg.vue'], resolve)
    },
    {
      path: '/success',
      name: 'success',
      component: resolve => require(['../app/success.vue'], resolve)
    },
    {
      path: '/service',
      name: 'service',
      component: resolve => require(['../app/service.vue'], resolve)
    },
    {
      path: '/solve',
      name: 'solve',
      component: resolve => require(['../app/solve.vue'], resolve)
    },
    {
      path: '/vipNum',
      name: 'vipNum',
      component: resolve => require(['../app/vipNum.vue'], resolve)
    },
    {
      path: '/order',
      name: 'order',
      component: resolve => require(['../app/order.vue'], resolve)
    },
    {
      path: '/dropDown',
      name: 'dropDown',
      component: resolve => require(['../app/dropDown.vue'], resolve)
    },
    {
      path: '/balance',
      name: 'balance',
      component: resolve => require(['../app/balance.vue'], resolve)
    },
    {
      path: '/orderDetail',
      name: 'orderDetail',
      component: resolve => require(['../app/orderDetail.vue'], resolve)
    },
    {
      path: '/store',
      name: 'store',
      component: resolve => require(['../app/store.vue'], resolve)
    },
    {
      path: '/checkDetail',
      name: 'checkDetail',
      component: resolve => require(['../app/checkDetail.vue'], resolve)
    },
    {
      path: '/cash',
      name: 'cash',
      component: resolve => require(['../app/cash.vue'], resolve)
    },
    {
      path: '/testPho',
      name: 'testPho',
      component: resolve => require(['../app/testPho.vue'], resolve)
    },
    {
      path: '/information',
      name: 'information',
      component: resolve => require(['../app/information.vue'], resolve)
    },
    {
      path: '/xukezheng',
      name: 'xukezheng',
      component: resolve => require(['../app/xukezheng.vue'], resolve)
    },
    {
      path: '/permit',
      name: 'permit',
      component: resolve => require(['../app/permit.vue'], resolve)
    },
    {
      path: '/account',
      name: 'account',
      component: resolve => require(['../app/account.vue'], resolve)
    },
    {
      path: '/storeAcc',
      name: 'storeAcc',
      component: resolve => require(['../app/storeAcc.vue'], resolve)
    },
    {
      path: '/collect',
      name: 'collect',
      component: resolve => require(['../app/collect.vue'], resolve)
    },
    {
      path: '/collected',
      name: 'collected',
      component: resolve => require(['../app/collect(1).vue'], resolve)
    },
    {
      path: '/checkMain',
      name: 'checkMain',
      component: resolve => require(['../app/checkMain.vue'], resolve)
    },
    {
      path: '/percentage',
      name: 'percentage',
      component: resolve => require(['../app/percentage.vue'], resolve)
    },
    {
      path: '/shop',
      name: 'shop',
      component: resolve => require(['../app/shop.vue'], resolve)
    },
    {
      path: '/newStore',
      name: 'newStore',
      meta:{alive:true},
      component: resolve => require(['../app/newStore.vue'], resolve)
    },
    {
      path: '/add',
      name: 'add',
      component: resolve => require(['../app/add.vue'], resolve)
    },
    {
      path: '/add_card',
      name: 'add_card',
      component: resolve => require(['../app/add_card.vue'], resolve)
    },
    {
      path: '/add_bink',
      name: 'add_bink',
      component: resolve => require(['../app/add_bink.vue'], resolve)
    },
    {
      path: '/my_card',
      name: 'my_card',
      component: resolve => require(['../app/my_card.vue'], resolve)
    },
    {
      path: '/choose_card',
      name: 'choose_card',
      component: resolve => require(['../app/choose_card.vue'], resolve)
    },
    {
      path: '/tj_success',
      name: 'tj_success',
      component: resolve => require(['../app/tj_success.vue'], resolve)
    },
    {
      path: '/newShop',
      name: 'newShop',
      meta:{alive:true},
      component: resolve => require(['../app/newShop.vue'], resolve)
    },
    {
      path: '/qRcode',
      name: 'qRcode',
      component: resolve => require(['../app/qRcode.vue'], resolve)
    },
    {
      path: '/person',
      name: 'person',
      component: resolve => require(['../app/person.vue'], resolve)
    },
    {
      path: '/business',
      name: 'business',
      component: resolve => require(['../app/person/business.vue'], resolve)
    },
    {
      path: '/switchacc',
      name: 'switchacc',
      component: resolve => require(['../app/switchacc.vue'], resolve)
    },
    {
      path: '/cash_recode',
      name: 'cash_recode',
      component: resolve => require(['../app/cash_recode.vue'], resolve)
    },
    {
      path: '/cash_infer',
      name: 'cash_infer',
      component: resolve => require(['../app/cash_infer.vue'], resolve)
    },
    {
      path: '/Merchants_downcard',
      name: 'Merchants_downcard',
      component: resolve => require(['../app/Merchants_downcard.vue'], resolve)
    },
    {
      path: '/Merchants_permit',
      name: 'Merchants_permit',
      component: resolve => require(['../app/Merchants_permit.vue'], resolve)
    },
    {
      path: '/upload',
      name: 'upload',
      component: resolve => require(['../app/upload.vue'], resolve)
    },
    {
      path: '/Merchants_handCard',
      name: 'Merchants_handCard',
      component: resolve => require(['../app/Merchants_handCard.vue'], resolve)
    },
    //{
    //  path: '/Merchants_xuKeZheng',
    //  name: 'Merchants_xuKeZheng',
    //  component: resolve => require(['../app/Merchants_xuKeZheng.vue'], resolve)
    //},

    {
      path: '/addImg',
      name: 'addImg',
      component: resolve => require(['../app/addImg.vue'], resolve)
    }
    ,{
      path: '/perMain',
      name: 'perMain',
      component: resolve => require(['../app/person/perMain.vue'], resolve)
    }
    ,{
      path: '/revisePwd',
      name: 'revisePwd',
      component: resolve => require(['../app/person/revisePwd.vue'], resolve)
    }
    ,{
      path: '/data',
      name: 'data',
      component: resolve => require(['../app/person/data.vue'], resolve)
    }
    ,{
      path: '/nickname',
      name: 'nickname',
      component: resolve => require(['../app/person/nickname.vue'], resolve)
    }
    //,{
    //  path: '/add_card',
    //  name: 'add_card',
    //  component: resolve => require(['../app/person/add_card.vue'], resolve)
    //},
    //{
    //  path: '/my_card',
    //  name: 'my_card',
    //  component: resolve => require(['../app/person/my_card.vue'], resolve)
    //}
    ,{
      path: '/attestation',
      name: 'attestation',
      component: resolve => require(['../app/person/attestation.vue'], resolve)
    }
    //,{
    //  path: '/business',
    //  name: 'business',
    //  component: resolve => require(['../app/person/business.vue'], resolve)
    //}
    ,{
      path: '/phone',
      name: 'phone',
      component: resolve => require(['../app/person/phone.vue'], resolve)
    }
    ,{
      path: '/replace',
      name: 'replace',
      component: resolve => require(['../app/person/replace.vue'], resolve)
    }
    ,{
      path: '/ID_card',
      name: 'ID_card',
      component: resolve => require(['../app/person/ID_card.vue'], resolve)
    }
    ,{
      path: '/ID_back',
      name: 'ID_back',
      component: resolve => require(['../app/person/ID_back.vue'], resolve)
    }
    ,{
      path: '/address',
      name: 'address',
      component: resolve => require(['../app/person/address.vue'], resolve)
    }
    ,{
      path: '/abouthly',
      name: 'abouthly',
      component: resolve => require(['../app/person/adouthly.vue'], resolve)
    },{
      path: '/revise',
      name: 'revise',
      component: resolve => require(['../app/person/revise.vue'], resolve)
    },{
      path: '/contractimg',
      name: 'contractimg',
      component: resolve => require(['../app/person/contractimg.vue'], resolve)
    },
    {
      path: '/newRevise',
      name: 'newRevise',
      component: resolve => require(['../app/person/newRevise.vue'], resolve)
    },
    {
      path: '/username',
      name: 'username',
      component: resolve => require(['../app/person/username.vue'], resolve)
    },
    {
      path: '/editbankcard',
      name: 'editbankcard',
      component: resolve => require(['../app/person/editbankcard.vue'], resolve)
    },
    {
      path: '/twithdraw',
      name: 'twithdraw',
      component: resolve => require(['../app/person/twithdraw.vue'], resolve)
    },
    {
      path: '/shenhenolist',
      name: 'shenhenolist',
      component: resolve => require(['../app/person/shenhenolist.vue'], resolve)
    },
    {
      path: '/addshoukuan',
      name: 'addshoukuan',
      component: resolve => require(['../app/addshoukuan.vue'], resolve)
    },
    {
      path: '/add_zhifubao',
      name: 'add_zhifubao',
      component: resolve => require(['../app/add_zhifubao.vue'], resolve)
    },
    {
      path: '/ordernumber',
      name: 'ordernumber',
      component: resolve => require(['../app/ordernumber.vue'], resolve)
    },
    {
     path: '/chose',
      name: 'chose',
      component: resolve => require(['../app/chose.vue'], resolve)
    },
    {
     path: '/rename',
      name: 'rename',
      component: resolve => require(['../app/person/rename.vue'], resolve)
    },
    {
     path: '/addCard',
      name: 'addCard',
      component: resolve => require(['../app/person/addCard.vue'], resolve)
    },
    {
     path: '/companyname',
      name: 'companyname',
      component: resolve => require(['../app/person/companyname.vue'], resolve)
    },
    {
     path: '/companybook',
      name: 'companybook',
      component: resolve => require(['../app/person/companybook.vue'], resolve)
    },
    {
     path: '/companyhetong',
      name: 'companyhetong',
      component: resolve => require(['../app/person/companyhetong.vue'], resolve)
    },
    {

      path: '/pretermit',
      name: 'pretermit',
      component: resolve => require(['../app/pretermit.vue'], resolve)
},
    {
     path: '/ann',
      name: 'ann',
      component: resolve => require(['../app/ann.vue'], resolve)
    },
    {
     path: '/annDetail',
      name: 'annDetail',
      component: resolve => require(['../app/annDetail.vue'], resolve)
    },
    {
     path: '/addStore',
      name: 'addStore',
      meta:{alive:true},
      component: resolve => require(['../app/addStore.vue'], resolve)
    },
    {
     path: '/code',
      name: 'code',
      meta:{alive:true},
      component: resolve => require(['../app/code.vue'], resolve)
    },
    {
     path: '/withdraw',
      name: 'withdraw',
      meta:{alive:true},
      component: resolve => require(['../app/withdraw.vue'], resolve)
    }
  ]
})

