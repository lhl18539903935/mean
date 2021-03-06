'use strict';

exports.__esModule = true;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _toast = require('./toast');

var _toast2 = _interopRequireDefault(_toast);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var instance = void 0;

var defaultOptions = {
  visible: true,
  type: 'text',
  position: 'middle',
  duration: 3000,
  mask: false,
  forbidClick: false,
  clear: function clear() {
    instance.visible = false;
  }
};

var createInstance = function createInstance() {
  if (!instance) {
    var ToastConstructor = _vue2.default.extend(_toast2.default);
    instance = new ToastConstructor({
      el: document.createElement('div')
    });
    document.body.appendChild(instance.$el);
  }
};

var Toast = function Toast() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  createInstance();

  options = typeof options === 'string' ? { message: options } : options;
  options = (0, _extends3.default)({}, defaultOptions, options);
  (0, _assign2.default)(instance, options);

  clearTimeout(instance.timer);

  if (options.duration !== 0) {
    instance.timer = setTimeout(function () {
      instance.clear();
    }, options.duration);
  }

  return instance;
};

var createMethod = function createMethod(type) {
  return function () {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return Toast((0, _extends3.default)({
      type: type,
      message: typeof options === 'string' ? options : options.message
    }, options));
  };
};

Toast.loading = createMethod('loading');
Toast.success = createMethod('success');
Toast.fail = createMethod('fail');
Toast.clear = function () {
  instance && instance.clear();
};

exports.default = Toast;