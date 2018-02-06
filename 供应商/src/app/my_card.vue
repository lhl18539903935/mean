<template>
  <div class="myBink">
    <group v-for="(item,index) in list" :key="index" class="top" @click.native='truecard(item.card_id)'>
      <div class="group" style="padding:1rem 0;border:1px solid #ddd;border-bottom:none;width:100%;background-color: #fff;" >
        <span class="" style="width:40%;display: inline-block;padding-left:1rem;">{{item.owner_name}}</span>
        <div class="rt" style="margin-right:25px;vertical-align: middle">
          <!-- <img  class="style " style="vertical-align:middle;" :src="item.src" alt=""/> -->
          <span>{{item.card_below}}{{"("+item.card_number.slice(-4)+")"}}</span>
        </div>
      </div>
      <cell style="font-size: 14px;padding-top:14px;padding-bottom:14px;" :value="item.card_bank" >
        <img slot="icon" class="img" v-show="state==index" width="18"  style="display:inline-block;margin:-1px 5px 0 0 ;vertical-align: top" src="../assets/images/moren.png" alt=""/>
        <span slot="icon" v-show="state==index" style="margin-top:0;display: inline-block">默认</span>
      </cell>
    </group>
    <actionsheet v-model="show2" :menus="menu7" @on-click-menu="click" show-cancel></actionsheet>
    <p style='width:50%;margin:0 auto;margin-top:20%' v-if='add'>您还没有添加银行卡，请添加!</p>
  </div>
</template>

<script type="es6">
  import {Cell,Group,Actionsheet,Confirm} from "vux"
  import http from '../ajax.js'
    export default {
      components:{
        Cell,
        Group,
        Actionsheet,
        Confirm
      },
      data(){
        return {
          card_id:'',
          add:false,
          show2: false,
          state:0,
          bg:{white:false,grey:true},
          menu7: [{
            label: '选为默认',
            type: 'primary',
            value:'选为默认'
          },{
            label: '删除',
            type: 'warn',
            value:'删除'
          },{
            label: '编辑',
            value:'编辑'
          }],
          pageHeader:true,
          pageName:"我的收款账户",
          list:[],
          type:''
        }
      },
      mounted:function(){
       this.getList()
       let binkState=this.$route.query.type
      },
      methods:{
        getList(){
           let vm = this;
        this.apiPost("http://r.huileyi.com/home/getUserCards", {}).then((res) => {
            if(res.code==200){
                if(res.data.length==0){
                  vm.add=true
                }else{vm.list=res.data}
            }else{
                this.$vux.toast.show({
                    text: res.msg,
                    type: "warn"
                })
            }
        })
        },
        click (key,item) {
    
          // console.log(key)
          let vm = this;
          if(key=='删除'){
              this.$vux.confirm.show({
                title:'确定删除?',
                onCancel () {
                },
                onConfirm () {
                  vm.doaboutcardel("del")
                  // if(vm.go==200){
                    //this.$router.go(0)
                  // }
                }
              })
          }
          if(key=='选为默认'){

            vm.doaboutcardel("changeuse")

          }
          if(key=='编辑'){
           if(this.type=="alipay"){
               this.$router.push({path: '/add_zhifubao?id='+ vm.card_id});
              }else if(this.type=="bankcard"){
                 this.$router.push({path: '/editbankcard?id='+ vm.card_id});
              }
          }
        },
        doaboutcardel(type){
          let vm = this;
          this.apiPost("http://r.huileyi.com/home/doAboutBankCard", {type:type,card_id:vm.card_id}).then((res) => {
               console.log(res)
               if(res.code==200){
                 this.$vux.toast.show({
                    text: res.msg,
                    type: "success"
                })
                this.getList()
               }else{
                  this.$vux.toast.show({
                      text: res.msg,
                      type: "warn"
                  })
               }
          })
        },
        truecard(card_id){
        let vm=this
          this.card_id=card_id
          this.show2=true
          console.log(this.list)
          for(var i in this.list){
            if(this.list[i].card_id==card_id){
            this.type=this.list[i].account_type;

            }
          }
        }
      },
      mixins:[window.mixins,http]
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
    color:#8D8D8D;
  }

</style>
