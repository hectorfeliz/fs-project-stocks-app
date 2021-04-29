import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, combineReducer } from 'redux';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import  allReducers  from './reducers';
import loadState from './local_storage/load';

import theme from './components/Theme';
//localStorage.clear();
const persistedState = loadState();
const store = createStore(allReducers, persistedState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.subscribe(()=>{
  localStorage.setItem('state', JSON.stringify(store.getState()))
})

// @Todo make strict at the end, fix errors

ReactDOM.render(
  <React.Fragment>
      <ThemeProvider theme={theme}>
      <Provider store={store}>
      <App />
      </Provider>
      </ThemeProvider>
  </React.Fragment>,
  document.getElementById('root')
);

