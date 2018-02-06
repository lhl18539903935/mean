<template>
    <div class='edit'>
      <group>
          <x-input title='昵称:' v-model="nickname" style="font-size:14px;" placeholder="请输入2-8位汉字昵称"></x-input>
      </group>
      <div style="width:90%;margin:1rem auto;"><x-button @click.native='save' style="background-color: #6594FE;font-size: 16px;color:#fff;" >保存</x-button></div>
      <span style="margin-left:1.1rem;font-size: 14px"></span>
    </div>
</template>

<script type="es6">
    import {Group,XButton,XInput} from "vux"
    export default {
      components:{
        Group,
        XButton,
        XInput
      },
      data(){
        return{
          bg:{white:false,grey:true},
          pageHeader:true,
          pageName:"修改资料",
          nickname:"",
        }
      },
      methods:{
        save(){
          if(this.nickname==''||this.nickname==undefined){
              this.$vux.toast.show({
                text: '请填写昵称',
                type: "text",position:'bottom',
             })
          }
          let str=/^[\u4E00-\u9FA5]{2,8}$/
          if(!str.test(this.nickname)){
            this.$vux.toast.show({
              text:"请输入2-8位汉字昵称",
              type:"text",
                position:'bottom'
            })
            return
          }else{
            this.apiPost(this.rhost+'/home/uploadPersonDatum',{name:this.nickname}).then((res)=>{
              this.$vux.toast.show({
                text: '保存成功',
              })
              this.$router.go(-1)
            })
          }
        }
      },
      mounted(){
        this.apiPost(this.rhost+'/home/getUserDetail',{}).then((res)=>{
          if(res.code==200){

            this.nickname =res.data.name
          }else{
				      this.$vux.toast.show({
		          text: res.msg,
		           type: "text",position:'bottom',
		         })
			    }
        })
      },
     mixins:[window.mixins,window.http]
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.edit  .weui-cells{margin-top:10px;}
</style>
