'use strict';

exports.__esModule = true;
exports.Dialog = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _dialog = require('./dialog');

var _dialog2 = _interopRequireDefault(_dialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var instance = void 0;

var defaultConfig = {
  value: true,
  title: '',
  message: '',
  confirmButtonText: '确认',
  cancelButtonText: '取消',
  showCancelButton: false,
  closeOnClickOverlay: false,
  callback: function callback(action) {
    instance[action === 'confirm' ? 'resolve' : 'reject'](action);
  }
};

var initInstance = function initInstance() {
  var DialogConstructor = _vue2.default.extend(_dialog2.default);
  instance = new DialogConstructor({
    el: document.createElement('div')
  });

  instance.$on('input', function (value) {
    instance.value = value;
  });

  document.body.appendChild(instance.$el);
};

var Dialog = function Dialog(options) {
  return new _promise2.default(function (resolve, reject) {
    if (!instance) {
      initInstance();
    }

    (0, _assign2.default)(instance, (0, _extends3.default)({
      resolve: resolve,
      reject: reject
    }, options));
  });
};

Dialog.alert = function (options) {
  return Dialog((0, _extends3.default)({}, defaultConfig, options));
};

Dialog.confirm = function (options) {
  return Dialog((0, _extends3.default)({}, defaultConfig, {
    showCancelButton: true
  }, options));
};

Dialog.close = function () {
  instance.value = false;
};

exports.default = Dialog;
exports.Dialog = _dialog2.default;