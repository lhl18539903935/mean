<template>
  <div>
    <group>
      <div class="over">
        <p style='margin-bottom:3%'>{{question}}</p>
        <p class="bol"></p>
        <p>{{anser}}</p>
      </div>
    </group>
    <group>
      <div class='over'>
        <p class='left'>还没有解决问题？</p>
        <p class='right blue' @click.stop='is_show=true'><span class="left wie"><img src="../assets/write.png"></span><span class="right">继续申诉</span></p>
      </div>
    </group>
    <x-dialog v-model='is_show' :hide-on-blur='true'>
        <div class='appeal'>
          <p class='appeal_title'>申诉</p>
          <textarea v-model='appealContent' class='appeal_content' placeholder="请输入您要申诉的内容"></textarea>

          <div style='width:80%;margin:0 auto;margin-top:0.5em;'>
              <div @click='is_show=false' style="float:left;height:2em;width:6em;line-height:2em;border-radius:5px;;border:1px solid #ccc;">取消</div>
              <div @click='appeal' style="float:right;height:2em;width:3em;background-color:#6594fe;line-height:2em;color:#fff;border-radius:5px;width:6em;">确定</div>
              <div style='clear:both;'></div>
          </div>
        </div>
    </x-dialog>
  </div>
</template>

<script type="es6">
  import {Group,Cell,Flow,FlowState,FlowLine,XDialog} from 'vux'
  import FormPreview from '../components/form-preview/index'
  import format from '../tools/date/format.js'
  export default {
    data(){
    return{
      pageHeader:true,
      pageName:"查看申诉详情",
      bg:{white:false,grey:true},
      question:'',
      anser:'',
      is_show:false,
      appealContent:'',
      qrcode_id:''
    }
  },
  methods:{
    appeal(){
      let vm=this;
      let content=this.appealContent;
      let qrcode_id=this.qrcode_id;
      if(!content){
          this.$vux.toast.show({
              text: '请输入申诉内容！',
              type: "text",position:'bottom',
          })
          return;
      }
      this.apiPost(this.phost+'/Dls/qrcodeAppeal', {qrcode_id:this.qrcode_id,appeal:content}).then((res) => {
        if(res.code==200){
            this.$vux.toast.show({
              text: res.msg,
              type: "success"
          })
            this.$router.push('/complaint')
            this.is_show=false;
        }else{
          this.$vux.toast.show({
              text: res.msg,
              type: "text",position:'bottom',
          })
        }

      })

    },
  },
  mounted:function() {
    let vm = this;
    this.apiPost(this.phost+'/Dls/qrcodeAppealDetail',{id:this.$route.query.id}).then((res) => {
      if(res.code==200){
        vm.question=res.data.appeal;
        vm.anser=res.data.reason;
        vm.qrcode_id=res.data.qrcode_id;
      }
      if(res.code==400){
        this.$router.go(0)
      }else{

      }
    })
  },
  components:{
      Group,
      Cell,
      FormPreview,
      Flow,
      FlowState,
      FlowLine,
      XDialog
  },
  mixins:[window.mixins,window.http]
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .left{
    float: left;
  }
  .right{
    float: right;
  }
  .over{
    overflow: hidden;
    padding:3% 3%;
    font-size: 14px;
  }
  .blue{
    color:#6594fe;
    overflow: hidden;
    width: 23%
  }
  .blue img {
    width: 100%;
  }
  .bol{
    width: 100%;
    margin: 0 auto;
    height: 1px;
    background: #eee;
    margin-bottom: 3%
  }
  .wie{
    width: 15%
  }
  .appeal{width:90%;margin:0 auto;background-color: #fff;border-radius: 10px;padding-bottom: 15px;font-size: 14px;}
  .appeal_title{font-size: 16px;color:#6594fe;height:2.5em;line-height: 2.5em;}
  .appeal_content{width:90%;border:1px solid #eee;height:8em;border-radius: 5px;    text-indent: 6%;
      padding-top: 2%;}
  .appeal_content::-webkit-input-placeholder{height:2em;line-height: 2em;}
  .appeal_content::-moz-placeholder{height:2em;line-height: 2em;}
  .appeal_content::-ms-input-placeholder{height:2em;line-height: 2em;}
</style>
