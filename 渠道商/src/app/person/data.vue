  <template>
  <div class='bg'>
    <group style='position:relative;' label-width="4.5em" label-margin-right="2em" label-align="left">
      <div style='position:absolute;top:0;width:100%;height:15em;'>
        <cell style="font-size: 14px;" title="头像">
          <img @click='addfile'  class="img" style="width:80px;height:80px;" :src="headpic" alt=""/>
          <img v-show="item.state" class="ano_name" :src="item.ano_name" v-for="(item,i) in anolist" :key="i" alt="">
        </cell>

        <cell link='/edit' style="font-size: 14px;padding-top:14px;padding-bottom:14px;" title="昵称" :value="nickname" ></cell>
        <cell style="font-size: 14px;padding-top:14px;padding-bottom:14px;" title="性别" @click.native='is_show=!is_show' :value="sex" ></cell>
        <cell style="font-size: 14px;padding-top:14px;padding-bottom:14px;" title="手机号" link="/phone" :value="mobile" ></cell>
      </div>

    </group>

    <x-dialog v-model='is_show' :hide-on-blur='true'>
      <group style='height:10.5em;' title="请选择">
        <radio :options="radio001" @on-change="change"></radio>
      </group>
    </x-dialog>
  </div>
</template>

<script type="es6">
  import {Cell,XDialog,Radio} from "vux"
  import Group from '../../components/group/index.vue'
  import upload from "../../upload.js"
    export default {
      data(){
        return{
          bg:{white:false,grey:true},
          is_show:false,
          auto:true,
          pageHeader:true,
          pageName:"个人资料",
          mobile:"",
          sex:'',
          pic_url:"",
          anolist:[
            {ano_name:require('../../assets/1.png'),state:false},
            {ano_name:require('../../assets/2.png'),state:false},
            {ano_name:require('../../assets/3.png'),state:false},
            {ano_name:require('../../assets/4.png'),state:false},
            {ano_name:require('../../assets/5.png'),state:false},
          ],
          headpic:require('../../assets/titlelogo.png'),
          nickname:"",
          radio001:[{value:'男',key:'1'},{value:'女',key:'2'},{value:'保密',key:'0'}],
        }
      },
      mounted(){
        let vm=this;
        this.apiPost(this.rhost+'/home/getUserDetail',{}).then((res)=>{
          if(res.code==200){
            vm.mobile=res.data.mobile
            vm.sex=res.data.sex
            vm.nickname=res.data.name
            vm.headpic=res.data.headpic?res.data.headpic:vm.headpic;
            if(res.data.ano_name==''){
              this.anolist[0].state=false
              this.anolist[1].state=false
              this.anolist[2].state=false
              this.anolist[3].state=false
              this.anolist[4].state=false
            }
            if(res.data.ano_name=='金'){
              this.anolist[0].state=true
              this.anolist[1].state=false
              this.anolist[2].state=false
              this.anolist[3].state=false
              this.anolist[4].state=false
            }
            if(res.data.ano_name=='木'){
              this.anolist[0].state=false
              this.anolist[1].state=true
              this.anolist[2].state=false
              this.anolist[3].state=false
              this.anolist[4].state=false
            }
            if(res.data.ano_name=='水'){
              this.anolist[0].state=false
              this.anolist[1].state=false
              this.anolist[2].state=true
              this.anolist[3].state=false
              this.anolist[4].state=false
            }
            if(res.data.ano_name=='火'){
              this.anolist[0].state=false
              this.anolist[1].state=false
              this.anolist[2].state=false
              this.anolist[3].state=true
              this.anolist[4].state=false
            }
            if(res.data.ano_name=='土'){
              this.anolist[0].state=false
              this.anolist[1].state=false
              this.anolist[2].state=false
              this.anolist[3].state=false
              this.anolist[4].state=true
            }
          }
        })
      },
      methods:{
        addfile(){
          var vm=this
          this.getPhotoAndUpload(function(ret){
            vm.apiPost(vm.rhost+'/home/uploadPersonDatum', { headpic: ret.data.url }).then((res) => {
                if (res.code=200)
                  vm.headpic = typeof ret.data.url!="undefined"? ret.data.url : vm.headpic;
              })
          },function(r){
          })
        },
        change(value,key){
          let vm = this;
          this.apiPost(this.rhost+'/home/uploadPersonDatum',{sex:value}).then((res)=>{
              if(res.code==200){
                vm.sex=key
              }else{
                this.$vux.toast.show({
                    text: res.msg,
                    type: "text",position:'bottom',
                })
              }
          })
          this.is_show=false;
        }
      },
      components:{
        Group,Cell,XDialog,Radio
      },
      mixins:[window.mixins,window.http,upload]
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
  .bg  .ano_name{
    width:25px;
    height:25px;
    position: absolute;
    bottom:14px;
    right:15px;
  }
  .bg .img{
    position: relative;
  }
  .bg .fileupload-button{
    padding:0;
    width: 100%;
    height: 80px;
    z-index: 999;
    position: absolute;
    right:15px;
    top:10px;
    opacity: 0;
    outline: none;
  }
  .bg .fileupload-button input[type=file]{height:80px;width:80px;right:30px;}
  .bg .middle{height:100px;width:300px;margin:0 auto;background-color: #fff;}
  .bg .clearfix:after {
    display: block;
    content: " ";
    height: 0;
    visibility: hidden;
    clear: both;
  }
  .bg .fl{float:left}
  .bg .fr{float:right}
  .bg .line{width:90%;line-height: 2em;margin-left: 5%}
  .bg .line p{margin:5px 10px;}
  .bg .middle_title{font-size: 18px;margin:5px;}
  .bg .weui-cells{margin-top:10px;height:14.5em;}
</style>
