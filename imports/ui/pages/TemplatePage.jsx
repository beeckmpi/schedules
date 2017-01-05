// react imports
import React, { Component, PropTypes } from 'react';
import { ReactDOM, render } from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Columns } from '../../api/columns.js';
import { Templates } from '../../api/templates.js';
import { DragCategories } from '../../api/dragCategories.js';
// imports -> ui imports
import Column from '../Column.jsx';
import ColumnHeader from '../ColumnHeader.jsx';
import DragCategory from '../DragCategory.jsx';
import Template from '../Template.jsx';

import updateTemplate from '../../actions/updateTemplate';
import updateColumn from '../../actions/addColumn';

// material-ui imports
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {grey50, grey400, grey800} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import Slider from 'material-ui/Slider';
import {Tabs, Tab} from 'material-ui/Tabs';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField';

const style = {
  margin: '12px 12px 12px 0px',
};
const style2 = {
  display: 'inline-block',
};
const TabStyle = {
  padding: "15px 15px",
  display: 'inline-block',
};
const paperTableStyle = {
  minWidth: '50%',
  maxWidth: '70%',
  marginBottom: '20px'
}
const tableStyle = {
  width: '100%',

}
export default class TemplatePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      templateTitle: this.props.template.templateTitle,
      templateTableHeader: this.props.template.templateTableHeader,
      templateType: this.props.template.templateType,
      templateRows: this.props.template.templateRows,

      open: false
    };
    this.props.docked= false;
    this.props.open = false;
  }

  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Templates.insert({
      text,
      createdAt: new Date(), // current time
    });

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }
  handleChange(event) {
    const id = event.target.id;
    console.log(event+' '+ event.target.value);
    this.setState({[id]: event.target.value});
    template = {templateTitle: event.target.value};
    Meteor.call('updateTemplate', this.props.templateId, template);
  }
  handleChangeSelect(event, index, value) {
    console.log(event);

    this.setState({[event.target.id]: event.target.value});
  }
  handleClick () {
    this.setState({open: !this.state.open});
  }
  addColumn(event){
    event.preventDefault();
    Columns.insert({
      createdAt: new Date(), // current time
      columnTitle: '',
      columnType: 'draggable',
      columnType: '',
      templateId: this.props.templateId,
      saved: false
    });
  }
  addDragCategory(event){
    event.preventDefault();
    DragCategories.insert({
      createdAt: new Date(), // current time
      dragCategoryTitle: '',
      templateId: this.props.templateId,
      saved: false
    });
  }
  renderRows() {
    var text = [];
    var rows = [];
    var rowNr = this.state.templateRows;
    rowNr = parseFloat(rowNr);
    var columns = this.props.columns;
    columns.forEach(function(item, index){
      text.push(<TableRowColumn key={index} />);
    });
    for (var x = 0; x < rowNr; x++) {
      rows.push(<TableRow key={x}>{text}</TableRow>);
    };
    return rows;
  }
  renderColumnHeaders() {
    return this.props.columns.map((column) => (
      <ColumnHeader key={column._id} columnHeader={column} />
    ));
  }
  renderColumns() {
    return this.props.columns.map((column) => (
      <Column key={column._id} column={column} />
    ));
  }
  renderDragCategories() {
    return this.props.dragCategories.map((dragCategory) => (
      <DragCategory key={dragCategory._id} column={dragCategory} />
    ));
  }
  renderTemplates() {
    return this.props.templates.map((template) => (
      <Template key={template._id} template={template} />
    ));
  }

  render() {
    return (
      <div className="container">
        <div className="sidebar-editor">
          <Paper zDepth={3} style={style2} >
              <Tabs >
                <Tab label="Table">
                  <section style={{padding: '4px 15px 15px 15px'}}>
                    <div>
                      <TextField floatingLabelText="Template title" style={{width: '100%', fontSize: 'large'}} id={'templateTitle'} value={this.state.templateTitle} onChange={this.handleChange.bind(this)} />
                    </div>
                    <div>
                      <TextField floatingLabelText="Table Header Title" style={{width: '100%'}} id='templateTableHeader' value={this.state.templateTableHeader} onChange={this.handleChange.bind(this)} />
                    </div>
                    <div>
                      <SelectField floatingLabelText="Template Type" style={{width: '100%'}} value={this.state.templateType} id="templateType" onChange={this.handleChangeSelect.bind(this)} >
                        <MenuItem value={"Nr."} primaryText="Numeric" />
                        <MenuItem value={"Hour"} primaryText="Hourly" />
                        <MenuItem value={"Day"} primaryText="Daily" />
                        <MenuItem value={"Weeknr"} primaryText="Weekly" />
                        <MenuItem value={"Month"} primaryText="monthly" />
                        <MenuItem value={"Custom"} primaryText="Custom (select amount of rows)" />
                       </SelectField>
                    </div>
                    <div>
                      <label>Show rows:</label>
                      <select
                         name="rows" id="templateRows" onChange={this.handleChange.bind(this)}
                        >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                        <option value="40">40</option>
                      </select>
                    </div>
                    <div>
                      <RaisedButton onClick={this.addColumn.bind(this)} primary={true} label="Add Column" style={style} />
                    </div>
                    <div>{this.renderColumns()}</div>
                  </section>
                </Tab>
                <Tab label="Categories" >
                  <section style={{padding: '4px 15px 15px 15px'}}>
                  <h5>Drag Categories</h5>
                    <div className="seporator">
                      <RaisedButton label="Add drag category" onClick={this.addDragCategory.bind(this)}  secondary={true}/>
                    </div>
                    {this.renderDragCategories()}
                  </section>
                </Tab>
              </Tabs>
            </Paper>
        </div>
        <section id="content">
            <h2>
             {this.state.templateTitle}
           </h2>
           <Paper id="table" style={paperTableStyle} zDepth={3}>
            <Table id="templateTable" style={tableStyle}>
              <TableHeader selectable={false}>
                <TableRow>
                  <TableRowColumn className="templateTableHeaderTitle"  style={{fontSize: '22px'}} colSpan={this.props.columnCounter+1}>{this.state.templateTableHeader}</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn className="templateType">{this.state.templateType}</TableRowColumn>
                  {this.renderColumnHeaders()}
                </TableRow>
              </TableHeader>
              <TableBody>
                {this.renderRows()}
              </TableBody>
            </Table>
          </Paper>
        </section>
      </div>
    );
  }
}
TemplatePage.propTypes = {
  columns: PropTypes.array.isRequired,
  dragCategories:  PropTypes.array.isRequired,
  columnCounter: PropTypes.number.isRequired,
  templateId: PropTypes.string.isRequired,
  template: React.PropTypes.object,
};
