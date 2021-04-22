require('dotenv').config({
	path: `${__dirname}/.env`
});

const request = require('request'); 

exports.getSymbolSearch = async (req, res, next) => {
  try {
    console.log('Query is...');
    console.log(req);


    const options = {
        method: 'GET',
        url: 'https://twelve-data1.p.rapidapi.com/symbol_search',
        qs: {symbol: req.query, outputsize: '30'},
        headers: {
          'x-rapidapi-key': process.env.RAPID_API_KEY,
          'x-rapidapi-host': 'twelve-data1.p.rapidapi.com',
          useQueryString: true
        }
      };
      
      request(options, function (error, response, body) {
          if (error) throw new Error(error);
    
          console.log('body..');
          console.log(body);
          return body;
          
       
      });


    
  } catch (err) {
    throw err;
  }
};


