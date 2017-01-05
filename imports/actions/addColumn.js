export default function updateTemplate(id, template) {
  return () => {
    Meteor.call('updateColumn', id, template);
  };
};
