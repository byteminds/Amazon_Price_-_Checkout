const mongoose = require('mongoose');
// mongoose.connect('mongodb://127.0.0.1/pricingComponentDB');
mongoose.connect('mongodb://ec2-18-216-77-83.us-east-2.compute.amazonaws.com/pricingComponentDB');

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

module.exports.db = db;