// react imports
import React, { Component, PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import {grey50, grey400, grey800} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
const paperTableStyle = {
  minWidth: '50%',
  maxWidth: '70%',
  margin: '0 auto 20px auto',
  minHeight: '600px',
  marginLeft: '310px',
  marginTop: '15px',
  padding: '40px 40px'
}
export default class NotFoundPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }
  handleClick () {
    this.setState({open: !this.state.open});
  }
  render() {
    return (
      <Paper id="table" style={paperTableStyle} zDepth={3}>
          Oops something went wrong!!
      </Paper>
    );
  }
}
