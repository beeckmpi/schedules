import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import { browserHistory } from 'react-router';
import Store from '../../store/store';

import { Templates } from '../../api/templates';
const paperTableStyle = {
  minWidth: '50%',
  maxWidth: '70%',
  marginBottom: '20px',
  marginLeft: '0px',
  padding: '8px 8px',
  marginTop: '15px'
}
// template component - represents a single todo item
export default class template extends Component {
  loadUrl(){
    browserHistory.push('/template/'+this.props.template._id);
    Store.dispatch({type: 'HIDE_DOCK'});
  }

  deleteThistemplate() {
    templates.remove(this.props.template._id);
  }

  render() {
    // Give templates a different className when they are checked off,
    // so that we can style them nicely in CSS
    const templateClassName = this.props.template.checked ? 'checked' : '';
    return (
      <Paper id="table" style={paperTableStyle} zDepth={1} onClick={this.loadUrl.bind(this)}>
        <span className="text">{this.props.template.templateTitle} ({this.props.template.templateTableHeader})</span>
      </Paper>
    );
  }
}
