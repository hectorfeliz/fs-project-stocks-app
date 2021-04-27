import resultsReducer from './results';
import loggedReducer from './logged';
import portfolioReducer from './portfolio';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    portfolio: portfolioReducer,
    results: resultsReducer,
    loggedIn: loggedReducer
});

export default allReducers;