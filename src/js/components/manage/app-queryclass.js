/** @jsx React.DOM */
var React = require('react');
var Login = require('../auth/app-login');
var AuthStore = require('../../stores/app-authStore.js');
var AuthenticationMixin = require('../../mixins/AuthenticationMixin.js');


var About = React.createClass({
  mixins: [ AuthenticationMixin ],
  render: function () {
    return (
    	<div>
    		<h1>关于预约系统的操作说明</h1>
    		<p>Fusce egestas elit eget lorem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed aliquam, nisi quis porttitor congue, elit erat euismod orci, ac placerat dolor lectus quis orci. Suspendisse potenti.

Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce id purus. Aliquam lobortis. Duis lobortis massa imperdiet quam.

Aenean vulputate eleifend tellus. Curabitur suscipit suscipit tellus. Nunc sed turpis.

Donec vitae orci sed dolor rutrum auctor.. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo.
    		</p>
    	</div>
    	);
  }
});

module.exports = About;
