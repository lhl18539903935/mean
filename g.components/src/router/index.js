import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import index from '@/app/index'
import tell from '@/components/text/index.vue'
import offline from '@/components/text/offline.vue'
import go from '@/components/text/go.vue'
Vue.use(Router)
export default  new Router({
  routes: [
    {
      path: '/text',
      name: 'index',
      component: index
    },
    {
      path: '/',
      name: 'tell',
      component: tell
    },
    {
      path: '/ddddd',
      name: 'go',
      component: go
    },
    {
      path: '/offline',
      name: 'offline',
      component: offline
    },
  ]
})

