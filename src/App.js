import './css/App.css';
import Header from './components/Header';
import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Container from '@material-ui/core/Container';
import SearchResults from './components/SearchResults';
import PopularStocks from './components/PopularStocks';
import WebFont from 'webfontloader';
import './css/List.css';
import { makeStyles } from '@material-ui/core/styles';
import theme from './components/Theme';


WebFont.load({
  google: {
    families: ['Roboto', 'Lato']
  }
});


class StocksApp extends Component {
  render() {
    return (
      <div className="App">
      <Router>
        <Header />
        <Container spacing={3} fixed>
        <SearchResults />
        <PopularStocks />
        </Container>
      </Router>
      </div>
    );
  }
}



function App(){

    return(
        <StocksApp />
    )
}



export default App;


