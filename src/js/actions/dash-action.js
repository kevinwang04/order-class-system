/**
 * Author kevinwang
 * 2015-12-6
 * order-list action
 */


var AppConstants = require('../constants/app-constants');
var AppDispatcher = require('../dispatchers/app-dispatcher');

var Api = require('../utils/api.js');



var DashActions = {
    /**
     * 获取用户
     * @param  {[int]} offset [控制预订列表个数显示为offset后]
     * @return {[type]}        [description]
     */
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
    },
    /**
     * 取消预订
     * @param  {[int]} order_id [预订ID]
     * @return {[type]}          [description]
     */
    cancelOrder: function(order_id) {
        var data = order_id;
        Api.ajaxPost('/api.php/user/cancel_order',data,function(data){
            if (data.msg == "你还没有登陆") {
                location.pathname = "/";
            } else if (data.code == 0) {
                swal({title: '已取消预订！',   text: "", confirmButtonColor: "#ff0000",   timer: 800 });
                DashActions.getOrder(0);
            } else {
                swal({title: data.msg,   text: "", confirmButtonColor: "#ff0000",   timer: 800 });                           
            };
        })
    }

}

module.exports = DashActions;