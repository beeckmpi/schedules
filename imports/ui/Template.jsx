import React, { Component, PropTypes } from 'react';

import { Templates } from '../api/templates.js';

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
      <li className={templateClassName}>
        <button className="delete" onClick={this.deleteThistemplate.bind(this)}>
          &times;
        </button>

        <input
          type="checkbox"
          readOnly
          checked={this.props.template.checked}
          onClick={this.toggleChecked.bind(this)}
        />

        <span className="text">{this.props.template.text}</span>
      </li>
    );
  }
}
