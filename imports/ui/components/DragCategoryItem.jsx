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
  componentDidMount(){
    this[this.props.item._id].focus();
  }
  deleteThisDragCategory(event) {
    event.preventDefault();
    DragCategories.remove(this.props.dragCategories._id);
  }
  handleChangeSelect(event, index, value) {
    this.setState({[this.selectValue]: value});
    Columns.update(this.props.item._id,{
      $set: {columnType: value}
    });
  }
  handleChange(event) {
    this.setState({[this.textValue]: event.target.value});
  }
  render() {
    return (
      <Paper id="dragCategory" className="dragCategoryItem" zDepth={2}>
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
            />
          </div>
          <div className="input-field inlineBlock">
            <Checkbox
              label="Visible in List"
              style={chbxStyles.checkbox}
              />
          </div>
        </div>
      </Paper>
    );
  }
}
