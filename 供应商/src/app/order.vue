<template>
  <div class="order" @click.stop='hide()'>
    <sticky scrollBox="vux_view_box_body" >
      <tab >
        <tab-item selected @click.native.stop="handleShow"  style="">{{today}}
          <span  v-show="showBottom" class="strecth">▼</span>
          <span  v-show="!showBottom" class="strecth">▲</span>
        </tab-item>
        <tab-item badge-background="#FF4948" badge-color="#fff" @click.native.stop="handleHide" v-show="store_state">
          {{allStore}}
          <span  v-show="showTop" class="strecth">▼</span>
          <span  v-show="!showTop" class="strecth">▲</span>
        </tab-item>
      </tab>
    </sticky>
    <div class="flexBox" style="background:#fff;width:90%;margin:1.5rem auto;border-radius: 5px;">
      <flexbox v-show="isShow"  class="flex">
        <flexbox-item><div class="flex-demo">订单数量</div></flexbox-item>
        <flexbox-item><div class="flex-demo">消费金额</div></flexbox-item>
        <flexbox-item><div class="flex-demo" style="color:#FF4948">实收金额</div></flexbox-item>
      </flexbox>
      <flexbox v-show="isShow"  v-for="(item,i) in list" :key="i" class="flex">
        <flexbox-item><div class="flex-demo">{{item.count}}</div></flexbox-item>
        <flexbox-item><div class="flex-demo">￥{{item.allpay}}</div></flexbox-item>
        <flexbox-item><div class="flex-demo" style="color:#FF4948">￥{{item.merchantpay}}</div></flexbox-item>
      </flexbox>
    </div>
    <ul class="date_style box-shadow" v-show="stateList">
      <li v-for="(item,i) in dateList" :key="i" :class="{'red':i===state}" @click="date(i)">{{item.date}}</li>
    </ul>
    <div  class="dropDown box-shadow" v-if="showDown">
      <div class="tab-head"  v-show="showStore">
        <p  :class="{'red':addColor}" @click="storeColor">全部门店</p>
        <p  v-for="(item,i) in store" :key="i" :class="{'red':i===red}" @click.stop="choose(i)">{{item.store_name}}</p>
      </div>
      <div class="tab"  v-show="!showStore">
        <p  :class="{'red':addColor}" @click="storeColor">全部门店</p>
        <p  v-for="(item,i) in store" :key="i" :class="{'red':i===red}" @click.stop="choose(i)">{{item.store_name}}</p>
      </div>
    </div>
  </div>
</template>

<script type="es6">
  import { Tab, Flexbox,FlexboxItem,Scroller,TabItem ,Sticky,Divider,LoadMore} from 'vux'
    export default {
      components: {
        Tab,
        TabItem,
        Sticky,
        Divider,
        Flexbox,
        FlexboxItem,
        Scroller,
        LoadMore,
      },
      data(){
        return{
        bottomCount:90,
        isShow:true,
        showList:false,
        showDown:false,
        showBottom:true,
        showTop:true,
        red:"",
        showStore:false,
        num:5,
        addColor:true,
        selected:0,
        state:0,
        stateList:false,
        today:"今天",
        allStore:"全部门店",
        pageName:"订单",
        store_state:true,
        bg:{white:false,grey:true},
        list:[],
        data:[],
        store:"",
        store_id:"",
        when:"today",
        flex:[
          {msg:"9999",msg1:"9999",msg2:"9999"},
          {msg:"9999",msg1:"9999",msg2:"9999"},
        ],
        dateList:[
          {key:"0",date:"今天"},{key:"1",date:"本周"},{key:"2",date:"本月"},{key:"3",date:"上个月"}
        ],
        dropDown:[
          {msg:"全部门店",},{msg:"惠乐益"},{msg:"惠乐益电子商务"},{msg:"惠乐益电子"}
        ],
        dropList:[
          {key:"1",msg:"店长",perState:true},
          {key:"2",msg:"收银员",perState:true},
          {key:"0",msg:"管理员",perState:true}
        ]
        }
      },
      watch:{
        store_id(){
          this.selected=3;
        },
      },
      methods:{

        hide(){
          this.stateList=false
          this.showDown=false
          this.showList=false
          this.showTop=true
        },
        handleShow(i){
          this.isShow=true
          this.stateList=!this.stateList
          this.showDown=false
          this.showList=false
          this.showBottom=!this.showBottom
          this.showTop=true
        },
        handleHide(){
          this.showDown=!this.showDown
          this.stateList=false
          if(this.store_id && this.showDown == true){
          this.showList=true
          }else{
            this.showList=false
          }
          this.showBottom=true
          this.showTop=!this.showTop
        },
        storeColor(){
          this.addColor=true
          this.red=""
          this.allStore="全部门店"
          this.store_id=""
          this.showDown=false
          this.showTop=true
          this.showList=false
          this.lookUpOrder()
        },
        choose(i){
          this.red=i
          this.showList=true
          this.addColor=false
          this.allStore=this.store[i].store_name
          this.store_id=this.store[i].store_id
          this.showDown=false
           this.showTop=true
          this.lookUpOrder()
        },
         drop(i){
          let vm=this
          this.selected=i
          this.showList=false
          this.showDown=false
          this.showTop=true
          //if(vm.dropList[i].key=="0"){
            //vm.user_level=0
          //}else if(vm.dropList[i].key=="1"){
           // vm.user_level=1
          //}else{
           // vm.user_level=2
          //}
          },
         lookUpOrder(){
            this.apiPost("http://r.huileyi.com/Order/lookUpOrder",{when:this.when,user_level:this.user_level,store_id:this.store_id}).then((res)=>{
            if(res.code==200){
               console.log(res)
               this.data=res.data
               this.list=[this.data]
            }
            if(res.code==221){
                this.list=[]
            }
          })
         },
         date(i){
          this.state=i
          this.stateList=false
          this.showBottom=true
          this.today=this.dateList[i].date
          if(this.dateList[i].key=="0"){
            this.when="today"
          }
          if(this.dateList[i].key=="1"){
            this.when="thisweek"
          }
          if(this.dateList[i].key=="2"){
            this.when="thismonth"
          }
          if(this.dateList[i].key=="3"){
            this.when="prevmonth"
          }
         this.lookUpOrder()
         },
         getStore(){
          this.apiPost("http://r.huileyi.com/Store/getOfMyStore",{user_level:this.user_level}).then((res)=>{
            if(res.code==200){
              this.store=res.data
              //console.log(res)
              //this.store_id=this.store[i].store_id
                if(this.store.length>=5){
                  this.showStore=true
                }else{
                  this.showDown=false
                }
            }
          })
         },
      },
    mounted(){
         this.user_level=localStorage.getItem("level")
         this.lookUpOrder()
         this.getStore()
    },
    mixins:[window.mixins,http]
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .order{height:80%;}
  .order .vux-tab .vux-tab-item.vux-tab-selected{
    color:#FF4948;
  }
  .order  .bar-active-color{
    border-bottom-color: #FF4948!important;
  }
  .order i{
    background-color: #FF4948;
  }
  .order .flex-demo{
    padding:0.3rem 0;
  }
  .order .flexBox .flex:last-child{
    border:none;
  }
  .order .flex{
    padding:0.5rem;
    text-align:center;
    margin:0 auto;
    border-bottom:1px solid #F3F3F3;
    width:90%;
  }
  /*.order .span{*/
    /*width: 0;*/
    /*height: 0;*/
    /*border-left: 5px solid transparent;*/
    /*border-right: 5px solid transparent;*/
    /*border-top: 7px solid #000;*/
    /*display: inline-block;*/
    /*margin-left:10px;*/
  /*}*/
  .order .toplf{
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 7px solid #000;
    display: inline-block;
    position: absolute;
    top:20px;
    left:110px;
  }
  .order .toprt{
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 7px solid #000;
    display: inline-block;
    position: absolute;
    top:20px;
    right:54px;
  }
  .order .dropDown{
    width:50%;
    box-sizing: border-box;
    background: #fff;
  }
  .order .dropDown p{
    height:2rem;
    line-height:2rem;
    text-align: center;
    border-bottom:1px solid #eee;
  }
  .order .dropDown p a{
    color:#979797;
  }
  .order .red{
    background: #FF4948;
    color:#fff;
  }
  .order .dropDown{
    position:absolute;
    top:90px;
    right:0;
  }
  .order .dropList{
    width:50%;
    position: absolute;
    right:0;
    top:90px;
    box-sizing: border-box;
    background: #F7F7F7;
  }
  .order .dropList li{
    height:2rem;
    line-height:2rem;
    text-align: center;
    border-bottom:1px solid #eee;
  }
  .order .dropList li a{
    color:#979797;
  }
  .order .date_style{
    width:50%;
    background-color: #fff;
    text-align: center;
    position:absolute;
    top:90px;
  }
  .order .date_style li{
    height:2rem;
    line-height:2rem;
    border-bottom:1px solid #eee;
  }
  .order ul{
    list-style: none;
  }
  .order .vux-tab-ink-bar{
    background-color: transparent!important;
  }
  .order .box-shadow {
    background-color: #fff;
    -webkit-box-shadow: 0 0 3px rgba(0, 0, 0, .2);
    -moz-box-shadow: 0 0 3px rgba(0, 0, 0, .2);
    box-shadow: 0 0 3px rgba(0, 0, 0, .2);
  }
  .order .downbar{border-bottom: 1px solid #eee;z-index:8000;}
  .order .strecth{
    display:inline-block;/*让span变为块状元素，只有块状元素可以缩放*/
    transform:scale(1,0.5);/*缩放属性；两个参数：(水平缩放比例,垂直缩放比例)；1表示原比例*/
    /*私有缩放属性，为了兼容各浏览器；注：不兼容IE8以下浏览器*/
    -ms-transform:scale(1,0.5);
    -webkit-transform:scale(1,0.5);
    -moz-transform:scale(1,0.5);
    -o-transform:scale(1,0.5);
  }
  .order .tab-head{
    height:198px;overflow: scroll
  }
  .order .tab{
    min-height:33px;
  }
  .order .weui-loadmore{
    margin:0.5em auto;
  }
</style>
