const mongoose = require('mongoose');
const { Schema } = mongoose;

const transactionSchema = new Schema({ 
    symbol: {
        type: String,
        required: true,
    },
    exchange: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});

const portfolioSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  name: {
    type: String,
    required: true,
  },
  transactions: [transactionSchema],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});


portfolioSchema.methods.addTransaction = function({symbol, exchange, type, quantity, price}) {
    const portfolio = this;

    const newTransaction = new transactionSchema({
        symbol, exchange, type, quantity, price
    });

    portfolio.transactions.push(newTransaction);

    const updatedPortfolio = await portfolio.save();
    
}

module.exports = mongoose.model('Portfolio', portfolioSchema);