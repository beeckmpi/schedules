import Columns from '../imports/api/columns';
import Templates from '../imports/api/templates';
Meteor.methods({
  addColumn(column) {
    const columns = Columns.insert(column);
    return columns;
  },
  updateColumn(id, column) {
    return Colmuns.update(id, {$set: column});
  },
  updateTemplate(id, template) {
    return Templates.update(id, {$set: template});
  }
});
