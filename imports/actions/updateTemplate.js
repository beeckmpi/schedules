export default function updateTemplate(id, template) {
  return () => {
    Meteor.call('updateTemplate', id, template);
  };
};
