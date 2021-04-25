const getQuoteDetails = (stocks) => {
    const promises = stocks.map(async (stock) => {
    
      const response = await fetch('/api/quote?symbol='+stock.symbol+':'+stock.exchange, {
        method: 'GET'
      });
  
      const resp = await response.json();
  
      if(resp.hasOwnProperty('symbol') && resp) return resp;
    
    });
    
    return Promise.all(promises);
  
  }

  export default getQuoteDetails;