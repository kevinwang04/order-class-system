/** @jsx React.DOM */
var React = require('react');
var AuthStore = require('../stores/app-authStore.js');
var AppActions = require('../actions/app-actions.js');
var Header = require('./header/app-header');
var Footer = require('./footer/app-footer');
var AdminHeader = require('./header/admin-header');
const RaisedButton = require('material-ui/lib/raised-button');


var Template = 
    React.createClass({
        getInitialState:function() {
          return {
            person: AuthStore.authGetPerson()
          }
        },
        componentWillMount: function() {
          AuthStore.addChangeListener(this._onChange);
        },
        componentWillUnmount: function() {
          ManageStore.removeChangeListener(this._onChange);
        },
        _onChange: function() {
          this.setState({
            person: AuthStore.authGetPerson()
          })
        },
        render:function(){

          var person = this.state.person;
          if (person == 0 ) {
            return (
              <div className="container">
                    <Header />
                    {this.props.children}
                   <br/><br/>
                    <Footer />
              </div>
              )

          } else if (person == 1) {
            return (
              <div className="container">
                    <AdminHeader />
                    {this.props.children}
                   <br/><br/>
                   <Footer />
              </div>
              )
          } else {
            return (
              <div className="container">
                    <Header />
                    {this.props.children}
                   <br/><br/>
                    <Footer />
              </div>
              )
          }
            
        }
          
	});



module.exports = Template;
