'use strict';

exports.__esModule = true;

var _components;

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _field = require('../field');

var _field2 = _interopRequireDefault(_field);

var _cell = require('../cell');

var _cell2 = _interopRequireDefault(_cell);

var _cellGroup = require('../cell-group');

var _cellGroup2 = _interopRequireDefault(_cellGroup);

var _isAndroid = require('../utils/env/is-android');

var _isAndroid2 = _interopRequireDefault(_isAndroid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { ref: "root" }, [_c('van-field', { attrs: { "label": "详细地址", "placeholder": "如街道、楼层、门牌号等", "maxlength": "200", "type": "textarea", "autosize": "", "rows": "1", "value": _vm.value, "error": _vm.isError, "onIconClick": _vm.onIconClick }, on: { "input": function input($event) {
          _vm.$emit('input', $event);
        }, "focus": _vm.handleFocus, "blur": _vm.handleBlur } }, [_c('div', { attrs: { "slot": "icon" }, slot: "icon" }, [_vm.showIcon && _vm.isAndroid ? _c('span', { staticClass: "van-address-edit-detail__finish-edit" }, [_vm._v("完成")]) : _vm.showIcon ? _c('van-icon', { attrs: { "name": "clear" } }) : _vm._e()], 1)]), _vm.showSearchList ? _c('van-cell-group', { staticClass: "van-address-edit-detail__suggest-list" }, _vm._l(_vm.searchResult, function (express) {
      return _c('van-cell', { key: express.name + express.address, staticClass: "van-address-edit-detail__suggest-item", on: { "click": function click($event) {
            _vm.onSuggestSelect(express);
          } } }, [_c('van-icon', { staticClass: "van-address-edit-detail__location", attrs: { "name": "location" } }), _c('div', { staticClass: "van-address-edit-detail__item-info" }, [_c('p', { staticClass: "van-address-edit-detail__title" }, [_vm._v(_vm._s(express.name))]), _c('p', { staticClass: "van-address-edit-detail__subtitle" }, [_vm._v(_vm._s(express.address))])])], 1);
    })) : _vm._e()], 1);
  },

  name: 'van-address-edit-detail',

  components: (_components = {}, _components[_field2.default.name] = _field2.default, _components[_icon2.default.name] = _icon2.default, _components[_cell2.default.name] = _cell2.default, _components[_cellGroup2.default.name] = _cellGroup2.default, _components),

  props: {
    value: {},
    isError: Boolean,
    searchResult: Array,
    showSearchResult: Boolean
  },

  data: function data() {
    return {
      isAndroid: (0, _isAndroid2.default)(),
      isFocused: false
    };
  },


  computed: {
    showSearchList: function showSearchList() {
      return this.showSearchResult && this.isFocused && this.searchResult.length > 0;
    },
    showIcon: function showIcon() {
      return this.value && this.isFocused;
    }
  },

  methods: {
    handleFocus: function handleFocus(e) {
      this.isFocused = true;
      this.$emit('focus', e);
      this.$refs.root.scrollIntoView();
    },
    handleBlur: function handleBlur(e) {
      var _this = this;

      // 等待其他地方点击事件完了以后，再触发
      setTimeout(function () {
        _this.isFocused = false;
        _this.$emit('blur', e);
      }, 100);
    },
    onIconClick: function onIconClick() {
      if (this.isAndroid) {
        this.$refs.root.querySelector('.van-field__control').blur();
      } else {
        this.$emit('input', '');
      }
    },
    onSuggestSelect: function onSuggestSelect(express) {
      this.$emit('input', ((express.address || '') + ' ' + (express.name || '')).trim());
    }
  }
};