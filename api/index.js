require('dotenv').config();

const config = require('./config');
const uri = config.DATABASE_URL;

const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const app = express();

// Then use it before your routes are set up:
app.use(cors());

const path = require('path')



app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const searchRouter = require('./routes/search/searchRoutes');
const quoteRouter = require('./routes/quote/quoteRoutes');

app.use('/api/search', searchRouter);
app.use('/api/quote', quoteRouter);


mongoose.connect(uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  )
  .then(() => {
    app.listen(config.PORT, () => {
      console.log('server is running on port 8080');
    });
  })
  .catch((err) => console.log(err));

  // server.js at the very end of the file.
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('./build'));
    // only add this part if you are using React Router
    app.get('*', (req,res) =>{
        console.log(path.join(__dirname+'/build/index.html'));
        res.sendFile(path.join(__dirname+'/build/index.html'));
    });
}