const {db} = require('database/index.js');

console.log(`RETURN DB --> `, db);

// let repoSchema = {
//   id: Number,
//   Price: Number,
//   isPrime: String,
//   stockQty: Number,
//   shipCost: Number,
//   soldBy: String,
//   subscriptionProtectionPlanCost: Number,
//   TwoYrProtectionPlanCost: Number
// }

let fakeEntryCount = 100;
let entriesArray = [];

for (i = 1; i <= fakeEntryCount; i++) {
  let obj = {
    id: i,
    Price: (100 * Math.random()),
    isPrime: () => {

    },
    stockQty: () => {

    },
    shipCost: () => {

    },
    soldBy: () => {

    },
    subscriptionProtectionPlanCost: () => {

    },
    TwoYrProtectionPlanCost: () => {

    }
  }
  entriesArray.push(obj);
};

db.save(entriesArray, () => {
  console.log(`Fake entries saved!`);
});