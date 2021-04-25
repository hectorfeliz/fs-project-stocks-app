const express = require('express')
const { getSymbolSearch } = require('./searchController');
const searchRouter = express.Router();


searchRouter.route('/').get(async (req, res) => {

    try {
      console.log('req was..');console.log(req.query.symbol);
      const result = await getSymbolSearch(req.query.symbol);
      console.log('response from controller was..')
      console.log(result);
      res.json(result).send();
      
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'internal server error' });
    }

  })


module.exports = searchRouter;