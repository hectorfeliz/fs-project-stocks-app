
const { request } = require('express');
const fetch = require('node-fetch');

exports.getSymbolSearch = async (req, res) => {
try {

  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': process.env.RAPID_API_KEY,
      'x-rapidapi-host': 'twelve-data1.p.rapidapi.com',
      useQueryString: true
    }
  };

  const response = await fetch('https://twelve-data1.p.rapidapi.com/symbol_search?symbol='+req.query+'&outputsize=30',options);
  // do something with the response
  // return some information


  const data = response.json();

  console.log('repsonse is...');
  console.log(data);
  return data;


} catch (err) {
  throw err;
}
}

