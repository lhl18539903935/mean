<template>
  <div>
      <img @click="gettoken" src="./gogogogo.jpg" alt="">
  </div>
</template>
<script>
import upload from "./../../upload.js"
import mixin from './../../vuex/mixin.js'
import http from './../../ajax.js'
export default {
  data(){
      return{

      }
  },
  methods:{
    //   获取token
    
      gettoken(){
          let vm =this
        vm.apiPost('http://192.168.4.29:8086/public/portal/Kf_api/getToken',{shop_id:10}).then((res)=>{
          if(res.code==200){
            this.token=res.data.user_token
            this.kf_id=res.data.kf_id
            this.userId=res.data.user_id
            this.user_name=res.data.user_name
            this.app_key=res.data.app_key
            console.log('gettoken的'+this.token,'appk'+this.app_key)
            // this.getclientadd()
            // this.connect();   
            this.$router.push('/index')  
          }
          if(res.code == 203){
              this.$router.push('/offline')
          }
        })
      }
  },
    mixins:[mixin,http,upload]
}
</script>
