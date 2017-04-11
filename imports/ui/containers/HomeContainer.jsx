// react imports
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { connect }  from 'react-redux';
import Store from '../../store/store';

// imports -> api -> imports
import { Templates } from '../../api/templates.js';

import Home from '../pages/Home.jsx';

const HomeContainer = createContainer(props => {
  const currentUser = Meteor.user();
  const templates = Meteor.subscribe('getTemplates');
  const loading = !templates.ready();
  var now = new Date();
  const templateStore = Templates.find({created_at : {$gt:now}}, {sort: {createdAt: -1}}).observe({
    added: function(document){
        console.log(document);
        Store.dispatch({type: 'SET', data: document.collection._docs._map});
    },
  });
  Store.dispatch({type: 'SET', data: templateStore.collection._docs._map});
  return {
    currentUser,
    loading: loading
  };
}, Home);
function mapStateToProps(state) {
  return {
    templatesRedux: state.templates
  }
}

export default connect(mapStateToProps)(HomeContainer);
