// react imports
import React, { Component, PropTypes } from 'react';
import { ReactDOM, render } from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router';

// imports -> ui imports
import Template from '../components/Template.jsx';
import Loading from '../components/loading.jsx';

import { Templates } from '../../api/templates.js';
// material-ui imports
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {grey50, grey400, grey800} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import DeveloperBoard from 'material-ui/svg-icons/hardware/developer-board';
import List from 'material-ui/svg-icons/action/list';
import SelectField from 'material-ui/SelectField';
import Slider from 'material-ui/Slider';
import {Tabs, Tab} from 'material-ui/Tabs';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField';

const floatingButtonStyleStart = {
  alignSelf: 'flex-end',
  margin: '6px 0px 0px 0px'
}
const floatingButtonStyle = {
  alignSelf: 'flex-end',
  margin: '6px 8px'
}
export default class Home extends Component {
  constructor(props) {
    super(props);
    
  }
  renderTemplates() {
    return Object.keys(this.props.templatesRedux).map((key, template) => (
      <Template key={key} template={this.props.templatesRedux[key]} />
    ));
  }
  createTemplate(event){
    event.preventDefault();
    Templates.insert({
      createdAt: new Date(), // current time
      createdBy: this.props.currentUser._id,
      templateTitle: '',
      templateTableHeader: '',
      templateType: '',
      templateRows: 5,
      saved: false
    }, function(err, template) {
      browserHistory.push('/template/'+template._id);
    });
  }

  render() {
    const { currentUser, loading } = this.props;
    return (
      <section id="home">
        <h3 style={{marginLeft: '0px'}}>My Templates</h3>
          {loading ? <Loading key="loading"/> : this.renderTemplates()}
        <div className="bottomRightMenu">
          <FloatingActionButton style={floatingButtonStyleStart}>
            <ContentAdd />
          </FloatingActionButton>
          <FloatingActionButton mini={true} style={floatingButtonStyle} secondary={true} >
            <List />
          </FloatingActionButton>
          <FloatingActionButton mini={true} style={floatingButtonStyle} secondary={true} onClick={this.createTemplate.bind(this)} >
            <DeveloperBoard />
          </FloatingActionButton>
        </div>
      </section>
    );
  }
}
