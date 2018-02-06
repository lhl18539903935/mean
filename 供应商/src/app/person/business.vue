<template>
  <div class='buss'>
    <group>
      <div>
        <img class="img" style="width:80px;height:80px;margin:1rem 0 1rem 1rem;" :src="headpic" alt=""/>
        <div class="rt" style="margin:2rem 1rem 1.5rem 0;font-size: 14px;text-align: right">
          <p>{{company}}</p>
            <span style="margin-top:1rem;display:inline-block;color:#6594fe">
              <img v-if="renzhengzhuangtai==1" src="../../assets/images/wrenzheng.png" style="width:16px;vertical-align: middle;
              margin:-2px 5px 0 0 ;" alt=""/>
              <img v-if="renzhengzhuangtai==2" src="../../assets/images/yrenzheng.png" style="width:16px;vertical-align: middle;
              margin:-5px 5px 0 0 ;" alt=""/>
              {{stautus}}
            </span>
        </div>
      </div>
    </group>
    <group>
      <cell v-if='renzhengzhuangtai!=2' class="font" title="企业名称" :value="company" is-link link='/companyname'></cell>
      <cell v-if='renzhengzhuangtai==2' class="font" title="企业名称" :value="comname" ></cell>
      <cell class="font" title="营业执照" is-link link='/companybook?type=companybook'>
        <span name='value'><span :class='{black:companybook}'>{{getState(companybook)}}</span></span>
      </cell>
      <cell class="font" title="合同" :value="getState(hetong)" is-link link='/companybook?type=hetong' >
        <span name='value'><span :class='{black:hetong}'>{{getState(hetong)}}</span></span>
      </cell>
    </group>
  </div>

</template>

<script type="es6">
  import {Group,Cell,Popup,XButton,FlexboxItem,Flexbox,XInput} from "vux"
  import VueFileUpload from 'vue-file-upload';
    export default {
      data(){
        return{
          bg:{white:false,grey:true},
          companybook:'',
          hetong:'',
          pageHeader:true,
          pageName:"企业认证",
          headpic:require("../../assets/images/yrenzheng.png"),
          stautus:'',
          renzhengzhuangtai:'',
          company:'',
          addimg:require('../../assets/images/0-12.png'),
          autoUpload:true,
          localData:{},
          type:'',
          option:{
              formData:{},
              headers:{token:localStorage.getItem('token')},
              responseType:'json',
              withCredentials:false
          },
          even:{
              onCompleteUpload:(file,response,status,header)=>{
                // console.log(file);
                // console.log("finish upload;")
                console.log(response)
                if(this.type=='business_license'){

                    this.localData.business_license=response.data.pic_url;

                }
                if(this.type=='dls_ocntract'){

                    this.localData.dls_ocntract=response.data.pic_url
                }

                this.addimg=response.data.pic_url;
                //this.updateData();


              },
              onAddFileSuccess:(file)=>{

                  // console.log(file.file);
                  // console.log(file.size)
                  // console.log("success add to queue");

                }
          },
        }
      },
      methods:{
        updateData(){
          let vm=this;
          let data={company:vm.localData.company,dls_ocntract:vm.localData.dls_ocntract,business_license:vm.localData.business_license,uptype:'companyAuthen'}
          this.apiPost("http://p.huileyi.com/Dls/dlsPerfectData",data).then((res)=>{
            if(res.code=200){
                this.$vux.toast.show({
                  text: '上传成功',
                  type: "success"
               })
            }

          })
          this.getData();
        },
        getState(val){
            return val?'已添加':'未添加';
        },
        getData(){
            let vm=this;
             this.apiPost("http://p.huileyi.com/Dls/companyAuthen",{}).then((res)=>{
            if(res.code==200){
              vm.company=res.data.company;
              vm.hetong=res.data.dls_ocntract;
              vm.companybook=res.data.business_license;
              if(res.data.company_status==0){
                vm.stautus='未认证';

                vm.renzhengzhuangtai=1;

              }else if(res.data.company_status==1){
                vm.stautus='认证通过';
                vm.renzhengzhuangtai=2;
              }else if(res.data.company_status==2){
                  vm.stautus='认证拒绝';
                  vm.renzhengzhuangtai=1;
              }


            }else{
              this.$vux.toast.show({
                  text: res.msg,
                  type: "warn"
              })
            }
          })
        },
        save:function(){
          if(this.company==''){
            this.$vux.toast.show({
                text: '请填写公司名称',
                type: "warn"
            })
          }else{
            this.comname=this.company
            this.idname=false
          }
        }
      },
      mounted(){
        this.getData();
        let vm = this;
        this.apiPost("http://r.huileyi.com/home/getUserMessage",{}).then((res)=>{
            if(res.data.headpic){
              vm.headpic=res.data.headpic;
            }
        })
      },
      components:{
        Group,
        Cell,
        Popup,
        XButton,
        FlexboxItem,
        Flexbox,
        XInput,
        VueFileUpload
      },
     mixins:[window.mixins,window.http]
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .buss .lf{
    float:left;
  }
  .buss .rt{
    float:right;
  }
  .buss .font{
    font-size: 14px;
    padding-top:14px;
    padding-bottom:14px;
  }
  .buss .img{
    position: relative;
  }
  .buss .fileupload-button[data-v-4fb51cfe]{
    padding:0;
    width: 80px;
    height: 80px;
    z-index: 999;
    position: absolute;
    left:15px;
    top:17px;
    opacity: 0;
    outline: none;
  }
  .buss .vux-popup-dialog.vux-popup-right{
    padding-top:45px;
  }
  .buss .weui-cells{margin-top: 10px;}
  .contract   #shclo {
    padding:0;
    width: 258px;
    height: 250px;
    z-index: 999;
    opacity: 0;
  }
  .black{color:#000;}
</style>
