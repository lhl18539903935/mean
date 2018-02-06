<template>
    <div>
      <router-link to="/login">
        <group style="text-align: center;margin:-0.5rem 0 0.8em 0;">
          <span style="padding:1rem 0;display: block;font-size: 14px;color:#767676">添加账号</span>
        </group>
      </router-link>
  <swipeout>
      <swipeout-item class="clearfix" v-for="(item,index) in this.loginList" :key="index" @click.native="changeAccount(item)">
        <div slot='content' class='vux-1px-b'>
        <img  style="width:2rem;border-radius:50%;float:left;margin:1rem;" src="../assets/images/login_01.png" alt=""/>
        <div style="float:left;margin:0.6rem 0 0 0 ;height:2.5rem;line-height:1rem;">
          <p style="font-size:14px;margin:0 0 0.5rem 0;color:#949494;">商家账号</p>
          <span style="font-size: 14px">{{item.mobile}}</span>
        </div>
        <div style="clear:both"></div>
        <icon  style="position:absolute;right:0;top:0;margin-top:1.5rem;" v-show="item.mobile==mobile" type="success-no-circle"></icon>
        </div>
         <div slot="right-menu">
           <swipeout-button @click.native.stop="deleteAccount(item,index)" type="warn">删除</swipeout-button>
         </div>
      </swipeout-item>
  </swipeout>    
    </div>
</template>

<script type="es6">
  import {Group,Cell,Icon,Swipeout, SwipeoutItem, SwipeoutButton} from 'vux'
    export default {
      data(){
        return{
        pageName:"切换账户",
        state:0,
        bg:{white:false,grey:true},
        loginList:[],
        list:[{msg:"商家账号", msg1:"158846465464",show:true,src:require("../assets/images/login_01.png")},
              {msg:"商家账号", msg1:"158846465464",show:true,src:require("../assets/images/login_01.png")},
              {msg:"商家账号", msg1:"158846465464",show:true,src:require("../assets/images/login_01.png")}
          ],
          mobile:''
        }
      },
      methods:{
        deleteAccount(item,index){
          if(item.mobile == this.mobile) {
            this.$vux.toast.show({
                text: '不能删除当前账户！',
                type: "warn"
            })
            return;
          };
            //let curr=JSON.parse(localStorage.getItem(this.mobile));
            console.log('this.loginList')
            console.log(this.loginList)
            this.loginList.splice(index,1);
            localStorage.setItem('exchangeAccount',JSON.stringify(this.loginList));

        },
        changeAccount(item){
          if(item.mobile == this.mobile) {
            this.$vux.toast.show({
                text: '当前账户已登录！',
                type: "warn"
            })
            return;
          };


            ;
          //let curr=localStorage.getItem(this.mobile)
          //localStorage.setItem(item.mobile,curr);
          //localStorage.removeItem(this.mobile);

          localStorage.setItem('token',item.token);
          localStorage.setItem('mobile',item.mobile);
          localStorage.setItem('checkMerchant','');

           this.$vux.toast.show({
                text: '切换成功',
                type: "success"
            })
          this.$router.push('/')

        }
      },
      mounted(){

        /*let vm=this
        this.apiPost("http://r.huileyi.com//home/getUserMessage",{}).then((res)=>{
          vm.data=res.data.mobile
           vm.loginList=[{msg1:res.data.mobile}]
           console.log(vm.loginList)
        });*/
        this.mobile=localStorage.getItem('mobile');
        //this.loginList=JSON.parse(localStorage.getItem(this.mobile));
        this.loginList=JSON.parse(localStorage.getItem('exchangeAccount'));

      },
      components:{
        Group,Cell,Icon,Swipeout, SwipeoutItem, SwipeoutButton
      },
      mixins:[mixins,http]
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
