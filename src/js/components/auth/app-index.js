/**
 * Author kevinwang
 * 2015-12-6
 * index page
 */


/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router');
var AuthStore = require('../../stores/app-authStore.js');
var FbOauthActions = require('../../actions/app-fboauth');

var AMZ = require('amazeui-react');

var Index = React.createClass({
  //mixins: [ Router.Navigation ],

  statics: {
    attemptedTransition: null
  },

  getInitialState: function () {
    return {
      error: false
    };
  },
  componentDidMount: function() {
    AuthStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    AuthStore.removeChangeListener(this._onChange);
  },
  handleFBLogin: function (event) {
    FbOauthActions.startOauth();
  },
  _onChange: function() {
    if(AuthStore.getState().loggedIn){
      this.replaceWith('/dashboard'); // replaceWith comes from Router (included in mixins)
    }
  },
  render: function () {
    return (
      <div>
      
      <p style={{textAlign:"center",marginTop:"80px"}}>
        <AMZ.Badge amStyle="primary" className="am-text-sm">欢</AMZ.Badge>
        <AMZ.Badge amStyle="secondary" className="am-text-default">迎</AMZ.Badge>
        <AMZ.Badge amStyle="success" className="am-text-lg">使</AMZ.Badge>
        <AMZ.Badge amStyle="warning" className="am-text-xl">用</AMZ.Badge>
      </p>
      </div>
    );
  }
});

module.exports = Index;

