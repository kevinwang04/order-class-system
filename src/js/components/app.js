/**
 * Author kevinwang
 * 2015-12-6
 * APP page
 */


/** @jsx React.DOM */
var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var Entity = require('./app-entity');
var Template = require('./app-template');

var APP = React.createClass({
  render: function () {
    return (
      <Template>
        <RouteHandler/>
     	{}
      </Template>
    );
  }
});




exports.APP = APP;



