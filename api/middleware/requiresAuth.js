const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

module.exports = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://invest-trackr.us.auth0.com/.well-known/jwks.json",
  }),
  audience: "https://stocks-app-auth.com/api",
  issuer: "https://invest-trackr.us.auth0.com/",
  algorithms: ["RS256"],
});
