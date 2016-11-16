import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/Paper';

import { Templates } from '../api/templates.js';
const paperTableStyle = {
  minWidth: '50%',
  maxWidth: '70%',
  marginBottom: '20px',
  marginLeft: '300px',
  padding: '8px 8px',
  marginTop: '15px'
}
// template component - represents a single todo item
export default class template extends Component {
  toggleChecked() {
    // Set the checked property to the opposite of its current value
    templates.update(this.props.template._id, {
      $set: { checked: !this.props.template.checked },
    });
  }

  deleteThistemplate() {
    templates.remove(this.props.template._id);
  }

  render() {
    // Give templates a different className when they are checked off,
    // so that we can style them nicely in CSS
    const templateClassName = this.props.template.checked ? 'checked' : '';
    return (
      <Paper id="table" style={paperTableStyle} zDepth={1}>
        <span className="text">{this.props.template.text}</span>
      </Paper>
    );
  }
}
