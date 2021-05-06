import "./css/normalize.css";
import "./css/App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Container from "@material-ui/core/Container";
import SearchResults from "./components/SearchResults";
import PopularStocks from "./components/PopularStocks";
import HoldingsTotal from "./components/HoldingsTotal";
import { useAuth0, withAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { replacePortfolio } from "./actions";
import LoadPortfolio from "./components/LoadPortfolio";

import WebFont from "webfontloader";
import "./css/List.css";


WebFont.load({
  google: {
    families: ["Roboto", "Lato"],
  },
});

class StocksApp extends Component {
  render() {
    const { isAuthenticated, user } = this.props.auth0;
     
 


    return (
      <div className="App">
        <Router>
          <Header />

          <Container spacing={3} fixed>
            <React.Fragment></React.Fragment>
            <SearchResults />
            {isAuthenticated && <HoldingsTotal />}
            <PopularStocks />
       
          </Container>
          <Footer />
        </Router>
      </div>
    );
  }
}

const StocksAppWithAuth0 = withAuth0(StocksApp);

function App() {


  const dispatch = useDispatch();
  const [userPortfolio, setUserPortfolio] = useState([]);
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


  const getPortfolio = async () => {
    const token = await getAccessTokenSilently();

    await LoadPortfolio(token).then(response=>{
      if(response)  dispatch(replacePortfolio(response));
     
    }); 

  };

  useEffect(() => {

    if (isAuthenticated) {
  
      getPortfolio();

    
    }
  }, [isAuthenticated]);

  return <StocksAppWithAuth0 />;
}

export default App;
