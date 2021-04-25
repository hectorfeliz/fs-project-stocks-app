import React, { useState, useEffect } from 'react';
import Stock from './Stock';
import InputBase from '@material-ui/core/InputBase';
import { useDispatch } from 'react-redux';
import getQuoteDetails from './StockDetails';
import replace from '../actions';


export default function Search({classes, props})  {


  const dispatch = useDispatch();

  const search = async val => {

    // performing Search
    const response = await fetch('/api/search?symbol='+val, {
      method: 'GET'
    });

    const resp = await response.json();

    console.log(resp);

    // Filtering Search Results
    const stocks = resp.data.filter(function(symbol){
      return (symbol.instrument_type === 'Digital Currency' || symbol.country === 'United States' || symbol.country === 'Canada');
    });
  


    // Fetching Stock Quote Data

   let stockQuotes = await getQuoteDetails(stocks);

    stockQuotes = stockQuotes.filter(function( element ) {
      return element !== undefined;
    });

    console.log(stockQuotes);
    dispatch(replace(stockQuotes));

    if (!response.ok) {
      throw new Error(resp.message);
    }
  
  };

  const handleKeyDown = async e => {
    if (e.key === 'Enter') {
      search(e.target.value);
    }
  }

  const onChangeHandler = async e => {
    
  };


    return (
      <div>
            <InputBase
              onChange={e => onChangeHandler(e)}
              onKeyDown={handleKeyDown}
              placeholder="Search for stocks, index funds and cryptocurrencies…"
              classes={classes}
              inputProps={{ 'aria-label': 'search' }}
            />
      
      </div>
    )
  
}
