/**
 * Author kevinwang
 * 2015-12-6
 * App store
 */

var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var EventEmitter = require('events').EventEmitter;
var React = require('react/addons');

var CHANGE_EVENT = "change";


var _cartItems = [];

function _addItem(item){
  _cartItems.push(Math.random());
}




var AppStore = React.addons.update(EventEmitter.prototype, { $merge: {
  emitChange:function(){
    this.emit(CHANGE_EVENT);
  },

  addChangeListener:function(callback){
    this.on(CHANGE_EVENT, callback)
  },

  removeChangeListener:function(callback){
    this.removeListener(CHANGE_EVENT, callback)
  },
  getCart:function(){
    return _cartItems
  },

  dispatcherIndex:AppDispatcher.register(function(payload){
    var action = payload.action; // this is our action from handleViewAction
    switch(action.actionType){
      case AppConstants.ADD_ITEM:
        _addItem(payload.action.item);
        break;
    }
    AppStore.emitChange();

    return true;
  })
}});

module.exports = AppStore;