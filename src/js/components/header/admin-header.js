/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var auth = require('../../stores/app-authStore'); // TODO / USE DISPATCHER & ACTIONS
var Login = require('../auth/app-login');
var AppActions = require('../../actions/app-actions.js');
var AuthAction = require('../../actions/app-auth.js');
var AuthStore = require('../../stores/app-authStore.js');
var dashboardStore = require('../../stores/app-dashboardStore.js');
var Link = Router.Link;

var AMZ = require('amazeui-react');


var AdminHeader = React.createClass({
  getInitialState: function () {
    return AuthStore.getState();
  },
  setStateOnAuth: function (loggedIn) {
    this.setState(AuthStore.getState());
  },
  componentWillMount: function () {
    AuthStore.authOnChangeHeader(this.setStateOnAuth);
    //AuthAction.getInfo();

  },
  handleBackTop: function() {
    var timer = null;
    
    timer = setInterval(function(){      
      var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
      var ispeed=Math.floor(-scrollTop/8);
      if(scrollTop==0){
        clearInterval(timer)
      }
      document.documentElement.scrollTop=document.body.scrollTop=scrollTop+ispeed;
    },30);
  },
  
  render: function () {
    var loginOrOut = this.state.loggedIn ?
      <Link to="logout">退出登录</Link> :
      <Link to="login">登录</Link>;
    

    return (
      <div>
        <AMZ.Sticky>
          <AMZ.Button amStyle="primary" block style={{marginLeft: 10}} onClick={this.handleBackTop}>机电楼教室预定系统</AMZ.Button>
        </AMZ.Sticky>
        <ul className="nav nav-tabs">
          <li>{loginOrOut}</li>
          <li><Link to="manage">受理申请</Link></li>
          <li><Link to="editclass">编辑教室</Link></li>
        </ul>
        <br/>
      </div>
    );
  }
});




module.exports = AdminHeader;



