/** @jsx React.DOM */
var React = require('react');
var Login = require('../auth/app-login');
var AuthStore = require('../../stores/app-authStore.js');
var AuthenticationMixin = require('../../mixins/AuthenticationMixin.js');

var AMZ = require('amazeui-react');

var About = React.createClass({
  mixins: [ AuthenticationMixin ],
  render: function () {
    return (
    	<div>
            <AMZ.Panel header="关于预约系统的操作说明" amStyle="secondary">
              <p><h4 className="text-info"><span style={{marginRight:"5px"}} className="glyphicon glyphicon-saved"></span>通过本网站，可以预约近一周时间的无课教室。</h4>
                <h4 className="text-info"><span style={{marginRight:"5px"}} className="glyphicon glyphicon-saved"></span>如果某个教室没有某个时间段的空闲时间，则无法预约。</h4>
                <h4 className="text-info"><span style={{marginRight:"5px"}} className="glyphicon glyphicon-saved"></span>预约如果通过之后，请使用者把二维码下载下来，让机电楼管理钥匙的阿姨扫描一下即可。</h4>
                <h4 className="text-danger"><span style={{marginRight:"5px"}} className="glyphicon glyphicon-volume-up"></span>注意，二维码只能使用一次。如果已经提交的借教室请求或者已通过但未使用的请求累积超过2条，账号则无法借教室。</h4>
                </p>
            </AMZ.Panel>    		
    	</div>
    	);
  }
});

module.exports = About;
