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

export default class AuthPageSignIn extends Component {
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
