<template>
    <div class="perData">
      <group label-width="4.5em" label-margin-right="2em" label-align="left">
        <cell style="font-size: 14px;" title="头像">
          <img @click="addfile"  class="img" style="width:80px;" :src="headpic" alt=""/>
        </cell>
        <cell style="font-size: 14px;"   title="昵称" :value="nickname" link="/username">
        </cell>
        <cell style="font-size: 14px;" title="性别" @click.native='is_show=!is_show' :value="sex" ></cell>
        <cell style="font-size: 14px;" title="手机号" link="/phone" :value="mobile" ></cell>
      </group>
      <x-dialog v-model='is_show' class="radio" :hide-on-blur='true'>
        <group style='height:10em;' title="请选择">
          <radio :options="radio001" @on-change="change"></radio>
        </group>
      </x-dialog>
    </div>
</template>

<script type="es6">
  import {Popup,Group,PopupRadio,Radio,Confirm,Cell,XDialog,XInput,XButton,XSwitch,TransferDomDirective as TransferDom} from "vux"
  import mixins from "../../vuex/mixin.js"
  import http from "../../ajax.js"
    import upload from "../../upload.js"
    export default {
        directives: {
        TransferDom
      },
      data(){
        return{
          show: false,
          show1:false,
          show5: false,
          showToast: false,
          showman:false,
          PopupRadio,
          auto:true,
          pageHeader:true,
          pageName:"个人资料",
          mobile:"15888888888",
          sex:"",
          bg:{white:false,grey:true},
          radio001:[{value:'男',key:'1'},{value:'女',key:'2'},{value:'保密',key:'0'}],
          user_id:'',
          pic_url:"",
          is_show:false,
          headpic:require('../../assets/images/person_03.png'),
          nickname:"昵称"
         }
      },
      methods:{
        isShow(){
          this.show=true
        },
        addfile(){
          var vm=this
          this.getPhotoAndUpload(function(ret){
            vm.apiPost("http://r.huileyi.com/home/uploadPersonDatum", { headpic: ret.data.url }).then((res) => {
                if (res.code=200)
                console.log(ret.data.url)
                  vm.headpic = typeof ret.data.url!="undefined"? ret.data.url : vm.headpic;
              })
          },function(r){
            console.log(JSON.stringify(r))
            //alert(JSON.stringify(r));
          })
        },
         change(value,key){
          let vm = this;
          this.apiPost("http://r.huileyi.com/home/uploadPersonDatum",{sex:value}).then((res)=>{
              if(res.code==200){
                vm.sex=key
                this.is_show=false
              }else{
                this.$vux.toast.show({
                    text: res.msg,
                    type: "warn"
                })
              }
          })
        }
      },
      mounted(){
        let vm=this;
        this.apiPost("http://r.huileyi.com/home/getUserDetail",{}).then((res)=>{
          if(res.code==200){
          console.log(res)
            vm.mobile=res.data.mobile
            vm.sex=res.data.sex
            vm.nickname=res.data.name
            vm.headpic=res.data.headpic?res.data.headpic:vm.headpic;
          }
        })
      },
      components:{
        Group,
        Cell,
        XInput,
        XSwitch,
        Popup,
        XButton,
        Confirm,
        Radio,
        PopupRadio,XDialog,
      },
      mixins:[mixins,http,upload]
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
  .perData{
    margin-top:-0.5rem;
  }
  .perData .img{
    position: relative;
    width: 80px;
    height: 80px;
    border-radius: 7px;
  }
  .perData .fileupload-button[data-v-4fb51cfe]{
    padding:0;
    width: 80px;
    height: 80px;
    z-index: 999;
    position: absolute;
    right:15px;
    top:10px;
    opacity: 0;
    outline: none;
  }
  .perData .weui-input{
    text-align: right!important;
  }
  .lf{
    float:left;
  }
  .rt{
    float:right;
  }
  .popup0 button{
    width:50px;
    height:30px;
    display: inline-block;
    border:0;
    outline:none;
    background-color: #EEEEEE;
  }
  .popup0 button:nth-child(2){
    color:#04BE02;
  }
  .weui-dialog__btn_primary{
    color:#FF4948;
  }
  .vux-popup-header-right{
    color:#FF4948!important;
  }
  .perData .radio .weui-cell{
    height:1.1rem;
  }
</style>
