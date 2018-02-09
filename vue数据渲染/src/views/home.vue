<template>
  <div style="background-color: #f8f8f8;padding: 0 5px;overflow: hidden;margin-bottom: 50px;">
    <div v-for="(n,i) in idArr" :key="i" :id="n"></div>

    <div v-if="idArr.length && loading" style="text-align: center;height: 30px">
      <vue-loading type="bars" color="#999" :size="{ width: '30px', height: '30px' }"></vue-loading>
    </div>
    <div class="home-b" v-if="!loading">
      <p class="home-b-1">All Rights Reserved ©2018 惠乐益电子商务有限公司 版权所有</p>
      <div class="home-b-2">
        <div>
          <img class="home-b-3" src="../assets/image/home_logo.png">
          <img class="home-b-4" src="../assets/image/huileyi.png">
        </div>
      </div>
      <div style="width:100%;margin:0 auto; padding:10px 0; text-align:center;" class="varchar">
        <a  style="display:block;vertical-align: top;color: #b3b3b3;height:20px;line-height:20px;">豫ICP备17019894号-1</a>
      </div>
    </div>
    <div class="loading" v-if="loading2"  @touchmove.prevent @touchstart.prevent>
      <vue-loading  class="loading-v" type="spiningDubbles" color="#666" :size="{ width: '50px', height: '50px' }"></vue-loading>
    </div>
    <footer v-if="typeof footer.content.dataset != 'undefined'">
      <div
        class="f-div"
        v-for="(n,i) in footer.content.dataset" :key="i"
        @click="herfs(n.link)">
        <img class="f-img" :src="n.icon | imgs" v-if="footer.content.style == 1">
        <p class="f-hidden" :class="{'f-txt':footer.content.style == 0}" :style="'color: '+n.fotColorCheck">{{n.showtitle}}</p>
      </div>
    </footer>
  </div>
</template>

<script>
  import axios from 'axios' //cnd
  import _id from '../assets/js/id'
  import compile from '../assets/js/compile'
  import vueLoading from 'vue-loading-template'
  export default {
    name: 'home',
    data() {
      return {
        localhost:'',
        msg:[],
        idArr:[],
        page:0,
        page_s:-1,//处理异常
        state:false, // 本地数据 or 远程数据
        datas:[], //数据
        loading:true, //没有数据 false
        loading2:true, //loading动画
        addEvent:true, // 防止多次监听
        prevent:false, //防止多次下拉
        jsonData:[], //缓存
        current_num:0, //后端要求
        footer:{
          content:{}
        }, //底部导航
        loading_num:0
      }
    },
    components: {
      vueLoading
    },
    created() { //所有数据
//      axios.get('../src/data/init.json').then((res)=>{
//        this.msg = res.data.LModules
//        for(let i of this.msg){
//          this.idArr.push(_id(i.type))
//          setTimeout(()=>{
//            compile(i.type,i.content)
//          },10)
//        }
//      },(err)=>{
//        console.log(err)
//      })
      this.localhost = location.host
    },
    methods: {
      init(){ //初始化，比对版本号
        let chache = JSON.parse(localStorage.getItem('data'))
        let version = localStorage.getItem('version')
        axios.post('http://www.huileyi.com/Template/getindex','page=0')
//        axios.post('http://j.diankuai.com/Template/getindex','page=0')
//        axios.post('/Template/getindex','page=0')
          .then((res)=>{
          console.log(res)
            if(res.data.code == 200){
              if(Boolean(chache)){
                if(version != res.data.version){ //版本更新
                  localStorage.clear('data')
                  localStorage.setItem('version',res.data.version)
                  location.reload()
                  return false
                }
                this.jsonData = chache
              }
              this.ifChache(chache)
            }else {
              console.log(res.data.msg)
            }
          })
      },
      ifChache(chache){ //判断缓存
        if(!chache){
          this.ajaxs(this.page)
        }else {
          this.chaches(this.page)
        }
      },
      ajaxs(page){ //请求数据
//        console.log('ajaxs',page)
        let windowHeight = window.innerHeight
        let windowWidth = window.innerWidth
        let version = localStorage.getItem('version')
        if(this.page_s < page){ //异常处理
          this.loading_num++  //加载动画
          this.page_s = page
          axios.post('http://www.huileyi.com/Template/getindex',`page=${page}&current_num=${this.current_num}&screen_width=${windowWidth}&screen_height=${windowHeight}`)
//          axios.post('http://j.diankuai.com/Template/getindex',`page=${page}&current_num=${this.current_num}&screen_width=${windowWidth}&screen_height=${windowHeight}`)
//          axios.post('/Template/getindex',`page=${page}&current_num=${this.current_num}&screen_width=${windowWidth}&screen_height=${windowHeight}`)
            .then((res)=>{
              if(res.data.code == 200){
                if(version != res.data.version){ //每次请求判断版本号
                  localStorage.clear('data')
                  localStorage.setItem('version',res.data.version)
                  location.reload()
                  return false
                }
                this.current_num = res.data.current_num
                this.renders(res.data,false,page)
                this.jsonData.push(res.data)
                localStorage.setItem('data',JSON.stringify(this.jsonData))
                this.loading_num--
              }else {
                this.loading = false
//                console.log('移除scroll监听事件')
                window.removeEventListener('scroll',this.hScroll,false)
                this.loading2 = false
              }
            })
        }
      },
      chaches(page){//本地数据
//        console.log('chaches',page)
        if(this.page_s < page){ // 异常处理
          let chache = JSON.parse(localStorage.getItem('data'))
          if(typeof chache[page] != 'undefined'){
            this.page_s = page
            this.renders(chache[page],true,page)
          }else {
            this.current_num = chache[page-1].current_num
            this.ajaxs(page)
          }
        }

      },
      renders(data,state,page){ //数据渲染
        let windowh = window.screen.height
        this.if_loading()
        for(let i of data.data){ // 渲染模板
//          console.log(_id(i.type))
          this.idArr.push(_id(i.type))
          setTimeout(()=>{
            compile(i.type,i.content)
            this.$nextTick(function () {
              let bodyh = document.body.clientHeight
              if(bodyh<windowh){
                if(state){
                  this.chaches(page+1)
                }else {
                  this.ajaxs(page+1)
                }
              }else {
                this.prevent = true
                this.page = page
                this.state = state
                if(this.addEvent){
                  window.addEventListener('scroll',this.hScroll,false)
                }
              }
            })
          },20)
        }


      },
      hScroll(){
        let state = this.state
        let page = this.page
        // 被卷去的高度
        let scroll = document.body.scrollTop ||  document.documentElement.scrollTop
        // 总高度
        let scrollHeight = document.body.scrollHeight || document.documentElement.scrollHeight
        // 可视高度
        let windowHeight = window.innerHeight
        if(scrollHeight - scroll - windowHeight == 0){
          this.addEvent = false //防止重复添加监听器
          if(this.prevent){ //防止多次下拉
            this.prevent = false
            this.loading2 = true
            setTimeout(()=>{
              if(state){
                this.chaches(page+1)
              }else {
                this.ajaxs(page+1)
              }
            },10)
          }
        }
      },
      postFooter(){
        axios.post('http://www.huileyi.com/Template/gettabbar')
//        axios.post('http://j.diankuai.com/Template/gettabbar')
//        axios.post('/Template/gettabbar')
          .then((res)=>{
            this.footer = res.data.data[0]
          },(err)=>{
            console.log(err)
          })
      },
      if_loading(){
        if(this.loading_num == 0 || this.loading_num == 1){
          this.loading2 = false
        }
      }
    },
    mounted() {
      this.init()
      this.postFooter()
    }
  }

</script>

<style scoped>
  .loading{
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 999;
  }
  .loading-v{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
  .not{
    height: 30px;
    line-height: 30px;
    text-align: center;
    overflow: hidden;
  }
  svg path, svg rect {
    /*fill: #FF6700;*/
    fill: #bbb;
  }
  footer{
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: auto;
    border-top: 1px solid #ddd;
    box-sizing: border-box;
    z-index: 222;
  }
  .f-div{
    flex: 1 0 auto;
    padding: 5px 0 0;
    text-align: center;
    background-color: #f8f8f8;
  }
  .f-img{
    width: 21px;
    height: 21px;
    margin: 0 15px;
  }
  .f-txt{
    border-left: 1px solid #bbb;
    margin-bottom: 10px;
  }
  .f-hidden{
    font-size: 12px;
    height: 19px;
    margin-left:auto;
    margin-right:auto;
    overflow: hidden;
  }
  .f-div:nth-child(1) .f-txt{
    border-left: none;
  }
  .home-b{

  }
  .home-b-1{
    margin-top:10px;
    text-align: center;
    font-size: 12px;
    color: #b3b3b3;
    height: 20px;
    line-height: 20px;
  }
  .home-b-2{
    display: flex;
    justify-content: center;
    width: 100%;
    padding-top: 10px;
    margin: 10px auto;
    overflow: hidden;
    border-top:1px solid #f0f0f0;
  }
  .home-b-3{
    width:9vw;
    padding-right: 2vw;
    display: inline-block;
    border-right:1px solid #f0f0f0;
  }
  .home-b-4{
    position: relative;
    top: -5px;
    width: 14vw;
    display: inline-block;
  }
</style>