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

  }

  render() {
    return (
      <section id="content">
          <h2>
           {this.props.template.templateTitle}
         </h2>
         <Paper id="table" style={paperTableStyle} zDepth={3}>
          <Table id="templateTable" style={tableStyle}>
            <TableHeader selectable={false}>
              <TableRow>
                <TableRowColumn className="templateTableHeaderTitle"  style={{fontSize: '22px'}} colSpan={this.props.columnCounter+1}>{this.props.template.templateTableHeader}</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn className="templateType">{this.props.template.templateType}</TableRowColumn>
                {this.renderColumnHeaders()}
              </TableRow>
            </TableHeader>
            <TableBody>
              {this.renderRows()}
            </TableBody>
          </Table>
        </Paper>
      </section>
    );
  }
}
