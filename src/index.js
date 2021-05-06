import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { Auth0Provider } from "@auth0/auth0-react";
import { createStore, combineReducer } from "redux";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import allReducers from "./reducers";
//import loadState from './local_storage/load';

import theme from "./components/Theme";
//localStorage.clear();
//const persistedState = loadState();
const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
//const store = createStore(allReducers, persistedState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// @Todo make strict at the end, fix errors

// auth0 goes here in the empty space

ReactDOM.render(
  <React.Fragment>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Auth0Provider
          domain="invest-trackr.us.auth0.com"
          clientId="NXf2sXiGYXAGKRkL9bdWPn1IKox5qpDY"
          audience="https://stocks-app-auth.com/api"
          redirectUri={window.location.origin}
        >
          <App />
        </Auth0Provider>
      </Provider>
    </ThemeProvider>
  </React.Fragment>,
  document.getElementById("root")
);
