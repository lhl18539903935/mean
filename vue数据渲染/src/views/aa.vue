<template>
  <div id="aaa">
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'aa',
    data() {
      return {
        message:'message',
        page: 1,
        state: false, // 本地数据 or 远程数据
        datas: [], //数据
        loading: true, //没有数据 false
        addEvent: true, // 防止多次监听
        prevent: false, //防止多次下拉
        jsonData: [], //缓存
      }
    },
    methods: {
      init() { //初始化，比对版本号
        let chache = JSON.parse(localStorage.getItem('data'))
        let version = localStorage.getItem('version')
        axios.post('http://192.168.4.29:8086/public/portal/Kf_api/page', 'page=1')
          .then((res) => {
            console.log(res.data)
            if (res.data.code == 200) {
              if (Boolean(chache)) {
                console.log('本地版本号=' + version)
                console.log('远程版本号=' + res.data.version)
                if (version != res.data.version) { //版本更新
                  localStorage.clear('data')
                  localStorage.setItem('version', res.data.version)
                  console.log(1)
                  location.reload()
                  return false
                }
                this.jsonData = chache
              }
              this.ifChache(chache)
            } else {
              console.log(res.data.msg)
            }
          })
      },
      ifChache(chache) { //判断缓存
        if (!chache) {
          this.ajaxs(this.page)
        } else {
          this.chaches(this.page)
        }
      },
      ajaxs(page) { //请求数据
        console.log('ajaxs' + page)
        let version = localStorage.getItem('version')
        axios.post('http://192.168.4.29:8086/public/portal/Kf_api/page', `page=${page}`)
          .then((res) => {
            if (res.data.code == 200) {
              if (version != res.data.version) { //每次请求判断版本号
                localStorage.clear('data')
                localStorage.setItem('version', res.data.version)
                console.log(2)
                location.reload()
                return false
              }
              this.renders(res.data.data, false, page)
              this.jsonData.push(res.data)
              localStorage.setItem('data', JSON.stringify(this.jsonData))
            } else {
              this.loading = false
              window.removeEventListener('scroll', this.hScroll, false)
            }
          })
      },
      chaches(page) {//本地数据
        console.log('chaches' + page)
        let chache = JSON.parse(localStorage.getItem('data'))
        if (typeof chache[page - 1] != 'undefined') {
          this.renders(chache[page - 1], true, page)
        } else {
          this.ajaxs(page)
        }
      },
      renders(data, state, page) { //数据渲染
        let bodyh = document.body.clientHeight
        let windowh = window.screen.height
        this.datas.push(data) // 渲染模板
        this.$nextTick(function () {
          if (bodyh < windowh) {
            if (state) {
              this.chaches(page + 1)
            } else {
              this.ajaxs(page + 1)
            }
          } else {
            this.prevent = true
            this.page = page
            this.state = state
            if (this.addEvent) {
              window.addEventListener('scroll', this.hScroll, false)
            }
          }
        })

      },
      hScroll() {
        let state = this.state
        let page = this.page
        // 被卷去的高度
        let scroll = document.body.scrollTop || document.documentElement.scrollTop
        // 总高度
        let scrollHeight = document.body.scrollHeight || document.documentElement.scrollHeight
        // 可视高度
        let windowHeight = window.innerHeight
        if (scrollHeight - scroll - windowHeight == 0) {
          this.addEvent = false //防止重复添加监听器
          if (this.prevent) { //防止多次下拉
            this.prevent = false
            setTimeout(() => {
              if (state) {
                this.chaches(page + 1)
              } else {
                this.ajaxs(page + 1)
              }
            }, 50)
          }
        }
      }
    },
    created() {

    },
    mounted() {
      //请求接口，更改版本号
      //http://192.168.4.29:8086/public/portal/Kf_api/upVersion?version=2.00
//      this.init()

    }
  }

</script>

<style scoped>
  li {
    border-bottom: 1px solid red;
    line-height: 2;
    width: 300px;
    margin: 0 auto;
    overflow: hidden;
  }

  h1 {
    margin: 1em 0;
    border-bottom: 1px dashed;
    padding-bottom: 1em;
    font-weight: lighter;
  }

  p {
    font-style: italic;
  }

  .loader {
    margin: 0 0 2em;
    height: 100px;
    width: 20%;
    text-align: center;
    padding: 1em;
    margin: 0 auto 1em;
    display: inline-block;
    vertical-align: top;
  }

  svg path, svg rect {
    fill: #FF6700;
  }

</style>