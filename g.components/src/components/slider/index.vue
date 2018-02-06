<template>
    <div>
        <div class="swiper-container"  :style="'margin-top:'+modulePadding+';margin-bottom:'+modulePadding+';'" v-show="statetype">
            <div class="headerlogo">
                <img :src="headerlogo" alt="">
            </div>
            <div class="swiper-wrapper">
                <div class="swiper-slide" :title="showtitle" v-for="(str,i) in dataset" :key="i" :style="{ backgroundImage: 'url(' + str.pic + ')' }"></div>
            </div>
            <div class="swiper-pagination swiper-pagination-white"></div>
        </div>
        <div class="styletwo" :style="'margin-bottom:'+margin+';'" v-show="!statetype">
            <div class="img" :title="showtitle" v-for="(str,i) in dataset" :key="i" :style=" 'backgroundImage: url(' + str.pic + ');margin-bottom:'+margin+';' "></div>
        </div>
    </div>
</template>
<script>
    // import Swiper from 'swiper';
    import 'swiper/dist/css/swiper.min.css';
    import Swiper from 'swiper/dist/js/swiper.min.js';
    export default {
        props: ['dataset','modulePadding','headerlogo','showtitle','showType','margin'],
        data(){
            return{
                
            }
        },
        created(){
            // 样式id （1为折叠轮播图，2为分开显示）
            if(this.showType==1){
                this.statetype=true
            }else{
                this.statetype=false
            }
        },
        mounted() {
            console.log('mounted', this)
            var swiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                paginationClickable: true,
                loop: true,
                speed: 600,
                autoplay: 1000,
                onTouchEnd: function() {
                    swiper.startAutoplay()
                }
            });
        }
    }
</script>
<style lang="less">
.swiper-container {
        width: 100%;
        height: 20rem;
        .swiper-wrapper {
            width: 100%;
            height: 100%;
        }
        .swiper-slide {
            background-position: center;
            background-size: cover;
            width: 100%;
            height: 100%;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .swiper-pagination-bullet {
            width:0.833rem;
            height: 0.833rem;
            display: inline-block;
            background: #7c5e53;
        }
        .headerlogo{
            margin:0 auto;
            width:10%;;
        }
        .headerlogo img{
            width:100%;
        }
    }
    .styletwo{
        width:100%;
        height:20rem;
      
    }
    .styletwo .img{
        width:100%;
        height:100%;
        position: relative;
        background-position: center;
        background-size: cover;
    }
</style>