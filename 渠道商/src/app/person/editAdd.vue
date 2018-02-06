<template>
  <div>
    <group class="editAdd"  label-width="6em">
         <x-input label-width='5rem' class="font" v-model='address.buyer' title='收货人' placeholder='姓名'></x-input>
        <!--       <x-input label-width='5rem' v-model='address.mobile' title='手机号' placeholder='11位手机号'></x-input> -->
         <x-address title="地区" class="font"  v-model="value" :list="addressData" raw-value  placeholder="请选择地址" :show.sync="showAddress"></x-address>
         <x-textarea label-width='5rem' class="font" v-model='address.street' title='详细地址' placeholder='详细地址'></x-textarea>
            <!--   <x-input label-width='5rem' v-model='address.postCode'  title='邮政编码' placeholder='邮政编码'></x-input> -->
    </group>
        <div style='width:100%;'>
            <x-button class='addbtn' v-if='type == "add" ' @click.native='addAddress' style='margin-top:2em;width:90%;background:#6594fe;margin-left:5%;margin-top:2em;color:#fff;'> 保存  </x-button>
        </div>
            <x-button class='addbtn' v-if="type == 'edit' " @click.native='editAddress' style='margin-top:2em;width:90%;background:#6594fe;margin-left:5%;margin-top:2em;color:#fff;'> 保存  </x-button>
  </div>
</template>

<script type="es6">

import { XInput,XTextarea, Group, XButton, Cell ,XAddress} from 'vux'
export default {
  data(){
    return{
      bg:{white:false,grey:true},
      pageHeader:true,
      pageName:"",
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
     editAddress(){
        let vm=this;
        let address_id=this.$route.query.address_id;
         let region=this.getName(this.value)
        let data={type:'edit',address_id:address_id,buyer:vm.address.buyer,province:region[0],city:region[1],town:region[2],street:vm.address.street}
        this.apiPost(this.rhost+'/home/doAboutAddress',data).then((res) => {
            if(res.code==200){
                this.$vux.toast.show({
                text: '保存成功',
                type: "success"
                })
               this.$router.push('/address')
            }else{
                this.$vux.toast.show({
                text: res.msg,
                type: "text",position:'bottom',
              })
            }
        })


      },
      addAddress(){
        let vm=this;
        if( !this.address.buyer || !this.value || !this.address.street){
            this.$vux.toast.show({
              text: '请完善信息',
              type: "text",position:'bottom',
              })
          return;
        }
        let region=this.getName(this.value)

        let data={type:'add',buyer:vm.address.buyer,province:region[0],city:region[1],town:region[2],street:vm.address.street}
        this.apiPost(this.rhost+'/home/doAboutAddress',data).then((res) => {
            if(res.code==200){
              this.$vux.toast.show({
                text: '添加成功',
                type: "success"
                })
             this.$router.push('/address')
            }else{
                this.$vux.toast.show({
                text: res.msg,
                type: "text",position:'bottom',
                })
            }
        })

      },
      getAddress(address_id){

        let vm=this;
        this.apiPost(this.rhost+'/home/getSelfAddress',{address_id:address_id}).then((res) => {
            if(res.code==200){
              let dataList=res.data.data
              for(var i in dataList){
                vm.address=dataList[i]
                vm.value=[dataList[i].province,dataList[i].city,dataList[i].town]
              }
            }else{
                this.$vux.toast.show({
                text: res.msg,
                type: "text",position:'bottom',
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
      this.$store.commit("setPageName", '修改地址')
    }else{
      this.type='add'
      this.$store.commit("setPageName", '新增收货地址')
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
  mixins:[window.mixins,window.http,window.addressData]
  }
  </script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.editAdd .weui-cells{margin-top: 10px;}
.editAdd .font{font-size: 14px;}
</style>
