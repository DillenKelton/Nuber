const findRatingAverage = (ratings) => {
  return ratings.reduce((a, b) => a + b) / ratings.length;
};

module.exports = { findRatingAverage };
