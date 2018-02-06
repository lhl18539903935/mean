<template>
    <div class="examplte">
          <!--<div v-for="item in list"  class="vux-center-h">
            <emotion>{{item}}</emotion>
            <emotion is-gif>{{item}}</emotion>
        </div>-->
        <!--<aa title="13213213232146548768" styleid="1"></aa>
        <slider  :dataset="listImg" showType="1" margin="20px" modulePadding="0px" showtitle="123456" :headerlogo="headerlogo"></slider>
        <headlogo></headlogo>
        <search></search>
        <navbanner ></navbanner>-->
        <!--<aa :title='titleTop' :Tfont='Tfont' :theight='theight'  :show='show0' :fontcolor='color' :bgcolor="bg" :location='location'></aa>-->
        <!--<below :show='show2' :font='p' :isize="isize" :iheight='iheight' :src='item.link' :handinling='item.title' v-for="(item,i) in list" :key="i"></below>
        <hot :show="showhot" :hottitlt="hottitle" :src="src1" :bgcolor="bgcolor"></hot>
        <grid v-for="(item,i) in grid":key="i" :intrfont="intrfont" :weight="weight" :intrShow="intrShow" :src="item.src" :show='show1' :introduction="item.introduction" :gwidht="gwidht"  :costprice="item.costprice" :currentprice="item.currentprice"></grid>
     
        <list :src="item.src2" :srctwo="srctwo" :producttitle="producttitle" v-for="(item,i) in storelist" :key="i"></list>
        <singlelist :singlesrc="singlesrc"></singlelist>
        <abeam :abeamlist="abeamlist"></abeam>
 
            <scrollist :scrolllist="scroll" ></scrollist>
       
        <navimg :navimgtwo="item.navimg" :navnametwo="item.navnametwo" :navimg="item.navimg" :navname="navname" v-for="(item,i) in imglist" :key="i"></navimg>
        <autoimg :state="true" :autoimg="item.autoimg" :autotitle="item.autotitle" v-for="(item,i) in autolist" :key="i"></autoimg>

        <gap></gap>
        <dashed></dashed>
        <topmenu :menucontentone="menucontentone" :imgmenuone="imgmenuone" :imgmenutwo="imgmenuone" :imgmenuthree="imgmenuone" :imgmenufour="imgmenuone"></topmenu>
        <mm></mm>
        <acase :leftone="imgmenuone" :rightone="imgmenuone" :righttwo="imgmenuone" :caseleft="producttitle" :caserightone="producttitle" :caserighttwo="producttitle"></acase>
        <dds :caseone="imgmenuone" :casetwo="imgmenuone" :casethree="imgmenuone" :casetitleone="producttitle" :casetitletwo="producttitle" :casetitlethree="producttitle"></dds>
        <notice :notice="notice"></notice>
        <classify v-for="(item,i) in classify" :key="i" :classify="item.classify"></classify>
        <classtwo v-for="(item,i) in classify" :key="i" :classifytwo="item.classify"></classtwo>
        <settype :settype="settype"></settype>
        <cardlist :tablist="tablist" ></cardlist>
        <img src="data:image/jpg;base64,/9j/4QMZRXhpZgAASUkqAAgAAAAL...."/>-->
        <cc :content="content"></cc>
        <!--<navscroll  :navscrolllist="navscrolllist"></navscroll>
        <swiper auto height="100px" style="width:95%;margin:0 auto;background-color:#000;line-height:100px;text-align:center">
            <swiper-item class="black"><h2 style="color:#fff;" class="title fadeInUp animated">它无孔不入</h2></swiper-item>
            <swiper-item class="black"><h2 style="color:#fff;" class="title fadeInUp animated">你无处可藏</h2></swiper-item>
            <swiper-item class="black"><h2 style="color:#fff;" class="title fadeInUp animated">不是它可恶</h2></swiper-item>
            <swiper-item class="black"><h2 style="color:#fff;" class="title fadeInUp animated">而是它不懂你</h2></swiper-item>
            <swiper-item class="black"><h2 style="color:#fff;" class="title fadeInUp animated">我们试图</h2></swiper-item>
            <swiper-item class="black"><h2 style="color:#fff;" class="title fadeInUp animated">做些改变</h2></swiper-item>
        </swiper>-->
           <!--<x-switch :title="('Array menu')" v-model="show5"></x-switch>
         <actionsheet v-model="show5" :menus="menus5" @on-click-menu="click5" ></actionsheet>-->
    </div>
</template>

<script>
import { WechatEmotion as Emotion } from 'vux'
    import {Actionsheet,XSwitch} from 'vux'
    import below from '../components/below/index.vue'
    import navbanner from './../components/nav/index.vue'
    import aa from '../components/title/index.vue'
    import hot from '../components/hot/index.vue'
    import grid from '../components/grid/index.vue'
    import list from '../components/list/index.vue'
    import singlelist from './../components/singlelist/index.vue'
    import abeam from './../components/abeamlist/index.vue'
    import scrollist from './../components/scrolllist/index.vue'
    import search from './../components/search/index.vue'
    import navimg from './../components/imgnav/index.vue'
    import autoimg from './../components/imgauto/index.vue'
    import dashed from './../components/dashed/index.vue'
    import gap from './../components/gap/index.vue'
    import topmenu from './../components/topmenu/index.vue'
    import mm from './../components/menu/index.vue'
    import acase from './../components/showcase/index.vue'
    import dds from './../components/showcasecol/index.vue'
    import notice from './../components/notice/index.vue'
    import classify from './../components/classify/index.vue'
    import classtwo from './../components/classifytwo/index.vue'
    import settype from './../components/settype/index.vue'
    import cardlist from './../components/cardlist/index.vue'
    import cc from './../components/sales/sales.vue'
    import navscroll from './../components/navscroll/index.vue'
    import swiper from './../components/swiper/swiper.vue'
    import swiperItem from './../components/swiper/swiper-item.vue'
     import upload from "../upload.js"
    import http from '../ajax.js'
    import mixin from '../vuex/mixin.js'
    import headlogo from './../components/headlogo/index.vue'
    import slider from './../components/slider/index.vue'
    export default {
        components:{
             Emotion,headlogo,Actionsheet,XSwitch,slider, below,aa,navscroll,swiperItem,cardlist,swiper,cc,classify,notice,grid,settype,dds,hot,list,singlelist,classtwo,abeam,scrollist,search,navbanner,navimg,autoimg,dashed,gap,topmenu,mm,acase
        },
        mounted(){
            let str=localStorage.getItem('URL')    
        },
        methods:{
            
           
            click5(key,item){
                if(item.label=="扫一扫"){
                    let vm=this;
                    // let rusult=localStorage.getItem('URL')
					cordova.plugins.barcodeScanner.scan( 
                        
						function (result) {
							let query=result.text;
							let p=query.indexOf('qrcode_num');
							let p_slit=query.substr(p);
							let queryArr=p_slit.split('/');
							vm.sendScan(queryArr);
						},
						function (error) {
							// alert("Scanning failed: " + error);
							this.$vux.toast.show({
								text: '扫描失败',
								type: "warn"
							})
						}
					);
                }
                if(item.label=="从相册选取"){
                     var vm=this
                    vm.getPhotoAndUpload(function(ret){
                    //    this.base64decode(str)
                    },function(r){
                        console.log(JSON.stringify(r))
                        //alert(JSON.stringify(r));
                    })
					
                    }
                }
            },
                sendScan(queryArr){
                let vm=this;
                let data={qrcode_num:queryArr[1],key:queryArr[3]};
                //let data={qrcode_num:10000011,key:'iv99klsed4gw6w3r42wf6nmilma3upo1'};
                this.apiPost(this.phost+'/Dls/bindQrcode', data).then((res) => {
                        // console.log(res);
                        if(res.code==200){
                        this.$vux.toast.show({
                                text: res.msg,
                                type: "success"
                            })
                            // vm.currentPage=1;
                            // vm.datalist=[];
                            // vm.codeList();
                        }else{
                        this.$vux.toast.show({
                                text: res.msg,
                                type: "warn"
                            })
                        }
                    })
                },

             mixins:[mixin,http,upload],
        data(){
            return{
                 list: ['微笑', '撇嘴', '色', '发呆', '得意', '流泪', '害羞', '闭嘴', '睡', '大哭', '尴尬', '发怒', '调皮', '呲牙', '惊讶', '难过', '酷', '冷汗', '抓狂', '吐', '偷笑', '可爱', '白眼', '傲慢', '饥饿', '困', '惊恐', '流汗', '憨笑', '大兵', '奋斗', '咒骂', '疑问', '嘘', '晕', '折磨', '衰', '骷髅', '敲打', '再见', '擦汗', '抠鼻', '鼓掌', '糗大了', '坏笑', '左哼哼', '右哼哼', '哈欠', '鄙视', '委屈', '快哭了', '阴险', '亲亲', '吓', '可怜', '菜刀', '西瓜', '啤酒', '篮球', '乒乓', '咖啡', '饭', '猪头', '玫瑰', '凋谢', '示爱', '爱心', '心碎', '蛋糕', '闪电', '炸弹', '刀', '足球', '瓢虫', '便便', '月亮', '太阳', '礼物', '拥抱', '强', '弱', '握手', '胜利', '抱拳', '勾引', '拳头', '差劲', '爱你', 'NO', 'OK', '爱情', '飞吻', '跳跳', '发抖', '怄火', '转圈', '磕头', '回头', '跳绳', '挥手', '激动', '街舞', '献吻', '左太极', '右太极'],
                menus5: [
                 {
                    label: '扫一扫',
                    type: 'primary',
                }, {
                    label: '从相册选取',
                    type: 'warn'
                },{
                    label: '取消'
                }],
                // 上下模块below 组件样式
                p:12,
                show5: false,
                isize:50,
                iheight:50,
                show0:true,
                // 标题title 组件样式
                titleTop:"电子商务aaaaa",
                show2:true,
                Tfont:'14px',
                // twidth:'95%',
                theight:'2rem',
                color:'#646464',
                bg:'#6594FE',
                location:'left',
                goodslist:'',
                //grid 组件样式
                show1:true,
                gwidht:90,
                // swidth:0,    
                src:require('./../assets/lic.jpg'),
                introduction:'uuuuuu',
                costprice:88.88,
                currentprice:99.99,
                // imgwidth:100,
                // imgheigth:100,
                intrShow:false,
                intrfont:14,
                weight:800,
                //hot热门商品title
                hottitle:'促销',
                src1:require('./../assets/hot.png'),
                bgcolor:'#FE3000',
                showhot:true,
                //商品列表
                tablist:[
                    {key:"0",tab:"卡片一",cardsrc:require('./../assets/g6.jpg'),cardtitle:"风衣",cardsell:"222",cardcost:"45",cardcurrent:"456",cardconentshow:true},
                    {key:"1",tab:"卡片二",cardsrc:require('./../assets/g06.jpg'),cardtitle:"门窗",cardsell:"456",cardcost:"145",cardcurrent:"78",cardconentshow:false},
                    {key:"2",tab:"卡片三",cardsrc:require('./../assets/a1.jpg'),cardtitle:"杂志",cardsell:"786",cardcost:"3313123",cardcurrent:"456345",cardconentshow:false},
                    {key:"3",tab:"卡片四",cardsrc:require('./../assets/a2.jpg'),cardtitle:"微信",cardsell:"245622",cardcost:"123333",cardcurrent:"132",cardconentshow:false},
                ],
                storelist:[
                    {src2:require('./../assets/g6.jpg')},
                    {src2:require('./../assets/g01.jpg')},
                    {src2:require('./../assets/g6.jpg')},
                    {src2:require('./../assets/g6.jpg')},
                ],  
                navlist:[
                    {navdefault:'白度'},
                     {navdefault:'白度'},
                      {navdefault:'白度'},
                ],
                headerlogo:require('./../assets/g6.jpg'),
                // 顶部菜单栏
                menucontentone:"苹果",
                imgmenuone:require('./../assets/g6.jpg'),
                srctwo:require('./../assets/addcart.png'),
                producttitle:"秒杀",
                singlesrc:require('./../assets/g6.jpg'),
                abeamsrc:require('./../assets/g01.jpg'),
                scrollsrc:require('./../assets/g6.jpg'),
                navimg:require('./../assets/g6.jpg'),
                navname:"女装",
                notice:'请填写内容，如时间过长将会滚动显示',
                settype:"请填写内容，如时间过长将会滚动显示请填写内容，如时间过长将会滚动显示请填写内容，如时间过长将会滚动显示请填写内容，如时间过长将会滚动显示",
                classify:[
                    {classify:'样式1'},{classify:'样式1'},{classify:'样式1'},{classify:'样式1'},{classify:'样式1'},{classify:'样式1'},{classify:'样式1'},{classify:'样式1'}
                ],
                navscrolllist:[
                    {navscrollsrc:require('./../assets/g6.jpg'),navscrolltitle:"文本导航"},
                    {navscrollsrc:require('./../assets/g6.jpg'),navscrolltitle:"文本导航"},
                    {navscrollsrc:require('./../assets/g6.jpg'),navscrolltitle:"文本导航"},
                    {navscrollsrc:require('./../assets/g6.jpg'),navscrolltitle:"文本导航"},
                    {navscrollsrc:require('./../assets/g6.jpg'),navscrolltitle:"文本导航"},
                    {navscrollsrc:require('./../assets/g6.jpg'),navscrolltitle:"文本导航"},
                    {navscrollsrc:require('./../assets/g6.jpg'),navscrolltitle:"文本导航"},
                ],
                listImg:[
                    {pic:require('./../assets/g6.jpg')},
                     {pic:require('./../assets/g01.jpg')},
                      {pic:require('./../assets/g05.jpg')},
                      {pic:require('./../assets/g6.jpg')},
                     {pic:require('./../assets/g01.jpg')},
                      {pic:require('./../assets/g05.jpg')},
                ],
                autolist:[
                    {autoimg:require('./../assets/a1.jpg'),autotitle:'美食'},
                    {autoimg:require('./../assets/a2.jpg'),autotitle:'美食'},
                    {autoimg:require('./../assets/a3.jpg'),autotitle:'美食'},
                    {autoimg:require('./../assets/a4.jpg'),autotitle:'美食'},
                    {autoimg:require('./../assets/a4.jpg'),autotitle:'美食'},
                ],
                imgArray:[
                    require('./../assets/g01.jpg'),
                    require('./../assets/g6.jpg'),
                    require('./../assets/g05.jpg'),
                    require('./../assets/g02.jpg'),
                    require('./../assets/g03.jpg'),
                ],
                imglist:[
                    {navimg:require('./../assets/g6.jpg'),navnametwo:'美食'},
                    {navimg:require('./../assets/g6.jpg'),navnametwo:'美食'},
                    {navimg:require('./../assets/g6.jpg'),navnametwo:'美食'},
                    // {navimg:require('./../assets/g01.jpg'),navnametwo:'美食'},
                    {navimg:require('./../assets/g6.jpg'),navnametwo:'美食'},
                    
                ],
                abeamlist:[
                    {abeamsrc:require('./../assets/g6.jpg'),abeamtitle:'大風衣',abeamcost:"600.00",abeamsale:"30",abeamcurrent:"560.0"},
                    {abeamsrc:require('./../assets/g6.jpg'),abeamtitle:'大風衣',abeamcost:"600.00",abeamsale:"30",abeamcurrent:"560.0"},
                    {abeamsrc:require('./../assets/g6.jpg'),abeamtitle:'大風衣',abeamcost:"600.00",abeamsale:"30",abeamcurrent:"560.0"},
                ],
                scroll:[
                    {scrollsrc:require('./../assets/g6.jpg'),scrolltitle:'大風衣',scrollcost:'600.00',scrollcurrent:'620.00'},
                    {scrollsrc:require('./../assets/g6.jpg'),scrolltitle:'大風衣',scrollcost:'600.00',scrollcurrent:'620.00'},
                    {scrollsrc:require('./../assets/g6.jpg'),scrolltitle:'大風衣',scrollcost:'600.00',scrollcurrent:'620.00'},
                   {scrollsrc:require('./../assets/g6.jpg'),scrolltitle:'大風衣',scrollcost:'600.00',scrollcurrent:'620.00'},
                     {scrollsrc:require('./../assets/g6.jpg'),scrolltitle:'大風衣',scrollcost:'600.00',scrollcurrent:'620.00'},
                    {scrollsrc:require('./../assets/g6.jpg'),scrolltitle:'大風衣',scrollcost:'600.00',scrollcurrent:'620.00'},
                   {scrollsrc:require('./../assets/g6.jpg'),scrolltitle:'大風衣',scrollcost:'600.00',scrollcurrent:'620.00'},
        
                ],
                grid:[
                    {src:require('./../assets/g01.jpg'),introduction:'秒杀',costprice:2888.00,currentprice:28.88},
                    {src:require('./../assets/g02.jpg'),introduction:'秒杀',costprice:2888.00,currentprice:28.88},
                    {src:require('./../assets/g03.jpg'),introduction:'秒杀',costprice:2888.00,currentprice:28.88},
                    {src:require('./../assets/g04.jpeg'),introduction:'秒杀',costprice:2888.00,currentprice:28.88},
                    {src:require('./../assets/g05.jpg'),introduction:'秒杀',costprice:2888.00,currentprice:28.88},
                    {src:require('./../assets/g06.jpg'),introduction:'秒杀',costprice:2888.00,currentprice:28.88},
                ],
                list:[
                    {link:require('./../assets/g1.png'),title:"新品"},
                    {link:require('./../assets/g2.png'),title:"新品"},
                    {link:require('./../assets/g3.png'),title:"新品"},
                    {link:require('./../assets/g4.png'),title:"新品"},
                    {link:require('./../assets/g5.png'),title:"新品"},
                ], 
                content:{
                    goodslist:[
                        {title: "测试商品",price: "0.01",original_price: "1.00",pic:require('./../assets/g06.jpg'),create_time:'2017-12-23 11:38:00'}
                    ],
                    act_status: "还有机会",
                    act_status_price: "疯抢价",
                    modulePadding: 9
                }               
            }
        },
        // mixins:[window.mixins,window.http]
    }

</script>

<style scoped>
    .tab-head{
    list-style-type: none;
    display:-webkit-box;
    display:-webkit-flex;
    display:-ms-flexbox;
    display:flex;
    -webkit-flex-wrap:nowrap;
    -ms-flex-wrap:nowrap;
    flex-wrap:nowrap;
    -webkit-box-pack:justify;
    -webkit-justify-content:space-between;
    -ms-flex-pack:justify;justify-content:space-between;background:#fff;padding:0;overflow:auto;}

  .tab-head-item{-webkit-box-flex:1;-webkit-flex:1 0 auto;-ms-flex:1 0 auto;flex:1 0 auto;color:#000;padding:0 5px;}
.vux-slider > .vux-indicator, .vux-slider .vux-indicator-right{
    bottom:-30px!important;
}
</style>