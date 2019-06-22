const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/fetcher');

let db = {};

let Repo = mongoose.model('Repo', repoSchema);

db.save = (array, callback) => {
  Repo.insertMany(array, (err) => {
    if (err) {
      console.log(`Error: insertMany function`)
    } else {
      callback();
    }
  })
};

db.getDocument = (id, err, callback) => {
  console.log(`This function is not defined yet!`)
};

module.exports.db = db;