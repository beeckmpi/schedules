// react imports
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

// imports -> api -> imports
import { Templates } from '../../api/templates.js';

import Home from '../pages/Home.jsx';

export default HomeContainer = createContainer(props => {
  const currentUser = Meteor.user();
  return {
    templates: Templates.find({}).fetch(),
    currentUser,
  };
}, Home);
