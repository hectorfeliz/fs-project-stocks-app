require('dotenv').config({
	path: `${__dirname}/.env`
});
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const app = express();

// Then use it before your routes are set up:
app.use(cors());

const path = require('path')

app.use('/', express.static(path.join(__dirname, '../build')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const searchRouter = require('./routes/search/searchRoutes');
const quoteRouter = require('./routes/quote/quoteRoutes');

app.use('/api/search', searchRouter);
app.use('/api/quote', quoteRouter);



mongoose.connect('mongodb://localhost:27017/stocks-app',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  )
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('server is running on port 8080');
    });
  })
  .catch((err) => console.log(err));