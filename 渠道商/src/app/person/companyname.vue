<template>
  <div>
    <group>
        <x-input title='企业名称:' v-model="companyname" ></x-input>
    </group>
    <div style="width:90%;margin:1rem auto;"><x-button @click.native='updateData' style="background-color: #6594FE;font-size: 16px;color:#fff;" >保存</x-button></div>
    <span style="margin-left:1.1rem;font-size: 14px"></span>
  </div>
</template>
<script>
  import {Group,XButton ,XInput} from "vux"
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
              text: '请填写企业名称',
              type: "text",position:'bottom',
          })
        }else{
          this.apiPost(this.phost+'/Dls/dlsPerfectData',{company:this.companyname,uptype:'companyAuthen'}).then((res)=>{
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
      this.apiPost(this.phost+'/Dls/companyAuthen',{}).then((res)=>{
          vm.companyname=res.data.company

      })
    },
    components:{
      Group,
      XButton,
      XInput
    },
    mixins:[window.mixins,window.http]
  }
</script>
<style>

</style>
