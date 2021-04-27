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
  modifiedAt: {
    type: Date,
    default: Date.now(),
  },
});



module.exports = mongoose.model('Portfolio', portfolioSchema);