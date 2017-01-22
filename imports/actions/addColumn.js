import { Meteor } from 'meteor/meteor';
export default function updateTemplate(id, template) {
  return () => {
    Meteor.call('updateColumn', id, template);
  };
};
