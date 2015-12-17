/**
 * Author kevinwang
 * 2015-12-6
 * auth action
 */

var AppConstants = require('../constants/app-constants');
var AppDispatcher = require('../dispatchers/app-dispatcher');

var Api = require('../utils/api.js');


var AuthActions = {
	/**
	 * 登录验证
	 * @param  {[type]} email [description]
	 * @param  {[type]} pass  [description]
	 * @return {[type]}       [description]
	 */
    startAuth: function(email, pass) {
	    var data = {
	    	'uname': email, 
	    	'passwd': pass
	    };
        Api.ajaxPost('/api.php/login',data,function(data){
            if(data.code === 0) {
                if (data.data.type === 0) {
                	AuthActions.getUserinfo();
                    AppDispatcher.handleViewAction({'actionType': AppConstants.AUTH_LOG_IN,'code':0})
                }else if(data.data.type === 1) { 
                    AppDispatcher.handleViewAction({'actionType': AppConstants.AUTH_LOG_IN,'code':1})
                }
            }else{
                swal({title: data.msg,   text: "", confirmButtonColor: "#ff0000",   timer: 800 });
            }
        })
    },
    /**
     * 获取用户信息
     * @return {[type]} [description]
     */
	getUserinfo:function(){
        var data = {};
        Api.ajaxPost('/api.php/user/get_info',data,function(data){
            if(data.code === 0) {
                AppDispatcher.handleViewAction({
                  actionType: AppConstants.GET_USER_INFO,
                  data: data
                })
            }else{
            }
        })
	}

}

module.exports = AuthActions;