<template>
<div>
  <div class="page-indexlist"> 
      <div class="page-indexlist-wrapper">
        <mt-index-list>
          <div class="ml-area" slot="mlgroup">
            <group title="你所在的地区" v-if="nowcity.length!=0">
                <ul>
                    <li v-for="now in nowcity" @click="belone(now)">
                      <x-button mini>{{now.name}}</x-button>
                    </li>
                </ul>
            </group>
            <group title="历史访问目的地" v-if="histroycity.length!=0">
                <ul>
                    <li v-for="histroy in histroycity" @click="histroyil(histroy)">
                      <x-button mini>{{histroy.name}}</x-button>
                    </li>
                </ul>
            </group>
            <group title="热门城市" v-if="hotcity.length!=0">
                <ul>
                    <li v-for="hot in hotcity" @click="hotil(hot)">
                      <x-button mini>{{hot.name}}</x-button>
                    </li>
                </ul>
            </group>
          </div>
          <mt-index-section v-for="(item,idx) in alphabet" :key='idx' :index="item.initial">
              <cell v-for="(cell,idx) in item.cells" :key='idx' :title="cell.name" @click.native="clickfuc(cell)"></cell>
          </mt-index-section>
        </mt-index-list>
      </div>
  </div>
</div>
</template>
<style>
.ml-area .weui-cells,
.ml-area .weui-cells::before,
.ml-area .weui-cells::after {
  background: none;
  border: none;
}
.ml-area ul li {
  list-style: none;
  float: left;
  padding-left: 15px;
  padding-top: 0.3em;
}
.ml-area .weui-btn:after {
  width: auto;
  height: auto;
}
/* .ml-area ul li:nth-child(n+5){
  padding-top: 0.3em;
} */
</style>
<script type="text/babel">
import indexlist from "./indexlist";
import indexsection from "./indexsection";
import { Group, Cell,XButton } from "vux";
export default {
  props: {
    names: {
      type: Array,
      required: true
    },
    hotcity: {
      type: Array,
      required: false
    },
    histroycity: {
      type: Array,
      required: false
    },
    nowcity: {
      type: Array,
      required: false
    },
    all: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data() {
    return {
      alphabet: []
    };
  },
  components: {
    "mt-index-list": indexlist,
    "mt-index-section": indexsection,
    Group,
    Cell,
    XButton
  },
  created() {
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach(initial => {
      let cells = [];
      this.names.filter(name => {
        if (name.pinyin[0] === initial.toLocaleLowerCase()) cells.push(name);
      });

      this.alphabet.push({
        initial,
        cells
      });
    });
    if (this.all) {
      let arr = [];
      for (let i in this.alphabet) {
        if (this.alphabet[i].cells.length > 0) {
          arr.push(this.alphabet[i]);
        }
      }
      this.alphabet = arr;
    }
  },
  methods: {
    clickfuc(cell) {
      // alert(1);
      this.$emit("choosecity", cell);
    },
    belone(now){
      // alert(2);
      this.$emit('belonecity',now)
    },
    histroyil(histroy){
      // alert(3);
      this.$emit('histroyilcity',histroy)
    },
    hotil(hot){
      // alert(4);
      this.$emit('hotcity',hot)
    }
  }
};
</script>