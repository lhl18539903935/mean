import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import index from '@/app/index'
Vue.use(Router)
export default  new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },{
      path: '/login',
      name: 'login',
      component: resolve => require(['../app/login.vue'], resolve)
    },{
      path: '/register',
      name: 'register',
      component: resolve => require(['../app/register.vue'], resolve)
    },{
      path: '/agent',
      name: 'agent',
      component: resolve => require(['../app/agent.vue'], resolve)
    },{
      path: '/viewdetails',
      name: 'viewdetails',
      component: resolve => require(['../app/viewdetails.vue'], resolve)
    },{
      path: '/code',
      name: 'code',
      component: resolve => require(['../app/code.vue'], resolve)
    },{
      path: '/detail',
      name: 'detail',
      component: resolve => require(['../app/detail.vue'], resolve)
    },{
      path: '/give',
      name: 'give',
      component: resolve => require(['../app/give.vue'], resolve)
    },{
      path: '/sureGive',
      name: 'sureGive',
      component: resolve => require(['../app/sureGive.vue'], resolve)
    },{
      path: '/ws_manage',
      name: 'ws_manage',
      component: resolve => require(['../app/ws_manage.vue'], resolve)
    },{
      path: '/addNext',
      name: 'addNext',
      component: resolve => require(['../app/addNext.vue'], resolve)
    },{
      path: '/search',
      name: 'search',
      component: resolve => require(['../app/search.vue'], resolve)
    },
    {
      path: '/agreenment',
      name: 'agreenment',
      component: resolve => require(['../app/agreenment.vue'], resolve)
    },{
      path: '/alreadySure',
      name: 'alreadySure',
      component: resolve => require(['../app/alreadySure.vue'], resolve)
    },{
      path: '/Perfectdata',
      name: 'Perfectdata',
      component: resolve => require(['../app/Perfectdata.vue'], resolve)
    },{
      path: '/storelist-search',
      name: 'storelist-search',
      component: resolve => require(['../app/storelist-search.vue'], resolve)
    },
      {
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
      path: '/add_card',
      name: 'add_card',
      component: resolve => require(['../app/add_card.vue'], resolve)
    },
    {
      path: '/my_card',
      name: 'my_card',
      component: resolve => require(['../app/person/my_card.vue'], resolve)
    }
    ,{
      path: '/attestation',
      name: 'attestation',
      component: resolve => require(['../app/person/attestation.vue'], resolve)
    }
    ,{
      path: '/business',
      name: 'business',
      component: resolve => require(['../app/person/business.vue'], resolve)
    }
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
      path: '/edit',
      name: 'edit',
      component: resolve => require(['../app/person/edit.vue'], resolve)
    },{
      path: '/forgetPass',
      name: 'forgetPass',
      component: resolve => require(['../app/forgetPass.vue'], resolve)
    },{
      path: '/address',
      name: 'address',
      component: resolve => require(['../app/person/address.vue'], resolve)
    },{
      path: '/abouth',
      name: 'abouth',
      component: resolve => require(['../app/person/abouth.vue'], resolve)
    },{
      path: '/newPass',
      name: 'newPass',
      component: resolve => require(['../app/person/newPass.vue'], resolve)
    },{
      path: '/announcement',
      name: 'announcement',
      component: resolve => require(['../app/announcement.vue'], resolve)
    },{
      path: '/contract',
      name: 'contract',
      component: resolve => require(['../app/contract.vue'], resolve)
    },{
      path: '/announcementsomthing',
      name: 'announcementsomthing',
      component: resolve => require(['../app/announcementsomthing.vue'], resolve)
    },{
      path: '/certify',
      name: 'certify',
      component: resolve => require(['../app/certify.vue'], resolve)
    },{
      path: '/editAdd',
      name: 'editAdd',
      component: resolve => require(['../app/person/editAdd.vue'], resolve)
    },{
      path: '/companyname',
      name: 'companyname',
      component: resolve => require(['../app/person/companyname.vue'], resolve)
    },{
      path: '/companybook',
      name: 'companybook',
      component: resolve => require(['../app/person/companybook.vue'], resolve)
    },{
      path: '/companyhetong',
      name: 'companyhetong',
      component: resolve => require(['../app/person/companyhetong.vue'], resolve)
    },{
      path: '/rename',
      name: 'rename',
      component: resolve => require(['../app/person/rename.vue'], resolve)
    },
    {
     path: '/readyContract',
     name: 'readyContract',
     component: resolve => require(['../app/readContract.vue'], resolve)
    },
    {
      path: '/complaint',
      name: 'complaint',
      component: resolve => require(['../app/complaint.vue'], resolve)
    },{
      path: '/shensudetails',
      name: 'shensudetails',
      component: resolve => require(['../app/shensudetails.vue'], resolve)
    },{
      path: '/serchtousu',
      name: 'serchtousu',
      component: resolve => require(['../app/serchtousu.vue'], resolve)
    },{
      path: '/merchant',
      name: 'merchant',
      component: resolve => require(['../app/merchant.vue'], resolve)
    },{
      path: '/addMerchant',
      name: 'addMerchant',
      meta:{alive:true},
      component: resolve => require(['../app/addMerchant.vue'], resolve),
    },{
      path: '/merchantDetail',
      name: 'merchantDetail',
      component: resolve => require(['../app/merchantDetail.vue'], resolve)
    },{
      path: '/chose',
      name: 'chose',
      component: resolve => require(['../app/chose.vue'], resolve)
    },{
      path: '/merchantList',
      name: 'merchantList',
      component: resolve => require(['../app/merchantList.vue'], resolve)
    },{
      path: '/upload',
      name: 'upload',
      component: resolve => require(['../app/upload.vue'], resolve)
    },{
      path: '/choseCode',
      name: 'choseCode',
      component: resolve => require(['../app/choseCode.vue'], resolve)
    },{
      path: '/percentage',
      name: 'percentage',
      component: resolve => require(['../app/percentage.vue'], resolve)
    },{
      path: '/add_bink',
      name: 'add_bink',
      component: resolve => require(['../app/add_bink.vue'], resolve)
    },{
      path: '/addCard',
      name: 'addCard',
      component: resolve => require(['../app/person/addCard.vue'], resolve)
    },{
      path: '/cash_infer',
      name: 'cash_infer',
      component: resolve => require(['../app/cash_infer.vue'], resolve)
    },{
      path: '/cash_recode',
      name: 'cash_recode',
      component: resolve => require(['../app/cash_recode.vue'], resolve)
    },{
      path: '/addshoukuan',
      name: 'addshoukuan',
      component: resolve => require(['../app/addshoukuan.vue'], resolve)
    },{
      path: '/add_zhifubao',
      name: 'add_zhifubao',
      component: resolve => require(['../app/add_zhifubao.vue'], resolve)
    },{
      path: '/twithdraw',
      name: 'twithdraw',
      component: resolve => require(['../app/person/twithdraw.vue'], resolve)
    },{
      path: '/forms',
      name: 'forms',
      component: resolve => require(['../app/forms.vue'], resolve)
    },{
      path: '/check',
      name: 'check',
      component: resolve => require(['../app/check.vue'], resolve)
    },{
      path: '/check_sale',
      name: 'check_sale',
      component: resolve => require(['../app/check_sale.vue'], resolve)
    },{
      path: '/tenant',
      name: 'tenant',
      component: resolve => require(['../app/tenant.vue'], resolve)
    },{
      path: '/editbankcard',
      name: 'editbankcard',
      component: resolve => require(['../app/editbankcard.vue'], resolve)
    },{
      path: '/shenhenolist',
      name: 'shenhenolist.vue',
      component: resolve => require(['../app/shenhenolist.vue'], resolve)
    },{
      path: '/tj_success',
      name: 'tj_success',
      component: resolve => require(['../app/tj_success.vue'], resolve)
    },{
      path: '/wanma_search',
        name: 'wanma_search',
        component: resolve => require(['../app/wanma_search.vue'], resolve)
    },{
      path: '/merchant_search',
        name: 'merchant_search',
        component: resolve => require(['../app/merchant_search.vue'], resolve)
    },{
      path: '/registerPss',
        name: 'registerPss',
        component: resolve => require(['../app/person/registerPss.vue'], resolve)
    },{
        path: '/perfecfbink',
        name: 'perfecfbink',
        component: resolve => require(['../app/perfecfbink.vue'], resolve)
    },{
      path: '/MerchantCard',
        name: 'MerchantCard',
        component: resolve => require(['../app/MerchantCard.vue'], resolve)
    },{
      path: '/helpcenter',
      name: 'helpcenter',
      component: resolve => require(['../app/helpcenter.vue'], resolve)
    },{
      path: '/solution',
      name: 'solution',
      component: resolve => require(['../app/solution.vue'], resolve)
    },{
      path: '/Refusal',
      name: 'Refusal',
      component: resolve => require(['../app/person/Refusal.vue'], resolve)
    }
  ]
})

// router.beforeEach(function(to,from,next){
//   store.commit('setPageHeader',true)
//   store.commit('setPageFooter',true)
//   store.commit('updateLoadingStatus',{isLoading:true})
//   next()
// })
// router.afterEach(function(to){
//   store.commit('isPath',to.path)
// })