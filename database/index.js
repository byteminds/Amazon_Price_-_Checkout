const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/pricingComponentDB');
const Faker = require('faker');

let repoSchema = {
  id: Number,
  Price: Number,
  isPrime: String,
  stockQty: Number,
  shipCost: Number,
  soldBy: String,
  subscriptionProtectionPlanCost: Number,
  TwoYrProtectionPlanCost: Number,
  customerCity: String,
  customerZip: Number,
  customerName: String
}

let db = {};

let Repo = mongoose.model('Repo', repoSchema);

db.save = (array, callback) => {
  Repo.deleteMany({}, () => {
    Repo.insertMany(array, (err) => {
      if (err) {
        console.log(`Error: insertMany function `, err)
      } else {
        callback();
      }
    })
  });
};

db.getDocument = (id, callback) => {
  Repo.find({id: id}, (err, items) => {
    if (err) {
      console.log(`Error with db.getDocument function `, err);
    } else {
      return callback(items);
    }
  });
};

// let docsArray = [];

//   Repo.find({}).stream() // this work here but not in the test suite (why?)
//       .on('data', docs => {
//          docsArray.push(docs);
//       })
//       .on('error', err => {
//         console.log(`ERROR: `, err)
//       })
//       .on('end',  () => {
//         return null;
//       })

module.exports.db = db;