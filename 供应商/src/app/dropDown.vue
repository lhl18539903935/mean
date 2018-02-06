<template>
  <div>
    <sticky scrollBox="vux_view_box_body" >
      <tab>
        <tab-item selected >收到的消息</tab-item>
        <tab-item badge-background="#38C972" badge-color="#fff" >发出的消息</tab-item>
      </tab>
    </sticky>
    <ul class="dropDown">
      <li><a href="">全部门店</a></li>
      <li class="red"><a href="">惠乐益</a></li>
      <li><a href="">惠乐益电子商务</a></li>
      <li><a href="">惠乐益电子</a></li>
    </ul>
    <ul class="dropList">
      <li><a href="">店长</a></li>
      <li><a href="">收银</a></li>
      <li class="red"><a href="">管理员</a></li>
    </ul>
  </div>
</template>

<script type="es6">
  import { Tab,TabItem ,Sticky} from 'vux'
    export default {
      components: {
        Tab,
        TabItem,
        Sticky
      },
      data(){
      return{
        bg:{white:false,grey:true},
        list4: ['今天', '全部门店']
      }
    },
    mixins:[window.mixins,window.http]
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .vux-tab .vux-tab-item.vux-tab-selected{
    color:#FF4948;
  }
  .dropDown{
    width:50%;
    border:1px solid #ddd;
    box-sizing: border-box;
    background: #fff;
  }
  .dropDown li{
    height:2rem;
    line-height:2rem;
    text-align: center;
  }
  .dropDown li a{
    color:#979797;
  }
  .red{
    background: #FF4948;
  }
  .dropDown{
    position:relative;
  }
  .dropList{
    width:50%;
    border:1px solid #ddd;
    position: absolute;
    right:0;
    top:90px;
    box-sizing: border-box;
    background: #F7F7F7;
  }
  .dropList li{
    height:2rem;
    line-height:2rem;
    text-align: center;
  }
  .dropList li a{
    color:#979797;
  }
  ul{
    list-style: none;
  }
</style>
