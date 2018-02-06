<template>
  <div>
    <div class="lhl" @click.stop="clearfeel">
      <!--v-model="showDialogStyle"-->
       <x-switch v-model="showDialogStyle"  title="聊天室"></x-switch>
      <x-dialog class="dialogstyle" v-model="showDialogStyle" :hide-on-blur=false :dialog-style="{'max-width': '100%', width: '100%', height: '100%', 'background-color': 'transparent'}">
        <div>
          <p  class="head" style="">
            <span  @click="Dialog"><i class="leftarrow"></i></span>
            <span>聊天室</span> 
          </p> 
          <!--content部分-->
          <card class="content" id="d1">
            <div slot="content" class="card-padding" id="d0">
              <!--<p style="font-size:12px;color:#B8BDCE;padding:10px">点击加载历史记录</p>-->
             <div>
              <ul>
                <li v-for="(item,i) in saidlist" :key='i' >
                  <div style="clear:both;float:left" class="my" v-show="item.othersaid.otherstatus">
                    <div class="mytall" style="">{{item.othersaid.othertime}}</div> 
                    <span style="font-size:12px;color:#B8BDCE;display:block">{{item.othersaid.othername}}</span><i class="jiaotou"></i>
                    <p style="float:left">
                      {{item.othersaid.othersaid}}
                      <img v-preview="item.othersaid.otherlink" class="myimg":src="item.othersaid.otherlink" alt="">  
                    </p>   
                  </div>
                  <div style="clear:both;" class="other" v-show="item.mysaid.mystatus">
                      <div class="othertime" > {{item.mysaid.mytime}}</div> 
                      <span style="font-size:12px;color:#B8BDCE;display:block">{{item.mysaid.username}}</span>
                      <i class="righttou"></i>
                      <p class="float:right">
                         {{item.mysaid.mysaid}} 
                        <img v-preview="item.mysaid.mylink" class="otherimg"  :src="item.mysaid.mylink" alt="">
                      </p> 
                  </div>
                </li>
              </ul>
            </div>
            </div>
          </card>
           <!--submit部分-->
           <div class="submit" :class="{'topmove':movestate}"> 
             <!--表情.相册-->
             <cell class="disport"  >
               <img  slot="icon" width="20" @click.stop="feel" src="./xin_03 .png" alt="">
               <img  slot="icon" v-show="phone" width="20" @click="addFile"  src="./photo.png" alt="">  
               <img  slot="icon"  v-show="!phone" width="20" @click="pcaddfile" src="./photo.png" alt="">
               <input id="d2"  type="file" @change="getimg($event)" style="display:none" name="" >  
             </cell> 
             <!--输入提交部分-->
             <div style="width:90%;margin:0 auto">
                <textarea autofocus=""  v-model="said" @keyup.enter="enter"  :show-clear='false' class="inputstyle" placeholder="请简单描述你的问题"></textarea> 
                <x-button  mini class="xbtn"  @click.native="send" :class="{'bg':state}" style="">发送</x-button> 
             </div>
           </div>
        </div>
      </x-dialog>
    </div>
          <!--表情-->
      <div class="feeling" v-show="feeling">
        <div v-for="(item,i) in emojilist" :key="i" @click="gif(item,i)" class="vux-center-h" style="float:left;">
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
      feeling:false,//表情
      mytime:'今天08:53',
      othertime:'今天08:53',
      emojilist:[],
      alist:[],
      isImgViewsShow:0,
      imgViewsSrc:'',
      showimg:false,//点击图片放大
      showimg:true,
      movestate:false,
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
      network:'',//介绍用户网络状态
      imageUri:'',//接收消息的
      sendurl:'',
      kf_id:'',
      appKey:'',
       selectIndex: false,
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
    clickimg(){
      this.showimg=true
    }, 
    clearfeel(){
      this.feeling=false
      this.movestate=false
    },
    pcaddfile(){
      let vm=this
     $('#d2').click()
    },
    getimg(e){
      let vm=this     
      
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
          vm.apiPost('http://192.168.4.29:8086/public/portal/Kf_api/saveBase64Image',{tp:data2}).then((res)=>{
            if(res.code == 200){
              // vm.sendurl=res.url.substring(17,res.url.length)//发送图片url
                vm.sendurl=res.url
               vm.sendImageMessage()//发送图片 
                vm.gettime()
                vm.saidlist.push({
                  mysaid:{mylink:res.url,mytime:vm.time,username:'wo',mystatus:true},
                  othersaid:{otherstatus:false},
                })  
              }
          })   
      }
        reader.readAsDataURL(files);  
    },
    addFile(){
          var vm=this
          this.getPhotoAndUpload(function(ret){
            // alert(JSON.stringify(ret.url))
            if (ret.code=200){
              // vm.src= typeof ret.url!="undefined"? ret.url : vm.said;
              vm.sendurl=ret.url
              vm.sendImageMessage()
              vm.gettime()
               vm.saidlist.push({
                mysaid:{mylink:ret.url,mystatus:true,username:'wo',mytime:vm.time},
                othersaid:{otherstatus:false},
              })       
              // vm.mysaid.push({mysaid:vm.said,myheadpic:require('./ph4690-p00003.jpg'),useid:1})
            }
          },function(r){
            //alert(JSON.stringify(r));
          })
        },
        save(){
            if(this.currentImg == this.open_permit){
                this.$vux.toast.show({
                    text: '请选择上传图片！',
                    type: "text",position:'bottom',
                })
                return;
            }
        },
        Dialog(){
          this.showDialogStyle=false
          this.feeling=false
        },
    // 按钮发送信息  
    send(){
      let vm=this
      if(!vm.said) return
      this.gettime()
      vm.TextMessage() 
      vm.saidlist.push({
        mysaid:{mysaid:RongIMLib.RongIMEmoji.symbolToEmoji(vm.said),mytime:this.time,mylink:vm.src,username:'wo',mystatus:true},
        othersaid:{otherstatus:false},
      })
      this.add()
      vm.said=''
    },
    // 回车发送信息
    enter(){
      let vm=this
      if(!vm.said) return
       this.gettime()
       vm.TextMessage() 
      vm.saidlist.push({
        mysaid:{mysaid:RongIMLib.RongIMEmoji.symbolToEmoji(vm.said),mytime:this.time,username:'wo',mystatus:true},
        othersaid:{otherstatus:false},
      })
      this.add()
      vm.said=''
    },
    // 是否显示表情
    feel(){
      this.feeling=!this.feeling
      this.movestate=!this.movestate
    },
    //表情发送
    gif(item,i){
      let vm=this
        vm.said=item.symbol
        vm.alist.push({emoji:item.symbol})
        this.feeling=!this.feeling
        this.movestate=!this.movestate
        // console.log(vm.emojilist.push(item.symbol))
    },
    // 获取当前时间
    gettime(){
        this.time=dateFormat(new Date(), ' HH:mm:ss')
        // this.othertime=dateFormat(new Date(), ' HH:mm:ss')
    },
    // 连接服务器
    connect(){
       let vm=this   
        // let token= vm.token
        let token = 'qjb3ldRMtO1PBaZysptftbwUcY5CKtrLommoMbeF86woyyszN3gHgQYvmIFN1s04i++grVjB4su3CRh54ah0HA=='
        // let appKey=vm.app_key
        let appKey='cpj2xarlc1dmn'
        console.log('连接服务器的：'+token,'| appk |'+appKey)
        var config = {
              protobuf : "//cdn.ronghub.com/protobuf-2.3.0.min.js"
          };
        RongIMLib.RongIMClient.init(appKey,null,config);
        var instance = RongIMClient.getInstance();
      // AppKey 和 token，初始化代码：
      // 必须设置监听器后，再连接融云服务器
       RongIMClient.setConnectionStatusListener({
            onChanged: function (status) {
                switch (status) {
                    case RongIMLib.ConnectionStatus.CONNECTED:
                        console.log("链接成功");
                        break;
                    case RongIMLib.ConnectionStatus.CONNECTING:
                        console.log("正在链接");
                        break;
                    case RongIMLib.ConnectionStatus.DISCONNECTED:
                        vm.reconnect();
                        console.log("断开链接");
                        break;
                    case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
                        console.log("其他设备登录");
                        break;
                    case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
                        console.log("网络不可用");
                        vm.reconnect();
                        break;
                }
            }
        });
          console.log(111)
      // 消息监听器
      RongIMClient.setOnReceiveMessageListener({
          // 接收到的消息
        onReceived: function (message) {    
              // 判断消息类型
              switch(message.messageType){
                  case RongIMClient.MessageType.TextMessage:
                      // message.content.content => 消息内容
                      console.log(message.content.content)
                      let sentTime= dateFormat(message.sentTime, 'HH:mm:ss')
                        vm.saidlist.push({
                        othersaid:{othersaid:RongIMLib.RongIMEmoji.symbolToEmoji(message.content.content),othername:'you',othertime:sentTime,useid:message.senderUserId,otherlink:vm.imageUri,otherstatus:true},
                         mysaid:{mystatus:false},
                        })
                      vm.add()
                      break;
                  case RongIMClient.MessageType.VoiceMessage:
                      // 对声音进行预加载                
                      // message.content.content 格式为 AMR 格式的 base64 码
                      break;
                  case RongIMClient.MessageType.ImageMessage:
                      vm.saidlist.push({
                        othersaid:{otherlink:message.content.imageUri,otherstatus:true},
                        mysaid:{mystatus:false},
                  })
                  vm.add()  
                    break;
                  case RongIMClient.MessageType.DiscussionNotificationMessage:
                    // message.content.extension => 讨论组中的人员。
                    break;
                  case RongIMClient.MessageType.LocationMessage:
                    // message.content.latiude => 纬度。
                    // message.content.longitude => 经度。
                    // message.content.content => 位置图片 base64。
                    break;
                  case RongIMClient.MessageType.RichContentMessage:
                    // message.content.content => 文本消息内容。
                    // message.content.imageUri => 图片 base64。
                    // message.content.url => 原图 URL。
                    break;
                  case RongIMClient.MessageType.InformationNotificationMessage:
                      // do something...
                    break;
                  case RongIMClient.MessageType.ContactNotificationMessage:
                      // do something...
                    break;
                  case RongIMClient.MessageType.ProfileNotificationMessage:
                      // do something...
                    break;
                  case RongIMClient.MessageType.CommandNotificationMessage:
                      // do something...
                    break;
                  case RongIMClient.MessageType.CommandMessage:
                      // do something...
                    break;
                  case RongIMClient.MessageType.UnknownMessage:
                      // do something...
                    break;
                  default:
                      // do something...
              }
          }
      }); 
    //开始链接
      // let userId=vm.userId
      console.log(222)
      let userId='10&262812085828714496'
      RongIMClient.connect(token, {
        onSuccess: function(userId) {
                //链接成功后 才可 发送消息 
                console.log('开始链接的token:'+token,userId)
                console.log('链接成功，用户id：' + userId)
                // vm.TextMessage()
        },
        onTokenIncorrect: function() {
          console.log('token无效');
          vm.reconnect()
        },
        onError:function(errorCode){
              var info = '';
              switch (errorCode) {
                case RongIMLib.ErrorCode.TIMEOUT:
                  info = '超时';
                  vm.reconnect()
                  break;
                case RongIMLib.ErrorCode.UNKNOWN_ERROR:
                  info = '未知错误';
                  vm.reconnect()
                  break;
                case RongIMLib.ErrorCode.UNACCEPTABLE_PaROTOCOL_VERSION:
                  info = '不可接受的协议版本';
                  vm.reconnect()
                  break;
                case RongIMLib.ErrorCode.IDENTIFIER_REJECTED:
                  info = 'appkey不正确';
                  vm.reconnect()
                  break;
                case RongIMLib.ErrorCode.SERVER_UNAVAILABLE:
                  info = '服务器不可用';
                  vm.reconnect()
                  break;
              }
              console.log(errorCode);
            }
      });
    },
    //	1: reconnect 是重新连接，并没有重连机制，调用此方法前应该进行网络嗅探，网络正常再调用 reconnect。
  reconnect(){
    console.log(333)
    var start = new Date().getTime();
    let userId='10&262812085828714496'
    let begin = new Date().getTime();
    RongIMClient.reconnect({
      onSuccess: function(userId) {
        showTips("重新链接成功，用户id：" + userId + "; " + getTimer(begin));
        showResult("重新链接 成功", userId, start);
      },
      onTokenIncorrect: function() {
        //console.log('token无效');
        showResult("重新链接 失败", "token无效", start);
      },
      onError:function(errorCode){
        var info = '';
        switch (errorCode) {
          case RongIMLib.ErrorCode.TIMEOUT:
            info = '超时';
            break;
          case RongIMLib.ErrorCode.UNKNOWN_ERROR:
            info = '未知错误';
            break;
          case RongIMLib.ErrorCode.UNACCEPTABLE_PROTOCOL_VERSION:
            info = '不可接受的协议版本';
            break;
          case RongIMLib.ErrorCode.IDENTIFIER_REJECTED:
            info = 'appkey不正确';
            break;
          case RongIMLib.ErrorCode.SERVER_UNAVAILABLE:
            info = '服务器不可用';
            break;
        }
        showTips(info);
        showResult("重新链接 失败", info, start);
      }
    });
  },
        // 发送消息
    TextMessage(){
      let vm=this
          var msg = new RongIMLib.TextMessage({content: RongIMLib.RongIMEmoji.emojiToSymbol(this.said),user:{name:'00000',icon:'http://192.168.4.29:8086/public/static/images/20171227/21312840121.jpeg'},extra:"附加信息"});
          var conversationtype = RongIMLib.ConversationType.PRIVATE; // 单聊,其他会话选择相应的消息类型即可。
          // var targetId =vm.kf_id; // 目标 Id
          var targetId='admin' 
          console.log('发送消息'+targetId,this.said)  
          // var instance = RongIMClient.getInstance();
          RongIMClient.getInstance().sendMessage(conversationtype, targetId, msg, {
                          onSuccess: function (message) {
                              //message 为发送的消息对象并且包含服务器返回的消息唯一Id和发送消息时间戳
                              console.log("success");
                                     vm.add()
                          },
                          onError: function (errorCode,message) {
                              var info = '';
                              switch (errorCode) {
                                  case RongIMLib.ErrorCode.TIMEOUT:
                                      info = '超时';
                                      vm.reconnect()
                                      break;
                              }
                              console.log('发送失败:' + info);
                          }
                      }
                  );    
        },
        // 发送图片
     //获取base64假数据方法
     getBase64Image(){
        var canvas = document.createElement("canvas");
        canvas.width = 100;
        canvas.height = 100;
        var context = canvas.getContext("2d");
        context.font = "20pt Arial";
        context.fillStyle = "blue";
        context.fillText("RongCloud.cn", 10, 20);
        var content = canvas.toDataURL("image/jpeg");
        content = content.replace("data:image/jpeg;base64,","");
        return content;
    },
    sendImageMessage(){
          /*
          文档：http://www.rongcloud.cn/docs/api/js/ImageMessage.html

          需自行解决文件上传
          上传插件（含获取缩略图方法）: https://github.com/rongcloud/rongcloud-web-im-upload
          
          缩略图必须是base64码的jpg图，而且不带前缀"data:image/jpeg;base64,"，不得超过100K
          压缩：https://github.com/rongcloud/rongcloud-web-im-upload/blob/master/resize.html
          */
          let vm=this
          var content = {
            imageUri: vm.sendurl,
            user:{name:'00000',icon:'http://192.168.4.29:8086/public/static/images/20171227/21312840121.jpeg'}, 
            content: vm.getBase64Image()
          };
         
          let targetId="admin";
          var msg = new RongIMLib.ImageMessage(content);
          var start = new Date().getTime();
          var conversationType = RongIMLib.ConversationType.PRIVATE; // 单聊,其他会话选择相应的消息类型即可。
          RongIMClient.getInstance().sendMessage(conversationType, targetId, msg, {
                onSuccess: function (message) {
                  // markMessage(message);
                    console.log("发送图片消息 成功",message,start);
                     vm.add()
                },
                onError: function (errorCode,message) {
                    console.log("发送图片消息 失败",message,start);
                }
            });	
        
        },
        // 发送 pushData[通知] 给端 Android or iOS 方法如下
    pushData(){
           var msg = new RongIMLib.TextMessage({content:"hello RongCloud!",extra:"附加信息"});
            var conversationtype = RongIMLib.ConversationType.PRIVATE; // 单聊,其他会话选择相应的消息类型即可。
            var targetId = "xxx"; // 目标 Id
            var pushData = "your pushInfo";
            RongIMClient.getInstance().sendMessage(conversationtype, targetId, msg, {
                    onSuccess: function (message) {
                        console.log('onSuccess')
                    },
                    onError: function (errorCode,message) {
                        console.log('onError')
                    }
                }, false, pushData
            );
        }, 
    // 通过配置初始化
  
  // Emoji 转名称
    emojiname(){
      let vm = this
      var message =vm.said;
      // 将 message 中的原生 Emoji 转化为对应名称
      vm.said=RongIMLib.RongIMEmoji.emojiToSymbol(message);
      console.log(RongIMLib.RongIMEmoji.emojiToSymbol(message))
      // => "[笑嘻嘻][露齿而笑]测试 Emoji"
    },
    // Emoji 转 HTML
    emojiHTML(){
      var message = "\uf600测试 Emoji";
      // 将 message 中的原生 Emoji (包含 Unicode ) 转化为 HTML
      RongIMLib.RongIMEmoji.emojiToHTML(message);
      // => "<span class='rong-emoji-content' name='[笑嘻嘻]'>😀</span>测试 Emoji"
    },
    // 名称转 HTML
    nameHTML(){
      var message = "[露齿而笑]测试 Emoji";
      // 将 message 中的 Emoji 对应名称转化为 HTML
      RongIMLib.RongIMEmoji.symbolToHTML(message);
      // => "<span class='rong-emoji-content' name='[露齿而笑]'>😁</span>测试 Emoji"
    },
    // 浏览器信息
    BrowserInfo(){
        var userLanguage = navigator.userLanguage;     // 用户在自己的操作系统上设置的语言（火狐没有）    
        var userAgent = navigator.userAgent;           //包含以下属性中所有或一部分的字符串：appCodeName,appName,appVersion,language,platform    
        var systemLanguage = navigator.systemLanguage; // 用户操作系统支持的默认语言（火狐没有）  
        var info = "";  
        info += "浏览器属性信息： " + userAgent + "<br />";  
        info += "用户设置的操作系统语言： " + userLanguage + "<br />";  
        info += "操作系统支持的默认语言： " + systemLanguage + "<br />";
        console.log('浏览器信息');console.log(userLanguage,userAgent,systemLanguage);console.log('浏览器信息')

      return info;  
    },
    //获取客户端操作系统类型 
   detectOS() { 
    var sUserAgent = navigator.userAgent;
    var isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");
    var isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");
    if (isMac) return "Mac";
    var isUnix = (navigator.platform == "X11") && !isWin && !isMac;
    if (isUnix) return "Unix";
    var isLinux = (String(navigator.platform).indexOf("Linux") > -1);
    if (isLinux) return "Linux";
    if (isWin) {
        var isWin2K = sUserAgent.indexOf("Windows NT 5.0") > -1 || sUserAgent.indexOf("Windows 2000") > -1;
        if (isWin2K) return "Win2000";
        var isWinXP = sUserAgent.indexOf("Windows NT 5.1") > -1 || sUserAgent.indexOf("Windows XP") > -1;
        if (isWinXP) return "WinXP";
        var isWin2003 = sUserAgent.indexOf("Windows NT 5.2") > -1 || sUserAgent.indexOf("Windows 2003") > -1;
        if (isWin2003) return "Win2003";
        var isWinVista= sUserAgent.indexOf("Windows NT 6.0") > -1 || sUserAgent.indexOf("Windows Vista") > -1;
        if (isWinVista) return "WinVista";
        var isWin7 = sUserAgent.indexOf("Windows NT 6.1") > -1 || sUserAgent.indexOf("Windows 7") > -1;
        if (isWin7) return "Win7";
        var isWin10 = sUserAgent.indexOf("Windows NT 10") > -1 || sUserAgent.indexOf("Windows 10") > -1;
        if (isWin10) return "Win10";
    }
    return "other";
  } ,
      /**
     * 获取网络类型
     */
    getNetwork(){
      let vm=this
      var wifi = true;
          var ua = window.navigator.userAgent;
          var con = window.navigator.connection;
          // 如果是微信
          if(/MicroMessenger/.test(ua)){
              // 如果是微信6.0以上版本，用UA来判断
              if(/NetType/.test(ua)){
                  if(ua.match(/NetType\/(\S*)$/)[1] != 'WIFI'){
                      wifi = false;
                      vm.network="4G 或 3G 或2G";
                  }
              // 如果是微信6.0以下版本，调用微信私有接口WeixinJSBridge
              }else{
                  document.addEventListener("WeixinJSBridgeReady",function onBridgeReady(){
                      WeixinJSBridge.invoke('getNetworkType',{},function(e){
                          if(e.err_msg != "network_type:wifi"){
                              wifi = false;
                            vm.network="4G 或 3G 或2G";
                          }
                      });
                  });
              }
          // 如果支持navigator.connection
          }else if(con){
              var network = con.type;
              if(network != "wifi" && network != "2" && network != "unknown"){  // unknown是为了兼容Chrome Canary
                  wifi = false;
                   vm.network="4G 或 3G 或2G";
              }
          }else{
             vm.network="wifi";
          }
      window.networkWIFI = wifi;
    },
    //获取手机浏览器
    getphono(){
     var browser={
        versions:function(){
              var u = navigator.userAgent, app = navigator.appVersion;
              return {//移动终端浏览器版本信息
                    trident: u.indexOf('Trident') > -1, //IE内核
                    presto: u.indexOf('Presto') > -1, //opera内核
                    webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                    mobile: !!u.match(/AppleWebKit.*Mobile.*/)||!!u.match(/AppleWebKit/), //是否为移动终端
                    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                    iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
                    iPad: u.indexOf('iPad') > -1, //是否iPad
                    webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
                };
            }(),
            language:(navigator.browserLanguage || navigator.language).toLowerCase()
      }
    console.log("语言版本: "+browser.language);
    console.log(" 是否为移动终端: "+browser.versions.mobile);
    console.log(" ios终端: "+browser.versions.ios);
    console.log(" android终端: "+browser.versions.android);
    console.log(" 是否为iPhone: "+browser.versions.iPhone);
    console.log(" 是否iPad: "+browser.versions.iPad);
    console.log(navigator.userAgent);

    },
    // 上传用户信息
    getclientadd(){
      this.getNetwork()
      let vm=this
      var userAgent = navigator.userAgent;     // 浏览器信息   
      let win_os =this.detectOS()  //获取客户端操作系统类型 
      let network=vm.network//获取手机网络信息
      let data={
        rong_id: vm.userId ,
        rong_name: vm.user_name ,
        rong_token : vm.token ,
        shop_id : 10 ,
        win_os : win_os ,//获取客户端操作系统类型 
        resolution : screen.width + '*' + screen.height,//分辨率
        browser : userAgent, // 浏览器信息
        netinfo : network//移动端网络信息
      }
      this.apiPost('http://192.168.4.29:8086/public/portal/Kf_api/clientAdd',data).then((res)=>{
        
      })
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
            this.getNetwork()
            this.phone=true
            break;
          }      
        }
          return flag; 
      },
   
   //获取token
    gettoken(){
        this.apiPost('http://192.168.4.29:8086/public/portal/Kf_api/getToken',{shop_id:10}).then((res)=>{
          if(res.code==200){
            this.token=res.data.user_token
            this.kf_id=res.data.kf_id
            this.userId=res.data.user_id
            this.user_name=res.data.user_name
            this.app_key=res.data.app_key
            console.log('gettoken的'+this.token,'appk'+this.app_key)
            this.getclientadd()//上传信息
            this.connect();  
          }
        })
      },
      // 滚动条固定底部
     add(){
        var content = document.querySelector('#d1');
        content.scrollTop = content.scrollHeight;
                 
    }
  },
  created(){
        //  this.gettoken()
          this.connect();//链接融云服务器
          this.getclientadd()//测试上传信息
          this.getphono()
            this.reconnect()
       
  },
  mounted(){
    this.navigator()
    this.BrowserInfo()// 获取ip地址信息
    this.emojilist = RongIMLib.RongIMEmoji.list;//获取 Emoji 列表
    RongIMLib.RongIMEmoji.init();//表情初始化
    this.gettime();
  },
   mixins:[mixin,http,upload]
}
</script>
<style>
    .lg-preview-wrapper[data-v-2498f378]{
      top:0;
    }
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
    .feeling[data-v-0d4b009a]{
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
  .lhl .otherimg{
    max-width:300px;max-height:100px
  }
  .lhl .myimg{
    max-width:300px;max-height:100px
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
    position:absolute;
    bottom:0;
    height:150px;
    background-color:#fff;
    border-top:2px solid #29282E;
  }
  .lhl .submit .inputstyle{
    width:100%;
    box-sizing:border-box;
    float:left;
    font-size:16px;
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
    /*width:100%;
    min-height:400px;*/
    display:block;
  }
  .lhl .content{
    position:absolute;
    top:3rem;
    left:0;
    right:0;
    bottom:9rem;
    overflow: auto;
    width:100%;
    min-height:100px
    /*height:600px;*/
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
    margin:10px 5%;
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
    /*width: 50%;*/
    word-wrap:break-word;
    max-width: 50%;
    /*max-height: 100px;*/
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
    /*width:50%;*/
    float:right;
    margin:10px 0;
     max-width: 50%;
    /*max-height: 100px;*/
    word-wrap: break-word;
  }
   .feeling{
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
    .feeling{
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
      .lhl .otherimg{
        max-width:150px;max-height:100px
      }
      .lhl .myimg{
        max-width:150px;max-height:100px
      }
    }
  @media (device-height:736px) and (-webkit-min-device-pixel-ratio:2){/* 兼容iphone6 Plus */
      .feeling{
      bottom:-10.5rem;
    }
    .lhl .topmove[data-v-0d4b009a]{
      bottom:120px!important;
      transition: bottom 0.3s;
    }
}
</style>


