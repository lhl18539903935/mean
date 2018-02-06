<template>
    <div>
      <p class="style" style="font-size: 14px;overflow: hidden;" v-html="data">{{data}}</p>
    </div>
</template>

<script type="es6">
  import mixin from '../../vuex/mixin.js'
	import http from '../../ajax.js'
    export default {
      data(){
        return{
          data:"",
          pageName:"关于惠乐益",
          bg:{white:true,grey:false},
        }
      },
        mounted:function(){
         let token=localStorage.getItem('token');
         let vm=this;
        this.apiPost('http://r.huileyi.com/home/aboutHly', {}).then((res) => {
          console.log(res);
            if(res.code==200){
              vm.data=res.data.content
            }else{
                this.$vux.toast.show({
                text: res.msg,
                type: "warn"
              })
            }
        })

    },
     mixins:[mixins,http]
     }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  @media screen and (max-width:320px){
    .style{
      width:320px;
      height:100%;
    }
  }
</style>
