import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';


const theme = createMuiTheme({
  typography: {
    fontFamily: 'Lato, Arial',
  },
  palette: {
    type: 'dark',
    primary: {
      main: '#1D132D',
      light: '#1A3453',
      dark: '#1D132D',
    },
    secondary: {
      main: '#f50057',
    },
    positive:{
      main: "#00D100",
      light: '#00D100',
      dark: '#00D100',
    },
    negative:{
      main: "#FF0000",
      light: '#FF0000',
      dark: '#FF0000',
    }
  },
  overrides: {
    MuiAppBar: {
      colorInherit: {
        backgroundColor: '#1D132D',
        color: '#fff',
      },
    },
  },
  props: {
    MuiAppBar: {
      color: 'inherit',
    },
  },
  shape: {
    borderRadius: 4,
  },
});


ReactDOM.render(
  <React.StrictMode>
      <ThemeProvider theme={theme}>
      <App />
      </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

