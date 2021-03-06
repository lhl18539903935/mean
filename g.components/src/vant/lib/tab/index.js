'use strict';

exports.__esModule = true;

var _findParent = require('../mixins/findParent');

var _findParent2 = _interopRequireDefault(_findParent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { class: ['van-tab__pane', { 'van-tab__pane--select': _vm.key === _vm.$parent.curActive }] }, [_vm._t("default")], 2);
  },

  name: 'van-tab',

  mixins: [_findParent2.default],

  props: {
    title: {
      type: String,
      required: true
    },
    disabled: Boolean
  },

  data: function data() {
    this.findParentByComponentName('van-tabs');
    var nextIndex = this.parentGroup.tabs.length;
    this.updateParentData(nextIndex);
    return {
      key: nextIndex
    };
  },


  watch: {
    title: function title() {
      this.updateParentData();
    },
    disabled: function disabled() {
      this.updateParentData();
    }
  },

  methods: {
    updateParentData: function updateParentData(nextIndex) {
      var index = arguments.length ? nextIndex : this.key;
      this.parentGroup.tabs.splice(index, 1, {
        title: this.title,
        disabled: this.disabled,
        index: index
      });
    }
  },

  destroyed: function destroyed() {
    var key = this.key;
    var tabs = this.parentGroup.tabs;

    for (var i = 0; i < tabs.length; i++) {
      /* istanbul ignore else */
      if (tabs[i].index === key) {
        this.parentGroup.tabs.splice(i, 1);
        return;
      }
    }
  }
};