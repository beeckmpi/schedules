// react imports
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';


// imports -> api import
import { Columns } from '../../api/columns.js';
import { DragCategories } from '../../api/dragCategories.js';
import { Templates } from '../../api/templates.js';

import App from '../App.jsx';

export default AppContainer = createContainer(props => {
  return {
    templates: Templates.find({}).fetch(),
    columns: Columns.find({}).fetch(),
    columnCounter: Columns.find({}).count(),
    dragCategories: DragCategories.find({}).fetch(),
  };
}, App);
