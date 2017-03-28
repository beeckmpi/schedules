// react imports
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { connect }  from 'react-redux';
import reactMixin from 'react-mixin';


// imports -> api import
import { Columns } from '../../api/columns.js';
import { DragCategories } from '../../api/dragCategories.js';
import { DragCategoryItems } from '../../api/dragCategoryItems.js';
import { Templates } from '../../api/templates.js';
import Store from '../../store/store';

import App from '../App.jsx';

const AppContainer = createContainer(({ params }) => {
  const currentUser = Meteor.user();

  const templates = Meteor.subscribe('getTemplates');
  const columns = Meteor.subscribe('getColumns');
  const dragCategories = Meteor.subscribe('getDragCategories');
  const dragCategoryItems = Meteor.subscribe('getDragCategoryItems');
  var now = new Date();
  const templateStore = Templates.find({created_at : {$gt:now}}, {sort: {createdAt: -1}}).observe({
    added: function(document){
        console.log(document);
        Store.dispatch({type: 'SET', data: document.collection._docs._map});
    },
  });
  Store.dispatch({type: 'SET', data: templateStore.collection._docs._map});
  return {
    templates: Templates.find({}).fetch(),
    columns: Columns.find({}).fetch(),
    columnCounter: Columns.find({}).count(),
    dragCategories: DragCategories.find({}).fetch(),
    dragCategoryItems: DragCategoryItems.find({}).fetch(),
    currentUser,
  };
}, App);

function mapStateToProps(state) {
  return {
    docked: state.docked,
    visibilityFilter: state.visibilityFilter,
    pageSkip: state.pageSkip,
    templatesRedux: state.templates,
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(AppContainer);
