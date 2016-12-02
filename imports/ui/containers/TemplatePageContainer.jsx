// react imports
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

// imports -> api -> imports
import { Columns } from '../../api/columns.js';
import { DragCategories } from '../../api/dragCategories.js';
import { Templates } from '../../api/templates.js';

import TemplatePage from '../pages/TemplatePage.jsx';

export default TemplatePageContainer = createContainer(({props, params}) => {
  const {templateId} = params;
  return {
    template: Templates.findOne(templateId),
    columns: Columns.find({templateId: templateId}).fetch(),
    columnCounter: Columns.find({templateId: templateId}).count(),
    dragCategories: DragCategories.find({templateId: templateId}).fetch(),
    templateId: params.templateId
  };
}, TemplatePage);
