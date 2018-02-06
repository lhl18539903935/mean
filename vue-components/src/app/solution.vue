<template>
    <div>
      <group>
        <cell style="font-size: 14px" v-occupy="{data:content.question_name,config}"></cell>
        <cell value-align="left">
            <span  style="font-size: 14px" v-occupy="{data:content.question_content}"></span>
        </cell>
      </group>
    </div>
</template>

<script type="es6">
  import { Cell, Group,XDialog } from 'vux'
  export default {
    components:{
      Group,
      Cell,
      XDialog
    },
    data(){
    return{
      pageHeader:true,
      content:'',
      is_show:false,
      status:false,
      question_id:'',
      config:{
        height:'16px',
        background:'#fff'
      },
      statusno:false,
      appealContent:'',
      query_content:'',
      bg:{white:false,grey:true},
      pageName:"查看解决方案",
      msg:"Q:你们的结算打款时间是?",
      title:"",
      title1:"还没有解决问题"
    }
  },
  methods:{
    showdialog(){
      this.is_show=true
    },
  },
  mounted(){  
    this.question_id=this.$route.query.question_id
    this.apiPost(this.rhost+'/CustomerService/questionContentHo',{question_id:this.question_id}).then((res)=>{
      if(res.code==200){
        this.content=res.data 
      }
    })
  },
   mixins:[window.mixins,window.http]
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .img{
    width:16px;
    display: inline-block;
    vertical-align: middle;
    margin:-6px 5px 0 0 ;
  }
  .red{
    color:#6594FE;
  }
  .icon{margin-top:2px;vertical-align: top;color:#E9E9E9;}
  .appeal{width:90%;margin:0 auto;background-color: #fff;border-radius: 10px;padding-bottom: 15px;font-size: 14px;}
  .appeal_title{font-size: 16px;color:#6594fe;height:2.5em;line-height: 2.5em;}
  .appeal_content::-webkit-input-placeholder{height:2em;line-height: 2em;}
  .appeal_content::-moz-placeholder{height:2em;line-height: 2em;}
  .appeal_content::-ms-input-placeholder{height:2em;line-height: 2em;}
  .appeal_content{width:90%;border:1px solid #eee;height:8em;border-radius: 5px;    text-indent: 6%;
    padding-top: 2%;}
</style>
