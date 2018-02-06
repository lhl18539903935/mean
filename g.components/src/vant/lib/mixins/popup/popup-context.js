"use strict";

exports.__esModule = true;
var PopupContext = {
  idSeed: 1,
  zIndex: 2000,
  instances: {},
  modalStack: [],

  plusKeyByOne: function plusKeyByOne(key) {
    return this[key]++;
  },


  get topModal() {
    return this.modalStack[this.modalStack.length - 1];
  }
};

exports.default = PopupContext;