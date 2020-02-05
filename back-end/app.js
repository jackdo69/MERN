const express = require('express');
const bodyParser = require('body-parser');

const placesRoutes = require('./routes/places-routes');

const app = express();

app.use(placesRoutes);

//Ignore the favicon
let ignoreFavicon = (req, res, next) => {
    if (req.originalUrl === '/favicon.ico') {
      res.status(204).json({nope: true});
    } else {
      next();
    }
  }
app.use(ignoreFavicon);

app.listen(5000);