'use strict';

exports.__esModule = true;

var _extends4 = require('babel-runtime/helpers/extends');

var _extends5 = _interopRequireDefault(_extends4);

var _components;

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _popup = require('../../popup');

var _popup2 = _interopRequireDefault(_popup);

var _toast = require('../../toast');

var _toast2 = _interopRequireDefault(_toast);

var _SkuHeader = require('../components/SkuHeader');

var _SkuHeader2 = _interopRequireDefault(_SkuHeader);

var _SkuRow = require('../components/SkuRow');

var _SkuRow2 = _interopRequireDefault(_SkuRow);

var _SkuRowItem = require('../components/SkuRowItem');

var _SkuRowItem2 = _interopRequireDefault(_SkuRowItem);

var _SkuStepper = require('../components/SkuStepper');

var _SkuStepper2 = _interopRequireDefault(_SkuStepper);

var _SkuMessages = require('../components/SkuMessages');

var _SkuMessages2 = _interopRequireDefault(_SkuMessages);

var _SkuActions = require('../components/SkuActions');

var _SkuActions2 = _interopRequireDefault(_SkuActions);

var _skuHelper = require('../utils/skuHelper');

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QUOTA_LIMIT = _constants.LIMIT_TYPE.QUOTA_LIMIT;
exports.default = {
  render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return !_vm.isSkuEmpty ? _c('van-popup', { attrs: { "position": "bottom", "lockOnScroll": "", "preventScroll": "" }, model: { value: _vm.show, callback: function callback($$v) {
          _vm.show = $$v;
        }, expression: "show" } }, [_c('div', { staticClass: "van-sku-container" }, [_c('div', { staticClass: "van-sku-layout" }, [_vm._t("sku-header", [_c('van-sku-header', { attrs: { "skuEventBus": _vm.skuEventBus, "selectedSku": _vm.selectedSku, "selectedSkuComb": _vm.selectedSkuComb, "goods": _vm.goods, "sku": _vm.sku } })], { skuEventBus: _vm.skuEventBus, selectedSku: _vm.selectedSku, selectedSkuComb: _vm.selectedSkuComb }), _c('div', { staticClass: "van-sku-body scroller", style: _vm.bodyStyle }, [_vm._t("sku-group", [_vm.hasSku ? _c('div', { staticClass: "van-sku-group-container van-hairline--bottom" }, _vm._l(_vm.skuTree, function (skuTreeItem, index) {
      return _c('div', { key: index, staticClass: "van-sku-row-group" }, [_c('van-sku-row', { attrs: { "skuEventBus": _vm.skuEventBus, "skuRow": skuTreeItem } }, _vm._l(skuTreeItem.v, function (skuValue, index) {
        return _c('van-sku-row-item', { key: index, attrs: { "skuKeyStr": skuTreeItem.k_s, "skuValue": skuValue, "skuEventBus": _vm.skuEventBus, "selectedSku": _vm.selectedSku, "skuList": _vm.sku.list } });
      }))], 1);
    })) : _vm._e()], { selectedSku: _vm.selectedSku, skuEventBus: _vm.skuEventBus }), _vm._t("extra-sku-group", null, { skuEventBus: _vm.skuEventBus }), _vm._t("sku-stepper", [_c('van-sku-stepper', { ref: "skuStepper", attrs: { "skuEventBus": _vm.skuEventBus, "selectedSku": _vm.selectedSku, "selectedSkuComb": _vm.selectedSkuComb, "selectedNum": _vm.selectedNum, "stepperTitle": _vm.stepperTitle, "skuStockNum": _vm.sku.stock_num, "quota": _vm.quota, "quotaUsed": _vm.quotaUsed, "disableStepperInput": _vm.disableStepperInput, "hideStock": _vm.hideStock } })], { skuEventBus: _vm.skuEventBus, selectedSku: _vm.selectedSku, selectedSkuComb: _vm.selectedSkuComb, selectedNum: _vm.selectedNum }), _vm._t("sku-messages", [_c('van-sku-messages', { ref: "skuMessages", attrs: { "goodsId": _vm.goodsId, "messagePlaceholderMap": _vm.messagePlaceholderMap, "messages": _vm.sku.messages } })])], 2), _vm._t("sku-actions", [_c('van-sku-actions', { attrs: { "skuEventBus": _vm.skuEventBus, "buyText": _vm.buyText, "showAddCartBtn": _vm.showAddCartBtn } })], { skuEventBus: _vm.skuEventBus })], 2)])]) : _vm._e();
  },

  name: 'van-sku',

  components: (_components = {}, _components[_popup2.default.name] = _popup2.default, _components[_SkuHeader2.default.name] = _SkuHeader2.default, _components[_SkuRow2.default.name] = _SkuRow2.default, _components[_SkuRowItem2.default.name] = _SkuRowItem2.default, _components[_SkuStepper2.default.name] = _SkuStepper2.default, _components[_SkuMessages2.default.name] = _SkuMessages2.default, _components[_SkuActions2.default.name] = _SkuActions2.default, _components),

  props: {
    goods: Object,
    goodsId: [Number, String],
    initialSku: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    sku: Object,
    quota: {
      type: Number,
      default: 0
    },
    quotaUsed: {
      type: Number,
      default: 0
    },
    hideStock: {
      type: Boolean,
      default: false
    },
    showAddCartBtn: {
      type: Boolean,
      default: true
    },
    buyText: String,
    stepperTitle: {
      type: String,
      default: _constants.DEFAULT_STEPPER_TITLE
    },
    bodyOffsetTop: {
      type: Number,
      default: 200
    },
    resetStepperOnHide: Boolean,
    disableStepperInput: Boolean,
    messagePlaceholderMap: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    value: Boolean
  },

  data: function data() {
    return {
      selectedSku: {},
      selectedNum: 1,
      show: this.value
    };
  },


  watch: {
    show: function show(val) {
      this.$emit('input', val);
      if (!val) {
        var selectedSkuValues = (0, _skuHelper.getSelectedSkuValues)(this.sku.tree, this.selectedSku);

        this.$emit('sku-close', {
          selectedSkuValues: selectedSkuValues,
          selectedNum: this.selectedNum,
          selectedSkuComb: this.selectedSkuComb
        });

        if (this.resetStepperOnHide) {
          this.$refs.skuStepper && this.$refs.skuStepper.setCurrentNum(1);
        }
      }
    },
    value: function value(val) {
      this.show = val;
    },
    skuTree: function skuTree(val) {
      this.resetSelectedSku(val);
    }
  },

  computed: {
    bodyStyle: function bodyStyle() {
      var windowHeight = window.innerHeight;
      // header高度82px, sku actions高度50px，如果改动了样式自己传下bodyOffsetTop调整下
      var maxHeight = windowHeight - this.bodyOffsetTop;

      return {
        maxHeight: maxHeight + 'px'
      };
    },
    isSkuCombSelected: function isSkuCombSelected() {
      return (0, _skuHelper.isAllSelected)(this.sku.tree, this.selectedSku);
    },

    // sku数据不存在时不渲染模板
    isSkuEmpty: function isSkuEmpty() {
      for (var key in this.sku) {
        if (Object.prototype.hasOwnProperty.call(this.sku, key)) return false;
      }
      return true;
    },
    hasSku: function hasSku() {
      return !this.sku.none_sku;
    },
    selectedSkuComb: function selectedSkuComb() {
      if (!this.hasSku) {
        return {
          id: this.sku.collection_id,
          price: Math.round(this.sku.price * 100),
          'stock_num': this.sku.stock_num
        };
      } else if (this.isSkuCombSelected) {
        return (0, _skuHelper.getSkuComb)(this.sku.list, this.selectedSku);
      }
      return null;
    },
    skuTree: function skuTree() {
      return this.sku.tree || [];
    }
  },

  created: function created() {
    var skuEventBus = new _vue2.default();
    this.skuEventBus = skuEventBus;

    skuEventBus.$on('sku:close', this.handleCloseClicked);
    skuEventBus.$on('sku:select', this.handleSkuSelected);
    skuEventBus.$on('sku:numChange', this.handleNumChange);
    skuEventBus.$on('sku:overLimit', this.handleOverLimit);
    skuEventBus.$on('sku:addCart', this.handleAddCartClicked);
    skuEventBus.$on('sku:buy', this.handleBuyClicked);

    this.resetSelectedSku(this.skuTree);
    // 组件初始化后的钩子，抛出skuEventBus
    this.$emit('after-sku-create', skuEventBus);
  },


  methods: {
    resetSelectedSku: function resetSelectedSku(skuTree) {
      var _this = this;

      this.selectedSku = {};
      skuTree.forEach(function (item) {
        // 只有一个sku规格值时默认选中
        if (item.v.length === 1) {
          _this.selectedSku[item.k_s] = item.v[0].id;
        } else {
          _this.selectedSku[item.k_s] = _this.initialSku[item.k_s] || '';
        }
      });
    },
    getSkuMessages: function getSkuMessages() {
      return this.$refs.skuMessages ? this.$refs.skuMessages.getMessages() : {};
    },
    getSkuCartMessages: function getSkuCartMessages() {
      return this.$refs.skuMessages ? this.$refs.skuMessages.getCartMessages() : {};
    },
    validateSkuMessages: function validateSkuMessages() {
      return this.$refs.skuMessages ? this.$refs.skuMessages.validateMessages() : '';
    },
    validateSku: function validateSku() {
      if (this.selectedNum === 0) {
        return '商品已经无法购买啦';
      }

      if (this.isSkuCombSelected) {
        var error = this.validateSkuMessages();
        // sku留言没有错误则校验通过
        return error;
      } else {
        return '请选择完整的规格';
      }
    },
    handleCloseClicked: function handleCloseClicked() {
      this.show = false;
    },
    handleSkuSelected: function handleSkuSelected(skuValue) {
      var _extends2, _extends3;

      // 点击已选中的sku时则取消选中
      this.selectedSku = this.selectedSku[skuValue.skuKeyStr] === skuValue.id ? (0, _extends5.default)({}, this.selectedSku, (_extends2 = {}, _extends2[skuValue.skuKeyStr] = '', _extends2)) : (0, _extends5.default)({}, this.selectedSku, (_extends3 = {}, _extends3[skuValue.skuKeyStr] = skuValue.id, _extends3));

      this.$emit('sku-selected', {
        skuValue: skuValue,
        selectedSku: this.selectedSku,
        selectedSkuComb: this.selectedSkuComb
      });
    },
    handleNumChange: function handleNumChange(num) {
      this.selectedNum = num;
    },
    handleOverLimit: function handleOverLimit(_ref) {
      var action = _ref.action,
          limitType = _ref.limitType,
          quota = _ref.quota,
          quotaUsed = _ref.quotaUsed;

      if (action === 'minus') {
        (0, _toast2.default)('至少选择一件');
      } else if (action === 'plus') {
        if (limitType === QUOTA_LIMIT) {
          var msg = '\u9650\u8D2D' + quota + '\u4EF6';
          if (quotaUsed > 0) msg += '\uFF0C\u60A8\u5DF2\u8D2D\u4E70' + quotaUsed + '\u4EF6';
          (0, _toast2.default)(msg);
        } else {
          (0, _toast2.default)('库存不足');
        }
      }
    },
    handleAddCartClicked: function handleAddCartClicked() {
      this.handleBuyOrAddCart('add-cart');
    },
    handleBuyClicked: function handleBuyClicked() {
      this.handleBuyOrAddCart('buy-clicked');
    },
    handleBuyOrAddCart: function handleBuyOrAddCart(type) {
      var error = this.validateSku();
      if (error) {
        (0, _toast2.default)(error);
        return;
      }
      this.$emit(type, {
        goodsId: this.goodsId,
        selectedNum: this.selectedNum,
        selectedSkuComb: this.selectedSkuComb,
        messages: this.getSkuMessages(),
        cartMessages: this.getSkuCartMessages()
      });
    }
  }
};