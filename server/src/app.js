const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { port, client } = require('./config/config');

const app = express();

app.set('port', port || 4000);
app.use(cors({origin: client}));
app.use(morgan('dev'));

module.exports = app;