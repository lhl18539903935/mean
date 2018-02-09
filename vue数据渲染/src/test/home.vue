<template>
  <div style="background-color: #f8f8f8;padding: 0 5px;overflow: hidden;margin-bottom: 50px;">
    <div v-for="(n,i) in idArr" :key="i" :id="n"></div>



    <div v-if="idArr.length && loading" style="text-align: center;height: 30px">
      <svg version="1.1" id="Layer_1" x="0px" y="0px" width="24px" height="30px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50" xml:space="preserve">
          <rect x="0" y="0" width="4" height="10" fill="#333">
            <animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0" begin="0" dur="0.6s" repeatCount="indefinite"></animateTransform>
          </rect>
          <rect x="10" y="0" width="4" height="10" fill="#333">
            <animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0" begin="0.2s" dur="0.6s" repeatCount="indefinite"></animateTransform>
          </rect>
          <rect x="20" y="0" width="4" height="10" fill="#333">
            <animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0" begin="0.4s" dur="0.6s" repeatCount="indefinite"></animateTransform>
          </rect>
        </svg>
    </div>
    <div class="not" v-if="!loading"> —— 我就是底线 —— </div>
    <div>

    </div>
    <footer v-if="typeof footer.content.dataset != 'undefined'">
      <div
        class="f-div"
        v-for="(n,i) in footer.content.dataset" :key="i"
        @click="herfs(n.link)">
        <img class="f-img" :src="n.iconCheck | imgs" v-if="footer.content.style == 1">
        <p class="f-hidden" :class="{'f-txt':footer.content.style == 0}" :style="'color: '+n.fotColorCheck">{{n.showtitle}}</p>
      </div>
    </footer>
  </div>
</template>

<script>
  import axios from 'axios'
  import _id from '../assets/js/id'
  import compile from '../assets/js/compile'
  export default {
    name: 'home',
    data() {
      return {
        localhost:'',
        msg:[],
        idArr:[],
        page:0,
        state:false, // 本地数据 or 远程数据
        datas:[], //数据
        loading:true, //没有数据 false
        addEvent:true, // 防止多次监听
        prevent:false, //防止多次下拉
        jsonData:[], //缓存
        footer:{
          content:{}
        }, //底部导航
      }
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
      console.log(location)
      this.localhost = location.host
    },
    methods: {
      init(){ //初始化，比对版本号
        let chache = JSON.parse(localStorage.getItem('data'))
        let version = localStorage.getItem('version')
        axios.post('http://j.diankuai.com/Template/getindex','page=0')
//        axios.post('/Template/getindex','page=0')
          .then((res)=>{
            if(res.data.code == 200){
              if(Boolean(chache)){
                console.log('本地版本号='+version)
                console.log('远程版本号='+res.data.version)
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
        console.log('ajaxs'+page)
        let version = localStorage.getItem('version')
        axios.post('http://j.diankuai.com/Template/getindex',`page=${page}`)
//        axios.post('/Template/getindex',`page=${page}`)
          .then((res)=>{
            if(res.data.code == 200){
              if(version != res.data.version){ //每次请求判断版本号
                localStorage.clear('data')
                localStorage.setItem('version',res.data.version)
                location.reload()
                return false
              }
//              this.renders(res.data,false,page)
              this.renders(res.data,false)
              this.jsonData.push(res.data)
              this.page = Number(res.data.current_page) + 1
              localStorage.setItem('data',JSON.stringify(this.jsonData))
            }else {
              this.loading = false
              console.log('移除scroll监听事件')
              window.removeEventListener('scroll',this.hScroll,false)
            }
          })
      },
      chaches(page){//本地数据
        console.log('chaches'+page)
        console.log(page+'1')
        let chache = JSON.parse(localStorage.getItem('data'))
        if(typeof chache[page] != 'undefined'){
          this.renders(chache[page],true,page)
          console.log(chache[0])
          this.page = Number(chache.current_page) + 1
        }else {
          this.ajaxs(page)
        }
      },
      renders(data,state){ //数据渲染
        let windowh = window.screen.height
        for(let i of data.data){ // 渲染模板
          this.idArr.push(_id(i.type))
          setTimeout(()=>{
            compile(i.type,i.content)
            this.$nextTick(function () {
              let bodyh = document.body.clientHeight
              console.log(bodyh+'--'+windowh)
              if(bodyh<windowh){
                if(state){
                  this.chaches(this.page)
                }else {
                  this.ajaxs(this.page)
                }
              }else {
                this.prevent = true
//                this.page = page
                this.state = state
                if(this.addEvent){
                  window.addEventListener('scroll',this.hScroll,false)
                }
              }
            })
          },10)
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
        if(scrollHeight - scroll - windowHeight <= 0){
          this.addEvent = false //防止重复添加监听器
          if(this.prevent){ //防止多次下拉
            this.prevent = false
            setTimeout(()=>{
              if(state){
                this.chaches(this.page)
              }else {
                this.ajaxs(this.page)
              }
            },20)
          }
        }
      },
      postFooter(){
//        axios.post('http://j.diankuai.com/Template/gettabbar')
        axios.post('/Template/gettabbar')
          .then((res)=>{
          //console.log(res.data.data[0])
            this.footer = res.data.data[0]
          },(err)=>{
            console.log(err)
          })
      },
    },
    mounted() {
      this.init()
      this.postFooter()
    }
  }

</script>

<style scoped>
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
</style>