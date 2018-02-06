<template>
    <div class="shop">
      <scroll :onRefresh='onRefresh' :on-infinite="onInfinite" style='margin-bottom: 3.3em;margin-top:-3.5em;'>
        <div v-for="(item,i) in data" :key="i" style="width:90%;margin:10px auto;">
          <router-link :to="{path:'/newShop',query:{'store_id':item.store_id}}" style="color:#000;" >
          <group style="margin-top:-0.5rem;border-top-left-radius:10px">
            <cell  :title="item.store_name" style="font-size: 14px">
              <img slot="icon" width="16" style="display:block;margin-right:7px;" :src="company_pic">
             
            </cell>
          </group>
          <img  class="lf" style="width:7rem;height:5rem;margin:1rem 0.7rem;"  :src="item.store_logo?item.store_logo:demoSrc" alt=""/>
          <div style="" class="detail">
            <p>店长: {{item.store_owner_name}}</p>
            <p>联系电话: {{item.store_manager_tel}}</p>
            <p>门店地址: {{item.belong_area}}{{item.store_address}}</p>
          </div>
          <group style="margin-top:-45px;" class="date">
            <cell style="font-size: 14px;color:#909090" primary="conten" title="创建时间:" :value="changeDate(item.store_create_time)"></cell>
          </group>
          </router-link>
        </div>
      </scroll>
    </div>
</template>

<script type="es6">
  import {Cell,Group,Flexbox, FlexboxItem,dateFormat} from 'vux'
  import addressData from '../assets/images/address.json'
  import format from '../tools/date/format.js'
  import Scroll from '../components/scroll/index'


  export default {
    components:{
      Cell,
      Group,
      Flexbox, FlexboxItem,Scroll
    },
    data(){
    return {
      bg:{white:false,grey:true},
       pageName:"门店",
       store_name:"",
       data:[],
       addressList:[],
       belong_area:"",
       store_id:[],
       list_img:"",
       currentPage:1,
       addressData:addressData,
       company_pic:require('../assets/images/6-1store_03.png'),
       demoSrc:require('../assets/images/1.png'),
       list:[
        {src:require("../assets/images/6-1store_03.png"),title:"惠乐益电子商务",date:"创建时间: 2017-09-11   16:23",
        img:require("../assets/images/0-14png_03.png"),name:"杨梦龙",mobile:"15888888888",address:"河南正郑州市中原区国家产业园"},
        {src:require("../assets/images/6-1store_03.png"),title:"惠乐益电子商务",date:"创建时间: 2017-09-11   16:23",
        img:require("../assets/images/0-14png_03.png"),name:"杨梦龙",mobile:"15888888888",address:"河南正郑州市中原区国家产业园"}
       ],
       currentPage:1,
    }
  },
        methods:{
          onRefresh(done){
          //this.$router.go(0) 
          if(this.isDone){
            let vm=this;
            let data=this.data;
            this.data=[];
            setTimeout(function(){
              vm.data=data;
            },1000)
            done();
          }else{
            this.currentPage=1;
            this.data=[];
            this.getDetail(done);
          }
         
        },
        onInfinite(done){
          console.log('infinite')
          this.currentPage++;
          this.getDetail(done);
         
        },
        getAdd(add){
          let a=add.split(',');
          let b=this.getAddress(a)
          return b[0]+b[1]+b[2];
        },
        changeDate(value){
           let date=dateFormat(new Date(value*1000), 'YYYY-MM-DD HH:mm:ss')
            return date;
        },
        getAddress: function (value) {
          var adr = [];
          for (var r in this.addressData){
            var index = this.addressData[r];
            for (var i in value) {
              var a = value[i]
              if (a == index.value) adr.push(index.name);
            }
          }
          return adr;
      },
      getDetail(done){
        let vm=this;
        let currentPage=this.currentPage;
        this.apiPost("http://r.huileyi.com/store/getMyStore",{page:currentPage}).then((res)=>{
          console.log(res.data)
          if(res.code==200){
     
            if(res.currentPage < res.totalPage){
                done && done()
              }else{
                vm.isDone=true;
                vm.$el.querySelector('.load-more').style.display = 'none';

              }
             if(currentPage == 1){
                  vm.data=res.data
               }else{
                  for(let i in res.data){
                    vm.data.push(res.data[i])
                  }
               }
          }else{
            if(res.code==400){
              this.$router.go(0)
            }else{
               vm.$el.querySelector('.load-more').style.display = 'none';
            }
          }
        })
      }
  },
  mounted(){
    this.getDetail()
    localStorage.removeItem('listImg')
    //this.src=localStorage.getItem('listImg')
    //console.log(this.src)
   },
  mixins:[window.mixins,window.http]
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .lf{
    float:left;
  }
  .rt{
    float:right;
  }
 .shop .weui-cells{
    border-top-left-radius:10px!important;
   border-top-right-radius: 10px;
  }
  .shop .date .weui-cells{
    border-bottom-left-radius: 10px;
    border-bottom-right-radius:10px;
  }
  .shop .detail{
    background: #fff;
    height:140px;
    padding-top:15px;
    vertical-align: top;
  }
  .shop .detail p{
    font-size: 14px;
  }
  .shop .detail p:first-child{
    margin:-5px 0 0 0;
  }
  .shop .weui-cell__ft{
    margin-left:10px;
  }
  @media screen  and (max-width: 320px) {
    .shop .detail p{
      font-size: 12px;
      margin-top:3px;
    }
    .shop .detail p:first-child{
      margin-top:-3px;
    }
  }
</style>
