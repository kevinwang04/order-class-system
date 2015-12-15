var AppConstants = require('../constants/app-constants');
var AppDispatcher = require('../dispatchers/app-dispatcher');
var DashAction = require('./dash-action.js');

var Api = require('../utils/api.js');


var neworderAction = {
    
    getDate: function() {
        var data;
        Api.ajaxPost('/api.php/user/get_date',data,function(data){
            if (data.msg == "你还没有登陆") {
                location.pathname = "/#";
            } else if (data.code == 0) {
                AppDispatcher.handleViewAction({'actionType': AppConstants.GET_DATE,'data':data.data})
            };
        })
        /*$.ajax({
            url: 'http://localhost:90/api.php/user/get_date',
            type: 'POST',
            dataType: 'JSONP',
            jsonp: 'callback',
            success: function(data, textStatus){
                        if (data.msg == "你还没有登陆") {
                            location.pathname = "/#";
                        } else if (data.code == 0) {
                            AppDispatcher.handleViewAction({'actionType': AppConstants.GET_DATE,'data':data.data})
                        };
            },
            complete: function(XMLHttpRequest, textStatus){
                
            },
            error:function(e) {
                console.log(e);
            }
        });*/
    },

    getClassroom: function() {
        var data;
        Api.ajaxPost('/api.php/user/get_classroom',data,function(data){
            if (data.msg == "你还没有登陆") {
                location.pathname = "/#";
            } else if (data.code == 0) {
                AppDispatcher.handleViewAction({'actionType': AppConstants.GET_CLASSROOM,'data':data.data})
            };
        })
        /*$.ajax({
           url: 'http://localhost:90/api.php/user/get_classroom',
            type: 'POST',
            dataType: 'JSONP',
            jsonp: 'callback',
            success: function(data, textStatus){
                        if (data.msg == "你还没有登陆") {
                            location.pathname = "/#";
                        } else if (data.code == 0) {
                            AppDispatcher.handleViewAction({'actionType': AppConstants.GET_CLASSROOM,'data':data.data})
                        };
            },
            complete: function(XMLHttpRequest, textStatus){
                
            },
            error:function(e) {
                console.log(e);
            }
        });*/
    },
    getValidtime: function(data) {
        Api.ajaxPost('/api.php/user/get_time',data,function(data){
            if (data.msg == "你还没有登陆") {
                location.pathname = "/#";
            } else if (data.code == 0) {
                AppDispatcher.handleViewAction({'actionType': AppConstants.GET_VALID_TIME,'data':data.data})
            };
        })
        /*$.ajax({
            url: 'http://localhost:90/api.php/user/get_time',
            type: 'POST',
            dataType: 'JSONP',
            jsonp: 'callback',
            data: data,
            success: function(data, textStatus){
                        if (data.msg == "你还没有登陆") {
                            location.pathname = "/#";
                        } else if (data.code == 0) {
                            AppDispatcher.handleViewAction({'actionType': AppConstants.GET_VALID_TIME,'data':data.data})
                        };
                },
            complete: function(XMLHttpRequest, textStatus){
                
            },
            error:function(e) {
                console.log(e);
            }
        });*/
    },
    addOrder: function(data) {
        Api.ajaxPost('/api.php/user/add_order',data,function(data){
            if (data.msg == "你还没有登陆") {
                location.pathname = "/#";
            } else if (data.code == 0) {
                swal({title: '提交成功！',   text: "", confirmButtonColor: "#ff0000",   timer: 800 });
                DashAction.getOrder(0);
                //AppDispatcher.handleViewAction({'actionType': AppConstants.REFRESH_ORDER,'data':data});
            } else {
                swal({title: data.msg,   text: "", confirmButtonColor: "#ff0000",   });
            };   
        })
        /*$.ajax({
            url: 'http://localhost:90/api.php/user/add_order',
            type: 'POST',
            dataType: 'JSONP',
            jsonp: 'callback',
            data: data,
            success: function(res, textStatus){
                        if (res.msg == "你还没有登陆") {
                            location.pathname = "/#";
                        } else if (res.code == 0) {
                            swal({title: '提交成功！',   text: "", confirmButtonColor: "#ff0000",   timer: 800 });
                            DashAction.getOrder(0);
                            //AppDispatcher.handleViewAction({'actionType': AppConstants.REFRESH_ORDER,'data':data});
                        } else {
                            swal({title: res.msg,   text: "", confirmButtonColor: "#ff0000",   });
                        };                       
                },
            complete: function(XMLHttpRequest, textStatus){
                
            },
            error:function(e) {
                console.log(e);
            }
        });*/
    }

}

module.exports = neworderAction;