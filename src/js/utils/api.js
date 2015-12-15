var AppConstants = require('../constants/app-constants');
var AppDispatcher = require('../dispatchers/app-dispatcher');

var $ = require('jquery');

// 
// TODO - structure AppConstants for API as for example: http://www.code-experience.com/async-requests-with-react-js-and-flux-revisited/
// 
// console.log("********** utils/api.js init");

function ajaxPost(url,data,cb) {
    $.ajax({
            url: url,
            type: 'POST',
            dataType: 'JSONP',
            jsonp: 'callback',
            data: data,
            success: function(data, textStatus){
                    if(data.code === 0) {
                        cb(data);
                       /* if (data.data.type === 0) {
                            //location.pathname = "/code/dist/html/apps/scce.kalen25115.cn/user/user-manage.html";
                            AppDispatcher.handleViewAction({'actionType': AppConstants.AUTH_LOG_IN,'code':0})
                        }else if(data.data.type === 1) { 
                            //location.pathname = "/code/dist/html/apps/scce.kalen25115.cn/user/user-manage.html";
                            AppDispatcher.handleViewAction({'actionType': AppConstants.AUTH_LOG_IN,'code':1})
                        }*/
                    }else{
                        swal({title: data.msg,   text: "", confirmButtonColor: "#ff0000",   timer: 800 });
                    }
                },
            complete: function(XMLHttpRequest, textStatus){
                
            },
            error:function(e) {
                console.log(e);
                swal({title: '网络失败',   text: "", confirmButtonColor: "#ff0000",   timer: 800 });
            }
        });
}

var API_URL = '/assets/api.json';
var TIMEOUT = 10000;

var _pendingRequests = {};


function abortPendingRequests(key) {
    if (_pendingRequests[key]) {
        _pendingRequests[key]._callback = function(){};
        _pendingRequests[key].abort();
        _pendingRequests[key] = null;
    }
}

function token() {
    return "test"; // TODO authentication with using AuthStore.getState().token;
}

function makeUrl(part) {
    return API_URL + part;
}

function dispatch(key, response, params) {
    var payload = {actionType: key, response: response};
    if (params) {
        payload.queryParams = params;
    }
    AppDispatcher.handleRequestAction(payload);
}

// return successful response, else return request Constants
function makeDigestFun(key, params) {
    return function (err, res) {
        if (err && err.timeout === TIMEOUT) {
            dispatch(key, AppConstants.TIMEOUT, params);
        } else if (res.status === 400) {
            UserActions.logout();
        } else if (!res.ok) {
            dispatch(key, AppConstants.ERROR, params);
        } else {
            dispatch(key, res, params);
        }
    };
}

// a get request with an authtoken param
function get(url) {
    return request
        .get(url)
        .timeout(TIMEOUT)
        .query({authtoken: token()});
}

/**
 * a post request
 * @type {Object}
 */
function post(url,params) {
    return request
      .post(url)
      .use(jsonp)
      .send(params)
      .set('X-API-Key', 'foobar')
      .set('Accept', 'application/json')
      .end(function(err, res){
        return res;
        debugger;
        // Calling the end function will send the request 
      })
}
var Api = {
    getEntityData: function(entityId) {
        var url = makeUrl("?test="+entityId);
        var key = AppConstants.GET_ENTITY_DATA;
        var params = {entityId: entityId};
        abortPendingRequests(key);
        dispatch(key, AppConstants.PENDING, params);
        _pendingRequests[key] = get(url).end(
            makeDigestFun(key, params)
        );
    },
    ajaxPost: function(url,data,cb) {
    $.ajax({
            url: 'http://localhost:90'+url,
            dataType: 'JSONP',
            jsonp: 'callback',
            /*url: url,
            type: 'POST',
            dataType: 'JSON',*/
            data: data,
            success: function(data, textStatus){
                    cb(data);
                },
            complete: function(XMLHttpRequest, textStatus){
                
            },
            error:function(e) {
                console.log(e);
                swal({title: '网络失败',   text: "", confirmButtonColor: "#ff0000",   timer: 800 });
            }
        });
}
};

module.exports = Api;


