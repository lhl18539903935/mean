<template>
  <div>

    <div v-waterfall-lower="loadMore" waterfall-disabled="disabled" waterfall-offset="400" style="position:absolute;width:100%;top:3rem;left:0;right:0;bottom:2rem;overflow:scroll;margin:0 auto;">
      <van-pull-refresh v-model="isLoading" style="height:100%;text-align:center">
    <!-- <scroll :onRefresh='onRefresh' :on-infinite="onInfinite" style='margin-top:-3em;margin-bottom:3rem;' class="content"> -->
      <div v-for='(list,index) in addressList' :key='index' class="add_one clearfix">
        <div class='clearfix' style='width:100%;'>
          <p class='fl' style='text-align:left;margin-left:0.5rem'>{{list.buyer}}</p>
        </div>
        <p style="text-align:left;margin-left:0.5rem">{{list.province}}  {{list.city}}  {{list.town}} {{list.street}}</p>
        <div style='width:100%;'>
          <p @click.stop='setDefault(list.address_id)' class='addBottom fl' >
            <span v-if='list.is_use == 0'><img style='height:0.8em;' src="../../assets/setDefault.jpg">&nbsp;设为默认</span>
            <span v-if='list.is_use == 1' style='color:#6594fe'><img style='height:0.8em;' src="../../assets/default.png">&nbsp;默认地址</span>
          </p>

          <p @click.stop='del(list.address_id)' class='addBottom fr' ><img style='height:0.9em;' src="../../assets/delete.jpg">&nbsp;删除</p>
          <router-link :to="{path:'/editAdd',query:{'address_id':list.address_id}}">
            <p class='addBottom fr' ><img style='height:1em;' src="../../assets/edit.jpg">&nbsp;编辑</p>
          </router-link>

        </div>
      </div>
    <!-- </scroll> -->
    </van-pull-refresh>
  </div>

  </div>


</template>

<script type="es6">
  import {XButton,Popup} from 'vux'
  import Scroll from '../../components/scroll/index'
  import {Waterfall} from 'vant'
  import VanPullRefresh from '../../vant/packages/pull-refresh/index.vue'
  export default {
    components:{
      XButton,Popup,Scroll,VanPullRefresh
    },
    data(){
      return{
        showAddress: false,
        value:[],
        buyer:'',
        mobile:'',
        region:'',
        street:'',
        postCode:'',
        pageHeader:true,
        pageName:'收货地址',
        pageFooter:true,
        contebt:'',
        type:'',
        bg:{white:false,grey:true},
        styleObject:{
          background:'#eee',
          color:'#fff'
        },
        isDone:false,
        addressList:[],
        address_id:'',
        currentPage:1,
        isLoading:false,
        disabled:false
      }
    },
    computed:{

    },
    watch:{
        isLoading(){
          if(this.isLoading){
            this.disabled=false;
            this.addressList=[];
            this.currentPage=1;
            this.getAddress()
          }
        }
      },

    directives: {
        WaterfallLower: Waterfall('lower'),
        WaterfallUpper: Waterfall('upper')
      },
    methods:{
        loadMore(){
          this.currentPage++;
          this.getAddress()
        },

      cancel(){
        this.buyer='';
        this.value=[];
        this.street='';

      },
      del(address_id){
        let vm=this;
        this.$vux.confirm.show({
          // 组件除show外的属性
          title:'提示',
          content:'确定删除吗？',
          onCancel () {
          },
          onConfirm () {
            vm.doDel(address_id);
          }
        })
      },
      doDel(address_id){
        let vm=this;
        // this.currentPage=1
        this.apiPost(this.rhost+'/home/doAboutAddress',{type:'del',address_id:address_id}).then((res) => {
            if(res.code==200){
                this.$vux.toast.show({
                text: '删除成功',
                type: "success"
                })
                vm.disabled=false
                vm.currentPage=1
                vm.addressList=[]
                vm.getAddress()
                for(let a in vm.addressList){
                  if(vm.addressList[a].address_id == address_id){
                    vm.addressList.splice(a,1)
                  }
                }
            }else{
                this.$vux.toast.show({
                text: res.msg,
                type: "text",position:'bottom',
              })
            }
        })
          // vm.getAddress()

      },
      setDefault(address_id){
        let vm=this;

        this.apiPost(this.rhost+'/home/doAboutAddress',{type:'changeuse',address_id:address_id}).then((res) => {
            if(res.code==200){
                this.$vux.toast.show({
                text: '设置成功',
                type: "success"
                })
                vm.disabled=false
                vm.currentPage=1
                vm.addressList=[]
                vm.getAddress()
            }else{
                this.$vux.toast.show({
                text: res.msg,
                type: "text",position:'bottom',
              })
            }
        })

      },
      editShow(index){
        this.type='edit';
        this.address_id=this.addressList[index].address_id;
        this.buyer=this.addressList[index].buyer
        this.value=[this.addressList[index].province,this.addressList[index].city,this.addressList[index].town],
        this.street=this.addressList[index].street

      },
      editAddress(){
        let vm=this;
         let region=this.getName(this.value)
        let data={type:'edit',address_id:vm.address_id,buyer:vm.buyer,province:region[0],city:region[1],town:region[2],street:vm.street}
        this.apiPost(this.rhost+'/home/doAboutAddress',data).then((res) => {
            if(res.code==200){
                this.$vux.toast.show({
                text: '保存成功',
                type: "success"
                })
                vm.address_id='';
            }else{
                this.$vux.toast.show({
                text: res.msg,
                type: "text",position:'bottom',
              })
            }
        })

         this.getAddress()

      },
      addAddress(){
        let vm=this;
        if( !this.buyer){
            this.$vux.toast.show({
              text: '请完善信息',
              type: "text",position:'bottom',
              })
          return;
        }
        let region=this.getName(this.value)

        let data={type:'add',buyer:vm.buyer,province:region[0],city:region[1],town:region[2],street:vm.street}
        this.apiPost(this.rhost+'/home/doAboutAddress',data).then((res) => {
            if(res.code==200){
              vm.contebt=res.data.data
            }else{
                this.$vux.toast.show({
                text: res.msg,
                type: "text",position:'bottom',
                })
            }
        })

        this.$store.commit("setPopup", false)
        this.getAddress()
      },
      getAddress(){
         let vm=this;
         let currentPage=vm.currentPage;
        this.apiPost(this.rhost+'/home/getSelfAddress',{page:currentPage}).then((res) => {
          this.isLoading=false
            if(res.code==200){
                if(res.data.currentPage == res.data.totalPage || res.totalPage == 0){
                    this.disabled=true
                  }
                  if(currentPage == 1){
                     vm.addressList=res.data.data;
                   }else{
                      for(let i in res.data.data){
                        vm.addressList.push(res.data.data[i])
                      }
                   }
            } else if(res.code==221){
              vm.disabled=true
            }
        })
      },
      getName: function(value) {
          var adr = [];
          for (var r in this.addressData) {
            var index = this.addressData[r];
            for (var i in value) {
              var a = value[i]
              if(a == index.value) adr.push(index.name);
            }
          }
          return adr;
        },
    },
    mixins:[window.mixins,window.http],
    mounted:function(){
      this.getAddress();

    },
    activated(){
      this.$store.commit("setPopup", false)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
   .addbtn{width:50%;}
  .content{
    width:90%;
    margin:1rem auto;
    font-size: 14px;
    color:#666;
  }
  .add_one{padding: 0.5rem 0;border-bottom:1px solid #eee;width: 100%;background-color:#fff}
   .add_one p{padding: 0.1rem 0;margin-top:-0.1rem;font-size: 14px}
  .addBottom{font-size:14px;color:#666666;margin-right:1em;line-height: 2em;margin-left:0.5rem;}
   .yo-scroll{background-color: #fff;}
</style>
