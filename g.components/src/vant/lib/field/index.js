'use strict';

exports.__esModule = true;

var _components;

var _cell = require('../cell');

var _cell2 = _interopRequireDefault(_cell);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VALID_TYPES = ['text', 'number', 'email', 'url', 'tel', 'date', 'time', 'datetime', 'password', 'textarea'];

exports.default = {
  render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('van-cell', { class: ['van-field', {
        'van-field--has-textarea': _vm.type === 'textarea',
        'van-field--nolabel': !_vm.label,
        'van-field--disabled': _vm.$attrs.disabled,
        'van-field--error': _vm.error,
        'van-field--border': _vm.border,
        'van-field--autosize': _vm.autosize,
        'van-field--has-icon': _vm.hasIcon,
        'van-hairline--surround': _vm.border
      }], attrs: { "title": _vm.label, "required": _vm.required } }, [_vm.type === 'textarea' ? _c('textarea', _vm._b({ ref: "textarea", staticClass: "van-field__control", domProps: { "value": _vm.value }, on: { "input": _vm.onInput, "focus": function focus($event) {
          _vm.$emit('focus');
        }, "blur": function blur($event) {
          _vm.$emit('blur');
        } } }, 'textarea', _vm.$attrs, false)) : _c('input', _vm._b({ staticClass: "van-field__control", attrs: { "type": _vm.type }, domProps: { "value": _vm.value }, on: { "input": _vm.onInput, "focus": function focus($event) {
          _vm.$emit('focus');
        }, "blur": function blur($event) {
          _vm.$emit('blur');
        } } }, 'input', _vm.$attrs, false)), _vm.hasIcon ? _c('div', { directives: [{ name: "show", rawName: "v-show", value: _vm.$slots.icon || _vm.value, expression: "$slots.icon || value" }], staticClass: "van-field__icon", on: { "touchstart": function touchstart($event) {
          $event.preventDefault();_vm.onClickIcon($event);
        } } }, [_vm._t("icon", [_c('van-icon', { attrs: { "name": _vm.icon } })])], 2) : _vm._e()]);
  },

  name: 'van-field',

  components: (_components = {}, _components[_cell2.default.name] = _cell2.default, _components[_icon2.default.name] = _icon2.default, _components),

  props: {
    type: {
      type: String,
      default: 'text',
      validator: function validator(value) {
        return VALID_TYPES.indexOf(value) > -1;
      }
    },
    value: {},
    icon: String,
    label: String,
    error: Boolean,
    required: Boolean,
    border: Boolean,
    autosize: Boolean,
    onIconClick: {
      type: Function,
      default: function _default() {}
    }
  },

  watch: {
    value: function value() {
      if (this.autosize && this.type === 'textarea') {
        this.$nextTick(this.adjustSize);
      }
    }
  },

  mounted: function mounted() {
    if (this.autosize && this.type === 'textarea') {
      var el = this.$refs.textarea;
      var scrollHeight = el.scrollHeight;
      if (scrollHeight !== 0) {
        el.style.height = scrollHeight + 'px';
      }
      el.style.overflowY = 'hidden';
    }
  },


  computed: {
    hasIcon: function hasIcon() {
      return this.$slots.icon || this.icon;
    }
  },

  methods: {
    onInput: function onInput(event) {
      this.$emit('input', event.target.value);
    },
    onClickIcon: function onClickIcon() {
      this.$emit('click-icon');
      this.onIconClick();
    },
    adjustSize: function adjustSize() {
      var el = this.$refs.textarea;
      el.style.height = 'auto';
      el.style.height = el.scrollHeight + 'px';
    }
  }
};