// react imports
import React, { Component, PropTypes } from 'react';
import { ReactDOM, render } from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

// imports -> ui imports
import Column from '../Column.jsx';
import ColumnHeader from '../ColumnHeader.jsx';
import DragCategory from '../DragCategory.jsx';
import Template from '../Template.jsx';

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
}
const floatingButtonStyle = {
  alignSelf: 'flex-end',
  margin: '4px 8px'
}
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };

  }

  renderTemplates() {
    return this.props.templates.map((template) => (
      <Template key={template._id} template={template} />
    ));
  }

  render() {
    return (
      <section id="home">
        <h3 style={{marginLeft: '300px'}}>My Templates</h3>
        {this.renderTemplates()}
        <div className="bottomRightMenu">
          <FloatingActionButton style={floatingButtonStyleStart}>
            <ContentAdd />
          </FloatingActionButton>
          <FloatingActionButton mini={true} style={floatingButtonStyle} secondary={true} >
            <List />
          </FloatingActionButton>
          <FloatingActionButton mini={true} style={floatingButtonStyle} secondary={true} >
            <DeveloperBoard />
          </FloatingActionButton>
        </div>
      </section>
    );
  }
}
Home.propTypes = {
  templates: PropTypes.array.isRequired,
};
