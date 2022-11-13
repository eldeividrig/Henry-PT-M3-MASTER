const express = require('express');
const {sumArray, pluck} = require('./utils');

const app = express();

app.use(express.json()); // for parsing application/json

app.get('/', (req, res) => {
  res.send({
    message: 'hola',
  });
});

app.get('/test', (req, res) => {
  res.send({
    message: 'test',
  });
});

app.post('/sum', (req, res) => {
  const {a, b} = req.body;
  res.send({    
    result: a+b
  });
});

app.post('/product', (req, res) => {
  const {a, b} = req.body;
  if (typeof a !== 'number' || typeof b !== 'number') return res.sendStatus(400);
  res.send({
    result: a * b,
  });
});

app.post('/sumArray', (req, res) => {
  const {array, num} = req.body;
  if (!array || !num && num!== 0) return res.sendStatus(400);
  return res.json({
    result: sumArray(array, num),
  });
});

app.post('/numString', (req, res) => {
  const {s} = req.body;
  if (typeof s !== 'string' || s === '') return res.sendStatus(400);
  return res.send({
    result: s.length,
  });
});

app.post('/pluck', (req, res) => {
  const {array, prop} = req.body;
  if (!prop || !Array.isArray(array)) return res.sendStatus(404);
  return res.send({
    result: pluck(array, prop)
  });
});


module.exports = app; // Exportamos app para que supertest session la pueda ejecutar
