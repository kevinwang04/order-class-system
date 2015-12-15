/** @jsx React.DOM */
var React = require('react');
var AuthStore = require('../../stores/app-authStore.js');

var AMZ = require('amazeui-react');

var Logout = React.createClass({
  componentDidMount: function () {
    AuthStore.authLogout();
  },

  render: function () {
    return(
    	<div>
    	
    	<p style={{textAlign:"center"}}>
    		<AMZ.Badge amStyle="primary" className="am-text-sm">谢</AMZ.Badge>
		    <AMZ.Badge amStyle="secondary" className="am-text-default">谢</AMZ.Badge>
		    <AMZ.Badge amStyle="success" className="am-text-lg">使</AMZ.Badge>
		    <AMZ.Badge amStyle="warning" className="am-text-xl">用</AMZ.Badge>
    	</p>
    	<p style={{textAlign:"center"}}>如有问题或建议，请发送<a href="mailto:kavinwang@gmail.com" style={{marginLeft:"10px"}}>反馈</a></p>
    	</div>
    ) 
  }
});


module.exports = Logout;