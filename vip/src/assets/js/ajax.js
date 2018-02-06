import Vue from 'vue'
import axios from 'axios'
import {store} from "../../vuex/store"


// let token = localStorage.getItem('token')
// axios.defaults.headers.token = token

axios.defaults.baseURL = 'https://authapi.huileyi.com'
axios.defaults.timeout = 30000

var isLoading = 0;
function isShow() {
    if(isLoading == '0')
        store.commit('updateLoadingStatus', {isLoading: false})
}

function parameterFormat(arr) {
    //格式化请求参数
    var url = ''
    for (var a in arr){
        url += a +'='+arr[a]+'&'
    }
    if(url != ''){
        return url.substring(0,url.length - 1)
    }
    return url
}

Vue.mixin({
    created() {
        this.apiGet = function (url,data){
            isLoading++
            var vm = this
            if(typeof data == 'object') data = parameterFormat(data)
            return new Promise((resolve,reject)=>{
                axios.get(url,data).then((res)=> {
                    resolve(res.data)
                    isLoading--
                    isShow()
                },(err)=>{
                    reject(err)
                })
            })
        }
        this.aipPost = function (url,data){
            isLoading++
            var vm = this
            if(typeof data == 'object') data = parameterFormat(data)
            return new Promise((resolve,reject)=>{
                axios.post(url,data).then((res)=> {
                    resolve(res.data)
                    isLoading--
                    isShow()
                },(err)=>{
                    reject(err)
                })
            })
        }
    }
})