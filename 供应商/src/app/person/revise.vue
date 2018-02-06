<template>
    <div class="revise">
      <group class="editAdd"  label-width="6em">
        <x-input style="font-size: 14px;" label-width='5rem' v-model='username' title='收货人' placeholder='姓名'></x-input>
        <x-address style="font-size: 14px;" title="地区" v-model="value" :list="addressData" raw-value  placeholder="请选择地址" :show.sync="showAddress"></x-address>
        <x-textarea style="font-size: 14px;" label-width='5rem' v-model='address' title='详细地址' placeholder='详细地址'></x-textarea>
      </group>
      <div style='width:100%;'>
        <x-button class='addbtn'
                  @click.native="editAddress(address_id)" style='margin-top:2em;width:90%;
                background:#FF4948;margin-left:5%;color:#fff;font-size: 16px'> 保存
        </x-button>
      </div>
    </div>
</template>

<script type="es6">
  import {Group,Cell,XInput,XAddress,XTextarea,XButton} from "vux"
  import addressData from '../../assets/images/address.json'
    export default {
      data(){
        return{
          pageName:"修改地址",
          username:"",
          mobile:"15836896985",
          address:"",
          selected:false,
          handle:false,
          showAddress:false,
          addressData:addressData,
          bg:{white:false,grey:true},
          state:0,
          state1:0,
          address_id:[],
          value:[],
          btns:[
            {name:"家"},
            {name:"公司"},
            {name:"学校"}
          ],
          home:[
            {sex:"先生"},{sex:"女士"}
          ]
        }
      },
      methods:{
        handleClick(i){
          this.handle=i
        },
        editAddress(){
          if(this.username.length==0||this.value.length==0||this.address.length==0){
            this.$vux.toast.show({
              text:"请填写信息完整",
              type:"warn"
            })
              return
          }
          let vm=this
          let address_id=this.$route.query.address_id
          console.log(address_id)
          let region=this.getName(this.value)
          let data={type:'edit',address_id:address_id,buyer:vm.username,
          province:region[0],city:region[1],town:region[2],street:vm.address}
          this.apiPost("http://r.huileyi.com/home/doAboutAddress",data).then((res)=>{
            console.log(res)
            if(res.code==200){
              this.$vux.toast.show({
                text:"修改成功",
                type:"success"
              })
              this.$router.push("/address")
            }else{
              this.$vux.toast.show({
                text:res.msg,
                type:"warn"
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
        getAddress(address_id){
          let vm=this
          this.apiPost("http://r.huileyi.com/home/getSelfAddress",{address_id:address_id}).then((res)=>{
          if(res.code==200){
            this.addressList=res.data
            this.username=this.addressList.buyer
            this.value=[this.addressList.province,this.addressList.city,this.addressList.town]
            console.log(this.addressList)
            this.address=this.addressList.street
          }
        })
      },
      },
      mounted(){
        let address_id=this.$route.query.address_id
        this.getAddress(address_id)
      },

      components:{
        Group,
        Cell,
        XInput,
        XAddress,
        XButton,
        XTextarea
      },
      mixins:[mixins,http]
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
  .revise .weui-btn + .weui-btn{
    margin-top:0!important;
  }
  .revise .size{
    font-size: 14px;
  }
  .revise .cell button{
    color:#ddd;
    border-color:#ddd;
    font-size: 12px;
    margin-left:1.4rem
  }
  .revise .cell .style{
    color:#FF4948;
    border-color:#FF4948
  }
  .revise .weui-textarea{
    font-size: 14px!important;
  }
</style>
