require('dotenv').config({
	path: `${__dirname}/.env`
});

const request = require('request'); 

exports.getSymbolSearch = async (query) => {
 
    return new Promise((resolve, reject) => { 

    const options = {
        method: 'GET',
        url: 'https://twelve-data1.p.rapidapi.com/symbol_search',
        qs: {symbol: query.query, outputsize: '30'},
        headers: {
          'x-rapidapi-key': process.env.RAPID_API_KEY,
          'x-rapidapi-host': 'twelve-data1.p.rapidapi.com',
          useQueryString: true
        }
      };
      
  
      // Get whole Response object.
    const response = request(options);

    // Returns the Promise.Resolve or Reject based on response.
    if (response.statusCode < 200 || response.statusCode > 300) {
      const errorMsg = 'Error occurred while POSTing the request. Got status: ' + response.status;
      console.error(errorMsg);

      // Reject the promise. Should be caught.
      return reject(errorMsg);
    }

    const responseBody = response.body;
    console.log(responseBody);

    // Return the response.
    return resolve(responseBody);

  })
    
  
};


