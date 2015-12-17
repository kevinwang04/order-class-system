/**
 * Author kevinwang
 * 2015-12-6
 * login page
 */



/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router');
var AuthStore = require('../../stores/app-authStore.js');
var AuthAction = require('../../actions/app-auth.js');

var AMZ = require('amazeui-react');

const GridList = require('material-ui/lib/grid-list/grid-list');
const GridTile = require('material-ui/lib/grid-list/grid-tile');
const TextField = require('material-ui/lib/text-field');
const RaisedButton = require('material-ui/lib/raised-button');

var person = AuthStore.authGetPerson()

var Login = React.createClass({
  contextTypes: {
    router: React.PropTypes.func.isRequired
  },

  statics: {
    attemptedTransition: null
  },

  getInitialState: function () {
    return AuthStore.getState();
  },
  componentDidMount: function() {
      AuthAction.getUserinfo();
      AuthStore.addChangeListener(this._onChange);
  },
  componentDidUpdate: function() {
    if(this.state.auth_token!==null) {
      if(Login.attemptedTransition) {
        if (person == 0){
          this.context.router.replaceWith('/dashboard');
        } else if (person == 1) {
          this.context.router.replaceWith('/manage');
        };
        //Login.attemptedTransition.retry();
      } else if (person == 0){
          this.context.router.replaceWith('/dashboard');
        } else if (person == 1) {
          this.context.router.replaceWith('/manage');
        };
    }
  },
  componentWillUnmount: function() {
      AuthStore.removeChangeListener(this._onChange);
  },
  handleSubmit: function (event) {
    event.preventDefault();
    var email = this.refs.email.getDOMNode().childNodes[0].value;
    var pass = this.refs.pass.getDOMNode().childNodes[0].value;
    AuthAction.startAuth(email, pass);
  },
  _onChange: function() {
    this.setState(AuthStore.getState());
    person = AuthStore.authGetPerson();
  },
  render: function () {
    var errors = this.state.login_error === true ? <p>Bad login information</p> : '';
    return (
      <div>
      <AMZ.Form style={{width:"250px",margin:"0 auto"}}>
        <AMZ.Input placeholder="用户名" icon="user" ref="email"/>
        {'\u00a0'}
        <AMZ.Input placeholder="密码" icon="lock" ref="pass" type="password"/>
        {'\u00a0'}
        <AMZ.Input type="submit" amStyle="primary" value="登录" style={{margin:"20px 80px"}} standalone 
        onClick={this.handleSubmit}/>
      </AMZ.Form>
      </div>
    );
  }
});

module.exports = Login;