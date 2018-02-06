'use strict';

exports.__esModule = true;

var _components;

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _clickoutside = require('../utils/clickoutside');

var _clickoutside2 = _interopRequireDefault(_clickoutside);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "van-search", class: { 'van-search--show-action': _vm.showAction }, style: { 'background-color': _vm.background } }, [_c('div', { directives: [{ name: "clickoutside", rawName: "v-clickoutside", value: _vm.handleClickoutside, expression: "handleClickoutside" }], staticClass: "van-search__input-wrap" }, [_c('van-icon', { attrs: { "name": "search" } }), _c('input', { directives: [{ name: "refocus", rawName: "v-refocus", value: _vm.focusStatus, expression: "focusStatus" }], staticClass: "van-search__input", attrs: { "type": "search", "placeholder": _vm.placeholder }, domProps: { "value": _vm.value }, on: { "input": _vm.handleInput, "focus": _vm.handleFocus, "keypress": function keypress($event) {
          if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key)) {
            return null;
          }$event.preventDefault();_vm.handleSearch($event);
        } } }), _c('van-icon', { directives: [{ name: "show", rawName: "v-show", value: _vm.isFocus, expression: "isFocus" }], attrs: { "name": "clear" }, on: { "click": _vm.handleClean } })], 1), _vm.showAction ? _c('div', { staticClass: "van-search__action" }, [_vm._t("action", [_c('div', { staticClass: "van-search__action-text", on: { "click": _vm.handleBack } }, [_vm._v("取消")])])], 2) : _vm._e()]);
  },

  name: 'van-search',

  components: (_components = {}, _components[_icon2.default.name] = _icon2.default, _components),

  props: {
    placeholder: String,
    value: String,
    showAction: {
      type: Boolean,
      default: false
    },
    background: {
      type: String,
      default: '#f2f2f2'
    }
  },

  data: function data() {
    return {
      focusStatus: false,
      isFocus: false
    };
  },


  directives: {
    Clickoutside: _clickoutside2.default,
    refocus: {
      update: function update(el, state) {
        if (state.value) {
          el.focus();
        }
      }
    }
  },

  methods: {
    /**
     * 进入input焦点，出现close和取消
     */
    handleFocus: function handleFocus() {
      this.isFocus = true;
    },
    handleInput: function handleInput(event) {
      this.$emit('input', event.target.value);
    },


    /**
     * 点击close后清空value后，再聚焦input框
     */
    handleClean: function handleClean() {
      var _this = this;

      this.$emit('input', '');
      this.focusStatus = true;

      // 保证多次点击 clean 后，仍能触发 refocus
      this.$nextTick(function () {
        _this.focusStatus = false;
      });
    },


    /**
     * 点击取消后，清空所有回复最初状态
     */
    handleBack: function handleBack() {
      this.$emit('input', '');
      this.$emit('cancel');
    },


    /**
     * input输入回车后，发送回调
     */
    handleSearch: function handleSearch(e) {
      e.preventDefault();
      this.$emit('search', this.value);
      return false;
    },
    handleClickoutside: function handleClickoutside() {
      this.isFocus = false;
      this.focusStatus = false;
    }
  }
};