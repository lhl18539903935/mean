<template>
  <div>
    <div class="lhl" @click.stop="clearoffline">
      <!--v-model="showDialogStyle"-->
      <x-dialog class="dialogstyle" v-model="showDialogStyle" :hide-on-blur=false :dialog-style="{'max-width': '100%', width: '100%', height: '100%', 'background-color': 'transparent'}">
        <div>
          <p  class="head" style="">
            <span><i class="leftarrow"></i></span>
            <span>留言</span> 
          </p> 
          <!--content部分-->
          <card class="content">
            <div slot="content" class="card-padding">
              <p style="font-size:12px;color:#B8BDCE;padding:10px"></p>
            <div>
              <ul>
                <li style="text-align:left;width:90%;margin:0 auto;border-bottom:1px solid #ddd;padding:0 0 12px 0" v-for="(item,i) in massagelist" :key="i">
                  <p style="padding:5px 0;text-align:center">{{item.mytime}}</p>
                  {{item.msg}}
                  <img style="max-width:200px;max-height:100px" :src="item.mylink" alt="">
                </li>
              </ul>
            </div>
            </div>
          </card>
           <!--submit部分-->
           <div class="submit" :class="{'topmove':movestate}"> 
             <!--表情.相册-->
             <cell class="disport"  >
               <img  slot="icon" @click.stop="offline_feel" width="20"src="./xin_03 .png" alt="">
               <img  slot="icon" v-show="phone" width="20" @click.stop="phone_addFile"  src="./photo.png" alt="">  
               <img  slot="icon" @click.stop="offline_pcaddfile" v-show="!phone" width="20" src="./photo.png" alt="">
               <input id="d3" @click="offline_getimg($event)"  type="file" style="display:none" name="" >  
             </cell> 
             <!--输入提交部分-->
             <div style="width:90%;margin:0 auto">
                <textarea   v-model="content"   :show-clear='false' class="inputstyle" placeholder="请简单描述你的问题"></textarea>
                <x-button  mini class="xbtn" @click.native.stop="sendmsg"  :class="{'bg':state}" style="">发送</x-button>
                
             </div>
           </div>
                <!--<div style="height:200px;background-color:#000;width:100%;">12313213213213</div>-->
        </div>
      </x-dialog>
    </div>
          <!--表情-->
      <div class="offline_feeling" v-show="offline_feeling">
        <div v-for="(item,i) in emojilist" :key="i" @click="offline_gif(item,i)" class="vux-center-h" style="float:left;">
          <div>{{item.emoji}}</div>
        </div>
      </div>
  </div>
</template>
<script src="../emoji/emoji.js"></script>
<script>
import { dateFormat ,Cell,XSwitch,XHeader,XInput,Card, XButton,XDialog,WechatEmotion as Emotion, Divider } from 'vux'
import upload from "./../../upload.js"
import mixin from './../../vuex/mixin.js'
import http from './../../ajax.js'
export default {
  components: {
    Emotion,
    Divider,
    XDialog,
    XButton,
    XSwitch,
    XHeader,
    Card,
    XInput,
    Cell,
    dateFormat 
  },
  data () {
    return {
      list: ['微笑', '撇嘴', '色', '发呆', '得意', '流泪', '害羞', '闭嘴', '睡', '大哭', '尴尬', '发怒', '调皮', '呲牙', '惊讶', '难过', '酷', '冷汗', '抓狂', '吐', '偷笑', '可爱', '白眼', '傲慢', '饥饿', '困', '惊恐', '流汗', '憨笑', '大兵', '奋斗', '咒骂', '疑问', '嘘', '晕', '折磨', '衰', '骷髅', '敲打', '再见', '擦汗', '抠鼻', '鼓掌', '糗大了', '坏笑', '左哼哼', '右哼哼', '哈欠', '鄙视', '委屈', '快哭了', '阴险', '亲亲', '吓', '可怜', '菜刀', '西瓜', '啤酒', '篮球', '乒乓', '咖啡', '饭', '猪头', '玫瑰', '凋谢', '示爱', '爱心', '心碎', '蛋糕', '闪电', '炸弹', '刀', '足球', '瓢虫', '便便', '月亮', '太阳', '礼物', '拥抱', '强', '弱', '握手', '胜利', '抱拳', '勾引', '拳头', '差劲', '爱你', 'NO', 'OK', '爱情', '飞吻', '跳跳', '发抖', '怄火', '转圈', '磕头', '回头', '跳绳', '挥手', '激动', '街舞', '献吻', '左太极', '右太极'],
      showDialogStyle: true,
      state:false,//按钮颜色
      said:'',//我说的话
      offline_feeling:false,//表情
      mytime:'今天08:53',
      othertime:'今天08:53',
      emojilist:[],
      massagelist:[],//留言
      alist:[],
      movestate:false,
      content:'',
      otherstatus:false,
      mystatus:true,
      phone:true,
      saidlist:[],
      mylink:'',
      otherlink:'',
      src:'',
      time:'',
      imgs:'',
      userId:'',
      token:'',
      imglist:[],
      sendurl:'',
      kf_id:'',
      appKey:'',
       screenWidth: document.body.clientWidth,   // 这里是给到了一个默认值 （这个很重要）
      saidlist:[
        {
           mysaid:{mysaid:'您好，可以帮到您么？',mytime:'12:00'},
           othersaid:{othersaid:'您好，可以帮到您么？',mytime:'12:00'},
        }
       
      ],
    }
  },
  methods:{
    clearoffline(){
       this.offline_feeling=false
       this.movestate=false
    },
     offline_pcaddfile(){
      let vm=this
     $('#d3').click()
    },
    offline_getimg(e){
      let vm=this
      console.log(e.target.files)   
      if(e.target.files.length != 0) {
        let files = e.target.files[0];
           if(!/image\/\w+/.test(files.type)){
            alert("请确保文件为图像类型");
            return false;
        }
           var reader = new FileReader();
          reader.onload = function(){
            let data=reader.result
         let data1= data.replace(/\+/g, "%2B");
         let data2 = data1.replace(/\&/g, "%26");
            // let data='data:image/jpeg;base64,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'
          vm.apiPost('http://192.168.4.29:8086/public/portal/Kf_api/saveBase64Image',{tp:data2}).then((res)=>{
            if(res.code == 200){
              vm.sendurl=res.url.substring(17,res.url.length)//发送图片url
                vm.gettime()
                vm.massagelist.push(
                  {mylink:'http://'+res.url,mytime:vm.time},
                )  
              }
          })   
      }
        reader.readAsDataURL(files);  
      }

    },
     // 判断是手机端还是pc端 true则说明是电脑客户端，如果是false，则说明使用的是移动客户端
    navigator(){
      let vm=this
        var userAgentInfo=navigator.userAgent;
          var Agents =new Array("Android","iPhone","SymbianOS","Windows Phone","iPad","iPod");
          var flag=true;
          this.phone=false
          for(var v=0;v<Agents.length;v++) {
            if(userAgentInfo.indexOf(Agents[v])>0) {
            flag=false;
            this.phone=true
            break;
          }  
           
        }
          return flag; 
      },
   
    phone_addFile(){
          var vm=this
          this.getPhotoAndUpload(function(ret){
            // alert(JSON.stringify(ret.url))
            if (ret.code=200){
              // vm.src= typeof ret.url!="undefined"? ret.url : vm.said;
              vm.sendurl=ret.url.substring(17,ret.url.length)//发送图片url
              vm.gettime()
               vm.saidlist.push({
                mysaid:{mylink:'http://'+ret.url,mystatus:true,mytime:vm.time},
                othersaid:{otherstatus:false},
              })       
              // vm.mysaid.push({mysaid:vm.said,myheadpic:require('./ph4690-p00003.jpg'),useid:1})
            }
          },function(r){
            //alert(JSON.stringify(r));
          })
        },
        
        // 是否显示表情
      offline_feel(){
        this.offline_feeling=!this.offline_feeling
        this.movestate=!this.movestate
      },
      // 发送表情
      offline_gif(item,i){
        let vm=this
          vm.content=item.symbol
          vm.massagelist.push({emoji:item.symbol})
          // console.log(vm.emojilist.push(item.symbol))
      },
      gettime(){
        this.time=dateFormat(new Date(), ' HH:mm:ss')
        // this.othertime=dateFormat(new Date(), ' HH:mm:ss')
      },
      sendmsg(){
        if(!this.content) return  
        this.clientleave()
      },
     gettoken(){
         this.apiPost('http://192.168.4.29:8086/public/portal/Kf_api/getToken',{shop_id:10}).then((res)=>{
            if(res.code == 200){
                this.userId=res.data.user_id
            }
         })
     },
     clientleave(){
       let vm=this
        this.apiPost('http://192.168.4.29:8086/public/portal/Kf_api/clientLeave',{user_id:this.userId,leave_content:this.content,shop_id:10}).then((res)=>{
            console.log(res)
            if(res.code == 200){
              vm.massagelist.push({msg:vm.content})
            }else{
              this.$vux.toast.show({
                text:res.msg,
                type:'text',
                position:'middle'
              })
            }
        })
     }
    },
  created(){
      // this.gettoken()
  },
  mounted(){
    this.emojilist = RongIMLib.RongIMEmoji.list;//获取 Emoji 列表
    this.navigator()
    this.gettime()
  },
   mixins:[mixin,http,upload]
}
</script>
<style>
.weui-input{
      font-size: 14px!important;
    }
    .weui-panel:before{
      border-top:0!important;
      border-bottom:0!important;
    }
    .weui-panel:after{
      border-top:0!important;
      border-bottom:0!important;
    }
    .weui-cell__ft{
      margin-right:30px!important;
      color:#13C9CB!important;
    }
    .vux-header{
      padding:5px 0!important;
    }
    .vux-header .vux-header-right{
      width:16%!important;
    }
  @media screen and (min-width: 415px){
    .weui-dialog{
      max-width:50%!important;
      width:100%!important;
      height:70%!important;
    }
    .submit{
      position: relative;
    }
    .offline_feeling{
      /*width:40%!important;*/
      margin:0 auto!important;
      width:48%!important;
      margin:0 auto;
      height:100px!important;
      /*overflow: scroll;*/
      position: absolute;
      z-index:10000;
      bottom:-5.5rem!important;
      /*left:10%!important;*/
      background-color: #fff;
      /*padding:0.5rem 0 0.8rem 0;*/
      border-top:1px solid #EEF2F3;
    }
    .lhl .myhearpic{
      margin:-3px 0 0 30px!important;
    }
    .lhl .otherheadpic[data-v-0d4b009a]{
      margin:-3px 30px 0 0!important;
    }
    .weui-cell__ft{
      margin-right:60px!important;
      color:#13C9CB!important;
    }
  }
</style>

<style scoped>
  .lhl{
    width:100%;
    height:400px;
  }
  .lhl .my{
    position: relative;
  }
  .lhl .jiaotou{
    width: 0;
    height: 0;
    display:block;
    border-top: 7px solid transparent;
    border-right: 10px solid #E9F0EF;
    border-bottom: 7px solid transparent;
    position: absolute;
    top:90px;
    left:-9px;
  }
  .lhl .other{
    position: relative;
  }
  .lhl .righttou{
    width: 0;
    height: 0;
    display:block;
    border-top: 7px solid transparent;
    border-left: 10px solid #E9F0EF;
    border-bottom: 7px solid transparent;
    position: absolute;
    top:90px;
    right:-9px;
  }
  .lhl .leftarrow{
    width:10px;
    height:10px;
    display:inline-block;
    border-top:2px solid #fff;
    border-left:2px solid #fff;
    transform:rotate(-45deg);
    /*float:left;*/
    /*margin:20px;*/
    position: absolute;
    top:20px;
    left:20px;
  }
  .lhl .head{
    height:50px;
    line-height:50px;
    width:100%;
    text-align:center;
    background-color:#29282E;
    color:#fff;
  }
  .lhl .submit{
    width:100%;
    position:fixed;
    bottom:0;
    height:150px;
    background-color:#fff;
    border-top:2px solid #29282E;
  }
  .lhl .submit .inputstyle{
    width:100%;
    box-sizing:border-box;
    float:left;
    word-wrap:break-word;
    border:0;
    outline:none;
  }
  .lhl .submit .disport {
    width:100%;
  }
  .lhl .submit .disport img{
    margin:0.2rem 0.5rem;
  }
  .lhl .submit .bg{
    background-color:#01D867!important;
  }
  .lhl .weui-panel{
    margin-top:0;
  }
  .lhl .card-padding{
    width:100%;
    min-height:400px;
    display:block;
  }
  .lhl .content{
    position:absolute;
    top:3rem;
    left:0;
    right:0;
    bottom:9rem;
    overflow: scroll;
  }
  .lhl .myhearpic{
    width:30px;
    height:30px;
    position: absolute;
    left:0;
    margin:-3px 0 0 5px;
    vertical-align:middle
  }
  .lhl .otherheadpic{
    width:30px;
    height:30px;
    position: absolute;
    right:0;
    margin:-3px 5px 0 0
  }
  .lhl .othertime{
    font-size:14px;
    color:#B8BDCE;
    padding:10px;
    text-align:center
  }
  .lhl .content div.my{
    text-align:left;
    width:90%;
    margin:10px auto;
  }
  .lhl .mytall{
    font-size:14px;
    color:#B8BDCE;
    padding:10px;
    text-align:center
  }
  .lhl .content .my p{
    background-color: #E9F0EF;
    padding:12px 14px;
    border-radius: 3px;
    margin:10px 0;
    width: 50%;
    word-wrap:break-word;
  }
  .lhl .content .other{
    text-align:right;
    width:90%;
    margin:10px auto;
  }
  .lhl .content .other p{
    background-color: #E9F0EF;
    padding:12px 14px;
    border-radius: 3px;
    width:50%;
    float:right;
    margin:10px 0;
    word-wrap: break-word;
  }
   .offline_feeling{
    width:100%;
    margin:0 auto;
    height:140px;
    overflow: scroll;
    position: relative;;
    z-index:10000;
    bottom:-5.1rem;
    background-color: #fff;
    /*padding:0.5rem 0 0.8rem 0;*/
    border-top:1px solid #EEF2F3
  }
  .lhl .xbtn{
    width:21%;
    box-sizing:border-box;
    float:right;
    background:#29282E;
    color:#fff;
    margin-top: 10px;
  }
  @media screen and (min-width: 414px){
    .dialogstyle{
      max-width:50%!important;
      width:100%!important;
      height:50%!important;
    }
  }
  @media screen  and (max-width: 320px) {
    .offline_feeling{
      bottom:0rem;
      transition: bottom 0.3s;
    }
    .lhl .topmove[data-v-0d4b009a]{
      bottom:121px!important;
       transition: bottom 0.3s;
    }
  }
  @media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (orientation : portrait) {
      .lhl .topmove{
        bottom:123px!important;
        transition: bottom 0.3s;
      }
    }
  @media (device-height:736px) and (-webkit-min-device-pixel-ratio:2){/* 兼容iphone6 Plus */
      .offline_feeling{
      bottom:-10.5rem;
    }
    .lhl .topmove[data-v-0d4b009a]{
      bottom:120px!important;
      transition: bottom 0.3s;
    }
}
</style>


