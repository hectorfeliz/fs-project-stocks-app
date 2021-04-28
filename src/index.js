import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, combineReducer } from 'redux';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import  allReducers  from './reducers';

import theme from './components/Theme';
localStorage.clear();

const store = createStore(allReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

//.clear();

ReactDOM.render(
  <React.StrictMode>
      <ThemeProvider theme={theme}>
      <Provider store={store}>
      <App />
      </Provider>
      </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

