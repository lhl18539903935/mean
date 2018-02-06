    //起初利用混合 mixin+vuex 动态设置页面标题+动态设置前一页页面名字
    const mixin = {
        mounted() {
            this.$store.commit("setPageName", this.pageName)
            if(this.pageHeader == false){
                this.$store.commit("setHeader", false)
                this.$store.commit("setsrc", '')
            }else{
                this.$store.commit("setHeader", this.pageHeader)
                if(this.src){
                    this.$store.commit("setsrc", this.src)
                }else {
                    this.$store.commit("setsrc", '')
                }
                if(this.src1){
                    this.$store.commit("setsrc1", this.src1)
                }else {
                    this.$store.commit("setsrc1", '')
                }
            }
            if(this.pageFooter == false){
                this.$store.commit("setFooter", this.pageFooter)
            }else{
                this.$store.commit("setFooter", true)
            }

            //是否需要登录
            let needLogin=true;
            if(this.$router.path =='/login' || window.location.href.indexOf('login') > 0){
                needLogin=false;
            }else if( this.$router.path =='/register' || window.location.href.indexOf('register') > 0){
                needLogin=false;
            }else if( this.$router.path =='/forgetPass' || window.location.href.indexOf('forgetPass') > 0){
                needLogin=false;
            }else if( this.$router.path =='/newPass' || window.location.href.indexOf('newPass') > 0){
                needLogin=false;
            }else if( this.$router.path =='/readyContract' || window.location.href.indexOf('readyContract') > 0){
                needLogin=false;
            }else if(this.$router.path =='/solution' || window.location.href.indexOf('readyContract') > 0){
                needLogin=false;
            }
            let token=localStorage.getItem('token')
            if(needLogin){
                    this.apiPost(this.rhost+'/home/checkToken').then((res) => {
                    if(res.code==223){
                        this.$router.push({path: 'login'});
                    }
                })
            }
        //修改背景色
        this.$store.commit('setBg',this.bg)
        // this.$store.commit("storename",this.storename)
        },
        activated() {
            this.$store.commit("setPageName", this.pageName)
            this.$store.commit("setsrc", this.src)
            this.$store.commit("setsrc1", this.src1)
                // console.log('全局混合activated')
        },
        data(){
            return{
                // rhost:'http://r.huileyi.com',
                // phost:'http://p.huileyi.com',
            //   rhost:'https://authapi.huileyi.com',
            //   phost:'https://userapi.huileyi.com',
                rhost:'http://authapi.huileyi.com',
               phost:'http://userapi.huileyi.com'
            }
        }
    }
    export default mixin
