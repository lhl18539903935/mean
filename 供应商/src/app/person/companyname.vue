<template>
  <div>
    <group>
        <x-input title='企业名称:' v-model="companyname" ></x-input>
    </group>
    <div style="width:90%;margin:1rem auto;"><x-button @click.native='updateData' style="background-color: #FF4948;font-size: 16px;color:#fff;" >保存</x-button></div>
    <span style="margin-left:1.1rem;font-size: 14px"></span>
  </div>
</template>
<script>
  import {Group,Cell,XButton,XInput} from "vux"
  import mixins from "../../vuex/mixin.js"
  import http from "../../ajax.js"
  export default{
    data(){
      return{
        bg:{white:false,grey:true},
        pageHeader:true,
        pageName:"企业认证",
        companyname:'',
      }
    },
    methods:{
      updateData:function(){
        if(this.companyname.length==0){
          this.$vux.toast.show({
              text: '请填写公司名称',
              type: "warn"
          })
        }else{
          this.apiPost("http://p.huileyi.com/Dls/dlsPerfectData",{company:this.companyname,uptype:'companyAuthen'}).then((res)=>{
            if(res.code=200){
                this.$vux.toast.show({
                  text: '上传成功',
                  type: "success"
               })
              this.$router.push({path: '/business'});
            }
        
          })
        }
      }
    },
    mounted:function(){
      let vm = this;
      this.apiPost("http://p.huileyi.com/Dls/companyAuthen",{}).then((res)=>{
          vm.companyname=res.data.company
          
      })
    },
    components:{
      Group,
      XButton,
      XInput
    },
    mixins:[mixins,http]
  }
</script>
<style>
  
</style>      