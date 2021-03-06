'use strict';

exports.__esModule = true;

var _components;

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _routerLink = require('../mixins/router-link');

var _routerLink2 = _interopRequireDefault(_routerLink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { class: ['van-tabbar-item', { 'van-tabbar-item--active': _vm.active }], on: { "click": _vm.onClick } }, [_c('div', { class: ['van-tabbar-item__icon', { 'van-tabbar-item__icon-dot': _vm.dot }] }, [_vm._t("icon", [_vm.icon ? _c('van-icon', { attrs: { "name": _vm.icon } }) : _vm._e()]), _vm.info ? _c('div', { staticClass: "van-tabbar-item__info" }, [_vm._v(_vm._s(_vm.info))]) : _vm._e()], 2), _c('div', { staticClass: "van-tabbar-item__text" }, [_vm._t("default")], 2)]);
  },

  name: 'van-tabbar-item',

  mixins: [_routerLink2.default],

  components: (_components = {}, _components[_icon2.default.name] = _icon2.default, _components),

  props: {
    icon: String,
    dot: Boolean,
    info: String
  },

  data: function data() {
    return {
      active: false
    };
  },
  beforeCreate: function beforeCreate() {
    this.$parent.items.push(this);
  },
  destroyed: function destroyed() {
    this.$parent.items.splice(this.$parent.items.indexOf(this), 1);
  },


  methods: {
    onClick: function onClick() {
      this.$parent.onChange(this.$parent.items.indexOf(this));
      this.routerLink();
    }
  }
};