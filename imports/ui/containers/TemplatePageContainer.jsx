// react imports
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { connect }  from 'react-redux';

// imports -> api -> imports
import { Columns } from '../../api/columns.js';
import { DragCategories } from '../../api/dragCategories.js';
import { DragCategoryItems } from '../../api/dragCategoryItems.js';
import { Templates } from '../../api/templates.js';
import Store from '../../store/store';

import TemplatePage from '../pages/TemplatePage.jsx';

const TemplatePageContainer = createContainer(({props, params}) => {
  const {templateId} = params;
  var now = new Date();
  const template = Meteor.subscribe('getTemplate', templateId);
  const loading = !template.ready();
  const templateStore = Templates.find({_id: templateId});
  Store.dispatch({type: 'SET_TEMPLATE', data: templateStore.collection._docs._map});
  return {
    templates: Templates.find({_id: templateId}).fetch(),
    columns: Columns.find({templateId: templateId}).fetch(),
    columnCounter: Columns.find({templateId: templateId}).count(),
    dragCategories: DragCategories.find({templateId: templateId}).fetch(),
    dragCategoryItems: DragCategoryItems.find({templateId: templateId}).fetch(),
    templateId: params.templateId,
    loading: loading
  };
}, TemplatePage);

function mapStateToProps(state) {
  return {
    templateRedux: state.template
  }
}

export default connect(mapStateToProps)(TemplatePageContainer);
