var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var EventEmitter = require('events').EventEmitter;
var React = require('react/addons');

var CHANGE_EVENT = "change";


var _scheduleList = [];

function _addItem(item){
  console.log("Dashboard");
}

/**
 * handle user info
 * @type {Array}
 */
var _userInfo = [];


var AppStore = React.addons.update(EventEmitter.prototype, {$merge: {
  emitChange:function(){
    this.emit(CHANGE_EVENT);
  },

  addChangeListener:function(callback){
    this.on(CHANGE_EVENT, callback)
  },

  removeChangeListener:function(callback){
    this.removeListener(CHANGE_EVENT, callback)
  },
  setScheduleList: function(params){
    /*for (i = 0; i < params.length; i++){
      _scheduleList[i] = params[i];
    }*/
    //_scheduleList.push(params);
    _scheduleList = params;
    console.log(_scheduleList);
  },
  getScheduleList: function() {
    return _scheduleList;
  },
  setUserinfo: function(user){
    _userInfo.push(user);
  },
  getUserinfo: function(){
    return _userInfo;
  },


  dispatcherIndex:AppDispatcher.register(function(payload){
    var action = payload.action; // this is our action from handleViewAction
    switch(action.actionType){
      case AppConstants.GET_USER_ORDER:
      AppStore.setScheduleList(action.data);
      break;

      case AppConstants.GET_USER_INFO:
      AppStore.setUserinfo(action.data);
      break;

      //case AppConstants.REFRESH_ORDER:

      /* SHORT USAGE BOILERPLATE (EXAMPLE - uncomment if required)
      case AppConstants.ADD_ITEM:
        _addItem(payload.action.item);
        break;
      */
    }
    AppStore.emitChange();

    return true;
  })
}});

module.exports = AppStore;