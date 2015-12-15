var AppConstants = require('../constants/app-constants');
var AppDispatcher = require('../dispatchers/app-dispatcher');

var Api = require('../utils/api.js');

//bianle!

var AuthActions = {
    startAuth: function(email, pass) {
	    
	    var data = {
	    	'uname': email, 
	    	'passwd': pass
	    };
        Api.ajaxPost('/api.php/login',data,function(data){
            if(data.code === 0) {
                if (data.data.type === 0) {
                    //location.pathname = "/code/dist/html/apps/scce.kalen25115.cn/user/user-manage.html";
                    AppDispatcher.handleViewAction({'actionType': AppConstants.AUTH_LOG_IN,'code':0})
                }else if(data.data.type === 1) { 
                    //location.pathname = "/code/dist/html/apps/scce.kalen25115.cn/user/user-manage.html";
                    AppDispatcher.handleViewAction({'actionType': AppConstants.AUTH_LOG_IN,'code':1})
                }
            }else{
                swal({title: data.msg,   text: "", confirmButtonColor: "#ff0000",   timer: 800 });
            }
        })
	    /*$.ajax({
			url: 'http://localhost:90/api.php/login',
			type: 'POST',
			dataType: 'JSONP',
            jsonp: 'callback',
			data: data,
			success: function(data, textStatus){
                    if(data.code === 0) {
                        if (data.data.type === 0) {
                        	//location.pathname = "/code/dist/html/apps/scce.kalen25115.cn/user/user-manage.html";
                        	AppDispatcher.handleViewAction({'actionType': AppConstants.AUTH_LOG_IN,'code':0})
                        }else if(data.data.type === 1) { 
                        	//location.pathname = "/code/dist/html/apps/scce.kalen25115.cn/user/user-manage.html";
                        	AppDispatcher.handleViewAction({'actionType': AppConstants.AUTH_LOG_IN,'code':1})
                        }
                    }else{
                    	swal({title: data.msg,   text: "", confirmButtonColor: "#ff0000",   timer: 800 });
                    }
                },
            complete: function(XMLHttpRequest, textStatus){
                
            },
            error:function(e) {
                console.log(e);
            	swal({title: '登录出错，请检查网络',   text: "", confirmButtonColor: "#ff0000",   timer: 800 });
            }
		});*/
	    //AppDispatcher.handleViewAction(payload)
    },
	getUserinfo:function(){
        var data = {};
        Api.ajaxPost('/api.php/user/get_info',data,function(data){
            if(data.code === 0) {
                AppDispatcher.handleViewAction({
                  actionType: AppConstants.GET_USER_INFO,
                  data: data
                })
            }else{
                //swal({title: data.msg,   text: "", confirmButtonColor: "#ff0000",   timer: 800 });
            }
        })
		/*$.ajax({
			url: 'http://localhost:90/api.php/user/get_info',
			type: 'POST',
			dataType: 'JSONP',
            jsonp: 'callback',   
			success: function(data, textStatus){
                    if(data.code === 0) {
                        AppDispatcher.handleViewAction({
					      actionType: AppConstants.GET_USER_INFO,
                          data: data
					    })
                    }else{
                        //swal({title: data.msg,   text: "", confirmButtonColor: "#ff0000",   timer: 800 });
                    }
                },
            complete: function(XMLHttpRequest, textStatus){
                
            },
            error:function(e) {
            	console.log(e);
            }
		});*/
	  	
	}

}

module.exports = AuthActions;