/**
 * Author kevinwang
 * 2015-12-6
 * login-or-out judge
 */


/** @jsx React.DOM */
var Login = require('../components/auth/app-login');
var AuthStore = require('../stores/app-authStore.js');

var AuthenticationMixin = {
	  statics: {
	    willTransitionTo: function (transition) {
	      if (!AuthStore.getState().loggedIn) {
	        Login.attemptedTransition = transition;
	        transition.redirect('/login');
	        swal({title: '请先登录！',   text: "", confirmButtonColor: "#ff0000",   timer: 800 });
	      }
	    }
	  }
	}


module.exports = AuthenticationMixin;