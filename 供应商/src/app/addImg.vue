<template>
  <div class="file">

    <div class='clearfix' style="background-color: #fff;margin-top:10px;padding-top:1em;padding-bottom:10px;min-height:200px;">
      <div class='clearfix' v-for="(item,i) in img" :key="i" style="width:28%;margin-left:4%;float:left;position:relative;margin-bottom:1em;" >
        <img style="width:100%;height:70px;float: left"  :src="item.src" alt="" />
        <img @click="handle(i)"  src="../assets/images/anniu.png" style="width:16px;position:absolute;top:-5px;right:-8px;" alt=""/>
      </div>
      <div class="add" @click="addFile">
        +
      </div>
    </div>
    <div style="width:90%;margin:0 auto;">
      <x-button style="background-color: #FF4948;color:#fff;font-size: 16px;position: fixed;bottom:80px;left:0" @click.native="updateData">确定</x-button>
    </div>
  </div>
</template>

<script type="es6">
  import {XButton,Group} from "vux"
  import upload from "../upload.js"
    export default {
      data(){
        return{
          pageName:"添加门店照片",
          options:[],
          bg:{white:false,grey:true},
          img:[],
          listImg:'',
          store_id:''
        }
      },
      watch:{
        img(){
          //localStorage.setItem("listImg",JSON.stringify(this.img));
          //alert(JSON.stringify(localStorage.getItem("listImg")))
        }
      },
      methods:{
        handle(i){
          this.img.splice(i,1)
        },
         addFile(){
          var vm=this
          this.getPhotoAndUpload(function(ret){
            //alert(JSON.stringify(ret))
            if (ret.code=200){
              let url= ret.data.url
              if(!vm.img){
                vm.img=[{src:url}];
              }else{
                vm.img.push({src:url})
              }
              //vm.img.contact([{src:ret.data.url}])
              //alert(JSON.stringify(vm.img))
            }
          },function(r){
            //console.log(JSON.stringify(r))
            //alert(JSON.stringify(r));
          })
        },
        updateData(){
            if(!this.img){
                this.$vux.toast.show({
                    text: '请上传图片！',
                    type: "warn"
                })
                return;
            }
           //localStorage.setItem('img',this.img); 
           
           for(let d in this.img){
              if(this.listImg == ''){
                this.listImg=this.img[d].src;
               }else{
                 this.listImg=this.listImg+'@'+this.img[d].src
               }
           }

           //alert(this.listImg)
           localStorage.setItem("listImg",this.listImg)

            this.$vux.toast.show({
                text: '保存成功！',
                type: "success"
            })
            this.$router.go(-1)
        },
      },
      mounted(){
        //本地图片
        let local=localStorage.getItem("listImg")
        if(local){
          let img=local.split('@')
          for(let d in img){
            this.img.push({src:img[d]})
          }
        }
        //在线图片
        let store_id=this.$route.query.store_id
        let vm=this;


        if(store_id && this.img == ''){

          this.apiPost("http://r.huileyi.com/store/theStoreDetail",{store_id:store_id}).then((res)=>{
            console.log(res.data.store_pic)
            let data=res.data.store_pic
            /* (data.__proto__.constructor==Array)*/

              let data_arr=data.split('@');
              for(let i in  data_arr){
                 if(!vm.img){
                    vm.img=[{src:data_arr[i]}];
                  }else{
                    vm.img.push({src:data_arr[i]})
                  }
              }
             
          })
        }
      },
      components:{
        XButton,
        Group
      },
      mixins:[mixins,http,upload]
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>


  #shclo{
    width:70px;
    height:70px;
    border: 1px dotted #b6b6b6;
    font-size: 30px;
    color:#8D8D8D;
    box-sizing: border-box;
    text-align: center;
    line-height: 58px;
    position: relative;
  }
  .file .fileupload-button[data-v-4fb51cfe]{
    position: absolute;
    padding:0;
    z-index: 1;
    margin: 12px 0 0 5px;
  }
  .file .fileupload-button[data-v-4fb51cfe]{
    background-color: transparent;
  }
  .file .fileupload-button input[type=file][data-v-4fb51cfe]{
    font-size: 50px!important;
    width:70px;
    top:0;
    left:0;
  }
  .file .add{
    font-size: 48px;
    color:#8D8D8D;
    width:28%;
    height:70px;
    line-height:60px;
    font-weight: 200;
    text-align: center;
    border:1px dashed #8D8D8D;
    float:left;
    margin-left:4%;
  }

</style>
