const express = require('express')
const { getSymbolSearch } = require('./searchController');
const router = express.Router();


  router.route('/').get(async (req, res) => {

    try {
      const result = await getSymbolSearch(req.query);
      res.json(result).send();
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'internal server error' });
    }

  })


module.exports = router;