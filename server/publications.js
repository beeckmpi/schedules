import { Columns } from '../imports/api/columns';
import { Templates } from '../imports/api/templates.js';

Meteor.publish('getColumns', function () {
  return Columns.find();
});

Meteor.publish('getTemplates', function () {
  return Templates.find();
});
