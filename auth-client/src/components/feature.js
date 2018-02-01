import React, {Component} from 'react';
import * as actions from '../actions';
import {connect} from 'react-redux';


class Feature extends Component {

  componentWillMount() {
    this.props.fetchMessage();
  }


  render() {
    return (<div><h1>
      {this.props.message}
    </h1></div>);
  }
}

function mapStateToProps(state) {
  return {message: state.auth.message};
}

export default connect(mapStateToProps, actions)(Feature);