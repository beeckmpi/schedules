import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
export const Templates = new Mongo.Collection('templates');
Meteor.methods({
  'templates.update'(id, template) {
    return Templates.update(id, {$set: template});
  }
});
