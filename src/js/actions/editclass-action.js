/**
 * Author kevinwang
 * 2015-12-6
 * edit-class action
 */

var AppConstants = require('../constants/app-constants');
var AppDispatcher = require('../dispatchers/app-dispatcher');

var Api = require('../utils/api.js');



var EditClass = {
    /**
     * 获取可管理日期
     * @param  {Function} cb [回调控制异步拿到第一天数据]
     * @return {[type]}      [description]
     */
    getDate: function(cb) {
        var data;
        Api.ajaxPost('/api.php/admin/get_date',data,function(data){
            if (data.msg == "你还没有登陆") {
                location.pathname = "/";
            } else if (data.code == 0) {
                AppDispatcher.handleViewAction({'actionType': AppConstants.GET_ADMIN_DATE,'data':data.data})
                cb(data.data[0].id);
            };
        })
    },
    /**
     * 获取安排
     * @param  {[int]} date_id [具体日期]
     * @return {[type]}         [description]
     */
    getArrangement: function(date_id) {
        var data = {
            date_id:date_id
        };
        Api.ajaxPost('/api.php/admin/get_arrangement',data,function(data){
            if (data.msg == "你还没有登陆") {
                location.pathname = "/";
            } else if (data.code == 0) {
                AppDispatcher.handleViewAction({'actionType': AppConstants.GET_ARRANGEMENT,'data':data.data})
                
            };
        })
    },
    /**
     * 增加安排
     * @param {[object]} data [包含日期，时间段，教室号]
     */
    addArrange: function(data) {
        var date_id = data.date_id;
        Api.ajaxPost('/api.php/admin/add_arrangement',data,function(data){
            if (data.msg == "你还没有登陆") {
                location.pathname = "/";
            } else if (data.code == 0) {
                AppDispatcher.handleViewAction({'actionType': AppConstants.ADD_ARRANGEMENT,'data':data.data})
                EditClass.getArrangement(date_id);
                swal({title: "添加成功！",   text: "", confirmButtonColor: "green",   timer: 800 });
            } else {
                alert(data.msg);
            }
        })
    },
    /**
     * 更新安排
     * @param  {[object]} data [更新的日期，时间段，教室号]
     * @return {[type]}      [description]
     */
    updateArrange: function(data) {
        var date_id = data.date_id;
        Api.ajaxPost('/api.php/admin/update_arrangement',data,function(data){
            if (data.msg == "你还没有登陆") {
                location.pathname = "/";
            } else if (data.code == 0) {
                swal({title: "修改成功！",   text: "", confirmButtonColor: "green",   timer: 800 });                            
                EditClass.getArrangement(date_id);
            };
        })
    },
    /**
     * 删除安排
     * @param  {[object]} data [删除的日期，时间段，教室信息]
     * @return {[type]}      [description]
     */
    deleteArrange: function(data) {
        var date_id = data.date_id;
        Api.ajaxPost('/api.php/admin/delete_arrangement',data,function(data){
            if (data.msg == "你还没有登陆") {
                location.pathname = "/";
            } else if (data.code == 0) {
                EditClass.getArrangement(date_id);
            };
        })
    }
}

module.exports = EditClass;