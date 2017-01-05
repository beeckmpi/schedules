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
  }
  handleClick () {
    this.setState({open: !this.state.open, docked: !this.state.docked});
  }
  handleClose () {
    this.setState({open: false});
  }
  changeTitle (e) {
    if (e.target.title == 'Schedules') {
      var docked = true;
      var open = true;
    } else {
      var docked = false;
      var open = false;
    }
    this.setState({title: e.target.title, docked: docked, open: open});
  }
  render() {
    let currentUser = this.props.currentUser;
    let userDataAvailable = (currentUser !== undefined);
    let loggedIn = (currentUser && userDataAvailable);
    return (
        <MuiThemeProvider>
            <div className="container">
              <Drawer docked={this.state.docked} zDepth={0} width={300} open={this.state.docked} containerStyle={{top: '65px', backgroundColor: '#E0E0E0'}} color={grey300} onRequestChange={(open) => this.setState({open})} >
                <MenuItem  leftIcon={<HomeIcon />}><Link to="/" title="Schedules" onTouchTap={this.changeTitle.bind(this)} style={{display: 'block'}}>Home</Link></MenuItem>
                <MenuItem><Link to="/template" title="New Template" onTouchTap={this.changeTitle.bind(this)} style={{display: 'block'}}>Template</Link></MenuItem>
                <MenuItem onTouchTap={this.handleClose.bind(this)}>Menu Item 2</MenuItem>
              </Drawer>
              <AppBar
                title={this.state.title}
                iconElementLeft={<IconButton onTouchTap={this.handleClick.bind(this)}><MenuIcon  color={grey50} /></IconButton>}
                iconElementRight={<FlatButton label={ loggedIn ? 'Welcome '+currentUser.profile.firstname+' '+currentUser.profile.name : 'Sign In' } />}
                style={{position: 'fixed'}}
                id="Default AppBar"
              />
              <section id="content" style={{paddingTop: '60px'}}>
                {this.props.children}
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
  columnCounter: PropTypes.number.isRequired,
  currentUser: PropTypes.object,
};
