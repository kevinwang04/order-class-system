/** @jsx React.DOM */
var React = require('react');
var Login = require('../auth/app-login');
var EditClassAction = require('../../actions/editclass-action.js');
var EditClassStore = require('../../stores/app-editclassStore.js');
var AuthenticationMixin = require('../../mixins/AuthenticationMixin.js');


var AMZ = require('amazeui-react');

var EditClass = React.createClass({
  mixins: [ AuthenticationMixin ],
  getInitialState: function() {
    return {
      classroom:[],
      arrangement: [],
      date: [],
      date_id: null,
    };
  },
  componentDidMount: function() {
    var $this = this;
    EditClassAction.getDate(function(id){
      var date_id = id;
      EditClassAction.getArrangement(date_id);
      $this.setState({
        date_id: date_id
      })
    });
    EditClassStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
      EditClassStore.removeChangeListener(this._onChange);
  },
  _onChange: function() {
    this.setState({
      date: EditClassStore.getAdminDate(),
      arrangement: EditClassStore.getArrangement()
    })
  },
  handleGetArrangement: function(e) {
    var date_id = e.target.value;
    EditClassAction.getArrangement(date_id);
    this.setState({
      date_id: date_id
    })   
  },


  render: function () {
    var Arrangement = this.state.arrangement;
    var Date_id = this.state.date_id;
    var weekinfo = '';
    switch(parseInt(Date_id)){
      case 0:weekinfo = '日';break;
      case 1:weekinfo = '一';break;
      case 2:weekinfo = '二';break;
      case 3:weekinfo = '三';break;
      case 4:weekinfo = '四';break;
      case 5:weekinfo = '五';break;
      case 6:weekinfo = '六';break;
    }
    var DateList = this.state.date.map(function(item,i){
        return <option value={item.id} key={i}>{item.day}</option>
      });
    var RoomHead = this.state.arrangement.map(function(item, elem) {
      return <th><h2 style={{marginBottom:"0px"}}>教室{item.room_num}</h2></th>
    });
    var ArrangeHeadList = Arrangement.map(function(item, elem) {
      return <th>{item.room_num}</th>
    });

    var timetable = [];
    for (var i =0; i < 7; i++){
      timetable[i] = new Array();
      for (var j = 0; j < 7; j++) {
        timetable[i][j] = 0;
      }
    } 
    var room_id = Arrangement.map(function(index, elem) {
      return index.id;
    })

    var timelist = Arrangement.map(function(item, elem) {
      return item.time_infos;
    });
    for (var i = 0; i < 7; i++){
      for(var j = 0; j < 7; j++) {
        if(timetable[i][j] == 'undefined') {
          timetable[i][j] = <button>添加</button>
        }
      }
    }
      for (var i = 0; i < room_id.length; i++) {
        if(timelist[i].length == 0){

        } else {
          for(var j = 0; j < timelist[i].length; j++) {
            var id = timelist[i][j].time.id;
            timetable[i][id-1] = timelist[i][j].content || '空内容';
          }
        } 
      }
    function handleAdd(time_id,classroom_id) {
      var feed = window.prompt("输入用途");
      var data = {
        time_id: time_id,
        classroom_id: classroom_id,
        date_id: Date_id,
        content: feed,
        type: 1
      };
      if(feed) {
        EditClassAction.addArrange(data);            
      } else {
        swal({title: '安排内容不能为空',   text: "", confirmButtonColor: "#ff0000",   timer: 800 });
      }
    }
    function handleEdit(time_id,classroom_id) {
      var feed = window.prompt("输入用途");
      var data = {
        time_id: time_id,
        classroom_id: classroom_id,
        date_id: Date_id,
        content: feed,
        type: 1
      };
      if(feed) {
        EditClassAction.updateArrange(data);            
      } else {
        swal({title: '安排内容不能为空',   text: "", confirmButtonColor: "#ff0000",   timer: 800 });
      } 
    }
    function handleDelete(time_id,classroom_id) {
      var data = {
        time_id: time_id,
        classroom_id: classroom_id,
        date_id: Date_id
      };
      swal({   title: "确定删除?",   
        text: "你将要删除此条课程安排!",   
        type: "warning",   
        showCancelButton: true,   
        confirmButtonColor: "#DD6B55",   
        confirmButtonText: "确认删除",   
        cancelButtonText: "不，我点错了!",   
        closeOnConfirm: false,   
        closeOnCancel: false }, 
        function(isConfirm){   
          if (isConfirm) {     
            swal("删除成功!", "课程安排已删除.", "success");   
            EditClassAction.deleteArrange(data);
          } else {     
            swal("取消", "取消操作 :)", "error");   
          } 
        });
    }
    var ArrangeList0 = timetable.map(function(item, i) {return  <td>{item[0] == 0? <div><h4>没有安排</h4><button className="handle-add btn-success btn" onClick={handleAdd.bind(this,1,i+1)}>添加安排</button></div>: <div><h4>{item[0]}</h4><button className="handle-edit btn-warning btn" onClick={handleEdit.bind(this,1,i+1)}>编辑</button><button className="handle-delete btn btn-danger" onClick={handleDelete.bind(this,1,i+1)}>删除</button></div>}</td>});
    var ArrangeList1 = timetable.map(function(item, i) {return  <td>{item[1] == 0? <div><h4>没有安排</h4><button className="handle-add btn-success btn" onClick={handleAdd.bind(this,2,i+1)}>添加安排</button></div>: <div><h4>{item[1]}</h4><button className="handle-edit btn-warning btn" onClick={handleEdit.bind(this,2,i+1)}>编辑</button><button className="handle-delete btn btn-danger" onClick={handleDelete.bind(this,2,i+1)}>删除</button></div>}</td>});
    var ArrangeList2 = timetable.map(function(item, i) {return  <td>{item[2] == 0 || item[2] == ' '? <div><h4>没有安排</h4><button className="handle-add btn-success btn" onClick={handleAdd.bind(this,3,i+1)}>添加安排</button></div>: <div><h4>{item[2]}</h4><button className="handle-edit btn-warning btn" onClick={handleEdit.bind(this,3,i+1)}>编辑</button><button className="handle-delete btn btn-danger" onClick={handleDelete.bind(this,3,i+1)}>删除</button></div>}</td>});
    var ArrangeList3 = timetable.map(function(item, i) {return  <td>{item[3] == 0? <div><h4>没有安排</h4><button className="handle-add btn-success btn" onClick={handleAdd.bind(this,4,i+1)}>添加安排</button></div>: <div><h4>{item[3]}</h4><button className="handle-edit btn-warning btn" onClick={handleEdit.bind(this,4,i+1)}>编辑</button><button className="handle-delete btn btn-danger" onClick={handleDelete.bind(this,4,i+1)}>删除</button></div>}</td>});
    var ArrangeList4 = timetable.map(function(item, i) {return  <td>{item[4] == 0? <div><h4>没有安排</h4><button className="handle-add btn-success btn" onClick={handleAdd.bind(this,5,i+1)}>添加安排</button></div>: <div><h4>{item[4]}</h4><button className="handle-edit btn-warning btn" onClick={handleEdit.bind(this,5,i+1)}>编辑</button><button className="handle-delete btn btn-danger" onClick={handleDelete.bind(this,5,i+1)}>删除</button></div>}</td>});
    var ArrangeList5 = timetable.map(function(item, i) {return  <td>{item[5] == 0? <div><h4>没有安排</h4><button className="handle-add btn-success btn" onClick={handleAdd.bind(this,6,i+1)}>添加安排</button></div>: <div><h4>{item[5]}</h4><button className="handle-edit btn-warning btn" onClick={handleEdit.bind(this,6,i+1)}>编辑</button><button className="handle-delete btn btn-danger" onClick={handleDelete.bind(this,6,i+1)}>删除</button></div>}</td>});
    var ArrangeList6 = timetable.map(function(item, i) {return  <td>{item[6] == 0? <div><h4>没有安排</h4><button className="handle-add btn-success btn" onClick={handleAdd.bind(this,7,i+1)}>添加安排</button></div>: <div><h4>{item[6]}</h4><button className="handle-edit btn-warning btn" onClick={handleEdit.bind(this,7,i+1)}>编辑</button><button className="handle-delete btn btn-danger" onClick={handleDelete.bind(this,7,i+1)}>删除</button></div>}</td>});

    return (
      
    	<div className="timetable" style={{fontFamily:"'Helvetica Neue', Arial"}}>
        <label>选择日期:</label> 
    		<AMZ.Input type="select" ref='date_ref' style={{width:"150px",margin:"15px"}} onChange={this.handleGetArrangement}>
          {DateList}
        </AMZ.Input>
        <label>星期:</label>
        <span style={{color:"green",marginLeft:"10px"}}>{weekinfo}</span>
        <table className="table table-striped table-hover text-center table-bordered">
        <thead>
          <tr><th>时间段</th>{RoomHead}</tr>
        </thead>
        <tbody>
          <tr><td><h3 style={{marginTop:"30px"}}>8:00 - 9:35</h3></td>{ArrangeList0}</tr>
          <tr><td><h3 style={{marginTop:"30px"}}>9:55 - 11:30</h3></td>{ArrangeList1}</tr>
          <tr><td><h3 style={{marginTop:"30px"}}>13:30 - 15:05</h3></td>{ArrangeList2}</tr>
          <tr><td><h3 style={{marginTop:"30px"}}>15:20 - 16:55</h3></td>{ArrangeList3}</tr>
          <tr><td><h3 style={{marginTop:"30px"}}>17:10 - 18:45</h3></td>{ArrangeList4}</tr>
          <tr><td><h3 style={{marginTop:"30px"}}>19:30 - 21:05</h3></td>{ArrangeList5}</tr>
          <tr><td><h3 style={{marginTop:"30px"}}>21:05以后</h3></td>{ArrangeList6}</tr>
        </tbody>
        </table>
    	</div>
    	);
  }
});

module.exports = EditClass;
