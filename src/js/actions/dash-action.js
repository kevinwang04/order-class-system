var AppConstants = require('../constants/app-constants');
var AppDispatcher = require('../dispatchers/app-dispatcher');

var Api = require('../utils/api.js');



var DashActions = {
    getOrder: function(offset) {
        var data = {
            'offset':offset
        }
	    Api.ajaxPost('/api.php/user/get_order',data,function(data){
            if (data.msg == "你还没有登陆") {
                location.pathname = "/";
            } else if (data.code == 0) {
                AppDispatcher.handleViewAction({'actionType': AppConstants.GET_USER_ORDER,'data':data.data.infos})
            };
        })
	    /*$.ajax({
			url: 'http://localhost:90/api.php/user/get_order',
			type: 'POST',
			dataType: 'JSONP',
            jsonp: 'callback',
            data: {
                'offset':offset
            },
			success: function(data, textStatus){
                        if (data.msg == "你还没有登陆") {
                            location.pathname = "/";
                        } else if (data.code == 0) {
                            AppDispatcher.handleViewAction({'actionType': AppConstants.GET_USER_ORDER,'data':data.data.infos})
                        };
                        //swal({title: data.msg,   text: "", confirmButtonColor: "#ff0000",   timer: 800 });
                },
            complete: function(XMLHttpRequest, textStatus){
                
            },
            error:function(e) {
            	console.log(e);
            }
		});*/
	    //AppDispatcher.handleViewAction(payload)
    },
    cancelOrder: function(order_id) {
        var data = order_id;
        Api.ajaxPost('/api.php/user/cancel_order',data,function(data){
            if (data.msg == "你还没有登陆") {
                location.pathname = "/";
            } else if (data.code == 0) {
                swal({title: '已取消预订！',   text: "", confirmButtonColor: "#ff0000",   timer: 800 });
                DashActions.getOrder(0);
                //AppDispatcher.handleViewAction({'actionType': AppConstants.GET_USER_ORDER,'data':data.data.infos})
            } else {
                swal({title: data.msg,   text: "", confirmButtonColor: "#ff0000",   timer: 800 });                           
            };
        })
        /*$.ajax({
            url: 'http://localhost:90/api.php/user/cancel_order',
            type: 'POST',
            dataType: 'JSONP',
            jsonp: 'callback',
            data: order_id,
            success: function(data, textStatus){
                        if (data.msg == "你还没有登陆") {
                            location.pathname = "/";
                        } else if (data.code == 0) {
                            swal({title: '已取消预订！',   text: "", confirmButtonColor: "#ff0000",   timer: 800 });
                            DashActions.getOrder(0);
                            //AppDispatcher.handleViewAction({'actionType': AppConstants.GET_USER_ORDER,'data':data.data.infos})
                        } else {
                            swal({title: data.msg,   text: "", confirmButtonColor: "#ff0000",   timer: 800 });                           
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

module.exports = DashActions;