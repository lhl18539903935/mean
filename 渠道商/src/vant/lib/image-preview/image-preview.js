'use strict';

exports.__esModule = true;

var _components;

var _popup = require('../mixins/popup');

var _popup2 = _interopRequireDefault(_popup);

var _swipe = require('../swipe');

var _swipe2 = _interopRequireDefault(_swipe);

var _swipeItem = require('../swipe-item');

var _swipeItem2 = _interopRequireDefault(_swipeItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { directives: [{ name: "show", rawName: "v-show", value: _vm.value, expression: "value" }], staticClass: "van-image-preview", on: { "touchstart": _vm.onTouchStart, "touchmove": _vm.onTouchMove, "touchend": _vm.onTouchEnd, "touchcancel": _vm.onTouchEnd } }, [_c('van-swipe', { attrs: { "initialSwipe": _vm.startPosition } }, _vm._l(_vm.images, function (item, index) {
      return _c('van-swipe-item', { key: index }, [_c('img', { staticClass: "van-image-preview__image", attrs: { "src": item } })]);
    }))], 1);
  },

  name: 'van-image-preview',

  mixins: [_popup2.default],

  components: (_components = {}, _components[_swipe2.default.name] = _swipe2.default, _components[_swipeItem2.default.name] = _swipeItem2.default, _components),

  props: {
    overlay: {
      default: true
    },
    lockOnScroll: {
      default: true
    },
    closeOnClickOverlay: {
      default: true
    }
  },

  data: function data() {
    return {
      images: [],
      startPosition: 0
    };
  },


  methods: {
    onTouchStart: function onTouchStart(event) {
      this.touchStartTime = new Date();
      this.touchStartX = event.touches[0].clientX;
      this.touchStartY = event.touches[0].clientY;
      this.deltaX = 0;
      this.deltaY = 0;
    },
    onTouchMove: function onTouchMove(event) {
      event.preventDefault();
      this.deltaX = event.touches[0].clientX - this.touchStartX;
      this.deltaY = event.touches[0].clientY - this.touchStartY;
    },
    onTouchEnd: function onTouchEnd(event) {
      event.preventDefault();
      // prevent long tap to close component
      var deltaTime = new Date() - this.touchStartTime;
      if (deltaTime < 100 && Math.abs(this.deltaX) < 20 && Math.abs(this.deltaY) < 20) {
        this.value = false;
      }
    }
  }
};