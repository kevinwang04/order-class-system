/** @jsx React.DOM */
var React = require('react');
var Login = require('../auth/app-login');
var DashAction = require('../../actions/dash-action.js');
var AuthStore = require('../../stores/app-authStore.js');
var NeworderStore = require('../../stores/app-neworderStore.js');
var NeworderAction = require('../../actions/neworder-action.js');
var ScheduleList = require('./app-schedulelist');
var AuthenticationMixin = require('../../mixins/AuthenticationMixin.js');

var AMZ = require('amazeui-react');

function getDateFromStore() {
  return NeworderStore.getDate();
}
function getClassroomFromStore() {
  return NeworderStore.getClassroom();
}
function getValidtimeFromStore() {
  return NeworderStore.getValidtime();
}

var Neworder = React.createClass({
  getInitialState: function() {
    return {
      classroom:[],
      time: [],
      date: []
    };
  },
  componentWillMount: function() {
    NeworderAction.getDate();
    NeworderAction.getClassroom();
  },
  componentDidMount: function() {
    this._getValidtime();
    NeworderStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    NeworderStore.removeChangeListener(this._onChange);
  },
  _onChange: function() {
    this.setState({
      date: getDateFromStore(),
      classroom: getClassroomFromStore(),
      time: getValidtimeFromStore()
    });
  },
  _getValidtime: function() {
    var time_id = {
      date_id: this.refs.date_ref.getDOMNode().childNodes[0].value,
      classroom_id: this.refs.classroom_ref.getDOMNode().childNodes[0].value
    };
    NeworderAction.getValidtime(time_id);
  },
  handleShowValidtime: function() {
    this._getValidtime();
  },
  handleSelectDate: function(e) {
    var date = e.target.value;
    this.setState({
      date: date
    });
  },

  handleSelectTime: function(e) {
    var time = e.target.value;
    this.setState({
      time: time
    });
  },
  handleSubmit: function() {
    var $this = this;
    var data = {
      date: this.refs.date_ref.getDOMNode().childNodes[0].selectedOptions[0].innerText,
      classroom_id: this.refs.classroom_ref.getDOMNode().childNodes[0].value,
      time_id: this.refs.time_ref.getDOMNode().childNodes[0].value,
      reason: this.refs.reason_ref.getDOMNode().childNodes[1].value,
    };
    if(data.reason != '' && data.time_id != ''){
      swal({   title: "确定提交?",   
          text: "你将要提交此条教室预订!",   
          type: "warning",   
          showCancelButton: true,   
          confirmButtonColor: "#DD6B55",   
          confirmButtonText: "确认提交",   
          cancelButtonText: "取消!",   
          closeOnConfirm: false,   
          closeOnCancel: true }, 
          function(isConfirm){   
            if (isConfirm) {     
              swal("提交成功!", "预定已提交，等待审核", "success");   
              NeworderAction.addOrder(data);
              $this.refs.reason_ref.getDOMNode().childNodes[1].value = '';
            } else {     
              swal("取消", "取消操作 :)", "error");   
            } 
          });          
        } else {
          swal({title: "信息填写不完整",   text: "", confirmButtonColor: "#ff0000",   timer: 800 });
        }
  },
  
   render: function() {
    var Times = this.state.time;
    var ClassRoom = this.state.classroom;
    var Dates = this.state.date;

    var ClassRoomList = ClassRoom.map(function(item,i){
        return <option value={item.id} key={i}>{item.room_num}</option>
    });
    var DateList = Dates.map(function(item,i){
        return <option value={item.id} key={i}>{item.day}</option>
    });
    var TimeList = Times.map(function(item,i){
        return <option value={item.id} key={i}>{item.time_info}</option>
    });
    return (
    <div className="app-neworder" style={{width:"1000px",margin:"0 auto"}}>
      <label>选择日期:</label>
      <AMZ.Input type="select" ref='date_ref' style={{width:"150px",margin:"15px"}} onChange={this.handleShowValidtime}>
        {DateList}
      </AMZ.Input>

      <label>选择教室:</label>
      <AMZ.Input type="select" ref='classroom_ref' style={{width:"150px",margin:"15px"}} onChange={this.handleShowValidtime}>
        {ClassRoomList}
      </AMZ.Input>

      <label>选择时间:</label>
      <AMZ.Input type="select" ref='time_ref' style={{width:"150px",margin:"15px"}} >
        {TimeList}
      </AMZ.Input>
      

      <AMZ.Input type="textarea" ref='reason_ref' label="事由说明:" style={{width:"400px",margin:"30px"}} placeholder="填写事由" />

      <AMZ.Input type="submit" value="提交" standalone amStyle="primary" onClick={this.handleSubmit} />
    </div>

    )
  }
});

module.exports = Neworder;
