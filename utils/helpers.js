const Handlebars = require('handlebars');

function formatDate(date) {
  return `${new Date(date).getMonth() + 1}/${new Date(
    date
  ).getDate()}/${new Date(date).getFullYear()}`;
}

Handlebars.registerHelper('verifyUserId', function (a, b, options) {
  if (a === b) {
    return options.fn(this);
  }
  return options.inverse(this);
});

module.exports = {
  formatDate,
};
