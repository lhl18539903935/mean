'use strict';

exports.__esModule = true;

var _components;

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NOTICE_BAR_MODE = ['', 'closeable', 'link'];

exports.default = {
  render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { directives: [{ name: "show", rawName: "v-show", value: _vm.showNoticeBar, expression: "showNoticeBar" }], class: ['van-notice-bar', { 'van-notice-bar--withicon': _vm.mode }], style: _vm.barStyle, on: { "click": function click($event) {
          _vm.$emit('click');
        } } }, [_vm.leftIcon ? _c('div', { staticClass: "van-notice-bar__left-icon" }, [_c('img', { attrs: { "src": _vm.leftIcon } })]) : _vm._e(), _c('div', { ref: "contentWrap", staticClass: "van-notice-bar__content-wrap" }, [_c('div', { ref: "content", class: ['van-notice-bar__content', _vm.animationClass], style: _vm.contentStyle, on: { "animationend": _vm.onAnimationEnd } }, [_vm._t("default", [_vm._v(_vm._s(_vm.text))])], 2)]), _vm.iconName ? _c('van-icon', { staticClass: "van-notice-bar__right-icon", attrs: { "name": _vm.iconName }, on: { "click": _vm.onClickIcon } }) : _vm._e()], 1);
  },

  name: 'van-notice-bar',

  components: (_components = {}, _components[_icon2.default.name] = _icon2.default, _components),

  props: {
    text: String,
    leftIcon: String,
    color: String,
    background: String,
    mode: {
      type: String,
      default: '',
      validator: function validator(val) {
        return NOTICE_BAR_MODE.indexOf(val) !== -1;
      }
    },
    delay: {
      type: [String, Number],
      default: 1
    },
    scrollable: {
      type: Boolean,
      default: true
    },
    speed: {
      type: Number,
      default: 50
    }
  },

  data: function data() {
    return {
      wrapWidth: 0,
      firstRound: true,
      duration: 0,
      offsetWidth: 0,
      showNoticeBar: true,
      animationClass: ''
    };
  },


  computed: {
    iconName: function iconName() {
      return this.mode === 'closeable' ? 'close' : this.mode === 'link' ? 'arrow' : '';
    },
    barStyle: function barStyle() {
      return {
        color: this.color,
        background: this.background
      };
    },
    contentStyle: function contentStyle() {
      return {
        paddingLeft: this.firstRound ? 0 : this.wrapWidth + 'px',
        animationDelay: (this.firstRound ? this.delay : 0) + 's',
        animationDuration: this.duration + 's'
      };
    }
  },

  mounted: function mounted() {
    var offsetWidth = this.$refs.content.getBoundingClientRect().width;
    var wrapWidth = this.$refs.contentWrap.getBoundingClientRect().width;
    if (this.scrollable && offsetWidth > wrapWidth) {
      this.wrapWidth = wrapWidth;
      this.offsetWidth = offsetWidth;
      this.duration = offsetWidth / this.speed;
      this.animationClass = 'van-notice-bar__play';
    }
  },


  methods: {
    onClickIcon: function onClickIcon() {
      this.showNoticeBar = this.mode !== 'closeable';
    },
    onAnimationEnd: function onAnimationEnd() {
      var _this = this;

      this.firstRound = false;
      this.$nextTick(function () {
        _this.duration = (_this.offsetWidth + _this.wrapWidth) / _this.speed;
        _this.animationClass = 'van-notice-bar__play--infinite';
      });
    }
  }
};