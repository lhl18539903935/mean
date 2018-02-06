<template>
  <div class="main">
    <div class="content">
      <router-link v-if="stauts==0" to="/addshoukuan">
        <div class="cell">
          <b>+</b>
          <span>添加收款账户</span>
        </div>
      </router-link>
      <router-link v-if="stauts==1" to="/my_card">
        <div class="cell">
          <span style='float:left'>{{name}}(点击选择其它)</span>
          <span style='float:right'>{{bank}}{{"("+cardnum+")"}}</span>
        </div>
      </router-link>

      <div @click.stop='is_show=!is_show' class='topbar'>
        <span>{{title}}</span><span v-show='!is_show' class="strecth" >   ▼   </span>
        <span v-show='is_show' class="strecth" >▲</span>
        <div v-if='is_show' class='downPanel box-shadow'>
           <div v-for='(i,index) in shoplist' v-show='type != index'  @click='onChange(i.store_id,i.store_name)'  class='downbar'>{{i.store_name}}</div>
        </div>
      </div>
      <div class="ipt">
        <div>
          <span class="lf">可提现金额</span>
          <span class="rt" style="color:#3879D9">￥{{money}}</span>
        </div>
        <div style="clear:both;"></div>
        <div>
          <input  type="text" v-model='money' placeholder="请输入提现金额" style="background-color: #F4F4F4;width:80%;font-size: 16px;text-align: left"/>
          <span >元</span>
        </div>
      </div>
    </div>
    <div style="width:90%;margin:0.5rem auto;">
      <x-button style="background-color: #FF4948;font-size: 16px;color:#fff;" @click.native='sumit' >确认提现</x-button>
    </div>
    <div><cell style='color:#999999' title="最近提现记录" value="更多" is-link link='/twithdraw'></cell></div>
    <div style="width:100%;background-color: #fff;">
      <div  style="font-size: 12px;text-align: center;padding:10px 15px;">
        <div style="width:100%;">
          <div class="tixian-one" style='border-top:none;'>提现时间</div>
          <div class="tixian-one" style='border-top:none;'>提现金额</div>
          <div class="tixian-one" style='border-top:none;'>提现状态</div>
          <div class="tixian-one" style='border-top:none;'>所属门店</div>
        </div>
        <div v-for='i in tixian' style="overflow: hidden;width: 99%;">
          <div class="tixian-one">{{i.time}}</div>
          <div class="tixian-one">{{i.cash_money}}</div>
          <div v-if='i.status=="审核失败"' class="tixian-one red" @click.stop='faild(i.id)'>{{i.status}}(点击查看)</div>
          <div v-if='i.status!="审核失败"' class="tixian-one">{{i.status}}</div>
          <div class="tixian-one">{{i.store_name}}</div>
        </div>
        <div style="clear:both;"></div>
      </div>
      <!-- <div v-if="no_item" style="text-align:center;margin:10px 15px;background: #fff;color: #e5e5e5;">暂无记录</div> -->
    </div>
  </div>
</template>

<script type="es6">
    import {Group,Cell,FormPreview,XButton} from "vux"
    import http from "../ajax.js"
    export default {
      components:{
        Group,
        Cell,
        FormPreview,
        XButton
      },
      data(){
        return{
          bg:{white:false,grey:true},
           pageName:"提现记录",
           tixian:[],
           money:"",
           stauts:'',
           name:'',
           bank:'',
           cardnum:'',
           card_id:'',
           is_show:false,
           title:'请选择门店',
           type:1,
           shoplist:[]
        }
      },
      mounted:function(){
        let vm = this;
        this.apiPost("http://r.huileyi.com/home/getDefaultCard", {}).then((res) => {
             console.log(res)
             if(res.code==200){
               vm.stauts=1
                vm.name=res.data.owner_name;
                vm.bank=res.data.card_below;
                vm.cardnum=res.data.card_number.slice(-4);
                vm.card_id=res.data.card_id
             }else{
                vm.stauts=0
             }
        })
        this.apiPost("http://r.huileyi.com/store/getMyStore", {}).then((res) => {
             console.log(res)
             if(res.code==200){
               vm.shoplist=res.data;

             }else{

             }
        })
        this.apiPost("http://r.huileyi.com/income/cashRecord", {}).then((res) => {
             if(res.code==200){
               vm.tixian=res.data;
             }else{

             }
        })
      },
      methods:{
        faild:function(id){
          // console.log(id)
          this.$router.push({path: '/shenhenolist?id='+id});
        },
        onChange:function(val,i) {
          this.type=val
          this.title=i
          // console.log(this.type)
          // console.log(i)
        },
        sumit:function(){
        let regMoney=/^[1-9]\d*(,\d{3})*(\.\d{2})?$/;
          if(!regMoney.test(this.money)){
            this.$vux.toast.show({
                text: '请输入正确金额',
                type: "warn"
            })
            return false
          }
          if(this.money.length==0){
            this.$vux.toast.show({
                text: '请输入提现金额',
                type: "warn"
            })
            return false
          }if(this.stauts==0){
            this.$vux.toast.show({
                text: '请先添加选择银行卡',
                type: "warn"
            })
            return false
          }if(this.type==1){
            this.$vux.toast.show({
                text: '请先选择门店',
                type: "warn"
            })
          }else{
            let vm = this;
            this.apiPost("http://r.huileyi.com/Income/applyToCash", {card_id:vm.card_id,cash_money:vm.money,store_id:this.type}).then((res) => {
                 console.log(res)
                if(res.code==200){
                  this.$vux.toast.show({
                        text: res.msg,
                        type: "success"
                  })
                  let shenqinglist = {
                    time:res.data.get_money_time,
                    card:res.data.card_bank+res.data.card_bumber.slice(-4),
                    timoney:res.data.cash_money,
                    shouxufei:res.data.poundage,
                  }
                  localStorage.setItem('shenqinglist',JSON.stringify(shenqinglist));
                  this.$router.push({path: '/tj_success'});
                }else{
                    this.$vux.toast.show({
                        text: res.msg,
                        type: "warn"
                    })
                }
            })
          }
        }
      },
      mixins:[window.mixins,http]
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .main .cell{
    width:90%;
    margin:1rem auto;
    padding-top:10px;
    padding-bottom:10px;
    border-bottom:1px solid #ddd;
    font-size: 14px;
    text-align: center;
    line-height:20px;
    color:#000;
    overflow: hidden;
    margin-bottom: .2rem;
  }
  .main .cell b{
    font-size: 22px;
    color:#FF4948;
  }
  .ipt{
    width:90%;
    margin:0 auto;
    text-align: center;
  }

  .ipt div:first-child span{
    display: inline-block;
    padding:0.5rem 0.5rem 0 0;
  }
  .ipt div:nth-child(3) {
    width:100%;
    margin:1rem auto;
    background-color: #F4F4F4;
    border-radius: 5px;
  }
  .ipt div:nth-child(3) input{
    margin:1rem 0;
    border:0;
    outline:none;
  }
  .content{
    height:219px;
    width:90%;
    margin:1rem auto;
    background-color: #fff;
    border-radius: 7px;
  }
  .lf{
    float:left;
  }
  .rt{
    float:right;
  }
  .main .topbar{height:3em;line-height: 3em;text-align: center;background-color: #fff;width:100%;z-index: 100;z-index:1000;}
  .main .strecth{
        display:inline-block;/*让span变为块状元素，只有块状元素可以缩放*/
        transform:scale(1,0.5);/*缩放属性；两个参数：(水平缩放比例,垂直缩放比例)；1表示原比例*/
        /*私有缩放属性，为了兼容各浏览器；注：不兼容IE8以下浏览器*/
        -ms-transform:scale(1,0.5);
        -webkit-transform:scale(1,0.5);
        -moz-transform:scale(1,0.5);
        -o-transform:scale(1,0.5);
    }
  .main .downPanel{text-align: center;width:98%;background-color: #fff;border:1px solid #eee;z-index: 8000;position: relative;margin:0 auto;top:5px;}
  .main .box-shadow {background-color: #fff;position: relative;top: 0;z-index: 10;-webkit-box-shadow: 0 0 5px rgba(0, 0, 0, .3);-moz-box-shadow: 0 0 5px rgba(0, 0, 0, .3);box-shadow: 0 0 5px rgba(0, 0, 0, .3);
  }
  .main .downbar{border-bottom: 1px solid #eee;z-index:8000;}
  .main .tixian-one{width:25%;float:left;padding:10px 0;border-top:1px solid #e5e5e5;}
  .red{
    color: red;
  }
</style>
