require('dotenv').config({
	path: `${__dirname}/.env`
});

const express = require('express');
const cors = require('cors');

const app = express();

// Then use it before your routes are set up:
app.use(cors());


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const searchRouter = require('./routes/search/searchRoutes');
const quoteRouter = require('./routes/quote/quoteRoutes');

app.use('/api/search', searchRouter);
app.use('/api/quote', quoteRouter);


app.listen(process.env.PORT, () => {
	console.log(`server is running on port ${process.env.PORT}`);
});
