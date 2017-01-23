import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Columns } from '../../api/columns.js';
import { Templates } from '../../api/templates.js';
import Column from '../components/Column.jsx';
import ColumnHeader from '../components/ColumnHeader.jsx';
import Paper from 'material-ui/Paper';
import Delete from 'material-ui/svg-icons/action/delete';
import Create from 'material-ui/svg-icons/content/create';
import IconButton from 'material-ui/IconButton';
import {grey400, grey800} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
// template component - represents a single todo item
const paperTableStyle = {
  minWidth: '50%',
  maxWidth: '70%',
  marginBottom: '20px'
}
const tableStyle = {
  width: '100%'
}
export default class TemplateTable extends Component {
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
  renderRows() {
    var text = [];
    var rows = [];
    var rowNr = this.props.template.templateRows;
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
  constructor(props) {
    super(props);
    this.state = {
      fixedHeader: true,
      fixedFooter: false,
      stripedRows: false,
      showRowHover: false,
      selectable: false,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
      showCheckboxes: false,
      height: '300px',
    };
  }

  render() {
    return (
      <section id="content">
          <h2>
           {this.props.template.templateTitle}
         </h2>
         <Paper id="table" style={paperTableStyle} zDepth={3}>
          <Table id="templateTable" style={tableStyle} fixedHeader={this.state.fixedHeader} fixedFooter={this.state.fixedFooter} selectable={this.state.selectable} multiSelectable={this.state.multiSelectable}>
            <TableHeader displaySelectAll={this.state.showCheckboxes} adjustForCheckbox={this.state.showCheckboxes} enableSelectAll={this.state.enableSelectAll}>
              <TableRow>
                <TableHeaderColumn className="templateTableHeaderTitle"  style={{fontSize: '22px'}} colSpan={this.props.columnCounter+1}>{this.props.template.templateTableHeader}</TableHeaderColumn>
              </TableRow>
              <TableRow selectable={false}>
                <TableHeaderColumn className="templateType">{this.props.template.templateType}</TableHeaderColumn>
                {this.renderColumnHeaders()}
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={this.state.showCheckboxes} deselectOnClickaway={this.state.deselectOnClickaway} showRowHover={this.state.showRowHover} stripedRows={this.state.stripedRows}>
              {this.renderRows()}
            </TableBody>
          </Table>
        </Paper>
      </section>
    );
  }
}
