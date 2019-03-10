require('newrelic');
const express = require('express');
const path = require('path');
const proxy = require('http-proxy-middleware');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '/../public')));
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const proxyTable = {
  '/reviews': 'http://localhost:3004',
};

const options = {
  target: '/',
  router: proxyTable,
};

const myProxy = proxy(options);

app.use(myProxy);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
