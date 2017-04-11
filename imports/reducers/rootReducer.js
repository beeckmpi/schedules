import { combineReducers } from 'redux';
import docked from '../../imports/reducers/docked';
import templates from '../../imports/reducers/templates';
import template from '../../imports/reducers/template';
import currentUser from '../../imports/reducers/currentUser';

const rootReducer = combineReducers({
  docked,
  templates,
  template,
  currentUser
});

export default rootReducer;
