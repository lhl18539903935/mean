import Vue from 'vue'
import n from './id'
import v from '../../components/index'
// import {store} from '../../vuex/store'

//为所有组件设置全局函数
Vue.prototype.herfs = v=>{
  console.log(v)
  location.href = v
  // if (!v || v == '#') return ''
  // if(v.indexOf('http') > -1){
  //   //外链
  //   location.href = v
  // }else {
  //   //路由
  //   // 处理异常，链接空格
  //   v = v.replace(/(^\s+)|(\s+$)/g,"")
  //   // location.href = 'http://j.diankuai.com'+v
  // }
}
//为所有组件设置全局过滤器
Vue.filter('imgs',img=>{
  // if (!img) return ''
  // if(img.indexOf('http') > -1){
  //   return img
  // }else {
  //   return 'http://j.diankuai.com'+img
  // }
  return img
})
Vue.prototype.swiperNumber=1

Vue.filter('str',(str,L,s)=>{
  s = typeof s == 'undefined' ? '':s
    L = 2*L
    let result = '',
      strlen = str.length,
      chrlen = str.replace(/[^\x00-\xff]/g,'**').length;
    if(chrlen<=L){return str;}
    for(let i=0,j=0;i<strlen;i++){
      let chr = str.charAt(i);
      if(/[\x00-\xff]/.test(chr)){
        j++;
      }else{
        j+=2;
      }
      if(j<=L){
        result += chr;
      }else{
        return result+s;
      }
    }
})

const compile = function (id, data) {
  // return new Promise((resolve,reject)=>{
    let vm;
  // let bodyh = document.body.clientHeight
  // store.commit('setScroll',bodyh)
  vm = new Vue({
    data(){
      return {
        content:data
      }
    }, //根据id,嵌套vue实例
    template:`<${n(id)} :content="content"></${n(id)}>`,
    el:`#${n(id)}`,
    components:{
      ...v   //加载所有模板
      //伪按需加载,其实差别不大
      // [n(id)]:v[n(id)] //es6 属性名表达式
    },
  })

}

export default compile