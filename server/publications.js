import { Columns } from '../imports/api/columns';
import { Templates } from '../imports/api/templates.js';
import { DragCategories } from '../imports/api/dragCategories.js';

Meteor.publish('getColumns', function () {
  return Columns.find();
});

Meteor.publish('getTemplates', function () {
  return Templates.find();
});

Meteor.publish('getDragCategories', function () {
  return DragCategories.find();
});
