<template>
  <div>
    <div class="header" id="c0">
      <router-link tag="span" to="/home" class="left"><i class="iconfont icon-zuojiantou"></i></router-link>
      <span class="color000 left">城市选择</span>
      <div class="c-input">
        <i class="iconfont icon-sousuo"></i>
        <input class="c-sou" type="text" placeholder="输入城市名、拼音或字母查询">
      </div>
    </div>
    <div class="c-main">
      <p class="c-title fs14">你所在的地区</p>
      <div class="c-list">
        <p class="left">{{nowcity[0].name}}</p>
      </div>
      <p id="c1" class="c-title fs14">历史访问目的地</p>
      <div class="c-list" v-for="n in nowcity" :key="n.city_id">
        <p class="left">{{n.name}}</p>
      </div>
      <p id="c2" class="c-title fs14">热门城市</p>
      <div class="c-list">
        <p
          class="left"
          :data-city-id="n.city_id"
          v-for="n in hotCity"
          :key="n.id">{{n.name}}</p>
      </div>
      <div v-for="(m,i) in address" :key="i">
        <p :id="'c'+(i+3)" class="c-title fs14">{{m.initial}}</p>
        <p class="c-address" v-for="n in m.cells" :key="n.id">{{n.name}}</p>
      </div>
      <div class="c-r-nav fs14">
        <router-link tag="p" :to="'/home/city/#c'+i" v-for="(v,i) in az" :key="i">{{v}}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import datas from '../../datas/address_json.json'
  export default {
        name: 'city',
        data(){
            return{
                city:'zz',
                az:["当前", "历史", "热门", "A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "W", "X", "Y", "Z"],
                address:[], //全部城市
                hotCity:[], //热门
                nowcity:[{
                    city_id:'410102',
                    name:'郑州市'
                }], //当前城市
            }
        },
        methods:{
            getHotCity(){
                this.apiGet('/Wstrade/hotCity')
                    .then(function (res) {
                        this.hotCity = res.data
                    }.bind(this),function (err) {
                        console.log(err)
                    })
            },
            getresult(){  // 处理address.josn
                "ABCDEFGHJKLMNPQRSTWXYZ".split("").forEach(initial => {
                    let cells = [];
                    datas.filter(name => {
                        if (name.pinyin[0] === initial.toLocaleLowerCase()) cells.push(name);
                    });

                    this.address.push({
                        initial,
                        cells
                    });
                });
                let arr = [];
                for (let i in this.address) {
                    if (this.address[i].cells.length > 0) {
                        arr.push(this.address[i]);
                    }
                }
                this.address1 = arr;
            },
        },
        computed:{

        },
        created(){
            this.getresult()
            this.nowcity = JSON.parse(sessionStorage.getItem('nowcity'));
        },
        mounted(){
            this.getHotCity()
//            this.$store.commit()
        }
    }

</script>

<style scoped>
  .header{
    position: absolute;
    top: 0;
    width: 100%;
    background-color: #fff;
  }
  .header .left{
    height: 46px;
    line-height: 46px;
  }
  .icon-zuojiantou{
    color: #09f;
    padding-right: 10px;
    border-right: 1px solid #ccc;
    margin-right: 10px;
    margin-left: 20px;
  }
  .c-input{
    float: left;
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
    padding-left: 20px;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
  }
  .icon-sousuo{
    display: inline-block;
    font-size: 18px;
    color: #999;
    position: relative;
    top: 2px;
  }
  .c-sou{
    width: 80%;
    height: 28px;
    font-size: 16px;
  }
  .c-main{
    width: 100%;
    margin-top: 90px;
  }
  .c-r-nav{
    position: fixed;
    top: 90px;
    right: 0;
    width: 40px;
    text-align: center;
    color: #5af;
    line-height: 18px;
    z-index: 5;
  }
  .c-title{
    height: 30px;
    line-height: 30px;
    padding-left: 20px;
    color: #999;
    width: 100%;
  }
  .c-list{
    padding-left: 20px;
    padding-right: 30px;
    overflow: hidden;
    width: 100%;
  }
  .c-list .left{
    height: 36px;
    width: 30%;
    margin-right: 2%;
    margin-bottom: 2%;
    background-color: #fff;
    border-radius: 5px;
    text-align: center;
    line-height: 36px;
  }
  .c-address{
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
    background-color: #fff;
    border-bottom: 1px;
    width: calc(100% - 40px);
    border-bottom: 1px solid #eee;
  }
</style>