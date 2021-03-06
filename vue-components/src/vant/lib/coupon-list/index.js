'use strict';

exports.__esModule = true;

var _components;

var _cell = require('../cell');

var _cell2 = _interopRequireDefault(_cell);

var _cellGroup = require('../cell-group');

var _cellGroup2 = _interopRequireDefault(_cellGroup);

var _Item = require('./Item');

var _Item2 = _interopRequireDefault(_Item);

var _field = require('../field');

var _field2 = _interopRequireDefault(_field);

var _popup = require('../popup');

var _popup2 = _interopRequireDefault(_popup);

var _button = require('../button');

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "van-coupon-list" }, [_vm.showExchangeBar ? _c('van-cell-group', { staticClass: "van-coupon-list__top" }, [_c('van-field', { staticClass: "van-coupon-list__filed van-hairline--surround", attrs: { "placeholder": _vm.inputPlaceholder, "maxlength": 20 }, model: { value: _vm.exchangeCode, callback: function callback($$v) {
          _vm.exchangeCode = $$v;
        }, expression: "exchangeCode" } }), _c('van-button', { staticClass: "van-coupon-list__exchange", attrs: { "size": "small", "type": "danger", "disabled": _vm.exchangeButtonDisabled || !_vm.exchangeCode.length }, on: { "click": _vm.onClickExchangeButton } }, [_vm._v(_vm._s(_vm.exchangeButtonText))])], 1) : _vm._e(), _c('div', { ref: "list", class: ['van-coupon-list__list', { 'van-coupon-list--with-exchange': _vm.showExchangeBar }] }, [_vm._l(_vm.coupons, function (item, index) {
      return _c('van-coupon-item', { key: item.id || item.name, ref: "card", refInFor: true, attrs: { "data": item, "chosen": index === _vm.chosenCoupon }, nativeOn: { "click": function click($event) {
            _vm.onClickCoupon(index);
          } } });
    }), _vm.disabledCoupons.length ? _c('h3', [_vm._v(_vm._s(_vm.disabledListTitle))]) : _vm._e(), _vm._l(_vm.disabledCoupons, function (item) {
      return _c('van-coupon-item', { key: item.id || item.name, attrs: { "disabled": "", "data": item } });
    }), !_vm.coupons.length && !_vm.disabledCoupons.length ? _c('div', { staticClass: "van-coupon-list__empty" }, [_c('img', { attrs: { "src": "https://b.yzcdn.cn/v2/image/wap/trade/new_order/empty@2x.png" } }), _c('p', [_vm._v("暂无优惠券")])]) : _vm._e()], 2), _c('div', { directives: [{ name: "show", rawName: "v-show", value: _vm.showCloseButton, expression: "showCloseButton" }], staticClass: "van-coupon-list__close van-hairline--top", on: { "click": _vm.onClickNotUse } }, [_vm._v("\n    " + _vm._s(_vm.closeButtonText) + "\n  ")])], 1);
  },

  name: 'van-coupon-list',

  components: (_components = {}, _components[_button2.default.name] = _button2.default, _components[_cell2.default.name] = _cell2.default, _components[_cellGroup2.default.name] = _cellGroup2.default, _components[_field2.default.name] = _field2.default, _components[_popup2.default.name] = _popup2.default, _components[_Item2.default.name] = _Item2.default, _components),

  props: {
    chosenCoupon: {
      type: Number,
      default: -1
    },
    coupons: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    disabledCoupons: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    exchangeButtonText: {
      type: String,
      default: '兑换'
    },
    exchangeButtonDisabled: {
      type: Boolean,
      default: false
    },
    displayedCouponIndex: {
      type: Number,
      default: -1
    },
    closeButtonText: {
      type: String,
      default: '不使用优惠'
    },
    disabledListTitle: {
      type: String,
      default: '不可用优惠'
    },
    inputPlaceholder: {
      type: String,
      default: '请输入优惠码'
    },
    showExchangeBar: {
      type: Boolean,
      default: true
    },
    showCloseButton: {
      type: Boolean,
      default: true
    }
  },

  watch: {
    displayedCouponIndex: function displayedCouponIndex(val) {
      this.scrollToShowCoupon(val);
    }
  },

  data: function data() {
    return {
      exchangeCode: ''
    };
  },
  mounted: function mounted() {
    this.scrollToShowCoupon(this.displayedCouponIndex);
  },


  methods: {
    onClickNotUse: function onClickNotUse() {
      this.$emit('change', -1);
    },
    onClickCoupon: function onClickCoupon(index) {
      this.$emit('change', index);
    },
    onClickExchangeButton: function onClickExchangeButton() {
      this.$emit('exchange', this.exchangeCode);
      this.exchangeCode = '';
    },

    // 滚动到特定优惠券的位置
    scrollToShowCoupon: function scrollToShowCoupon(index) {
      var _this = this;

      if (index === -1) {
        return;
      }

      this.$nextTick(function () {
        var _$refs = _this.$refs,
            card = _$refs.card,
            list = _$refs.list;


        if (list && card && card[index]) {
          list.scrollTop = card[index].$el.offsetTop - 100;
        }
      });
    }
  }
};