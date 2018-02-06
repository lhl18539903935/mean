<template>
  <div class="data">
    <div class="content" v-if="showcontent" v-html='contebt'>
    </div>
    </div>
  </div>
</template>

<script type="es6">
  import {XButton} from 'vux'
    export default {
      data(){
      return{
        pageName:'请同意协议内容',
        pageFooter:false,
        second:5,
        msg:"",
        contebt:"",
        showcontent:true,
        myDisabled:true,
        pageHeader:true,
        bg:{white:true,grey:false},
      }
    },
      components:{
        XButton
      },
    created(){
      this.apiPost(this.rhost+'/Home/getClause',{plat:1,type:2}).then((res)=>{
              if(res.code==221){
                this.$vux.toast.show({
                  text: res.msg,
                  type: "text",position:'bottom',
                })
            }else{
                this.contebt=res.data.content
            }
      })
        let vm=this
      let timer=setInterval(function(){
        vm.second--
        if(vm.second<=0){
          clearInterval(timer)
          vm.myDisabled=false
        }

      },1000)
    },
    mixins:[window.mixins,window.http]
    }
</script>

<style>
  .data .content{
    width:90%;
    margin:1rem auto;
    font-size: 14px;
    position: absolute;
    top:2.5rem;
    left:0;
    right:0;
    bottom:0;
    overflow: scroll;
  }
  .data .btn {
    background-color: #8D8D8D!important;
    color:#fff!important;
  }
  .data .btn1 {
    background-color: #6594FE;
    color:#fff;
  }

  @media screen  and (max-width: 320px) {
    .content{
      font-size: 0.9rem;
    }
  }
</style>
