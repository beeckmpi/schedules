// react imports
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

// imports -> api -> imports
import { Columns } from '../../api/columns.js';
import { DragCategories } from '../../api/dragCategories.js';
import { Templates } from '../../api/templates.js';

import TemplatePage from '../pages/TemplatePage.jsx';

export default TemplatePageContainer = createContainer(props => {
  return {
    templates: Templates.find({}).fetch(),
    columns: Columns.find({}).fetch(),
    columnCounter: Columns.find({}).count(),
    dragCategories: DragCategories.find({}).fetch(),
  };
}, TemplatePage);
