// react imports
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { connect }  from 'react-redux';

// imports -> api -> imports
import { Columns } from '../../api/columns.js';
import { DragCategories } from '../../api/dragCategories.js';
import { DragCategoryItems } from '../../api/dragCategoryItems.js';
import { Templates } from '../../api/templates.js';

import TemplatePage from '../pages/TemplatePage.jsx';

const TemplatePageContainer = createContainer(({props, params}) => {
  const {templateId} = params;
  return {
    templates: Templates.find({_id: templateId}).fetch(),
    columns: Columns.find({templateId: templateId}).fetch(),
    columnCounter: Columns.find({templateId: templateId}).count(),
    dragCategories: DragCategories.find({templateId: templateId}).fetch(),
    dragCategoryItems: DragCategoryItems.find({templateId: templateId}).fetch(),
    templateId: params.templateId
  };
}, TemplatePage);

function mapStateToProps(state) {
  return {
    docked: state.docked,
    visibilityFilter: state.visibilityFilter,
    pageSkip: state.pageSkip
  }
}

export default connect(mapStateToProps)(TemplatePageContainer);
