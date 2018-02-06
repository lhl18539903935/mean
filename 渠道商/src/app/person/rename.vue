<template>
  <div class='rename'>
      <group>
          <x-input v-if="type=='name'" title='姓名:' v-model="userData.name" ></x-input>
          <x-input v-else title='身份证号:' v-model="userData.idcard" ></x-input>
      </group>
    <div style="width:90%;margin:1rem auto;" @click="back" v-if="this.userData.idcard_status == 2 && this.type=='name'">
      <x-button  style="background-color: #6594FE;font-size: 16px;color:#fff">确定</x-button>
    </div>
    <div style="width:90%;margin:1rem auto;" @click="backidcard" v-if="this.userData.idcard_status == 2 && this.type=='idcard'">
      <x-button  style="background-color: #6594FE;font-size: 16px;color:#fff">确定</x-button>
    </div>
    <div style="width:90%;margin:1rem auto;" @click="save" v-if="this.userData.idcard_status != 2">
      <x-button  style="background-color: #6594FE;font-size: 16px;color:#fff">确定</x-button>
    </div>
  </div>
</template>

<script type="es6">
import { XInput, Group, XButton } from 'vux'
export default {
  data(){
    return{
      bg:{white:false,grey:true},
      pageHeader:true,
      pageName:"",
      type:'',
      userData:{}
    }
  },
  methods:{
    // 填写拒绝后资料
      back(){
         
        if(!this.userData.name) {
          this.$vux.toast.show({
            text:"姓名不能为空",
            type: "text",position:'bottom',
          })
          return
        }else{
          localStorage.setItem('name',this.userData.name)
          this.$router.go(-1)
        }
        
      },
      backidcard(){
        if(!this.userData.idcard){
           this.$vux.toast.show({
            text:"身份证号不能为空",
            type: "text",position:'bottom',
          })
          return
        }
       var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if(reg.test(this.userData.idcard) === false) {
                   this.$vux.toast.show({
                      text: '请输入正确的身份证号！',
                      type: "text",position:'bottom',
                  })
                   return  false;
               }else{
                  localStorage.setItem('idcard',this.userData.idcard)
                  this.$router.go(-1)
            }
        
      },
      save () {
        if(this.userData.idcard_status == 1) return;
        //验证身份证号
        if(this.type == 'idcard'){
               // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
               var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
               if(reg.test(this.userData.idcard) === false)
               {
                   this.$vux.toast.show({
                      text: '请输入正确的身份证号！',
                      type: "text",position:'bottom',
                  })
                   return  false;
               }
        }

        if(this.type == 'name'){
          if(this.userData.name == ''){
              this.$vux.toast.show({
                      text: '请输入姓名！',
                      type: "text",position:'bottom',
                  })
                   return  false;
          }
        }

        let vm = this;

        this.apiPost(this.phost+'/Dls/dlsPerfectData',this.userData).then((res)=>{
            if(res.code==200){
                this.$vux.toast.show({
                text: '修改成功',
                type: "success"
                })
                this.$router.push('/attestation')
            }
        })
    },
    getData(){
      let vm=this;
          this.apiPost(this.phost+'/Dls/idcardAuthen').then((res)=>{
            if(res.code==200){
              vm.userData=res.data;
              if(vm.userData.idcard_status == 2){
                if(localStorage.getItem('name') || localStorage.getItem('idcard')){
                   vm.userData.name=localStorage.getItem('name')
                  vm.userData.idcard=localStorage.getItem('idcard')
                }else{
                  vm.userData=res.data;
                }
               
              }
            }
          })
    }
  },
  mounted:function(){  
    this.type=this.$route.query.type;
    this.refusalname=this.$route.query.statename;
    this.refusalid=this.$route.query.stateid;
    if(this.type == 'idcard'){
      this.$store.commit("setPageName", '身份证号')
    }
    if(this.type == 'name'){
      this.$store.commit("setPageName", '姓名')
    }
    this.getData()
  },
  components: {
    XInput,
    XButton,
    Group,
  },
  mixins:[window.mixins,window.http]
  }
  </script>

<style >
  .rename .weui-cells{margin-top: 10px;}
</style>
