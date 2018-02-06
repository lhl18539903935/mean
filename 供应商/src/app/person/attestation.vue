<template>
    <div class='certification'>
      <group>
        <div>
          <img class="img" style="width: 80px;height: 80px;float: left;margin: 1rem 0 1rem 1rem;border-radius: 5px;" :src="headpic" alt=""/>
          <div class="rt" style="margin:2rem 1rem 1.5rem 0;font-size: 14px;text-align: right">
            <p v-model="name">{{userData.name}}</p>
            <span style="margin-top:1rem;display:inline-block;color:#6594fe">
              <img v-if="userData.idcard_status==1" src="../../assets/images/yrenzheng.png" style="width:16px;vertical-align: middle;
              margin:-5px 5px 0 0 ;" alt=""/>
              <img v-if="userData.idcard_status==0" src="../../assets/images/wrenzheng.png" style="width:18px;vertical-align: middle;
              margin:-3px 5px 0 0 ;" alt=""/>
              {{userData.idcard_status==0?'未认证':(userData.idcard_status==1?'认证通过':'认证拒绝')}}
            </span>
          </div>
        </div>
        <div style="clear:both"></div>
      </group>
      <group>
        <cell v-if='renzhengzhuangtai==1' class="font" title="姓名"  :value='userData.name'></cell>
        <cell v-if='renzhengzhuangtai!=1' class="font" title="姓名"  :value='userData.name' is-link link='/rename?type=name'></cell>
        <cell v-if='renzhengzhuangtai==1' class="font" title="身份证号" :value="userData.idcard"></cell>
        <cell v-if='renzhengzhuangtai!=1' class="font" title="身份证号" :value="userData.idcard" is-link link='/rename?type=idcard'></cell>
        <cell v-if='renzhengzhuangtai==1' class="font" title="身份证有效期" :value="value"></cell>
        <datetime v-if='renzhengzhuangtai!=1' @on-change='change'  style='font-size:14px;' v-model="value" title="身份证有效期"></datetime>

        <cell  class="font" title="身份证正面" is-link link='/addCard?type=front'>

          <span name='value'><span  :class='{black:userData.card_positive_img}'>{{getState(userData.card_positive_img)}}</span></span>
        </cell>
        <cell class="font" title="身份证背面"  is-link link='/addCard?type=back'>
          <span name='value'><span  :class='{black:userData.card_negative_img}'>{{getState(userData.card_negative_img)}}</span></span>
        </cell>
      </group>

    </div>
</template>

<script type="es6">
  import {Group,XButton,FlexboxItem,Flexbox,XInput,Datetime,Cell} from "vux"
  import format from '../../tools/date/format.js'

    export default {
      data(){
        return{
          bg:{white:false,grey:true},
          userData:{},
          value:'',
          datas:'',
          auto:true,
          name:"惠乐益",
          pageHeader:true,
          pageName:"实名认证",
          headpic:require('../../assets/images/person_03.png'),
          renzhengzhuangtai:'',
        }
      },
      methods:{
        change () {
          // if(this.renzhengzhuangtai == 1) return;

          let date=(new Date(this.value).getTime())/1000;

          let vm = this;
          this.apiPost("http://p.huileyi.com/Dls/dlsPerfectData",{idcard_end_time:date}).then((res)=>{
              if(res.code == 200){
                /*this.$vux.toast.show({
                      text: '保存成功',
                      type: "success"
                  })*/
              }
              vm.getData()
          })

        },
        idshowtal:function(data){
          this.idshow=true;
          this.pageHeader=false
          this.datas=data
          if(data == 1 && this.zsz){
            this.addimg=this.zsz;
          }

          if(data == 2 && this.zsf){
            this.addimgs=this.zsf;
          }

          console.log(this.zsz)
        },
        getState(val){
            return val?'已添加':'未添加';
        },

        getData(){
          let vm=this;
            this.apiPost("http://p.huileyi.com/Dls/idcardAuthen",{}).then((res)=>{
            if(res.code==200){
              if(res.data.idcard_end_time){
                vm.value=format((res.data.idcard_end_time*1000),'YYYY-MM-DD');
              }
              vm.userData=res.data;
              if(res.data.idcard_status==1){vm.renzhengzhuangtai=1}
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
        this.getData();
        let vm = this;
        this.apiPost("http://r.huileyi.com/home/getUserMessage",{}).then((res)=>{
            if(res.data.headpic){
              vm.headpic=res.data.headpic
            }
        })
      },
      components:{
        Group,
        Cell,
        XButton,
        FlexboxItem,
        Flexbox,
        XInput,
        Datetime
      },
      mixins:[window.mixins,window.http]
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
  .certification  .lf{
    float:left;
  }
  .certification  .rt{
    float:right;
  }
  .certification  .font{
    font-size: 14px;
    padding-top:14px;
    padding-bottom:14px;
  }
  .certification  .img{
    position: relative;
  }
  .black{color:#000;}
  .certification .weui-cells{margin-top: 10px;}
</style>
