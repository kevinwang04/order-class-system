/**
 * Author kevinwang
 * 2015-12-6
 * footer page
 */


/** @jsx React.DOM */
var React = require('react');

var AMZ = require('amazeui-react');


var Footer = React.createClass({

  render: function () {
    return (
      <footer style={{textAlign:"center",bottom:"15px",marginTop:"200px"}}>
          Author <a href="https://github.com/kevinwang04" target="blank" style={{color:"green"}}>Kevin Wang</a> && <a href="https://github.com/nladuo" target="blank" style={{color:"green"}}>Kalen Blue</a> Proudly using <a href="http://facebook.github.io/react/index.html" style={{marginRight:"5px"}}>React.js</a> 
            || <span style={{color:"black"}}>806</span> Lab
      </footer>
      );
  }
});

module.exports = Footer;
