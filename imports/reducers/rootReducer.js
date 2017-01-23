import { combineReducers } from 'redux';
import docked from '../../imports/reducers/docked';
import visibilityFilter from '../../imports/reducers/visibilityFilter';
import pageSkip from '../../imports/reducers/pageSkip';

const rootReducer = combineReducers({
  docked,
  visibilityFilter,
  pageSkip
});

export default rootReducer;
