import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Columns } from '../../api/columns.js';
import Paper from 'material-ui/Paper';
import Delete from 'material-ui/svg-icons/action/delete';
import Create from 'material-ui/svg-icons/content/create';
import IconButton from 'material-ui/IconButton';
import Checkbox from 'material-ui/Checkbox';
import {grey400, grey800} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
// template component - represents a single todo item
const styles = {
  customWidth: {
    width: 200,
  },
};
const style = {
  zIndex: '1000',
  padding: '15px 15px',
  display: 'inline-block',
  width: '350px',
  maxHeight: '358px',
  position: 'relative',
};
const deleteStyle = {
  position: 'absolute',
  right: '10px',
  top: '12px',
  cursor: 'pointer'
}
const deleteStyleView = {
  position: 'absolute',
  right: '0px',
  top: '-10px',
  cursor: 'pointer'
}
const show = {height: "auto", position: "absolute", top: '9px', width: "330px", transition: 'all .15s ease .50s', display: 'inherit', zIndex: '1000'};
const hideView = {position: "absolute", left: '-350px', width:'350px', height: '55px', transition: 'all .25s ease .25s', display:'none'}
const hideEdit = {position: "absolute", left: '350px', width:'350px', minHeight: '120px', transition: 'all .15s ease', display:'none'}

const editStyleView = {
  position: 'absolute',
  right: '25px',
  top: '-10px',
  cursor: 'pointer'
}
const chbxStyles = {
  block: {
    maxWidth: "270px",
  },
  checkbox: {
    marginBottom: 16,
    minWith: "256px"
  },
};
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
    this.selectValue = [this.props.column._id]+'_selectValue';
    this.optionalValue = [this.props.column._id]+'_optionalValue';
    this.edit = [this.props.column._id]+'_edit';
    this.view = [this.props.column._id]+'_view';
    if (this.props.column.saved){
      this.viewVar = show;
      this.editVar = hideEdit;
      this.columnInfo = "columnEditPaper view";
    } else {
      this.viewVar = show;
      this.editVar = hideView;
      this.columnInfo = "columnEditPaper edit";
    }
    this.state = {
      [this.props.column._id]: '',
      [this.textValue]: this.props.column.columnTitle,
      [this.selectValue]: this.props.column.columnType,
      [this.optionalValue]: this.props.column.optionalValue,
      [this.edit]: this.editVar,
      [this.view]: this.viewVar,
      checked: this.props.column.optionalValue,
      columnInfo: this.columnInfo
    }
  }
  changeChecked(event, isInputChecked){
    this.setState({[this.checked]: event.target.value});
    Columns.update(this.props.column._id,{
      $set: {optionalValue: isInputChecked}
    });
  }
  handleChange(event) {
    this.setState({[this.textValue]: event.target.value});
    Columns.update(this.props.column._id,{
      $set: {columnTitle: event.target.value}
    });
  }
  handleChangeOptional(event, index, value) {
    this.setState({[this.optionalValue]: event.target.value});
    Columns.update(this.props.column._id,{
      $set: {optionalValue: value, draggableKey: index}
    });
  }
  handleChangeSelect(event, index, value) {
    this.setState({[this.selectValue]: value});
    Columns.update(this.props.column._id,{
      $set: {columnType: value}
    });
  }
  handleOptionalSelect(event, index, value) {
    this.setState({[this.optionalValue]: value});
    Columns.update(this.props.column._id,{
      $set: {optionalValue: value}
    });
  }
  renderOptional(){
    switch(this.state[this.selectValue]) {
      case 'Draggable':
        return <SelectField floatingLabelText="Type" value={this.state[this.optionalValue]} onChange={this.handleOptionalSelect.bind(this)} >
          {this.props.dragCategoryItems.map((dragCategoryItem) => (
            <MenuItem key={dragCategoryItem._id} value={dragCategoryItem.category+' - '+dragCategoryItem.name} primaryText={dragCategoryItem.category+' - '+dragCategoryItem.name} />
          ))}
        </SelectField>;
        break;
      case 'linkedDraggable':
          return <SelectField floatingLabelText="Type" value={this.state[this.optionalValue]} onChange={this.handleOptionalSelect.bind(this)} >
            {this.props.dragCategoryItems.map((dragCategoryItem) => (
              <MenuItem key={dragCategoryItem._id} value={dragCategoryItem.category+' - '+dragCategoryItem.name} primaryText={dragCategoryItem.category+' - '+dragCategoryItem.name} />
            ))}
          </SelectField>;
          break;
      case 'fixedValue':
        return <div className="formInput input-field">
            <TextField floatingLabelText="Fixed Value text" hintText="Fixed Value text" id={this.props.column._id}  value={this.state[this.optionalValue]} onChange={this.handleChangeOptional.bind(this)} />
          </div>
        break;
      case 'inputChbx':
        return <div className="formInput input-field">
          <Checkbox
            label="Checked?"
            style={chbxStyles.checkbox}
            defaultChecked={this.state.checked}
            onCheck={this.changeChecked.bind(this)}
          />
        </div>
      break;
      case 'inputNum':
        return <div className="formInput input-field">
          <TextField floatingLabelText="Number" hintText="Set the number" id={this.props.column._id} type="number"  value={this.state[this.optionalValue]} onChange={this.handleChangeOptional.bind(this)} />
        </div>
      break;
      case 'inputText':
        return <div className="formInput input-field">
          <TextField floatingLabelText="text" hintText="Set the visible text" id={this.props.column._id}  value={this.state[this.optionalValue]} onChange={this.handleChangeOptional.bind(this)} />
        </div>
      break;
      case 'select':
        return <div className="formInput input-field">
          <TextField floatingLabelText="Select items" rows={2} hintText="Type the available items, seperated by a comma" id={this.props.column._id}  value={this.state[this.optionalValue]} onChange={this.handleChangeOptional.bind(this)} />
        </div>
      break;
    }
  }
  saveColumn(event){
    this.setState({[this.edit]: hideEdit, columnInfo: "columnEditPaper view", [this.view]: show});
    Columns.update(this.props.column._id,{
      $set: {saved: true}
    });
  }
  editThisColumn(event) {
    event.preventDefault();
    this.setState({[this.edit]: show, columnInfo: "columnEditPaper edit", [this.view]: hideView});
    Columns.update(this.props.column._id,{
      $set: {saved: false}
    });
  }
  render() {
    style.zIndex= this.props.zIndex;
    return (
      <Paper zDepth={1} style={style} className={this.state.columnInfo}>
        <section className="edit" style={this.state[this.edit]}>
          <div className="ColumnEdit">
            <IconButton tooltip="Delete Column" style={deleteStyle} onClick={this.deleteThisColumn.bind(this)}>
              <Delete color={grey400} hoverColor={grey800} />
            </IconButton>
            <div className="formInput input-field">
              <TextField floatingLabelText="Column Title" hintText="Column Title" id={this.props.column._id} value={this.state[this.textValue]} onChange={this.handleChange.bind(this)} />
            </div>
          </div>
            <div>
              <SelectField floatingLabelText="Type" value={this.state[this.selectValue]} onChange={this.handleChangeSelect.bind(this)} >
                <MenuItem value={"Draggable"} primaryText="Draggable" />
                <MenuItem value={"linkedDraggable"} primaryText="Linked Draggable" />
                <MenuItem value={"fixedValue"} primaryText="Fixed value" />
                <MenuItem value={"inputChbx"} primaryText="Input (checkbox)" />
                <MenuItem value={"inputNum"} primaryText="Input (numeric)" />
                <MenuItem value={"inputText"} primaryText="Input (text)" />
                <MenuItem value={"select"} primaryText="Select" />
                <MenuItem value={"splitColumn"} primaryText="Split Columne" />
               </SelectField>
            </div>
            <div className="draggable">
              {this.renderOptional()}
            </div>
            <div className="formInput">
              <RaisedButton primary={true} label="Save Column" onClick={this.saveColumn.bind(this)} />
            </div>
          </section>
          <section className="view" style={this.state[this.view]}>
            <IconButton tooltip="Delete Column" style={deleteStyleView} onClick={this.deleteThisColumn.bind(this)}>
              <Delete color={grey400} hoverColor={grey800} />
            </IconButton>
            <IconButton tooltip="Edit Column" style={editStyleView} onClick={this.editThisColumn.bind(this)}>
              <Create color={grey400} hoverColor={grey800} />
            </IconButton>
            <div>{this.props.column.columnTitle}</div>
            <div style={{fontSize: 'x-small'}}>{this.props.column.columnType}</div>
          </section>
      </Paper>
    );
  }
}
