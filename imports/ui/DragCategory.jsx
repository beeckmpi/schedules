import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { DragCategories } from '../api/dragCategories.js';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
// template component - represents a single todo item
const styles = {
  customWidth: {
    width: 200,
  },
};
const chbxStyles = {
  block: {
    maxWidth: 250,
  },
  checkbox: {
    marginBottom: 16,
  },
};
export default class dragCategory extends Component {
  constructor(props) {
    super(props);
    this.optionsState = {value: 'draggable'};
    this.textValue = [this.props.column._id]+'_value';
    this.state = {
      [this.props.column._id]: '',
      [this.textValue]: this.props.column.columnTitle,
    }
  }
  deleteThisDragCategory(event) {
    event.preventDefault();
    DragCategories.remove(this.props.dragCategories._id);
  }
  handleChange(event, index, value) {
    this.setState({optionsState: value});
  }
  render() {
    return (
      <section id="dragCategory" className="inline">
        <div>
          <a className="delete" onClick={this.deleteThisDragCategory.bind(this)}>
            &times;
          </a>
          <div className="formInput input-field">
            <TextField floatingLabelText="Category Title" className="catName"  id={this.props.column._id} value={this.state[this.textValue]} onChange={this.handleChange.bind(this)} />
          </div>
        </div>
        <div>
          <div className="input-field inline">
            <select name="typeColumn" onChange={this.handleChange}>
              <option value="fixedValue">Fixed value</option>
              <option value="inputChbx">Input (checkbox)</option>
              <option value="inputNum">Input (numeric)</option>
              <option value="inputText">Input (text)</option>
              <option value="select">Select</option>
            </select>
          </div>
          <Checkbox
            checkedIcon={<Visibility />}
            uncheckedIcon={<VisibilityOff />}
            label="Visible in List"
            style={chbxStyles.checkbox}
          />
          <div className="formInput inline">
            <RaisedButton primary={true} label="Add To Category" />
          </div>
        </div>
        <div className="formInput inline">
          <RaisedButton secondary={true} label="Save Category" />
        </div>
      </section>
    );
  }
}
