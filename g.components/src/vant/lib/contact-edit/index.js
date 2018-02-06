'use strict';

exports.__esModule = true;

var _components;

var _field = require('../field');

var _field2 = _interopRequireDefault(_field);

var _button = require('../button');

var _button2 = _interopRequireDefault(_button);

var _cellGroup = require('../cell-group');

var _cellGroup2 = _interopRequireDefault(_cellGroup);

var _dialog = require('../dialog');

var _dialog2 = _interopRequireDefault(_dialog);

var _toast = require('../toast');

var _toast2 = _interopRequireDefault(_toast);

var _mobile = require('../utils/validate/mobile');

var _mobile2 = _interopRequireDefault(_mobile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "van-contact-edit" }, [_c('van-cell-group', [_c('van-field', { attrs: { "label": "联系人", "maxlength": "30", "placeholder": "名字", "error": _vm.errorInfo.name }, on: { "focus": function focus($event) {
          _vm.onFocus('name');
        } }, model: { value: _vm.currentInfo.name, callback: function callback($$v) {
          _vm.$set(_vm.currentInfo, "name", $$v);
        }, expression: "currentInfo.name" } }), _c('van-field', { attrs: { "type": "tel", "label": "联系电话", "placeholder": "手机或固定电话", "error": _vm.errorInfo.tel }, on: { "focus": function focus($event) {
          _vm.onFocus('tel');
        } }, model: { value: _vm.currentInfo.tel, callback: function callback($$v) {
          _vm.$set(_vm.currentInfo, "tel", $$v);
        }, expression: "currentInfo.tel" } })], 1), _c('div', { staticClass: "van-contact-edit__buttons" }, [_c('van-button', { attrs: { "block": "", "loading": _vm.isSaving, "type": "primary" }, on: { "click": _vm.onSaveContact } }, [_vm._v("保存")]), _vm.isEdit ? _c('van-button', { attrs: { "block": "", "loading": _vm.isDeleting }, on: { "click": _vm.onDeleteContact } }, [_vm._v("删除联系人")]) : _vm._e()], 1)], 1);
  },

  name: 'van-contact-edit',

  components: (_components = {}, _components[_field2.default.name] = _field2.default, _components[_button2.default.name] = _button2.default, _components[_cellGroup2.default.name] = _cellGroup2.default, _components),

  props: {
    isEdit: Boolean,
    isSaving: Boolean,
    isDeleting: Boolean,
    contactInfo: {
      type: Object,
      default: function _default() {
        return {
          id: '',
          tel: '',
          name: ''
        };
      }
    }
  },

  data: function data() {
    return {
      currentInfo: this.contactInfo,
      errorInfo: {
        name: false,
        tel: false
      }
    };
  },


  watch: {
    contactInfo: function contactInfo(val) {
      this.currentInfo = val;
    }
  },

  methods: {
    onFocus: function onFocus(key) {
      this.errorInfo[key] = false;
    },
    getErrorMessageByKey: function getErrorMessageByKey(key) {
      var value = this.currentInfo[key];
      switch (key) {
        case 'name':
          return value ? value.length <= 15 ? '' : '名字过长，请重新输入' : '请填写名字';
        case 'tel':
          return (0, _mobile2.default)(value) ? '' : '请填写正确的手机号码或电话号码';
      }
    },
    onSaveContact: function onSaveContact() {
      var _this = this;

      var items = ['name', 'tel'];

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
    onDeleteContact: function onDeleteContact() {
      var _this2 = this;

      if (this.isDeleting) {
        return;
      }

      _dialog2.default.confirm({
        message: '\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u8054\u7CFB\u4EBA\u4E48'
      }).then(function () {
        _this2.$emit('delete', _this2.currentInfo);
      });
    }
  }
};