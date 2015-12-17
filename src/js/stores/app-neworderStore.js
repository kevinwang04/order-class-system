/**
 * Author kevinwang
 * 2015-12-6
 * new-order store
 */

var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var EventEmitter = require('events').EventEmitter;
var React = require('react/addons');

var CHANGE_EVENT = "change";


var _date = [];
var _classroom = [];
var _validtime = [];

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
    for (i = 0; i < params.length; i++){
      _scheduleList[i] = params[i];
    }
  },
  getScheduleList: function() {
    return _scheduleList;
  },
  setDate: function(date){
    _date = date
  },
  getDate: function() {
  	return _date;
  },
  setClassroom: function(classroom) {
  	_classroom = classroom
  },
  getClassroom: function() {
  	return _classroom;
  },
  setValidtime: function(validtime) {
  	_validtime = validtime;
  },
  getValidtime: function() {
  	return _validtime;
  },



  dispatcherIndex:AppDispatcher.register(function(payload){
    var action = payload.action; // this is our action from handleViewAction
    switch(action.actionType){
      case AppConstants.GET_DATE:
      AppStore.setDate(action.data);
      break;
      case AppConstants.GET_CLASSROOM:
      AppStore.setClassroom(action.data);
      break;
      case AppConstants.GET_VALID_TIME:
      AppStore.setValidtime(action.data);
      break;

    }
    AppStore.emitChange();

    return true;
  })
}});

module.exports = AppStore;