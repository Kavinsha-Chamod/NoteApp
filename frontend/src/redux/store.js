import { combineReducers,applyMiddleware, legacy_createStore } from 'redux';
import {thunk} from 'redux-thunk'; // Correct import
import userReducer from './users/userReducer';
import {noteReducer} from './notes/noteReducer';

let rootReducer = combineReducers({
  userReducer: userReducer,
  noteReducer: noteReducer,

});

export const store = legacy_createStore(
  rootReducer, 
  applyMiddleware(thunk));
