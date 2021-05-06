import './css/normalize.css';
import './css/App.css';
import Header from './components/Header';
import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Container from '@material-ui/core/Container';
import SearchResults from './components/SearchResults';
import PopularStocks from './components/PopularStocks';
import HoldingsTotal from './components/HoldingsTotal';
import { useAuth0, withAuth0 } from '@auth0/auth0-react';
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";


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
      const {isAuthenticated, user} = this.props.auth0;

    return (
      <div className="App">
      <Router>
        
        
        <Header />

        <Container spacing={3} fixed>
          <React.Fragment>
          </React.Fragment>
          {!isAuthenticated &&  <h2>Please Log in</h2> }
          {isAuthenticated &&  <SearchResults /> }
          {isAuthenticated &&  <PopularStocks /> }
        </Container>
      </Router>
      </div>
    );
  }
}

const StocksAppWithAuth0 = withAuth0(StocksApp);


function App(){

  const portfolio = useSelector((state) => state.portfolio).portfolio;
  

  const {
    getAccessTokenSilently,
    isLoading,
    isAuthenticated,
    error,
    user,
    loginWithRedirect,
    logout,
  } = useAuth0();


  useEffect(() => {

    console.log('use effect in app.js');
    console.log('is auth', isAuthenticated);
    console.log('port', portfolio);

    const createPortfolio = async () => {

      const token = await getAccessTokenSilently();
   
      console.log(token);

       // attempting to save portfolio
        const response = await fetch('/api/portfolio', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ name: 'My Portfolio', transactions: portfolio.transactions })
        });



        return response.json();
    }

    if (isAuthenticated && portfolio) {
      console.log(' is authenticated and portfolio exist');


      //todo if user has portfolio, get it



      





      // else create it
      if(!portfolio.userId)   createPortfolio();
    


    }
  }, [isAuthenticated]);

    return(
      <StocksAppWithAuth0/>
    )
}



export default App;


