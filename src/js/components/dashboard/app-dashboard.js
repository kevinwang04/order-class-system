/**
 * Author kevinwang
 * 2015-12-6
 * user dashboard page
 */


/** @jsx React.DOM */
var React = require('react');
var Login = require('../auth/app-login');
var AuthStore = require('../../stores/app-authStore.js');
var DashboardStore = require('../../stores/app-dashboardStore.js');
var DashAction = require('../../actions/dash-action.js');
var ScheduleList = require('./app-schedulelist');
var NewOrder = require('./app-neworder');
var AuthenticationMixin = require('../../mixins/AuthenticationMixin.js');


var Dashboard = React.createClass({


  mixins: [ AuthenticationMixin ],
  render: function () {
    var token = AuthStore.authGetToken();
      return (
        <div>
          <h1>增加预约</h1>
          <NewOrder />
          <h1>预约记录</h1>
          <ScheduleList />
        </div>
      );
  }

});

module.exports = Dashboard;
