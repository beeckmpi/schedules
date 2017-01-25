// react imports
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { connect }  from 'react-redux';
import reactMixin from 'react-mixin';


// imports -> api import
import { Columns } from '../../api/columns.js';
import { DragCategories } from '../../api/dragCategories.js';
import { Templates } from '../../api/templates.js';

import App from '../App.jsx';

const AppContainer = createContainer(({ params }) => {
  const currentUser = Meteor.user();
  const templates = Meteor.subscribe('getTemplates');
  const columns = Meteor.subscribe('getColumns');
  const dragCategories = Meteor.subscribe('getDragCategories');
  return {
    templates: Templates.find({}).fetch(),
    columns: Columns.find({}).fetch(),
    columnCounter: Columns.find({}).count(),
    dragCategories: DragCategories.find({}).fetch(),
    currentUser,
  };
}, App);

function mapStateToProps(state) {
  return {
    docked: state.docked,
    visibilityFilter: state.visibilityFilter,
    pageSkip: state.pageSkip
  }
}

export default connect(mapStateToProps)(AppContainer);
