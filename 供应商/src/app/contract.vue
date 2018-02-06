<template>
    <div>
      <div class="content">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;合同的内容,即合同的当事人订立合同的个性具体意思表示,具体体现为合同的各项条款,
        《合同法》第12条规定:"合同的内容由当事人约定一般应包括以下条款:
        </br>
          (一)当事人的名称或者姓名和住所;</br>
          (二)标的;</br>
          (三)数量;</br>
          (四)质量;</br>
          (五)价款或者报酬;</br>
          (六)履行期限、地点和方式;</br>
          (七)违约责任;</br>
          (八)解决争议的方法。当事人可以参照各类合同的示范文本订立合同。"</br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;合同生效后,当事人就质量、报价或者报酬、旅行地点等内容没有约定或者约定不明确的,
          可以协议补充;不能达成补充协议的,按照合同有关条款或者交易习惯确定。
        当事人就有关合同内容约定不明确,依照前叙述规定仍不能确定的,适用下列规定:</br>
        &nbsp;&nbsp;&nbsp;&nbsp;①质量要求不明确的,按照国家标准、行业标准履行;没有国家标准、行业标准的,按照通常标准或者符合合同
        目的的特定标准履行。</br>
        &nbsp;&nbsp;&nbsp;&nbsp;②报价或者酬劳不明确的,按照订立合同时履行地的市场价格履行;依法应当执行政府定价或者
        政府指导价的,按照规定履行
      </div>

      <div style="width:90%;margin:0 auto;margin-bottom:1em;">
        <x-button type="warn" :disabled='myDisabled' link='/activity'> 
        <span v-if='myDisabled'>请阅读合同内容({{second}})</span>
        <span v-if='!myDisabled'>已确认合同内容并同意</span>
        </x-button>
      </div>
    </div>
</template>

<script type="es6">
  import {XButton} from 'vux'
    export default {
      data(){
      return{
        pageName:'请同意协议内容',
        pageFooter:false,
        second:5,
        myDisabled:true,
        bg:{white:true,grey:false},
      }
    },
      components:{
        XButton
      },
    created(){
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

<style scoped>
.content{
  width:90%;
  margin:1rem auto;
  font-size: 14px;
}
  .btn button{
    background: #8D8D8D;
    color:#fff;
    width:90%;
    margin:0 auto;
    font-size: 16px;
  }
  .btn .bgColor{
    background-color: #FC4A46;
  }
.btn a{
  color:#fff;

}
@media screen  and (max-width: 320px) {
  .content{
    font-size: 0.9rem;
  }
}
</style>
