'use strict';

exports.__esModule = true;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _components;

var _field = require('../../field');

var _field2 = _interopRequireDefault(_field);

var _cellGroup = require('../../cell-group');

var _cellGroup2 = _interopRequireDefault(_cellGroup);

var _email = require('../../utils/validate/email');

var _email2 = _interopRequireDefault(_email);

var _number = require('../../utils/validate/number');

var _number2 = _interopRequireDefault(_number);

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('van-cell-group', { staticClass: "van-sku-messages" }, [_vm._l(_vm.internalMessages, function (message, index) {
      return [message.type === 'image' ? void 0 : message.multiple == '1' ? _c('van-field', { key: _vm.goodsId + "-" + index, attrs: { "required": message.required == '1', "label": message.name, "placeholder": _vm.placeholderMap.textarea, "type": "textarea" }, model: { value: _vm.messageValues[index], callback: function callback($$v) {
            _vm.$set(_vm.messageValues, index, $$v);
          }, expression: "messageValues[index]" } }) : _c('van-field', { key: _vm.goodsId + "-" + index, attrs: { "required": message.required == '1', "label": message.name, "placeholder": _vm.placeholderMap[message.type], "type": _vm.getType(message) }, model: { value: _vm.messageValues[index], callback: function callback($$v) {
            _vm.$set(_vm.messageValues, index, $$v);
          }, expression: "messageValues[index]" } })];
    })], 2);
  },

  name: 'van-sku-messages',

  components: (_components = {}, _components[_field2.default.name] = _field2.default, _components[_cellGroup2.default.name] = _cellGroup2.default, _components),

  props: {
    messages: Array,
    messagePlaceholderMap: Object,
    goodsId: [Number, String]
  },

  data: function data() {
    return {
      placeholderMap: (0, _assign2.default)({}, _constants.DEFAULT_PLACEHOLDER_MAP, this.messagePlaceholderMap)
    };
  },


  // for debug
  // watch: {
  //   messageValues() {
  //     console.log(this.messageValues);
  //   }
  // },

  computed: {
    internalMessages: function internalMessages() {
      if (Object.prototype.toString.call(this.messages) === '[object Array]') {
        return this.messages;
      }
      return [];
    },
    messageValues: function messageValues() {
      var messageValues = [];
      this.internalMessages.forEach(function (message, index) {
        messageValues[index] = '';
      });

      return messageValues;
    }
  },

  methods: {
    getType: function getType(_ref) {
      var type = _ref.type,
          datetime = _ref.datetime;

      if (type === 'id_no') return 'text';
      return datetime > 0 ? 'datetime-local' : type;
    },
    getMessages: function getMessages() {
      var _this = this;

      var messages = {};

      this.messageValues.forEach(function (value, index) {
        if (_this.internalMessages[index].datetime > 0) {
          value = value.replace(/T/g, ' ');
        }
        messages['message_' + index] = value;
      });

      return messages;
    },
    getCartMessages: function getCartMessages() {
      var _this2 = this;

      var messages = {};

      this.messageValues.forEach(function (value, index) {
        var message = _this2.internalMessages[index];
        if (message.datetime > 0) {
          value = value.replace(/T/g, ' ');
        }
        messages[message.name] = value;
      });

      return messages;
    },
    validateMessages: function validateMessages() {
      var values = this.messageValues;

      for (var i = 0; i < values.length; i++) {
        var value = values[i];
        var message = this.internalMessages[i];

        if (value === '') {
          // 必填字段的校验
          if (message.required == '1') {
            // eslint-disable-line
            if (message.type === 'image') {
              continue;
              // return `请上传${message.name}`;
            } else {
              return '\u8BF7\u586B\u5199' + message.name;
            }
          }
        } else {
          if (message.type === 'tel' && !(0, _number2.default)(value)) {
            return '请填写正确的数字格式留言';
          }
          if (message.type === 'email' && !(0, _email2.default)(value)) {
            return '请填写正确的邮箱';
          }
          if (message.type === 'id_no' && (value.length < 15 || value.length > 18)) {
            return '请填写正确的身份证号码';
          }
        }

        if (value.length > 200) {
          return message.name + ' \u5199\u7684\u592A\u591A\u4E86<br/>\u4E0D\u8981\u8D85\u8FC7200\u5B57';
        }
      }
    }
  }

};