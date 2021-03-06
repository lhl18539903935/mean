'use strict';

exports.__esModule = true;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _vm.isChoosable ? _c('span', { class: { 'van-sku-row__item': true, 'van-sku-row__item--active': _vm.isChoosed }, on: { "click": _vm.onSkuSelected } }, [_vm._v("\n  " + _vm._s(_vm.skuValue.name) + "\n")]) : _c('span', { staticClass: "van-sku-row__item van-sku-row__item--disabled" }, [_vm._v(_vm._s(_vm.skuValue.name))]);
  },

  name: 'van-sku-row-item',

  props: {
    skuEventBus: Object,
    skuValue: Object,
    skuList: Array,
    selectedSku: Object,
    skuKeyStr: String
  },

  computed: {
    isChoosed: function isChoosed() {
      return this.skuValue.id === this.selectedSku[this.skuKeyStr];
    },
    isChoosable: function isChoosable() {
      var _Object$assign2;

      var matchedSku = (0, _assign2.default)({}, this.selectedSku, (_Object$assign2 = {}, _Object$assign2[this.skuKeyStr] = this.skuValue.id, _Object$assign2));
      var skusToCheck = (0, _keys2.default)(matchedSku).filter(function (skuKey) {
        return matchedSku[skuKey] !== '';
      });
      var filteredSku = this.skuList.filter(function (sku) {
        return skusToCheck.every(function (skuKey) {
          // 后端给的skuValue.id有时候是数字有时候是字符串，全等会匹配不上
          return matchedSku[skuKey] == sku[skuKey]; // eslint-disable-line
        });
      });
      var stock = filteredSku.reduce(function (total, sku) {
        return total += sku.stock_num;
      }, 0);

      return stock > 0;
    }
  },

  methods: {
    onSkuSelected: function onSkuSelected() {
      this.skuEventBus.$emit('sku:select', (0, _assign2.default)({}, this.skuValue, { skuKeyStr: this.skuKeyStr }));
    }
  }
};