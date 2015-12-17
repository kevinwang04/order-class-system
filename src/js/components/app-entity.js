/** @jsx React.DOM */
var React = require('react');
var EntityActions = require('../actions/app-entity');
var EntityStore = require('../stores/app-entityStore');


var Entity = React.createClass({  
    getInitialState: function() {
        return { 'entityList': EntityStore.getState() };
    },
    componentDidMount: function() {
        EntityStore.addChangeListener(this._onChange);
        this.getEntityDataIfNeeded(this.props);
    },
    componentWillUnmount: function() {
        EntityStore.removeChangeListener(this._onChange);
    },
    componentWillReceiveProps: function(nextProps) {
        this.getEntityDataIfNeeded(nextProps);
    },
    getEntityDataIfNeeded: function(props) {
        var entityList = EntityStore.getState();
        if(entityList.length===0) {
            entity_id = "1" // this just example .. you can use this.props.entity_id
            EntityActions.getEntityData(entity_id);
        }
    },
    _onChange: function() {this.setState(EntityStore.getState());},
    render: function() {

        return (
            <div className="well"> This is Entity Component Uses Proper Flux Architecture for Getting Async Web Api Calls (check console log for more details) </div>
            )
    }
});


module.exports = Entity;