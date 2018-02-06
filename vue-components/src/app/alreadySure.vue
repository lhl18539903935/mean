<template>
  <div class="data">
    <div class="title">
      <div class="leftjt"  @click="Tologin">
          <i></i>
      </div>
      <div class="rightcontent">
            {{pageName}}
      </div>
    </div>
    <div class="datacontent">
      <!--<div class="content" v-if="showcontent" v-html='contebt'>
      </div>-->
      <div class="content" v-if="showcontent"  v-occupy="{data:contebt,config}"></div>
      <div style="width:90%;margin:3rem auto ;">
        <x-button v-if='myDisabled' :disabled='myDisabled' class="btn" >
          <span >请确认协议内容并同意({{second}})</span>
        </x-button>
        <x-button v-if='!myDisabled'  link='/perfectData' class="btn1">
          <span >已确认协议内容并同意</span>
        </x-button>
      </div>
    </div>
  </div>
</template>

<script type="es6">
  import {XButton,Cell} from 'vux'
    export default {
      data(){
      return{
        pageName:'协议内容',
        pageFooter:false,
        second:5,
        msg:"",
        contebt:"",
        config:{
          width:'100%',
          height:'500px'
        },
        pageNamestate:'',
        showcontent:true,
        myDisabled:true,
        pageNameshow:false,
        pageHeader:true,
        bg:{white:true,grey:false},
      }
    },
      components:{
        XButton,Cell
      },
      methods:{
        Tologin(){
                 this.$router.push('/login')
        }

      },
    mounted(){
      // header替换
      this.pageNamestate=this.$route.query.alreadySure
      if(this.pageNamestate!=''){
        this.$store.commit("setHeader", false)
      }
      this.apiPost(this.rhost+'/Home/getClause',{plat:1,type:1}).then((res)=>{
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
.data .title{
  background-color: #6594FE;
  width:100%;
  text-align: center;
  position: absolute;
  top:0;
  height:40px;
  line-height: 40px;
  color:#fff;
  font-size: 18px;
}
.data i{
  display: inline-block;
  width:10px;
  height:10px;
  border-top:2px solid #fff;
  border-left:2px solid #fff;
  transform: rotate(-45deg);
  position: absolute;
  top:15px;
  left:18px;
}
.data .leftjt{
  width:20%;
  height:40px;
  float:left;
  box-sizing: border-box;
}
.data .rightcontent{
  width:80%;
  height:40px;
  box-sizing: border-box
}
.data .datacontent{
    position:absolute;
    top:3rem;
    left:0;
    right:0;
    bottom:0;
    overflow:scroll;
}
  .data .content{
    width:90%;
    margin:1rem auto;
    font-size: 14px;

  }
  .data .content p{
    opacity: 1!important;
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
