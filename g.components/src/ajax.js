import { LoadingPlugin } from 'vux'
import Vue from 'vue'
import axios from "axios"
import { ToastPlugin } from 'vux'
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)

let token = localStorage.getItem('token')
/*let axios=axiosa.create({
    //baseURL: 'http://domain.com',
    //timeout: 5000,

    headers: {
        'token': token
    }
});
*/

axios.defaults.headers.token = token
axios.defaults.headers.type = 'dls'
axios.defaults.timeout = 30000
function array2url(arr) {
    var url = "";
    for (var a in arr) {
        url += a + "=" + arr[a] + "&"
    }
    if (url != "")
        return url.substring(0, url.length - 1)
    return url
}
const apiMethods = {
    methods: {
        apiGet(url, data) {
            var vm = this
            if (typeof data == "object")
                data = array2url(data)
            // vm.$vux.loading.show({
            //     text: 'Loading'
            // })
            return new Promise((resolve, reject) => {
                axios.get(url, data).then((response) => {
                    vm.$vux.loading.hide()
                    resolve(response.data)
                }, (response) => {
                    vm.$vux.loading.hide()
                    reject(response)
                    this.$vux.toast.show({
                        text: '请求超时，请检查网络',
                        type: "warn"
                    })
                })
            })
        },
        apiPost(url, data) {
            var vm = this
            if (typeof data == "object")
                data = array2url(data)
            // vm.$vux.loading.show({
            //     text: 'Loading'
            // })
            vm.$store.commit("updateLoadingStatus",{isLoading:true})
            return new Promise((resolve, reject) => {
                axios.post(url, data).then((response) => {
                    vm.$store.commit("updateLoadingStatus",{isLoading:false})
                    // vm.$vux.loading.hide()
                    resolve(response.data)
                }).catch((response) => {
                    vm.$vux.loading.hide()
                    resolve(response)
                    this.$vux.toast.show({
                        text: '请求超时，请检查网络',
                        type: "warn"
                    })
                })
            })
        },
    },

}

export default apiMethods