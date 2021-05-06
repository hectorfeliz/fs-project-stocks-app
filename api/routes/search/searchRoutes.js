const express = require('express')
const { getSymbolSearch } = require('./searchController');
const searchRouter = express.Router();


searchRouter.route('/').get(async (req, res) => {

    try {
  
      const result = await getSymbolSearch(req.query.symbol);
      res.json(result).send();
      
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'internal server error' });
    }

  })


module.exports = searchRouter;