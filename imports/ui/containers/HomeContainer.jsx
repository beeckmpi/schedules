// react imports
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { connect }  from 'react-redux';

// imports -> api -> imports
import { Templates } from '../../api/templates.js';

import Home from '../pages/Home.jsx';

const HomeContainer = createContainer(props => {
  const currentUser = Meteor.user();
  return {
    currentUser,
  };
}, Home);
function mapStateToProps(state) {
  return {
    docked: state.docked,
    visibilityFilter: state.visibilityFilter,
    pageSkip: state.pageSkip,
    templatesRedux: state.templates
  }
}

export default connect(mapStateToProps)(HomeContainer);
