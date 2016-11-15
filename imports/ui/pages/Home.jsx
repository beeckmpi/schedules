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
import SelectField from 'material-ui/SelectField';
import Slider from 'material-ui/Slider';
import {Tabs, Tab} from 'material-ui/Tabs';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField';

const paperTableStyle = {
  minWidth: '50%',
  maxWidth: '70%',
  marginBottom: '20px',
  marginLeft: '310px',
  minHeight: '600px',
  padding: '40px 40px',
  marginTop: '15px'
}
const floatingButtonStyle = {
  alignSelf: 'flex-end'
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
        <Paper id="table" style={paperTableStyle} zDepth={1}>
            <h3>My Templates</h3>
            {this.renderTemplates()}
        </Paper>
        <div className="bottomRightMenu">
          <FloatingActionButton style={floatingButtonStyle}>
            <ContentAdd />
          </FloatingActionButton>
        </div>
      </section>
    );
  }
}
Home.propTypes = {
  templates: PropTypes.array.isRequired,
};
