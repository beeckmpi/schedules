import React, { Component, PropTypes } from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import { Columns } from '../api/columns.js';
import TextField from 'material-ui/TextField';

// template component - represents a single todo item
export default class columnHeader extends Component {
  deleteThisColumn(event) {
    event.preventDefault();
    Columns.remove(this.props.columnHeader._id);
  }
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TableRowColumn>
        {this.props.columnHeader.columnTitle}
      </TableRowColumn>
    );
  }
}
