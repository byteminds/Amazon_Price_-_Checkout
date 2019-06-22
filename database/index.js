const db = require('mongoose');
mongoose.connect('mongodb:localhost/fetcher');

module.exports.db = db;