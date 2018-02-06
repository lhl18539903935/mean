<template>
  <div>
      <div class="refusal" v-html="idcard_reason"></div>
  </div>
</template>
<script>
export default {
    data(){
        return{
            bg:{white:true,grey:false},
            pageHeader:true,
            pageName:'拒绝理由',
            idcard_reason:''
        }
    },
    mounted(){
        this.apiPost(this.phost+'/Dls/idcardAuthen',{}).then((res)=>{
            if(res.code==200){
                this.idcard_reason=res.data.idcard_reason
            }
        })
    },
   mixins:[window.mixins,window.http]
}
</script>
<style scoped>
    .refusal{
        width:95%;
        margin:1rem auto;
    }
</style>


