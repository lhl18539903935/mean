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

           
        //修改背景色
        this.$store.commit('setBg',this.bg)

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
              rhost:'https://authapi.huileyi.com',
              phost:'https://userapi.huileyi.com'
            }
        }
    }
    export default mixin
