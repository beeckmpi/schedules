// react imports
import React, { Component, PropTypes } from 'react';
import { ReactDOM, render } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';
import { Provider } from 'redux';
import Store from '../../imports/store/store';
// material-ui imports
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {grey50, grey300, grey400, grey800} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import HomeIcon from 'material-ui/svg-icons/action/home';
import AccountCircleIcon from 'material-ui/svg-icons/action/account-circle';
import AssignmentIcon from 'material-ui/svg-icons/action/assignment';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// App component - represents the whole app
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: true,
      docked: true,
      title: 'schedules',
    };
    Store.dispatch({type: 'SHOW_DOCK'});;
  }
  handleClick () {
    this.setState({open: !this.state.open, docked: !this.state.docked});
    if(this.props.docked){
      Store.dispatch({type: 'HIDE_DOCK'});
    } else {
      Store.dispatch({type: 'SHOW_DOCK'});
    }

  }
  handleClose () {
    this.setState({open: false});
  }
  changeTitle (e) {
    this.setState({title: e.target.title, docked: docked, open: open});
  }
  render() {
    let currentUser = this.props.currentUser;
    let userDataAvailable = (currentUser !== undefined);
    let loggedIn = (currentUser && userDataAvailable);
    return (
        <MuiThemeProvider>
          <div>
            <div id="sideMenu" style={{position:"fixed", left:"0px", top:"0px", bottom: "0px", width: "40px", paddingTop: "20px", paddingLeft:"10px", zIndex:"120", background:"#263238" }}>
              <div id="top">
                <Link to="/" title="Home" onTouchTap={this.changeTitle.bind(this)} style={{display: 'block', color: "#ffffff"}}><HomeIcon style={{color:"#fff", fontSize:"larger", marginBottom:"15px"}}/></Link>
                <Link to="/" title="Schedules" onTouchTap={this.changeTitle.bind(this)} style={{display: 'block', color: "#ffffff"}}><AssignmentIcon style={{color:"#fff", fontSize:"larger", marginBottom:"15px"}}/></Link>
              </div>
              <div id="bottom" style={{position: "fixed", bottom:"30px"}}>
                <Link to="/" title="Account settings" onTouchTap={this.changeTitle.bind(this)} style={{display: 'block', color: "#ffffff"}}><AccountCircleIcon style={{color:"#fff", fontSize:"larger", marginBottom:"15px"}}/></Link>
                <Link to="/" title="Settings" onTouchTap={this.changeTitle.bind(this)} style={{display: 'block', color: "#ffffff"}}><SettingsIcon style={{color:"#fff", fontSize:"larger"}}/></Link>
              </div>
            </div>
            <div className="container" style={{marginLeft:"50px"}}>
              <section id="content">
                {this.props.children}
              </section>
            </div>
          </div>
        </MuiThemeProvider>
    );
  }
}
App.propTypes = {
  templates: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  dragCategories:  PropTypes.array.isRequired,
  columnCounter: PropTypes.number.isRequired,
  currentUser: PropTypes.object,
};
