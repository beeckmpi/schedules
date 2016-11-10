import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Columns } from '../api/columns.js';
import Paper from 'material-ui/Paper';
import Delete from 'material-ui/svg-icons/action/delete';
import IconButton from 'material-ui/IconButton';
import {grey400, grey800} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
// template component - represents a single todo item
const styles = {
  customWidth: {
    width: 200,
  },
};
const style = {
  padding: '15px 15px',
  display: 'inline-block',
  width: '100%'
};
const deleteStyle = {
  position: 'absolute',
  right: '10px',
  top: '12px',
  cursor: 'pointer'
}
export default class Column extends Component {
  toggleChecked() {
    // Set the checked property to the opposite of its current value
    columns.update(this.props.column._id, {
      $set: { checked: !this.props.column.checked },
    });
  }
  deleteThisColumn(event) {
    event.preventDefault();
    Columns.remove(this.props.column._id);
  }
  constructor(props) {
    super(props);
    this.optionsState = {value: 'draggable'};
    this.textValue = [this.props.column._id]+'_value';
    this.state = {
      [this.props.column._id]: '',
      [this.textValue]: this.props.column.columnTitle
    }
  }
  handleChange(event) {
    this.setState({[this.textValue]: event.target.value});
    Columns.update(this.props.column._id,{
      $set: {columnTitle: event.target.value}
    });
  }

  handleChangeSelect(event, index, value) {
    this.setState({optionsState: value});
  }
  render() {
    return (
      <Paper zDepth={2} style={style}>
        <div className="ColumnEdit">
          <IconButton tooltip="SVG Icon" style={deleteStyle} onClick={this.deleteThisColumn.bind(this)}>
            <Delete color={grey400} hoverColor={grey800} />
          </IconButton>
          <div className="formInput input-field">
            <TextField floatingLabelText="Column Title" hintText="Column Title" id={this.props.column._id} value={this.state[this.textValue]} onChange={this.handleChange.bind(this)} />
          </div>
        </div>
          <div className="input-field">
            <select name="typeColumn" onChange={this.handleChangeSelect}>
              <option value="draggable">Draggable</option>
              <option value="linkedDraggable">Linked Draggable</option>
              <option value="fixedValue">Fixed value</option>
              <option value="inputChbx">Input (checkbox)</option>
              <option value="inputNum">Input (numeric)</option>
              <option value="inputText">Input (text)</option>
              <option value="select">Select</option>
              <option value="splitColumn">Split Column</option>
            </select>
          </div>
          <div className="formInput">
            <RaisedButton primary={true} label="Save Column" />
          </div>
      </Paper>
    );
  }
}
