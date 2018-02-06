<template>
  <div class="main">
    <div class="content">
      <router-link v-if="stauts==0&&listnone==true" to="/addshoukuan">
        <div class="cell">
          <b>+</b>
          <span>添加收款账户</span>
        </div>
      </router-link>
      <router-link v-if="stauts==0&&listnone==false" to="/my_card">
        <div class="cell">
          <b>+</b>
          <span>请选择默认收款账户</span>
        </div>
      </router-link>
      <router-link v-if="stauts==1" to="/my_card">
        <div class="cell">
          <span style='float:left'>{{name}}(点击选择其它)</span>
          <span style='float:right'>{{bank}}{{"("+cardnum+")"}}</span>
        </div>
      </router-link>
      <div class="ipt">
        <div>
          <span class="lf">可提现金额</span>
          <span class="rt" style="color:#3879D9">￥{{canCash | setDecimal}}</span>
        </div>
        <div style="clear:both;"></div>
        <div>
          <input  type="text"  placeholder="输入提现金额" v-model="money" style="background-color: #F4F4F4;font-size: 16px;text-align: left"/>
          <span>元</span>
        </div>
      </div>
    </div>
    <div style="width:90%;margin:0.5rem auto;">
      <x-button style="background-color: #6594fe;font-size: 14px;color:#fff;" @click.native='sumit' >确认提现</x-button>
    </div>
    <div><cell style='color:#999999;font-size:14px;' title="最近提现记录" value="更多" is-link link='/twithdraw'></cell></div>
    <div style="width:100%;background-color: #fff;">
      <div  style="font-size: 12px;text-align: center;">
        <div style="width:100%;">
          <div class="tixian-one" style='border-top:none;'>提现时间</div>
          <div class="tixian-one" style='border-top:none;'>提现金额</div>
          <div class="tixian-one" style='border-top:none;'>提现状态</div>
          <!-- <div class="tixian-one" style='border-top:none;'>所属门店</div> -->
        </div>
        <div v-for='(i,index) in tixian' :key="index" style="overflow: hidden;width: 99%;">
          <div class="tixian-one">{{i.time}}</div>
          <div class="tixian-one">{{i.cash_money}}</div>
          <div v-if='i.status=="2"' class="tixian-one red" @click.stop='faild(i.log_id)'>审核失败(点击查看)</div>
          <div v-if='i.status=="0"' class="tixian-one">待审核</div>
          <div v-if='i.status=="1"' class="tixian-one">审核中</div>
          <div v-if='i.status=="3"' class="tixian-one">提现成功</div>
          <!-- <div class="tixian-one">{{i.store_name}}</div> -->
        </div>
        <div style="clear:both;"></div>
      </div>
      <!-- <div v-if="no_item" style="text-align:center;margin:10px 15px;background: #fff;color: #e5e5e5;">暂无记录</div> -->
    </div>
  </div>
</template>

<script type="es6">
    import {Group,Cell,XButton} from "vux"
    export default {
      components:{
        Group,
        Cell,
        XButton
      },
      data(){
        return{
          pageHeader:true,
          bg:{white:false,grey:true},
           pageName:"提现",
           tixian:[],
           money:"",
           stauts:'',
           canCash:'',
           name:'',
           bank:'',
           cardnum:'',
           bankName:'',
           card_id:'',
           is_show:false,
           title:'请选择门店',
           // type:1,
           shoplist:[],
           listnone:false
        }
      },
      filters:{
          setDecimal(val){
                val=val?val:0;
                let num=parseFloat(val);
               return parseFloat((Math.floor(num*100))/100).toFixed(2);
            }
      },
      mounted:function(){
        this.apiPost(this.rhost+'/Dlsgains/dlsPercentage', {}).then((res) => {
          if(res.code==200){
            vm.canCash=parseFloat(res.data.can_cash_money);

        }else{
            this.$vux.toast.show({
                text: res.msg,
                type: "text",position:'bottom',
            })
        }
        })
        let vm = this;
        this.apiPost(this.rhost+'/home/getDefaultCard', {}).then((res) => {
             if(res.code==200){
               vm.stauts=1
                vm.name=res.data.owner_name;
                vm.bank=res.data.card_below;
                vm.cardnum=res.data.card_number.slice(-4);
                vm.card_id=res.data.card_id
                let binkName=localStorage.setItem('binkName',res.data.card_below)

             }else{
                this.$vux.toast.show({
                    text: res.msg,
                    type: "text",position:'bottom',
                })
                vm.stauts=0
             }
        })
        this.apiPost(this.rhost+'/home/getUserCards', {}).then((res) => {
             if(res.code==229){
                vm.listnone=true
             }else{
                vm.listnone=false
             }
        })
        this.apiPost(this.rhost+'/Dlsgains/dlsCashRecord ', {}).then((res) => {
             if(res.code==200){
                  vm.tixian=res.data.data.slice(0,4)
             }else{
                this.$vux.toast.show({
                    text: res.msg,
                    type: "text",position:'bottom',
                })
             }
        })
      },
      methods:{
        faild:function(id){
          this.$router.push({path: '/shenhenolist?id='+id});
        },
        onChange:function(val,i) {
          this.type=val
          this.title=i
        },
        sumit:function(){
          if(this.money.length==0){
            this.$vux.toast.show({
                text: '请输入提现金额',
                type: "text",position:'bottom',
            })
            return false
          }
          if(isNaN(this.money)){
          this.$vux.toast.show({
            text:"请输入提现金额",
            type:"text",
            position:'bottom'
             })
          return;
        }
          if(this.money%100!= 0 || this.money == 0){
            this.$vux.toast.show({
              text: '提现金额需为100的整数倍',
              type: "text",position:'bottom',
            })
            return
          }
          if(this.stauts==0){
            this.$vux.toast.show({
                text: '请先添加选择银行卡',
                type: "text",position:'bottom',
            })
            return false
          }else{
            let vm = this;
            this.apiPost(this.rhost+'/Dlsgains/dlsApplyToCash', {card_id:vm.card_id,cash_money:vm.money}).then((res) => {
                 let binkName=localStorage.getItem('binkName')
                if(res.code==200){
                  this.$vux.toast.show({
                        text: res.msg,
                        type: "success"
                  })
                  let shenqinglist = {
                    time:res.data.get_money_time,
                    card:binkName+' '+'尾号'+' '+res.data.card_number.slice(-4),
                    timoney:res.data.cash_money,
                    shouxufei:res.data.poundage,
                  }
                  localStorage.setItem('shenqinglist',JSON.stringify(shenqinglist));
                  this.$router.push({path: '/tj_success'});
                }else{
                    this.$vux.toast.show({
                        text: res.msg,
                        type: "text",position:'bottom',
                    })
                }
            })
          }
        }
      },
      mixins:[window.mixins,window.http]
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
    color:#6594fe;
  }
  .ipt{
    width:90%;
    margin:0 auto;
    text-align: center;
  }

  .ipt div:first-child span{
    display: inline-block;
    padding:0.5rem 0.5rem 0 0;
    font-size: 14px;
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
  .main .box-shadow {background-color: #fff;position: relative;top: 0;z-index: 10;-webkit-box-shadow: 0 0 10px rgba(0, 204, 204, .5);-moz-box-shadow: 0 0 10px rgba(0, 204, 204, .5);box-shadow: 0 0 10px rgba(0, 204, 204, .5);
  }
  .main .downbar{border-bottom: 1px solid #eee;z-index:8000;}
  .main .tixian-one{width:33.3%;float:left;padding:10px 0;border-top:1px solid #e5e5e5;}
  .red{
    color: red;
  }

</style>
