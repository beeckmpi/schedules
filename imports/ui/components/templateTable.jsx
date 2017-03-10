import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Columns } from '../../api/columns.js';
import { Templates } from '../../api/templates.js';
import Column from '../components/Column.jsx';
import ColumnHeader from '../components/ColumnHeader.jsx';
import Paper from 'material-ui/Paper';
import Delete from 'material-ui/svg-icons/action/delete';
import Create from 'material-ui/svg-icons/content/create';
import Checkbox from 'material-ui/Checkbox';
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
  renderSpecialColumnHeaders() {
    const columnHeaders = [];
    switch (this.props.template.templateType) {
      case 'Nr.':
        columnHeaders.push(<TableHeaderColumn key="number" style={{width: "10%"}}>Number</TableHeaderColumn>);
        break;
      case 'Hour':
        columnHeaders.push(<TableHeaderColumn key="Hour" style={{width: '10%'}}>Hour</TableHeaderColumn>);
        break;
      case 'Weeknr':
        columnHeaders.push(<TableHeaderColumn key="Weekn" style={{width: "15px"}}>Week</TableHeaderColumn>);
        columnHeaders.push(<TableHeaderColumn key="from" style={{width: "67px"}}>From</TableHeaderColumn>);
        columnHeaders.push(<TableHeaderColumn key="to" style={{width: "67px"}}>To</TableHeaderColumn>);
        break;
    }
    return columnHeaders;
  }
  renderColumns() {
    return this.props.columns.map((column) => (
      <Column key={column._id} column={column} />
    ));
  }
  renderRows() {
    var rows = [];
    var rowNr = this.props.template.templateRows;
    rowNr = parseFloat(rowNr);
    var columns = this.props.columns;
    for (var x = 0; x < rowNr; x++) {
      var text = [];
      switch (this.props.template.templateType) {
        case 'Nr.':
          var number = x + 1;
          text.push(<TableRowColumn key={number} style={{width: '10%'}}>{number}</TableRowColumn>);
          break;
        case 'Hour':
          var number = x + 1;
          if (number<=9){
            number = '0'+number;
          }
          text.push(<TableRowColumn key={number} style={{width: '10%'}}>{number}:00</TableRowColumn>);
          break;
        case 'Weeknr':
          var number = x + 1;
          var date_start = moment().week(number).format('DD-MM-YYYY');
          var key_start = number+'_'+moment().week(number).unix();
          var date_end = moment().week(number+1).format('DD-MM-YYYY');
          var key_end = number+'_'+moment().week(number+1).unix();
          text.push(<TableRowColumn key={number} style={{width: "7%"}}>{number}</TableRowColumn>);
          text.push(<TableRowColumn key={key_start} style={{width: "13%"}}>{date_start}</TableRowColumn>);
          text.push(<TableRowColumn key={key_end} style={{width: "13%"}}>{date_end}</TableRowColumn>);
          break;
        default:
          text.push(<TableRowColumn key={x} style={{width: '7%'}}></TableRowColumn>);
      }
      columns.forEach(function(item, index){
        var optional = '';
        switch (item.columnType) {
          case 'Draggable':
            optional = <div style={{color:"#ccc"}}>{item.optionalValue}</div>
          break;
          case 'linkedDraggable':
            optional = <div style={{color:"#ccc"}}>{item.optionalValue} <span style={{fontSize:"xx-small"}}>(linked)</span></div>
          break;
          case 'fixedValue':
            optional = <div>{item.optionalValue}</div>
          break;
          case 'inputChbx':
            optional = <Checkbox
              defaultChecked={item.checked}
            />
          break;
          case 'inputNum':
            optional = <TextField hintText="Number" id={item._id} type="number"  value=""  />
          break;
          case 'inputText':
            optional = <TextField id={item._id} type="text"  value=""  />
          break;
        }
        text.push(<TableRowColumn key={index}>{optional}</TableRowColumn>);
      });

      rows.push(<TableRow  striped={true} key={x}>{text}</TableRow>);
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
        <h3>
           {this.props.template.templateTitle}
        </h3>
         <Paper id="table" style={paperTableStyle} zDepth={3}>
          <Table id="templateTable" style={tableStyle} fixedHeader={this.state.fixedHeader} fixedFooter={this.state.fixedFooter} selectable={this.state.selectable} multiSelectable={this.state.multiSelectable}>
            <TableHeader displaySelectAll={this.state.showCheckboxes} adjustForCheckbox={this.state.showCheckboxes} enableSelectAll={this.state.enableSelectAll}>
              <TableRow>
                <TableHeaderColumn className="templateTableHeaderTitle"  style={{fontSize: '22px'}} colSpan={this.props.columnCounter}>{this.props.template.templateTableHeader}</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={this.state.showCheckboxes} deselectOnClickaway={this.state.deselectOnClickaway} showRowHover={this.state.showRowHover} stripedRows={this.state.stripedRows}>
              <TableRow selectable={false}>
                {this.renderSpecialColumnHeaders()}
                {this.renderColumnHeaders()}
              </TableRow>
              {this.renderRows()}
            </TableBody>
          </Table>
        </Paper>
      </section>
    );
  }
}
