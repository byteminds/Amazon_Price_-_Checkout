const {db} = require('../database/index');
const Faker = require('faker');
const Chance = require('chance');

let chance = new Chance();

let fakeEntryCount = 100;
let entriesArray = [];

for (i = 1; i <= fakeEntryCount; i++) {
  let obj = {
    id: i,
    Price: chance.floating({ min: 49, max: 999, fixed: 0 }) + 0.99,
    isPrime: chance.bool({likelihood: 59}),
    stockQty: chance.integer({min: 0, max: 20}),
    shipCost: chance.floating({ min: 0, max: 49, fixed: 0 }) + 0.99,
    soldBy: Faker.company.companyName(),
    subscriptionProtectionPlanCost: chance.floating({ min: 1, max: 19, fixed: 0 }) + 0.99,
    TwoYrProtectionPlanCost: chance.floating({ min: 19, max: 99, fixed: 0 }) + 0.99
  }
  entriesArray.push(obj);
};

db.save(entriesArray, () => {
  console.log(`Fake entries saved!`);
});