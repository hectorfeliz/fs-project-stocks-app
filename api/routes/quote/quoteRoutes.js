const express = require('express')
const { getQuote } = require('./quoteController');
const quoteRouter = express.Router();


quoteRouter.route('/').get(async (req, res) => {

    try {
      console.log('req was..');console.log(req.query.symbol);
      const result = await getQuote(req.query.symbol);
      console.log('response from controller was..')
      console.log(result);
      res.json(result).send();
      
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'internal server error' });
    }

  })


module.exports = quoteRouter;