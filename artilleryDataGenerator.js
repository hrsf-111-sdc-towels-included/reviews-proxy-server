'use strict';

module.exports = {
  generateReview
}

const faker = require('faker');
const moment = require('moment');

function uuid (
  a                  // placeholder
) {
  return a           // if the placeholder was passed, return
    ? (              // a random number from 0 to 15
      a ^            // unless b is 8,
      Math.random()  // in which case
      * 16           // a random number from
      >> a/4         // 8 to 11
      ).toString(16) // in hexadecimal
    : (              // or otherwise a concatenated string:
      [1e5] +        // 10000000 +
      -1e3
      ).replace(     // replacing
        /[018]/g,    // zeroes, ones, and eights with
        uuid            // random hex digits
      )
}

function generateReview (userContext, events, done) {
  const createdAt = moment(new Date()).format('YYYY-MM-DD');
  const homeID = faker.random.number({ min: 1, max: 10000000 });
  const reviewID = uuid();
  const username = faker.image.avatar().slice(47, -8);
  const accuracy = faker.random.number({ min: 1, max: 5 });
  const communication = faker.random.number({ min: 1, max: 5 });
  const cleanliness = faker.random.number({ min: 1, max: 5 });
  const location = faker.random.number({ min: 1, max: 5 });
  const checkIn = faker.random.number({ min: 1, max: 5 });
  const value = faker.random.number({ min: 1, max: 5 });
  const complaints = faker.random.boolean();
  const comment = faker.lorem.sentences();

  userContext.vars.createdAt = createdAt;
  userContext.vars.homeID = homeID;
  userContext.vars.reviewID = reviewID;
  userContext.vars.username = username;
  userContext.vars.accuracy = accuracy;
  userContext.vars.communication = communication;
  userContext.vars.cleanliness = cleanliness;
  userContext.vars.location = location;
  userContext.vars.checkIn = checkIn;
  userContext.vars.value = value;
  userContext.vars.complaints = complaints;
  userContext.vars.comment = comment;
  return done();
}
