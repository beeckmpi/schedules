// react imports
import React, { Component, PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import {grey50, grey400, grey800} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
const paperTableStyle = {
  minWidth: '50%',
  maxWidth: '70%',
  marginBottom: '20px',
  marginLeft: '310px',
  minHeight: '600px',
  padding: '40px 40px',
  marginTop: '15px'
}
export default class AuthPageSignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      firstname: '',
      email: '',
      password: ''
    };
  }
  handleChange(event) {
    const id = event.target.id;
    this.setState({[id]: event.target.value});
  }
  addUser() {

  }
  render() {
    return (
      <Paper id="table" style={paperTableStyle} zDepth={3}>
        <div style={{width:'80%', display:'inline-block'}}>
          <div className="formInput input-field">
            <TextField floatingLabelText="Email address" hintText="Email Adress" type="email" id="email" style={{width: '100%'}} value={this.state.email} onChange={this.handleChange.bind(this)} />
          </div>
          <div className="formInput input-field">
            <TextField floatingLabelText="Password" hintText="Password" type="email" type="Password" id="password" style={{width: '100%'}} value={this.state.password} onChange={this.handleChange.bind(this)} />
          </div>
          <div className="formInput">
            <RaisedButton primary={true} label="Sign in" onClick={this.addUser.bind(this)} />
          </div>
        </div>
        <div style={{width:'20%', display:'inline-block'}}>

        </div>
      </Paper>
    );
  }
}
