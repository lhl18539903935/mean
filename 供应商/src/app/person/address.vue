<template>
    <div class="dizhi">
      <group class="group" v-for="(list,i) in addressList" :key="i">
        <cell value-align="left" class="address">
          <p>收货人: <a href="">{{list.buyer}}</a> <a href="">{{list.mobile}}</a></p>
          <p>{{list.province}}  {{list.city}}  {{list.town}} {{list.street}}</p>
            <p class="lf" @click.stop="setDefault(list.address_id)">
              <span v-if="list.is_use==0">设置为默认地址</span>
              <span v-if="list.is_use==1" :class="{'color':selected}"><img style="vertical-align: top;margin-top:3px;" src="../../assets/images/dui.png" alt=""/>默认地址</span>
            </p>
          <p class="rt">
            <span class="rt" @click.stop="del(list.address_id)">
              <img src="../../assets/images/t2.png" style="margin-top:3px;vertical-align: top" alt=""/>删除
            </span>
            <router-link :to="{path:'/revise',query:{'address_id':list.address_id }}">
              <span class="rt"  style="margin-right:2rem;">
                <img style="margin-top:3px;vertical-align: top" src="../../assets/images/t3.png" alt=""/>编辑
              </span>
            </router-link>
          </p>
        </cell>
      </group>
      <!-- <router-link to="/newRevise" class="footer" >
        <span><b>+</b></span>
        <span>新增地址</span>
      </router-link > -->
    </div>
</template>

<script type="es6">
  import {Group,Cell,CheckIcon} from "vux"
    import addressData from '../../assets/images/address.json'
    export default {
      components:{
        Group,
        Cell,
        CheckIcon
      },
      data(){
        return{
          pageName:"收货地址",
          show4: false,
          demo1: false,
          addColor:false,
          pageFooter:false,
          addressList:[],
          selected:true,
          address_id:'',
          bg:{white:false,grey:true}
        }
      },
      methods:{
        show(){
          this.show4=true
        },
        choose(i){
          console.log(1)
          this.selected=!this.selected
          this.addColor=true
          console.log(this.addColor)
        },
        del(address_id){
            let vm=this
            this.$vux.confirm.show({
            title: '确认删除?',
            onConfirm () {
             console.log(111)
             vm.sureDel(address_id)
            }
          })
        },
        sureDel(address_id){
           let vm=this
           this.apiPost("http://r.huileyi.com/home/doAboutAddress",{type:"del",address_id:address_id}).then((res)=>{
            if(res.code==200){
              this.$vux.toast.show({
                text:"删除成功",
                type:"success"
              })
              vm.getAddress()
            }else{
              this.$vux.toast.show({
                test:res.msg,
                type:"warn"
              })
            }
          })
        },
        setDefault(address_id){
          this.apiPost("http://r.huileyi.com/home/doAboutAddress",{type:"changeuse",address_id:address_id}).then((res)=>{
            if(res.code==200){
              this.$vux.toast.show({
                text:"设置成功",
                type:"success"
              })
              this.getAddress()
            }else{
                this.$vux.toast.show({
                text:res.msg,
                type:"warn"
              })
            }
          })
         },
         getAddress(){
         this.apiPost("http://r.huileyi.com/home/getSelfAddress",{}).then((res)=>{
          console.log(res)
          if(res.code==200){
            this.addressList=res.data
          }
        })
      },
      },
      mounted(){
        this.getAddress()
      },
      mixins:[mixins,http]
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
  .dizhi .color{
    color:#FF4948;
  }
  .dizhi .group{
    margin-top:-1.3rem;
  }
.address{
  font-size: 15px;
}
.address p{
  margin:0.5rem 0;
  color:#6F7171;
}
.address a{
  color:#6F7171;
}
.address img{
  width:15px;
  margin-right: 5px;
  display: inline-block;
}
 .dizhi .lf{
    float:left;
  }
  .dizhi .rt{
    float:right;
  }
 .dizhi .weui-dialog__btn_primary{
    color:#FF4948!important;
  }
 .dizhi .dizhi .vux-check-icon > .weui-icon-success:before, .vux-check-icon > .weui-icon-success-circle:before{
    color:#FF4948!important;
  }
.dizhi  .footer{
    width:100%;
    height:50px;
    line-height: 50px;
    text-align: center;
    background-color: #fff;
    color:#FF4948;
    font-size: 14px;
    position: fixed;
    bottom:0;
  }
 .dizhi .footer span:first-child{
    width:16px;
    height:16px;
    display: inline-block;
    border-radius: 50%;
    border:1px solid #FF4948;
    position: relative;
    vertical-align: middle;
  }
 .dizhi .footer span:first-child b{
    font-size: 18px;
    position: absolute;
    top:-18px;
    left:1px;
  }
</style>
