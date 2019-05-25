const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const compression = require('compression');
const mongoose = require('mongoose');
const morgan = require('morgan');
const routes = require('./routes');
const dotenv = require('dotenv');



const isProduction= process.env.NODE_ENV === 'prod';

if (!isProduction) {
  dotenv.config({ path: ".env.dev" });
}

const passportConfig = require('./passport');


const mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/mydb';
mongoose.Promise = global.Promise;
mongoose.connection.on('connected', (ref) => {
  console.log(` Successfully connected to ${process.env.NODE_ENV} database on startup`)
})

mongoose.connection.on('error', (err) => {
  console.error(`Failed to connected to ${process.env.NODE_ENV} database on startup`, err)
})

mongoose.connection.on('disconnected', () => {
  console.log(`Mongoose default connection to ${process.env.NODE_ENV} database disconnected`)
})

mongoose.connect(mongoUrl, {useNewUrlParser: true}).then(
  () => { },
).catch(err => {
  console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
  // process.exit();
});


const app = express();


// registering middlewares
app.use(compression());
app.use(morgan());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

// register routes
app.use('/', routes);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

if (!isProduction) {
  app.use(function(err, req, res, next) {
    if (!isProduction) {
      console.log(err.stack);
    }

    res.status(err.status || 500);

    res.json({'errors': {
      message: err.message,
      error: err
    }});
  });
}

const server = app.listen(8080, () => {
  console.log('Server up at port : 8080');
});















































