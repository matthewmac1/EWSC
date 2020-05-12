import { combineReducers } from 'redux';
import teamReducer from './teamReducer';
import playerReducer from './playerReducer';

export default combineReducers({
  team: teamReducer,
  player: playerReducer
});
