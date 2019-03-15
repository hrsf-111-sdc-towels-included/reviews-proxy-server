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

const picturesProxy = proxy('/pictures/*', { target: 'http://ec2-54-159-69-173.compute-1.amazonaws.com' });
const bookingProxy = proxy('/api/booking/*', { target: 'http://ec2-13-57-251-209.us-west-1.compute.amazonaws.com' });
const amenitiesProxy = proxy('/api/amenities/*', { target: 'http://ec2-54-67-8-180.us-west-1.compute.amazonaws.com' });
const reviewsProxy = proxy('/reviews/*', { target: 'http://ec2-18-191-179-140.us-east-2.compute.amazonaws.com' });

app.use(picturesProxy)
  .use(bookingProxy)
  .use(amenitiesProxy)
  .use(reviewsProxy);

app.get('/:homeID', (req, res) => {
  const { homeID } = req.params;
  res.redirect(`/index.html?homeID=${homeID}`);
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
