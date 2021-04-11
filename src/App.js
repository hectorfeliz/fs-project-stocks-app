import './css/App.css';
import Header from './components/Header';
import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Container from '@material-ui/core/Container';
import PopularStocks from './components/PopularStocks';
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Roboto', 'Lato']
  }
});


class StocksApp extends Component {


  
  render() {
    return (
      <Router>
        <Header />
        <Container spacing={3} fixed>
        <PopularStocks />
        </Container>
      </Router>
    );
  }
}



function App(){

    return(
        <StocksApp />
    )
}



export default App;


