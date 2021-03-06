'use strict';

exports.__esModule = true;
exports.default = {
  render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('transition', { attrs: { "name": _vm.transition ? 'van-slide-bottom' : '' } }, [_c('div', { directives: [{ name: "show", rawName: "v-show", value: _vm.show, expression: "show" }], staticClass: "van-number-keyboard", style: _vm.style, on: { "touchstart": function touchstart($event) {
          $event.stopPropagation();$event.preventDefault();_vm.focus($event);
        }, "touchmove": _vm.blurKey, "touchend": _vm.blurKey, "touchcancel": _vm.blurKey, "animationend": _vm.onAnimationEnd } }, [_vm.title ? _c('div', { staticClass: "van-number-keyboard__title van-hairline--top" }, [_c('span', [_vm._v(_vm._s(_vm.title))])]) : _vm._e(), _vm._l(_vm.keys, function (key, index) {
      return _c('i', { class: ['van-hairline', {
          'van-number-keyboard--active': index === _vm.active,
          'van-number-keyboard__delete': index === 11 && _vm.showDeleteKey
        }], attrs: { "data-key": index }, domProps: { "textContent": _vm._s(key) } });
    })], 2)]);
  },

  name: 'van-number-keyboard',

  props: {
    show: Boolean,
    extraKey: {
      type: String,
      default: ''
    },
    title: String,
    zIndex: {
      type: Number,
      default: 100
    },
    transition: {
      type: Boolean,
      default: true
    },
    showDeleteKey: {
      type: Boolean,
      default: true
    }
  },

  mounted: function mounted() {
    this.handler(true);
  },
  destroyed: function destroyed() {
    this.handler(false);
  },
  activated: function activated() {
    this.handler(true);
  },
  deactivated: function deactivated() {
    this.handler(false);
  },
  data: function data() {
    return {
      active: -1
    };
  },


  watch: {
    show: function show() {
      if (!this.transition) {
        this.$emit(this.show ? 'show' : 'hide');
      }
    }
  },

  computed: {
    keys: function keys() {
      var keys = [];
      for (var i = 0; i < 12; i++) {
        var key = i === 10 ? 0 : i < 9 ? i + 1 : i === 9 ? this.extraKey : '';
        keys.push(key);
      }
      return keys;
    },
    style: function style() {
      return {
        zIndex: this.zIndex
      };
    }
  },

  methods: {
    handler: function handler(action) {
      if (action !== this.handlerStatus) {
        this.handlerStatus = action;
        document.body[(action ? 'add' : 'remove') + 'EventListener']('touchstart', this.blurKeyboard);
      }
    },
    focus: function focus(event) {
      this.active = parseInt(event.target.dataset.key);
      if (this.active === 11) {
        this.$emit('delete');
      } else if (!isNaN(this.active)) {
        var key = this.keys[this.active];
        if (key !== '') {
          this.$emit('input', key);
        }
      }
    },
    blurKey: function blurKey() {
      this.active = -1;
    },
    blurKeyboard: function blurKeyboard() {
      this.$emit('blur');
    },
    onAnimationEnd: function onAnimationEnd() {
      this.$emit(this.show ? 'show' : 'hide');
    }
  }
};