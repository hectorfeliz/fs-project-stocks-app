const fetch = require('node-fetch');
const config = require('../../config');

exports.getQuote = async (query) => {
try {

  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': config.RAPID_API_KEY,
      'x-rapidapi-host': 'twelve-data1.p.rapidapi.com',
      useQueryString: true
    }
  };

  const response = await fetch('https://twelve-data1.p.rapidapi.com/quote?symbol='+query+'&outputsize=1&interval=1day',options);


  return response.json();


} catch (err) {
  throw err;
}
}

