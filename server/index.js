require('newrelic');
const express = require('express');
const path = require('path');
const proxy = require('http-proxy-middleware');

const app = express();
const PORT = 80;

app.use(express.static(path.join(__dirname, '/../public')));
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const apiProxy = proxy('/reviews/*', { target: 'http://ec2-18-191-179-140.us-east-2.compute.amazonaws.com' });
app.use(apiProxy);

app.get('/:homeID', (req, res) => {
  const { homeID } = req.params;
  res.redirect(`/index.html?homeID=${homeID}`);
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
