<template>
  <div>
      <p class="content" style="" v-html="contebt">{{contebt}}</p>
    </div>
  </div>
</template>

<script>
import {XHeader} from 'vux'
  export default {
    components:{
      XHeader
    },
    data(){
      return{
        pageHeader:true,
        pageName:'关于惠乐益',
        contebt:'',
        bg:{white:true,grey:false},
        styleObject:{
          background:'#eee',
          color:'#fff'
        }
      }
    },
    methods:{

    },
    mixins:[window.mixins,window.http],
    mounted:function(){
        let vm=this;
        this.apiPost(this.rhost+'/home/aboutHly', {}).then((res) => {
            if(res.code==200){
              vm.contebt=res.data.content
            }else{
                this.$vux.toast.show({
                text: res.msg,
                type: "text",
                position:'bottom',
              })
            }
        })

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @media screen and (max-width:320px){
    .style{
      width:320px;
      height:100%;
    }
  }

  .content{
   font-size: 14px;
   overflow: scroll;
   width:100%;
   margin:0.5rem auto;
   position:absolute;
   top:3rem;
   left:0;
   right:0;
   bottom:0;
  }
</style>
