<template>
  <div class="myBink">
    <div style="position:absolute;top:2.5rem;left:0;right:0;bottom:0;overflow:scroll;margin-bottom:3rem"> 
    <van-pull-refresh v-model="isLoading" style="height:100%;text-align:center">
       <div   v-waterfall-lower="loadMore" waterfall-disabled="disabled" waterfall-offset="400" style="margin-top:0rem;">
        <group v-for="(item,index) in list" :key="index" class="top" @click.native='truecard(item.card_id)'>
          <cell :title="item.owner_name" text-align="left"  class="headTitle" style="font-size: 14px;padding-top:14px;padding-bottom:14px;text-align:left" :value="item.card_bank" >
          </cell>
          <cell  style="font-size: 14px;padding-top:14px;padding-bottom:14px;">{{item.card_below}}{{"("+item.card_number+")"}}
            <img slot="icon" class="img" v-show="state==index" width="18"  style="display:inline-block;margin:-1px 5px 0 0 ;vertical-align: top" src="../../assets/moren.png" alt=""/>
            <span slot="icon" v-show="state==index" style="margin-top:0;display: inline-block">默认</span>
          </cell>
        </group>
      </div>
  </van-pull-refresh>
    <p style='width:50%;margin:0 auto;margin-top:20%' v-if='add'>您还没有添加银行卡，请添加!</p>
       <popup v-model="show2" >
        <div class="popup0">
          <!--<group>
            <cell v-for="(item,i) in menu7" :key="i" @click.native="click(i,item)" :title="item.value"></cell>
          </group>-->
          <x-button  v-for="(item,i) in menu7" :key="i" @click.native="click(i,item)" >{{item.value}}</x-button>
        </div>
      </popup>
      </div>
  </div>
</template>

<script type="es6">
  import {Cell,Confirm,Popup,XButton} from "vux"
  import Group from '../../components/group/index.vue'
    import { Waterfall } from 'vant';
  import VanPullRefresh from '../../vant/packages/pull-refresh/index.vue'
    export default {
      components:{
        Cell,
        Group,
        Confirm,Popup,XButton,
        Waterfall,VanPullRefresh
      },
      data(){
        return {
          card_id:'',
          add:false,
          show2: false,
          currentPage:1,
          state:0,
          disabled:false,
          isLoading:false,
          bg:{white:false,grey:true},
          menu7: [{
            label: '选为默认',
            value:'选为默认',
            type: "text",position:'bottom',
          },{
            label: '删除',
            value:'删除'
          },{
            label: '编辑',
            value:'编辑'
          },{
            label: '取消',
            value:'取消'
          },],
          pageHeader:true,
          pageName:"我的收款账户",
          list:[],
          type:''
        }
      },
      watch:{
        isLoading(){
          if(this.isLoading){
            this.disabled=false;
            this.list=[];
            this.currentPage=1;
            this.getList()

          }
        }
      },
      directives: {
        WaterfallLower: Waterfall('lower'),
        WaterfallUpper: Waterfall('upper')
      },
      mounted:function(){
       this.getList()
       let binkState=this.$route.query.type
      },
      methods:{
      loadMore(){
        this.currentPage++
        this.getList()
      },
        getList(){
          let vm = this;
          let currentPage=this.currentPage
          this.apiPost(this.rhost+'/home/getUserCards', {page:currentPage}).then((res) => {
            this.isLoading=false
              if(res.code==229){
                  vm.add=true
                  return false
              }
            if(res.code == 200){
                  if(res.data.currentPage == res.data.totalPage || res.totalPage == 0){
                    this.disabled=true
                  }
                  for(let i in res.data.data){
                     vm.list.push(res.data.data[i])
                  }
               }
          })
        },
        click (key,item) {
          let vm = this;
          if(item.value=='删除'){
            this.show2=false
              this.$vux.confirm.show({
                title:'确定删除?',
                onCancel () {
                },

                onConfirm () {
                  vm.doaboutcardel("del")

                }
              })
          }
          if(item.value=='选为默认'){
            this.show2=false
            vm.doaboutcardel("changeuse")
          }
          if(item.value=='取消'){
            this.show2=false
          }
          if(item.value=='编辑'){
            this.show2=false
           if(this.type=="alipay"){
               this.$router.push({path: '/editbankcard?id='+ vm.card_id + '&type=zhifubao'});
              }else if(this.type=="bankcard"){
                 this.$router.push({path: '/editbankcard?id='+ vm.card_id});
              }
          }
        },
        doaboutcardel(type){
          let vm = this;
          this.apiPost(this.rhost+'/home/doAboutBankCard', {type:type,card_id:vm.card_id}).then((res) => {
               if(res.code==200){
                 this.$vux.toast.show({
                    text: res.msg,
                    type: "success"
                })
                 vm.currentPage=1;
                 vm.list=[];
                 vm.disabled=false;
                  vm.getList()

                 for(let a in vm.list){
                  if(vm.list[a].card_id == vm.card_id){
                    vm.list.splice(a,1)
                  }
                }
               }else{
                  this.$vux.toast.show({
                      text: res.msg,
                      type: "text",position:'bottom',
                  })
               }
          })
        },
        truecard(card_id){
        let vm=this
          this.card_id=card_id
          this.show2=true
          for(var i in this.list){
            if(this.list[i].card_id==card_id){
            this.type=this.list[i].account_type;

            }
          }
        }
      },
      mixins:[window.mixins,window.http]
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .myBink .top{
    margin-top:-0.5rem;
    color:#000;
  }
  .myBink .group{
    font-size: 14px;
  }
  .myBink .public{
    display:inline-block;
    width:6px;
    height:6px;
    border-top:2px solid #C9C9CE;
    border-right:2px solid #C9C9CE;
    transform: rotate(45deg);
  }
  .myBink .style{
    width:20px;
  }
  .lf{
    float:left;
  }
  .rt{
    float:right;
  }
  .myBink .valueShow{
    display:block;
  }
  .myBink .vux-label{
    color:#000;
  }
  .myBink .headTitle .weui-cell__ft{
    color:#000;
  }
  .myBink .weui-actionsheet{
    bottom: 2.9rem;
  }
  .myBink .popup0 .vux-label{
    text-align: center;
  }
  .myBink .popup0 .weui-cells{
    margin-top:0;
  }
  .myBink .weui-btn + .weui-btn{
    margin-top:0;
  }
  .myBink .popup0 button:nth-child(1){
    border-top-left-radius:0!important;
    border-top-right-radius:0!important;
    border-bottom-right-radius:0!important;
    border-bottom-left-radius:0!important;
    color:#1AAD19;
  }
    .myBink .popup0 button:nth-child(2){
    border-top-left-radius:0!important;
    border-top-right-radius:0!important;
    border-bottom-right-radius:0!important;
    border-bottom-left-radius:0!important;
    color:#E64340;
  }
    .myBink .popup0 button:nth-child(3){
    border-top-left-radius:0!important;
    border-top-right-radius:0!important;
    border-bottom-right-radius:0!important;
    border-bottom-left-radius:0!important;
  }
</style>
