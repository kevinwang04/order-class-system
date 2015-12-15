var AppConstants = require('../constants/app-constants');
var AppDispatcher = require('../dispatchers/app-dispatcher');

var $ = require('jquery');
var Api = require('../utils/api.js');


var ManageAction = {
    getOrder: function(offset,is_operated) {
        var data = {
                'offset':offset,
                'is_operated':is_operated
            };
	    Api.ajaxPost('/api.php/admin/get_order',data,function(data){
            if (data.msg == "你还没有登陆") {
                location.pathname = "/";
            } else if (data.code == 0) {
                AppDispatcher.handleViewAction({'actionType': AppConstants.GET_ADMIN_NEW_ORDER,'data':data.data.infos})
            };
        })
	    /*$.ajax({
			url: 'http://localhost:90/api.php/admin/get_order',
			type: 'GET',
			dataType: 'JSONP',
            jsonp: 'callback',
            data: {
                'offset':offset,
                'is_operated':is_operated
            },
			success: function(data, textStatus){
                        if (data.msg == "你还没有登陆") {
                            location.pathname = "/";
                        } else if (data.code == 0) {
                            AppDispatcher.handleViewAction({'actionType': AppConstants.GET_ADMIN_NEW_ORDER,'data':data.data.infos})
                        };

                },
            complete: function(XMLHttpRequest, textStatus){
                
            },
            error:function(e) {
            	console.log(e);
            }
		});*/
	    //AppDispatcher.handleViewAction(payload)
    },
    handleOrder: function(data) {
        Api.ajaxPost('/api.php/admin/handle_order',data,function(data){
            if (data.msg == "你还没有登陆") {
                location.pathname = "/";
            } else if (data.code == 0) {
                AppDispatcher.handleViewAction({'actionType': AppConstants.HANDLE_ORDER,'data':data.data.infos})
                ManageAction.getOrder(0,0);
            };
        })
        /*$.ajax({
            url: 'http://localhost:90/api.php/admin/handle_order',
            type: 'POST',
            dataType: 'JSONP',
            jsonp: 'callback',
            data: data,
            success: function(data, textStatus){
                        if (data.msg == "你还没有登陆") {
                            location.pathname = "/";
                        } else if (data.code == 0) {
                            AppDispatcher.handleViewAction({'actionType': AppConstants.HANDLE_ORDER,'data':data.data.infos})
                            ManageAction.getOrder(0,0);
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

module.exports = ManageAction;