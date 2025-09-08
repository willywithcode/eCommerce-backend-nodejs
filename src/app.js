require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const app = express();

//init middlewares
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
//init db
require('./dbs/init.mongodb');
//init routes
app.get('/', (req, res, next) => {
    return res.status(200).json({message: 'Welcome to WSV eCommerce API'});
});
//handling errors
module.exports = app;
