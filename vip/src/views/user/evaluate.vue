<template>
    <div>
        <tab :line-width=2 active-color="#fe4a48" v-model="evaluate">
            <tab-item
              class="vux-center"
              :selected="classify === item.name"
              v-for="(item, index) in list"
              @click.native="switch1(item.name,item.number)"
              :key="index">
                {{item.name}}
            </tab-item>
        </tab>
        <swiper ref="myswiper"
                v-model="evaluate"
                :height="111*orderNumber+'px'"
                :min-moving-distance="1000"
                :show-dots="false">
            <swiper-item>
                <div class="order" v-for="(n,nIndex) in orderNumber" :key="nIndex">
                    <img src="../../assets/image/Sample.png" alt="img">
                    <div class="left">
                        <div>
                            <p class="title">于记柠檬鱼</p>
                            <p class="right">09-20</p>
                        </div>
                        <p>
                            <span style="position: relative;top: -3px;">打分</span>
                            <my-rater
                              disabled
                              :fontSize="16"
                              v-model="data41"
                              star='<span><i class="iconfont icon-pingjia1 fs12"></i></span>'
                              active-color="red">
                        </my-rater>
                        </p>
                        <p class="money">"挺好吃的，味道很特别，下次还会考录来吃，店内环境挺好的。"</p>
                    </div>
                </div>
            </swiper-item>
            <swiper-item>
                <div class="order" v-for="n in orderNumber" :key="n">
                    <img src="../../assets/image/Sample.png" alt="img">
                    <div class="left">
                        <p class="title2">于记柠檬鱼</p>
                        <p class="numbers">下单时间：207-09-20&#x3000;16:23</p>
                        <div>
                            <p class="money2">消费：￥198.00</p>
                            <p class="right btn">评价</p>
                        </div>

                    </div>
                </div>
            </swiper-item>
        </swiper>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import {
        Tab,
        TabItem,
        SwiperItem,
        Swiper,
        Rater
    } from 'vux'
    import myRater from '../../components/rater/index.vue'
    export default {
        name: 'evaluate',
        components:{
            Tab,
            TabItem,
            SwiperItem,
            Swiper,
            myRater
        },
        methods:{
            switch1(name,number){
                this.classify = name;
                this.orderNumber = number;
                this.$refs.myswiper.xheight = 111*number+'px';
            },
        },
        data(){
            return{
                classify:'全部',
                list:[
                    {
                        name:'已评价',
                        number:3,
                    },
                    {
                        name:'待评价',
                        number:5,
                    }],
                orderNumber:3,
                raterNumber:5,
                data41:4.5

            }
        },
        computed:{
            evaluate:{ //直接使用v-mould绑定需要设置set
                get:function() {
                    return this.$store.state.vux.evaluate
                },
                set:function(newValue){
                    this.$store.state.vux.evaluate = newValue
                }
            }
        },
        mounted(){

        }
    }

</script>

<style scoped>
    .vux-tab{
        margin-bottom: 10px;
    }
    .order{
        width: 100%;
        padding: 15px 12px;
        overflow: hidden;
        font-size: 13px;
        color: #888;
        line-height: 1.45;
        background-color: #fff;
        border-bottom: 1px solid #ccc;
    }
    .order .left{
        float: left;
        width: calc(100% - 90px);
    }
    .order>img{
        display: inline-block;
        float: left;
        width: 80px;
        height: 80px;
        margin-right:10px;

    }
    .order .left div{
        overflow: hidden;
    }
    .order .left .title{
        float: left;
        font-size: 16px;
        color: #000;
    }
    .order .left .title2{
        font-size: 16px;
        color: #000;
        margin-bottom:10px;
    }
    .order .left .right{
        float: right;
    }
    .order .left .money2{
        float: left;
    }
    .order .left .btn{
        padding:5px 20px;
        background-color: #fe4a48;
        color: #fff;
        border-radius: 5px;
    }
</style>