var unirest = require("unirest");

exports.getSymbolSearch = async (request) => {
try {


  var req = unirest("GET", "https://twelve-data1.p.rapidapi.com/symbol_search");

  req.query({
    "symbol": request.query,
    "outputsize": "30"
  });
  
  req.headers({
    "x-rapidapi-key": "89c20ee19cmshb9b1a97ffa75f6bp13b9a9jsn1a1284be8d95",
    "x-rapidapi-host": "twelve-data1.p.rapidapi.com",
    "useQueryString": true
  });
  
  const responseData = await req.end(function (res) {
    if (res.error) throw new Error(res.error);
   
    console.log(res.body.data);
    return res.body;
  
  });

 // return responseData;


} catch (err) {
  throw err;
}
}







