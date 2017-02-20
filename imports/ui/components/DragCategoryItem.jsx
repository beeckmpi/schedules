import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { DragCategories } from '../../api/dragCategories.js';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import {grey400, grey800} from 'material-ui/styles/colors';
import Delete from 'material-ui/svg-icons/action/delete';
// template component - represents a single todo item
const styles = {
  customWidth: {
    width: 200,
  },
};
const chbxStyles = {
  block: {
    maxWidth: "270px",
  },
  checkbox: {
    marginBottom: 16,
    minWith: "256px"
  },
};
const deleteStyle = {
  position: 'absolute',
  right: '10px',
  top: '12px',
  cursor: 'pointer'
};
export default class DragCategoryitem extends Component {
  constructor(props) {
    super(props);
    this.optionsState = {value: 'draggable'};
    this.textValue = [this.props.item._id]+'_value';
    this.selectValue = [this.props.item._id]+'_selectValue';
    this.state = {
      [this.props.item._id]: '',
      [this.textValue]: "",
      [this.selectValue]: "inputText",
      required: this.props.item.required
    }
  }
  deleteThisDragCategory(event) {
    event.preventDefault();
  }
  handleChangeSelect(event, index, value) {
    this.props.item.type = value;
    this.setState({[this.selectValue]: value});
  }
  handleChange(event) {
    this.props.item.name = event.target.value;
    this.setState({[this.textValue]: event.target.value});
  }
  changeRequired(event, isInputChecked){
    this.props.item.required = isInputChecked;
  }
  changeVisible(event, isInputChecked){
    this.props.item.visible = isInputChecked;
  }
  render() {
    return (
      <Paper id="dragCategory" className="dragCategoryItem" zDepth={2}>
        <IconButton tooltip="Delete Item" style={deleteStyle} onClick={() => this.props.onDelete(this.props.item)}>
          <Delete color={grey400} hoverColor={grey800} />
        </IconButton>
        <div className="inlineBlock">
          <div className="formInput input-field inlineBlock">
            <TextField floatingLabelText="Label" className="catName" autoFocus id={this.props.item._id} value={this.state[this.textValue]} onChange={this.handleChange.bind(this)} />
          </div>
          <div className="input-field inlineBlock">
            <SelectField floatingLabelText="Type" value={this.state[this.selectValue]} floatingLabelFixed={true} onChange={this.handleChangeSelect.bind(this)} >
              <MenuItem value={"fixedValue"} primaryText="Fixed value" />
              <MenuItem value={"inputChbx"} primaryText="Input (checkbox)" />
              <MenuItem value={"inputNum"} primaryText="Input (numeric)" />
              <MenuItem value={"inputText"} primaryText="Input (text)" />
              <MenuItem value={"select"} primaryText="Select" />
            </SelectField>
          </div>
        </div>
        <div>
          <div className="input-field inlineBlock">
            <Checkbox
              label="Required"
              style={chbxStyles.checkbox}
              defaultChecked={this.state.required}
              onCheck={this.changeRequired.bind(this)}
            />
          </div>
          <div className="input-field inlineBlock">
            <Checkbox
              label="Visible in List"
              style={chbxStyles.checkbox}
              onCheck={this.changeVisible.bind(this)}
              />
          </div>
        </div>
      </Paper>
    );
  }
}
