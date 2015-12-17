/**
 * Author kevinwang
 * 2015-12-6
 * new-order action
 */


var AppConstants = require('../constants/app-constants');
var AppDispatcher = require('../dispatchers/app-dispatcher');
var DashAction = require('./dash-action.js');

var Api = require('../utils/api.js');


var neworderAction = {
    /**
     * 获取可预约日期
     * @return {[type]} [description]
     */
    getDate: function() {
        var data;
        Api.ajaxPost('/api.php/user/get_date',data,function(data){
            if (data.msg == "你还没有登陆") {
                location.pathname = "/#";
            } else if (data.code == 0) {
                AppDispatcher.handleViewAction({'actionType': AppConstants.GET_DATE,'data':data.data})
            };
        })
    },
    /**
     * 获取可使用教室
     * @return {[type]} [description]
     */
    getClassroom: function() {
        var data;
        Api.ajaxPost('/api.php/user/get_classroom',data,function(data){
            if (data.msg == "你还没有登陆") {
                location.pathname = "/#";
            } else if (data.code == 0) {
                AppDispatcher.handleViewAction({'actionType': AppConstants.GET_CLASSROOM,'data':data.data})
            };
        })
    },
    /**
     * 根据选定的可使用日期和教室获取可使用时间段
     * @param  {[Array]} data [可使用时间段]
     * @return {[type]}      [description]
     */
    getValidtime: function(data) {
        Api.ajaxPost('/api.php/user/get_time',data,function(data){
            if (data.msg == "你还没有登陆") {
                location.pathname = "/#";
            } else if (data.code == 0) {
                AppDispatcher.handleViewAction({'actionType': AppConstants.GET_VALID_TIME,'data':data.data})
            };
        })
    },
    /**
     * 增加预约
     * @param {[object]} data [预约日期，时间段，教室，申请理由]
     */
    addOrder: function(data) {
        Api.ajaxPost('/api.php/user/add_order',data,function(data){
            if (data.msg == "你还没有登陆") {
                location.pathname = "/#";
            } else if (data.code == 0) {
                swal({title: '提交成功！',   text: "", confirmButtonColor: "#ff0000",   timer: 800 });
                DashAction.getOrder(0);
            } else {
                swal({title: data.msg,   text: "", confirmButtonColor: "#ff0000",   });
            };   
        })
    }

}

module.exports = neworderAction;