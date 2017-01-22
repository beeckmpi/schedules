// react imports
import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { ReactDOM, render } from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Columns } from '../../api/columns.js';
import { Templates } from '../../api/templates.js';
import { DragCategories } from '../../api/dragCategories.js';
// imports -> ui imports
import Column from '../components/Column.jsx';
import ColumnHeader from '../components/ColumnHeader.jsx';
import DragCategory from '../components/DragCategory.jsx';
import Loading from '../components/loading.jsx';
import TemplateForm from '../components/TemplateForm.jsx'
import TemplateTable from '../components/templateTable.jsx';

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

    this.props.docked= false;
    this.props.open = false;
    this.state = {
      open: false
    };
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
  renderDragCategories() {
    return this.props.dragCategories.map((dragCategory) => (
      <DragCategory key={dragCategory._id} column={dragCategory} />
    ));
  }

  renderColumns() {
    return this.props.columns.map((column) => (
      <Column key={column._id} column={column} />
    ));
  }
  renderTemplateForm() {
    return this.props.templates.map((template) => (
      <TemplateForm key={template._id} template={template} />
    ));
  }
  renderTemplateTable () {
    return this.props.templates.map((template) => (
      <TemplateTable key={this.props.templateId} template={template} columns={this.props.columns} />
    ));
  }
  render() {
    return (
      <div className="container">
        <div className="sidebar-editor">
          <Paper zDepth={3} style={style2} >
              <Tabs >
                <Tab label="Table">
                  {this.renderTemplateForm()}
                </Tab>
                <Tab label="Columns" >
                  <section style={{padding: '4px 15px 15px 15px'}}>
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
        <div className="templateTableHeader">
          {this.renderTemplateTable()}
        </div>
      </div>
    );
  }
}
TemplatePage.propTypes = {
  columns: PropTypes.array.isRequired,
  dragCategories:  PropTypes.array.isRequired,
  columnCounter: PropTypes.number.isRequired,
  templateId: PropTypes.string.isRequired,
  templates: PropTypes.array.isRequired,
  subscriptionReady: React.PropTypes.bool,
};
