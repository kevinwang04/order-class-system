/**
 * Author kevinwang
 * 2015-12-6
 * user-header page
 */


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

var Header = React.createClass({
  getInitialState: function () {
    return {
      auth: AuthStore.getState(),
      userInfo: AuthStore.getUserInfo()
    }
  },
  setStateOnAuth: function (loggedIn) {
    this.setState(AuthStore.getState());
  },
  componentWillMount: function () {
    AuthStore.authOnChangeHeader(this.setStateOnAuth);
    this.state.auth.loggedIn ? AuthAction.getUserinfo() : ''
  },
  componentDidMount: function() {

    AuthStore.addChangeListener(this._onChange)
  },
  componentWillUnmount: function() {
    AuthStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({
      auth: AuthStore.getState(),
      userInfo: AuthStore.getUserInfo()
    })
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

    var info = this.state.userInfo;
    var loginOrOut = this.state.auth.loggedIn ?
      <Link to="logout">退出登录</Link> :
      <Link to="login">登录</Link>;
    var UserInfo = this.state.auth.loggedIn ?
      <li style={{float:"right"}}><span>你好:</span><span style={{color:"green",marginLeft:"5px"}}>{info.name}</span></li> : ''
      
    

    return (
      <div>
        <AMZ.Sticky>
          <AMZ.Button amStyle="primary" block style={{marginLeft: 10}} onClick={this.handleBackTop}>机电楼教室预定系统</AMZ.Button>
        </AMZ.Sticky>
        <ul className="nav nav-tabs">
          <li>{loginOrOut}</li>
          <li><Link to="about">关于</Link></li>
          <li><Link to="dashboard">管理预约</Link></li>
          {UserInfo}
        </ul>
        <br/>
      </div>
    );
  }
});




module.exports = Header;



