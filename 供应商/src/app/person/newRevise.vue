<template>
  <div>
    <group class="editAdd"  label-width="6em">
        <x-input style="font-size: 14px;" label-width='5rem' v-model='address.buyer' title='收货人' placeholder='姓名'></x-input>
        <x-address style="font-size: 14px;" title="地区" v-model="value" :list="addressData" raw-value  placeholder="请选择地址" :show.sync="showAddress"></x-address>
        <x-textarea style="font-size: 14px;" label-width='5rem' v-model='address.street' title='详细地址' placeholder='详细地址'></x-textarea>
    </group>
    <div style='width:100%;'>
      <x-button class='addbtn' v-if='type == "add" '
                @click.native='addAddress' style='margin-top:2em;width:90%;
                background:#FF4948;margin-left:5%;color:#fff;font-size: 16px'> 保存
      </x-button>
    </div>
  </div>
</template>

<script type="es6">

import { XInput, Group, XButton, Cell ,XAddress,XTextarea} from 'vux'

 import addressData from '../../assets/images/address.json'
export default {
  data(){
    return{
      bg:{white:false,grey:true},
      pageHeader:true,
      pageName:"新增地址",
      buyer:'',
      addressData:addressData,
      showAddress:false,
      value:[],
      street:'',
      type:'',
      address:[],
      address_id:[]

    }
  },
  methods:{
      addAddress(){
        let vm=this;
        if( !this.address.buyer||!this.value||!this.address.street){
            this.$vux.toast.show({
              text: '请完善信息',
              type: "warn"
              })
          return;
        }
        console.log(this.value);
        let region=this.getName(this.value)
        let data={type:'add',buyer:vm.address.buyer,province:region[0],city:region[1],town:region[2],street:vm.address.street}
        this.apiPost('http://r.huileyi.com/home/doAboutAddress',data).then((res) => {
          console.log(res);
            if(res.code==200){
              this.$vux.toast.show({
                text: '添加成功',
                type: "success"
                })
             this.$router.push('/address')
            }else{
                this.$vux.toast.show({
                text: res.msg,
                type: "warn"
                })
            }
        })

      },
      getAddress(address_id){

        let vm=this;
        this.apiPost('http://r.huileyi.com/home/getSelfAddress',{address_id:address_id}).then((res) => {
          console.log(res);
            if(res.code==200){
              vm.value=[res.data.province,res.data.city,res.data.town]
              vm.address=res.data
            }else{
                this.$vux.toast.show({
                text: res.msg,
                type: "warn"
              })
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
  mounted:function(){
   let address_id=this.$route.query.address_id;
    if(address_id){
      this.type='edit';
      this.getAddress(address_id)
    }else{
      this.type='add'
    }
  },
  components: {
    XInput,
    XButton,
    Group,
    Cell,
    XAddress,
    XTextarea
  },
  mixins:[window.mixins,window.http]
  }
  </script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .editAdd .weui-cells{margin-top: 10px;}
</style>
