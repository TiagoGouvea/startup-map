import { combineReducers } from 'redux';
import CommonQuestionsReducer from './common';

export const reducers = combineReducers({
  common: CommonQuestionsReducer
})
