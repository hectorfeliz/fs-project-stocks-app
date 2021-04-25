import resultsReducer from './results';
import loggedReducer from './logged';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    results: resultsReducer,
    loggedIn: loggedReducer

});

export default allReducers;