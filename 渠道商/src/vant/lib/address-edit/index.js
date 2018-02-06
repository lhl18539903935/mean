'use strict';

exports.__esModule = true;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _components;

var _field = require('../field');

var _field2 = _interopRequireDefault(_field);

var _cell = require('../cell');

var _cell2 = _interopRequireDefault(_cell);

var _cellGroup = require('../cell-group');

var _cellGroup2 = _interopRequireDefault(_cellGroup);

var _button = require('../button');

var _button2 = _interopRequireDefault(_button);

var _popup = require('../popup');

var _popup2 = _interopRequireDefault(_popup);

var _toast = require('../toast');

var _toast2 = _interopRequireDefault(_toast);

var _dialog = require('../dialog');

var _dialog2 = _interopRequireDefault(_dialog);

var _area = require('../area');

var _area2 = _interopRequireDefault(_area);

var _Detail = require('./Detail');

var _Detail2 = _interopRequireDefault(_Detail);

var _switchCell = require('../switch-cell');

var _switchCell2 = _interopRequireDefault(_switchCell);

var _mobile = require('../utils/validate/mobile');

var _mobile2 = _interopRequireDefault(_mobile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "van-address-edit" }, [_c('van-cell-group', [_c('van-field', { attrs: { "maxlength": "15", "placeholder": "名字", "label": _vm.addressText + '人', "error": _vm.errorInfo.name }, on: { "focus": function focus($event) {
          _vm.onFocus('name');
        } }, model: { value: _vm.currentInfo.name, callback: function callback($$v) {
          _vm.$set(_vm.currentInfo, "name", $$v);
        }, expression: "currentInfo.name" } }), _c('van-field', { attrs: { "type": "tel", "label": "联系电话", "placeholder": "手机或固定电话", "error": _vm.errorInfo.tel }, on: { "focus": function focus($event) {
          _vm.onFocus('tel');
        } }, model: { value: _vm.currentInfo.tel, callback: function callback($$v) {
          _vm.$set(_vm.currentInfo, "tel", $$v);
        }, expression: "currentInfo.tel" } }), _c('van-cell', { staticClass: "van-address-edit__area", attrs: { "title": "收件地区" }, on: { "click": function click($event) {
          _vm.showAreaSelect = true;
        } } }, [_c('span', [_vm._v(_vm._s(_vm.currentInfo.province || '选择省'))]), _c('span', [_vm._v(_vm._s(_vm.currentInfo.city || '选择市'))]), _c('span', [_vm._v(_vm._s(_vm.currentInfo.county || '选择区'))])]), _c('van-address-edit-detail', { attrs: { "value": _vm.currentInfo.address_detail, "isError": _vm.errorInfo.address_detail, "showSearchResult": _vm.showSearchResult, "searchResult": _vm.searchResult }, on: { "focus": function focus($event) {
          _vm.onFocus('address_detail');
        }, "blur": _vm.onDetailBlur, "input": _vm.onChangeDetail } }), _vm.showPostal ? _c('van-field', { directives: [{ name: "show", rawName: "v-show", value: !_vm.hideBottomFields, expression: "!hideBottomFields" }], staticClass: "van-hairline--top", attrs: { "type": "tel", "label": "邮政编码", "placeholder": "邮政编码(选填)", "maxlength": "6", "error": _vm.errorInfo.postal_code }, on: { "focus": function focus($event) {
          _vm.onFocus('postal_code');
        } }, model: { value: _vm.currentInfo.postal_code, callback: function callback($$v) {
          _vm.$set(_vm.currentInfo, "postal_code", $$v);
        }, expression: "currentInfo.postal_code" } }) : _vm._e(), _vm.showSetDefault ? _c('van-switch-cell', { directives: [{ name: "show", rawName: "v-show", value: !_vm.hideBottomFields, expression: "!hideBottomFields" }], attrs: { "title": "设为默认" + _vm.addressText + "地址" }, model: { value: _vm.currentInfo.is_default, callback: function callback($$v) {
          _vm.$set(_vm.currentInfo, "is_default", $$v);
        }, expression: "currentInfo.is_default" } }) : _vm._e()], 1), _c('div', { directives: [{ name: "show", rawName: "v-show", value: !_vm.hideBottomFields, expression: "!hideBottomFields" }], staticClass: "van-address-edit__buttons" }, [_c('van-button', { attrs: { "block": "", "loading": _vm.isSaving, "type": "primary" }, on: { "click": _vm.onSaveAddress } }, [_vm._v("保存")]), _vm.isEdit ? _c('van-button', { attrs: { "block": "", "loading": _vm.isDeleting }, on: { "click": _vm.onDeleteAddress } }, [_vm._v("删除" + _vm._s(_vm.addressText) + "地址")]) : _vm._e()], 1), _c('van-popup', { attrs: { "position": "bottom" }, model: { value: _vm.showAreaSelect, callback: function callback($$v) {
          _vm.showAreaSelect = $$v;
        }, expression: "showAreaSelect" } }, [_c('van-area', { attrs: { "value": _vm.currentInfo.area_code, "areaList": _vm.areaList }, on: { "confirm": _vm.onAreaConfirm, "cancel": function cancel($event) {
          _vm.showAreaSelect = false;
        } } })], 1)], 1);
  },

  name: 'van-address-edit',

  components: (_components = {}, _components[_field2.default.name] = _field2.default, _components[_cell2.default.name] = _cell2.default, _components[_cellGroup2.default.name] = _cellGroup2.default, _components[_switchCell2.default.name] = _switchCell2.default, _components[_button2.default.name] = _button2.default, _components[_popup2.default.name] = _popup2.default, _components[_area2.default.name] = _area2.default, _components[_Detail2.default.name] = _Detail2.default, _components),

  props: {
    isSaving: Boolean,
    isDeleting: Boolean,
    areaList: Object,
    showPostal: Boolean,
    showSetDefault: Boolean,
    showSearchResult: Boolean,
    addressText: {
      type: String,
      default: '收货'
    },
    addressInfo: {
      type: Object,
      default: function _default() {
        return {
          name: '',
          tel: '',
          province: '',
          city: '',
          county: '',
          area_code: '',
          postal_code: '',
          address_detail: '',
          is_default: false
        };
      }
    },
    searchResult: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },

  data: function data() {
    return {
      showAreaSelect: false,
      currentInfo: this.addressInfo,
      isEdit: !!this.addressInfo.id,
      detailFocused: false,
      errorInfo: {
        name: false,
        tel: false,
        address_detail: false,
        postal_code: false
      }
    };
  },


  watch: {
    addressInfo: {
      handler: function handler(val) {
        this.currentInfo = val;
        this.isEdit = !!val.id;
      },

      deep: true
    }
  },

  computed: {
    // 当地址输入框开启了搜索，并且开始搜索后，隐藏所有地址详情以外的输入框
    hideBottomFields: function hideBottomFields() {
      return this.searchResult.length && this.detailFocused;
    }
  },

  methods: {
    onFocus: function onFocus(key) {
      this.errorInfo[key] = false;
      this.detailFocused = key === 'address_detail';
    },
    onDetailBlur: function onDetailBlur() {
      this.detailFocused = false;
    },
    onChangeDetail: function onChangeDetail(val) {
      this.currentInfo.address_detail = val;
      this.$emit('change-detail', val);
    },
    onAreaConfirm: function onAreaConfirm(values) {
      if (values.length !== 3 || +values[0].code === -1 || +values[1].code === -1 || +values[2].code === -1) {
        return (0, _toast2.default)('请选择正确的收件地区');
      }
      (0, _assign2.default)(this.currentInfo, {
        province: values[0].name,
        city: values[1].name,
        county: values[2].name,
        'area_code': values[2].code
      });
      this.showAreaSelect = false;
    },
    onSaveAddress: function onSaveAddress() {
      var _this = this;

      var items = ['name', 'tel', 'area_code', 'address_detail'];

      if (this.showPostal) {
        items.push('postal_code');
      }

      var isValid = items.every(function (item) {
        var msg = _this.getErrorMessageByKey(item);
        if (msg) {
          _this.errorInfo[item] = true;
          (0, _toast2.default)(msg);
        }
        return !msg;
      });

      if (isValid && !this.isSaving) {
        this.$emit('save', this.currentInfo);
      }
    },
    getErrorMessageByKey: function getErrorMessageByKey(key) {
      var value = this.currentInfo[key];

      switch (key) {
        case 'name':
          return value ? value.length <= 15 ? '' : '名字过长，请重新输入' : '请填写名字';
        case 'tel':
          return (0, _mobile2.default)(value) ? '' : '请填写正确的手机号码或电话号码';
        case 'area_code':
          return value ? +value !== -1 ? '' : '请选择正确的收件地区' : '请选择收件地区';
        case 'address_detail':
          return value ? value.length <= 200 ? '' : '详细地址不能超过200个字符' : '请填写详细地址';
        case 'postal_code':
          return value && !/^\d{6}$/.test(value) ? '邮政编码格式不正确' : '';
      }
    },
    onDeleteAddress: function onDeleteAddress() {
      var _this2 = this;

      if (this.isDeleting) {
        return;
      }

      _dialog2.default.confirm({
        message: '\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A' + this.addressText + '\u5730\u5740\u4E48'
      }).then(function () {
        _this2.$emit('delete', _this2.currentInfo);
      });
    }
  }
};