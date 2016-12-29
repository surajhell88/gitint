var constants = require('./constants')

var store = require('prettiest')({ json: constants.storeFile });

module.exports = store;