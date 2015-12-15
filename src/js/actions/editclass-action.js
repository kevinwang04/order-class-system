var AppConstants = require('../constants/app-constants');
var AppDispatcher = require('../dispatchers/app-dispatcher');

var Api = require('../utils/api.js');



var EditClass = {
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
	    
	    /*$.ajax({
			url: 'http://localhost:90/api.php/admin/get_date',
			type: 'POST',
			dataType: 'JSONP',
            jsonp: 'callback',
			success: function(data, textStatus){
                        if (data.msg == "你还没有登陆") {
                            location.pathname = "/";
                        } else if (data.code == 0) {
                            AppDispatcher.handleViewAction({'actionType': AppConstants.GET_ADMIN_DATE,'data':data.data})
                            cb(data.data[0].id);
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
        /*$.ajax({
            url: 'http://localhost:90/api.php/admin/get_arrangement',
            type: 'POST',
            dataType: 'JSONP',
            jsonp: 'callback',
            data: {date_id:date_id},
            success: function(data, textStatus){
                        if (data.msg == "你还没有登陆") {
                            location.pathname = "/";
                        } else if (data.code == 0) {
                            AppDispatcher.handleViewAction({'actionType': AppConstants.GET_ARRANGEMENT,'data':data.data})
                            
                        };

                },
            complete: function(XMLHttpRequest, textStatus){
                
            },
            error:function(e) {
                console.log(e);
            }
        });*/
    },
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
        /*$.ajax({
            url: 'http://localhost:90/api.php/admin/add_arrangement',
            type: 'POST',
            dataType: 'JSONP',
            jsonp: 'callback',
            data: data,
            success: function(res, textStatus){
                        if (res.msg == "你还没有登陆") {
                            location.pathname = "/";
                        } else if (res.code == 0) {
                            AppDispatcher.handleViewAction({'actionType': AppConstants.ADD_ARRANGEMENT,'data':res.data})
                            EditClass.getArrangement(data.date_id);
                            swal({title: "添加成功！",   text: "", confirmButtonColor: "green",   timer: 800 });
                        } else {
                            alert(res.msg);
                        }

                },
            complete: function(XMLHttpRequest, textStatus){
                
            },
            error:function(e) {
                console.log(e);
            }
        });*/
    },
    updateArrange: function(data) {
        var date_id = data.date_id;
        Api.ajaxPost('/api.php/admin/update_arrangement',data,function(data){
            if (data.msg == "你还没有登陆") {
                location.pathname = "/";
            } else if (data.code == 0) {
                swal({title: "修改成功！",   text: "", confirmButtonColor: "green",   timer: 800 });                            
                //AppDispatcher.handleViewAction({'actionType': AppConstants.ADD_ARRANGEMENT,'data':res.data})
                EditClass.getArrangement(date_id);
            };
        })
        /*$.ajax({
            url: 'http://localhost:90/api.php/admin/update_arrangement',
            type: 'POST',
            dataType: 'JSONP',
            jsonp: 'callback',
            data: data,
            success: function(res, textStatus){
                        if (res.msg == "你还没有登陆") {
                            location.pathname = "/";
                        } else if (res.code == 0) {
                            swal({title: "修改成功！",   text: "", confirmButtonColor: "green",   timer: 800 });                            
                            //AppDispatcher.handleViewAction({'actionType': AppConstants.ADD_ARRANGEMENT,'data':res.data})
                            EditClass.getArrangement(data.date_id);
                        };

                },
            complete: function(XMLHttpRequest, textStatus){
                
            },
            error:function(e) {
                console.log(e);
            }
        });*/
    },
    deleteArrange: function(data) {
        var date_id = data.date_id;
        Api.ajaxPost('/api.php/admin/delete_arrangement',data,function(data){
            if (data.msg == "你还没有登陆") {
                location.pathname = "/";
            } else if (data.code == 0) {
                //AppDispatcher.handleViewAction({'actionType': AppConstants.ADD_ARRANGEMENT,'data':res.data})
                EditClass.getArrangement(date_id);
            };
        })
        /*$.ajax({
            url: 'http://localhost:90/api.php/admin/delete_arrangement',
            type: 'POST',
            dataType: 'JSONP',
            jsonp: 'callback',
            data: data,
            success: function(res, textStatus){
                        if (res.msg == "你还没有登陆") {
                            location.pathname = "/";
                        } else if (res.code == 0) {
                            //AppDispatcher.handleViewAction({'actionType': AppConstants.ADD_ARRANGEMENT,'data':res.data})
                            EditClass.getArrangement(data.date_id);
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

module.exports = EditClass;