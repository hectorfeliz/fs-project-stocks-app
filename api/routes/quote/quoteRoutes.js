const express = require('express')
const { getQuote } = require('./quoteController');
const quoteRouter = express.Router();


quoteRouter.route('/').get(async (req, res) => {

    try {
      const result = await getQuote(req.query.symbol);
      res.json(result);
      
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'internal server error' });
    }

  })


module.exports = quoteRouter;