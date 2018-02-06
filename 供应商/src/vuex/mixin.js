    //起初利用混合 mixin+vuex 动态设置页面标题+动态设置前一页页面名字
    const mixin = {
        mounted() {
            this.$store.commit("setPageName", this.pageName)
            if(this.pageHeader == false){
                this.$store.commit("setHeader", this.pageHeader)
            }else{
                this.$store.commit("setHeader", true)
            }
            if(this.pageFooter == false){
                this.$store.commit("setFooter", this.pageFooter)
            }else{
                this.$store.commit("setFooter", true)
            }
            this.$store.commit('setBg',this.bg)
                // console.log('全局混合mounted')
            window.axios.defaults.headers.token = localStorage.getItem('token');
            window.axios.defaults.headers.type='merchant';
            //是否需要登录

            let needLogin=true;
            if(this.$router.path =='/login' || window.location.href.indexOf('login') > 0){
                needLogin=false;
            }else if( this.$router.path =='/register_detail' || window.location.href.indexOf('register_detail') > 0){
                needLogin=false;
            }else if( this.$router.path =='/forgetPass' || window.location.href.indexOf('forgetPass') > 0){
                needLogin=false;
            }else if( this.$router.path =='/newPass' || window.location.href.indexOf('newPass') > 0){
                needLogin=false;
            }else if( this.$router.path =='/findpwd' || window.location.href.indexOf('findpwd') > 0){
                needLogin=false;
            }else if( this.$router.path =='/register' || window.location.href.indexOf('register') > 0){

                needLogin=false;
            }
    
            if(needLogin){
                // this.apiPost('http://r.huileyi.com/home/checkToken').then((res) => {
                //     if(res.code == 200){
                //         localStorage.setItem('merchant_id',res.data.merchant_id)
                //     }
                //     if(res.code==223){
                //         this.$router.push({path: 'login'});
                //     }
                // })
           
                //商家状态
                let checkMerchant=localStorage.getItem('checkMerchant');
                // if(!checkMerchant){
                //     this.apiPost('http://r.huileyi.com/Merchant/getUserLevel').then((res) => {
                //         if(res.code==200){

                //             localStorage.setItem('level',res.level)
                //             localStorage.setItem('checkMerchant',true)
                //             //该登陆用户没有添加商户，或者商户信息正在审核中
                //             if(res.level == -1 ){
                              
                //                 this.$router.push({path: '/activity'});

                //             }
                       
                //             if(res.level == 0){

                //                 if(res.merchant_audit == 0 ){
                //                     if(res.qr_active == 0 ){
                //                         this.$vux.toast.show({
                //                         text: '您尚未激活二维码！',
                //                         type: "text"
                //                         })
                //                         this.$router.push({path: '/activity'});
                //                     }
                //                     if(res.qr_active == 1 ){
                //                         this.$vux.toast.show({
                //                         text: '等待审核……',
                //                         type: "text"
                //                         })
                //                         this.$router.push({path: '/'});
                //                     }
                                
                //                 }

                //                 if(res.merchant_audit == 1 ){                       
                //                     if(res.store_status == 0){
                //                         this.$vux.toast.show({
                //                         text: '请添加门店！',
                //                         type: "text"
                //                         })
                //                         this.$router.push({path: '/addStore'});
                //                     } 
                //                     if(res.store_status == 1){
                                       
                //                     }                         
                                
                //                 }
                //             }

                //         }else{
                //             this.$vux.toast.show({
                //                     text: res.msg,
                //                     type: "text"
                //                 })
                            this.$router.push({path: '/'});
                        }
                //     })
                // }
            // }

        },
        activated() {
            this.$store.commit("setPageName", this.pageName)
                // console.log('全局混合activated')
        }
    }
    export default mixin
