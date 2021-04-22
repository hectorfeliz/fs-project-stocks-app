import React, { useState, useEffect } from 'react';
import Stock from './Stock';
import InputBase from '@material-ui/core/InputBase';

const axios = require('axios').default;


export default function Search({classes})  {

  const [results, setResults ] = useState([]);

  const search = async val => {

    console.log('front end starting Search.. ');
    console.log(val);

    axios.get('http://localhost:8080/api/search?query='+val)
      .then(function (response) {
        // handle success
        const stocks = response;
        console.log('Response back from Backend is..');

        console.log(stocks);
        setResults(stocks); 

      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  
  };



  const handleKeyDown = async e => {
    if (e.key === 'Enter') {
      search(e.target.value);
    }
  }

  const onChangeHandler = async e => {
    
  };




  const renderStocks = async() => {
    let stocks = <span>Search by names or symbols..</span>;

    if (results) {
      stocks = 'Has Result'
    }

    return stocks;
  }


    return (
      <div>
            <InputBase
              onChange={e => onChangeHandler(e)}
              onKeyDown={handleKeyDown}
              placeholder="Search for stocks, index funds and cryptocurrencies…"
              classes={classes}
              inputProps={{ 'aria-label': 'search' }}
            />
        {renderStocks}
      </div>
    )
  
}
