/**
 * Author kevinwang
 * 2015-12-6
 * orderList page
 */


/** @jsx React.DOM */
var React = require('react');
var Login = require('../auth/app-login');
var AuthStore = require('../../stores/app-authStore.js');
var DashAction = require('../../actions/dash-action.js');
var DashboardStore = require('../../stores/app-dashboardStore.js');




function getStoreOrder() {
  return {
    scheduleList:DashboardStore.getScheduleList()
  }
}

var ScheduleList = React.createClass({
  getInitialState: function() {
    return getStoreOrder();

  },
  componentDidMount: function() {
    
    DashAction.getOrder(0);
    DashboardStore.addChangeListener(this._onChange);
   
  },
  componentWillUnmount: function() {
      DashboardStore.removeChangeListener(this._onChange);
  },
  _onChange: function() {
    this.setState(
      getStoreOrder()
    );
  },
  handleShowCode: function(e,url){
    window.open(url,"_blank");
  },
  handleSort: function(item) {
    var scheduleList = this.state.scheduleList.sort(function (a, b) {
        if (a[item] > b[item]) {
          return 1;
        }
        if (a[item] < b[item]) {
          return -1;
        }
        /// a must be equal to b
        return 0;
      })
    this.setState({
      scheduleList: scheduleList
    })
  },
  render: function () {
    var scheduleListItems = this.state.scheduleList.map(function(item,i){
        var status = '',
            textColor = '';

        switch(parseInt(item.status)) {
          case 0:
          status = '待审核';textColor = 'text-warning';break;
          case 1:
          status = '已通过';textColor = 'text-success';break;
          case 2:
          status = '未通过';textColor = 'text-danger';break;
          case 3:
          status = '已使用';textColor = 'text-info';break;

        };
        function handleCancel(order_id) {
          var data = {
            order_id: order_id
          }
          swal({   title: "确定删除?",   
          text: "你将要删除此条预订!",   
          type: "warning",   
          showCancelButton: true,   
          confirmButtonColor: "#DD6B55",   
          confirmButtonText: "确认删除",   
          cancelButtonText: "不，我点错了!",   
          closeOnConfirm: false,   
          closeOnCancel: true }, 
          function(isConfirm){   
            if (isConfirm) {     
              swal("删除成功!", "预定已删除", "success");   
              DashAction.cancelOrder(data);
            } else {     
              swal("取消", "取消操作 :)", "error");   
            } 
          });          
        };
        function handleShowFeedback(feedback) {
          swal(feedback || '管理员未填写反馈');    
        };
        if (item.status == 1) {
          return <tr key={i}>
          <td>{item.date}</td>
          <td>{item.time.time_info}</td>
          <td>{item.classroom.room_num}</td>
          <td>{item.reason}</td>
          <td className={textColor}>{status}
          <button type="" target="blank" className="show-qrcode btn-success" onClick={function(){window.open(item.result_url,"_blank")}}>二维码</button>
          <button type="" className="show-qrcode btn-info" onClick={handleShowFeedback.bind(this,item.feedback)}>查看反馈</button>
          </td>
          </tr>
        }else if(item.status == 0){
          return <tr key={i}>
          <td>{item.date}</td>
          <td>{item.time.time_info}</td>
          <td>{item.classroom.room_num}</td>
          <td>{item.reason}</td>
          <td className={textColor}>{status}
          <button type="" className="show-qrcode btn-danger" onClick={handleCancel.bind(this,item.id)}>取消预订</button>
          </td>
          </tr>
        }else if(item.status == 2){
          return <tr key={i}>
          <td>{item.date}</td>
          <td>{item.time.time_info}</td>
          <td>{item.classroom.room_num}</td>
          <td>{item.reason}</td>
          <td className={textColor}>{status}
          <button type="" className="show-qrcode btn-info" onClick={handleShowFeedback.bind(this,item.feedback)}>查看反馈</button>
          </td>
          </tr>
        }else {
          return <tr key={i}>
          <td>{item.date}</td>
          <td>{item.time.time_info}</td>
          <td>{item.classroom.room_num}</td>
          <td>{item.reason}</td>
          <td className={textColor}>{status}</td>
          </tr>
        }
    });
    return (
      <div>
      
        <table className="table table-striped table-hover text-center">
        <thead>
          <tr><th>日期<span className="glyphicon glyphicon-eject" style={{cursor:"pointer",marginLeft:"5px"}} onClick={this.handleSort.bind(this,'date')}></span></th>
          <th>时间</th>
          <th>教室</th>
          <th>原因</th>
          <th>状态<span className="glyphicon glyphicon-eject" style={{cursor:"pointer",marginLeft:"5px"}} onClick={this.handleSort.bind(this,'status')}></span></th></tr>
        </thead>
        <tbody>
        {scheduleListItems}
        </tbody>
        </table>
      </div>
    );
  }
});

module.exports = ScheduleList;