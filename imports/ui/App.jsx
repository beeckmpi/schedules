import React, { Component, PropTypes } from 'react';
import { ReactDOM, render } from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Templates } from '../api/templates.js';
import { Columns } from '../api/columns.js';
import { DragCategories } from '../api/dragCategories.js';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Paper from 'material-ui/Paper';
import Template from './Template.jsx';
import Column from './Column.jsx';
import DragCategory from './DragCategory.jsx';
import ColumnHeader from './ColumnHeader.jsx';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';
// App component - represents the whole app

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
  maxWidth: '70%'
}
const tableStyle = {
  width: '100%'
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: 'b',
      templateTitle: '',
      templateTableHeader: '',
      templateType: 'Nr.',
      rows: 5
    };

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
    this.setState({[id]: event.target.value});
  }
  handleChange(event) {
    const id = event.target.id;
    this.setState({[id]: event.target.value});
  }
  addColumn(event){
    event.preventDefault();
    Columns.insert({
      createdAt: new Date(), // current time
      columnTitle: '',
      columnType: 'draggable',
    });
  }
  addDragCategory(event){
    event.preventDefault();
    DragCategories.insert({
      createdAt: new Date(), // current time
      dragCategoryTitle: '',
    });
  }
  renderRows() {
    var text = [];
    var rows = [];
    var rowNr = this.state.rows;
    rowNr = parseFloat(rowNr);
    var columns = this.props.columns;
    columns.forEach(function(item, index){
      text.push(<TableRowColumn />);
    });
    for (var x = 0; x < rowNr; x++) {
      rows.push(<TableRow>{text}</TableRow>);
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
      <MuiThemeProvider>
        <div className="container">
          <div className="sidebar-editor">
            <Paper zDepth={3} style={style2} >
              <Tabs value={this.state.tabs} id="tabs" onChange={this.handleChange}>
                <Tab label="Table" value="a">
                  <section style={{padding: '4px 15px 15px 15px'}}>
                    <div>
                      <TextField floatingLabelText="Template title" id='templateTitle' value={this.state.templateTitle} onChange={this.handleChange.bind(this)} defaultValue={this.state.templateTitle} />
                    </div>
                    <div>
                      <input type="text" placeholder="Table Header Title" id='templateTableHeader' value={this.state.value} onChange={this.handleChange.bind(this)}/>
                    </div>
                    <div>
                      <label>Template Type:</label>
                      <select name="templateType" id="templateType" onChange={this.handleChange.bind(this)} >
                        <option value="Nr.">Numeric</option>
                        <option value="Hour">Hourly</option>
                        <option value="Day">Daily</option>
                        <option value="Weeknr.">Weekly</option>
                        <option value="Month">monthly</option>
                        <option value="Custom">Custom (select amount of rows)</option>
                      </select>
                    </div>
                    <div>
                      <label>Show rows:</label>
                      <select
                         name="rows" id="rows" onChange={this.handleChange.bind(this)}
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
                <Tab label="Categories" value="b" >
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
          <header>
           <div id="page-title">New Template</div>
          </header>
          <section id="content">
            <h2>
             {this.state.templateTitle}
           </h2>
           <Paper id="table" style={paperTableStyle} zDepth={3}>
            <Table id="templateTable" style={tableStyle}>
              <TableHeader>
                <TableRow>
                  <TableRowColumn className="templateTableHeaderTitle" colSpan={this.props.columnCounter+1}>{this.state.templateTableHeader}</TableRowColumn>
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

      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  templates: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  dragCategories:  PropTypes.array.isRequired,
  columnCounter: PropTypes.array.isRequired,
};

export default createContainer(() => {
  return {
    templates: Templates.find({}).fetch(),
    columns: Columns.find({}).fetch(),
    columnCounter: Columns.find({}).count(),
    dragCategories: DragCategories.find({}).fetch(),
  };
}, App);
