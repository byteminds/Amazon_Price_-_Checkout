const mongoose = require('mongoose');
mongoose.connect('mongodb:localhost/fetcher');

let repoSchema = {
  id: Number,
  Price: Number,
  isPrime: String,
  stockQty: Number,
  shipCost: Number,
  soldBy: String,
  subscriptionProtectionPlanCost: Number,
  TwoYrProtectionPlanCost: Number
}

let db = {};

let Repo = mongoose.model('Repo', repoSchema);

db.save = (array, err, callback) => {
  if (err) {
    console.log(`db.save error!`);
  }
  Repo.
};

db.getDocument = (id, err, callback) => {
  console.log(`This function is not defined yet!`)
};

module.exports.db = db;