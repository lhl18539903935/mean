<template>
  <div>
    <div class="content" v-html='contebt'>

    </div>
    <countdown style="display:none;" class='fonts' slot="value" v-model="time1" :start="start" @on-finish="finish2"></countdown>
    <div><x-button :style="styleObject" @click.native='truetal' class="btn" :disabled='disable001'>已确认合同内容并同意<span v-if="time1">{{time1}}s</span></x-button></div>
  </div>
</template>

<script>
  import {XButton,Countdown} from 'vux'
  export default {
    components:{
      XButton,
      Countdown
    },
    data(){
      return{
        pageHeader:true,
        pageName:'请同意合同内容',
        value:'',
        time1:5,
        disable001:true,
        start: false,
        contebt:'',
        bg:{white:true,grey:false},
        styleObject:{
          background:'#bbb',
          color:'#fff'
        }
      }
    },
    methods:{
      finish2(index){
        this.start = false
        this.disable001=false
        this.time1=0
        this.styleObject={
          background:'#6594fe',
          color:'#fff'
        }
      },
      truetal(){
        if(localStorage.getItem('ziliao')==0){
          this.$router.push({path: '/Perfectdata'});
        }else{
          window.location.href="/"
        }
      }
    },
    mixins:[window.mixin,window.http],
    mounted:function(){
        this.apiPost(this.phost+'/home/getClause', {}).then((res) => {
            if(res.code==230){this.$vux.toast.show({
                text: res.msg,
                type: "text",position:'bottom',
            })}else{
                this.contebt=res.data.content
                this.start=true

            }
        })

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .content{
    width:90%;
    margin:1rem auto;
  }
  .btn{
    width:90%;
    margin:0 auto;
  }
</style>
