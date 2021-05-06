var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var utilizadoresRouter = require('./routes/utilizadoresRouter');
var parquesRouter = require('./routes/parquesRouter');
var veiculosRouter = require('./routes/veiculosRouter');
var meiosPagamentoRouter = require('./routes/meiosPagamentoRouter');


var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/utilizadores', utilizadoresRouter);
app.use('/api/parques', parquesRouter);
app.use('/api/veiculos', veiculosRouter);
app.use('/api/meiospagamento', meiosPagamentoRouter);

module.exports = app;