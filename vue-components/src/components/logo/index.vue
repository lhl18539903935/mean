<template>
    <div>
        <div class="m1" v-if="maxshow">
            <div class="m2" :style="'width:'+xsize+'px;height:'+xsize+'px;'">
                <slot><img src="./logo3.png" alt="logo"></slot>
                <transition
                  @enter="beforeEnter"
                  @afterEnter="enter">
                    <!--@leave="leave" @beforeLeave="beforeEnter"-->
                    <p v-if="show1" :style="'background-color: '+xbg"></p>
                </transition>
                <!--<div class="mynumber">{{animatedNumber}}%</div>-->
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'logo',
        props:{
            maxshow:{
                type:Boolean,
                default:true
            },
            minshow:{
                type:Boolean,
                default:true
            },
            xtime:{
                type:Number,
                default:2
            },
            xbg:{
                type:String,
                default:'#6594FE'
            },
            xsize:{
                type:Number,
                default:60
            }
        },
        data(){
            return{
                show:false,
                show1:false
            }

        },
        methods:{
            beforeEnter: function (el) {
                el.style.transform = 'translateY('+this.xsize+'px)'
            },
            enter: function (el, done) {
                el.style.transform = 'translateY(0px)'
                el.style.transitionProperty = 'all'
                el.style.transitionDuration= this.xtime+'s'
                el.style.transitionTimingFunction = 'linear'
            },
            setloop(t){
                    setTimeout(function () {
                        this.show1 = !this.show1
                        this.getloop(t)
                    }.bind(this),t*600)
            },
            getloop(t){
                this.setloop(t)
            }

        },
        mounted:function () {
            this.show1 = this.minshow
            this.getloop(this.xtime)
        }
    }

</script>

<style scoped>
    .btn{
        width: 100px;
        height: 50px;
        position:relative;
        z-index: 20000!important;
    }
    .m1{
        position: absolute;
        width:100vw;
        height: 100vh;
        top: 0;
        left: 0;
        background:rgba(111,111,111,0.3);
        z-index: 20000!important;

    }
    .m2{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        overflow: hidden;
        border:4px solid #f4f4f4;
        /*border-radius: 50%;*/
    }
    .m2 img{
        width: 100%;
        height: 100%;
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 5;
    }
    .m2 p{
        width:99%;
        height: 99%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: #6594FE;
    }
    .mynumber{
        position: absolute;
        width: 100%;
        height: 20px;
        background-color: #fff;
        bottom: 0;
        font-size: 12px;
        text-align: center;
        color: #6594FE;
    }
</style>