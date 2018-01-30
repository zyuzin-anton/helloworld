import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import PropTypes from 'prop-types';

import {initGantt} from "../action/actions";

class Gantt extends Component {
  componentDidMount() {
    gantt.init(this.ganttContainer);
    const {dispatch} = this.props;
    dispatch(initGantt());
  }

  render() {
    if(this.props.errors) {
        return (
            <div>Gantt Error!!!</div>
        );
    }
    if(this.props.tasks) {
        gantt.parse(this.props.tasks);
    }
    return (
        <div className="gantt-container">
            <div
                ref={(input) => { this.ganttContainer = input }}
                style={{width: '100%', height: '100%'}}
            ></div>
        </div>
    );
  }
}

Gantt.propTypes = {
  tasks : PropTypes.object,
  errors: PropTypes.bool,
  dispatch: PropTypes.func
};

function mapStateToProps(state) {
  const { tasks, errors } = state.processGantt;
  return {
    tasks,
    errors
  };
}

export default connect(mapStateToProps)(Gantt);