'use strict';

exports.__esModule = true;

var _popupContext = require('./popup-context');

var _popupContext2 = _interopRequireDefault(_popupContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PopupManager = {
  getModal: function getModal() {
    var modal = _popupContext2.default.modal;


    if (!modal) {
      modal = document.createElement('div');
      modal.classList.add('van-modal');
      modal.addEventListener('touchmove', function (event) {
        event.preventDefault();
        event.stopPropagation();
      });
      modal.addEventListener('click', function () {
        PopupManager.handleOverlayClick();
      });

      _popupContext2.default.modal = modal;
    }

    return modal;
  },


  // close popup when click modal && closeOnClickOverlay is true
  handleOverlayClick: function handleOverlayClick() {
    var topModal = _popupContext2.default.topModal;

    if (topModal) {
      var instance = _popupContext2.default.instances[topModal.id];
      if (instance && instance.closeOnClickOverlay) {
        instance.close();
      }
    }
  },
  openModal: function openModal(id, zIndex, dom) {
    var modalStack = _popupContext2.default.modalStack;

    var exist = modalStack.some(function (item) {
      return item.id === id;
    });

    if (!exist) {
      var modal = this.getModal();
      modal.style.zIndex = zIndex;

      var parentNode = dom && dom.parentNode && dom.parentNode.nodeType !== 11 ? dom.parentNode : document.body;
      parentNode.appendChild(modal);
      modalStack.push({ id: id, zIndex: zIndex, parentNode: parentNode });
    };
  },
  closeModal: function closeModal(id) {
    var modalStack = _popupContext2.default.modalStack;


    if (modalStack.length) {
      if (_popupContext2.default.topModal.id === id) {
        var modal = this.getModal();
        modalStack.pop();
        modal.parentNode.removeChild(modal);
        if (modalStack.length) {
          var topModal = _popupContext2.default.topModal;

          modal.style.zIndex = topModal.zIndex;
          topModal.parentNode.appendChild(modal);
        }
      } else {
        _popupContext2.default.modalStack = modalStack.filter(function (item) {
          return item.id !== id;
        });
      }
    }
  }
};

exports.default = PopupManager;