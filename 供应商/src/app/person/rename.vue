<template>
  <div class='rename'>
      <group>
          <x-input v-if="type=='name'" title='姓名:' v-model="userData.name" ></x-input>
          <x-input v-else title='身份证号:' v-model="userData.idcard" ></x-input>
      </group>
    <div style="width:90%;margin:1rem auto;" @click="save">
      <x-button  style="background-color: #FF4948;font-size: 16px;color:#fff">确定</x-button>
    </div>
  </div>
</template>

<script type="es6">
import { XInput, Group, XButton, Cell } from 'vux'
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
                      type: "warn"
                  })
                   return  false;  
               }  
        }

        if(this.type == 'name'){
          if(this.userData.name == ''){
              this.$vux.toast.show({
                      text: '请输入姓名！',
                      type: "warn"
                  })
                   return  false; 
          }
        }

        let vm = this;

        this.apiPost("http://p.huileyi.com/Dls/dlsPerfectData",this.userData).then((res)=>{
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
          this.apiPost("http://p.huileyi.com/Dls/idcardAuthen").then((res)=>{
            if(res.code==200){
              vm.userData=res.data;
            }
          })
    }
  },
  mounted:function(){
    this.type=this.$route.query.type;
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
    Cell
  },
  mixins:[window.mixins,window.http]
  }
  </script>

<style >
  .rename .weui-cells{margin-top: 10px;}
</style>
