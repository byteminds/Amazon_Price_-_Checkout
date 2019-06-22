const {db} = require('database/index.js');

console.log(`RETURN DB --> `, db);

let entries = 100;

for (i = 1; i <= entries; i++) {
  let id = i;
  let price = (100 * Math.random());
}