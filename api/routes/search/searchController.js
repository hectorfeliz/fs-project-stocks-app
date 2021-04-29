const fetch = require('node-fetch');
const config = require('../../config');

exports.getSymbolSearch = async (query) => {
try {

  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': config.RAPID_API_KEY,
      'x-rapidapi-host': 'twelve-data1.p.rapidapi.com',
      useQueryString: true
    }
  };

  const response = await fetch('https://twelve-data1.p.rapidapi.com/symbol_search?symbol='+query+'&outputsize=10',options);
  // do something with the response
  // return some information

  return response.json();


} catch (err) {
  throw err;
}
}

