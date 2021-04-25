const express = require('express');
const { createPortfolio, findPortfolioByID, addTransaction } = require('./portfolioController');

const router = express.Router();


router.route('/')
  .post(async (req, res) => {
    const { name, userId = null } = req.body;

    try {
        const portfolio = await createPortfolio({ name, userId, });
        return portfolio;
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'internal server error' });
    }
});


router.route('/:id')
.get(async (req, res) => {
    try {
      const { params } = req;
      const portfolio = await findPortfolioByID(params.id);
      res.json({ data: portfolio });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'internal server error' });
    }
});


router.route('/:id/addtransaction')
.get(async (req, res) => {
    try {
      const { params } = req;
      const { symbol, exchange, type, quantity, price } = req.body;
      const portfolio = await addTransaction(params.id, symbol, exchange, type, quantity, price);
      res.json({ data: portfolio });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'internal server error' });
    }
});