const mongoose = require('mongoose');

describe('database', () => {
  let db;
  let repos;
  let connection;

  beforeAll(async () => {
    connection = await mongoose.connect('mongodb://127.0.0.1/pricingComponentDB', {useNewUrlParser: true});
    db = await mongoose.connection;
    repos = await db.collection('repos');
  });

  afterAll(async (done) => {
    // db.dropDatabase();
    db.close();
    done();
  });

  it('should insert a doc into collection and retrieve it', async () => {

    const mockData = {_id: 'some-user-id', name: 'Keenan'};
    await repos.deleteOne(mockData);
    await repos.insertOne(mockData);

    const insertedUser = await repos.findOne({_id: 'some-user-id'});
    expect(insertedUser).toEqual(mockData);
  });

  //BELOW CODE IS TRYING TO CALL ALL DOCUMENTS AND CHECK FOR >= 100 TOTAL, BUT COULDN'T MAKE IT WORK (6/29)

  // it('should contain >=100 records', async () => {
  //   // let repos = await db.collection('pricingComponentDB');
  //   // let records = async () => {
  //   //   console.log(`CHECK --> `, await repos.find({}).exec((err, docs) => {
  //   //     return docs;
  //   //   }))
  //   // } 
  //   // await records().then(docs => {
  //   //   // expect(docs.length).toBeGreaterThanOrEqual(100);
  //   //   console.log(`DOCS --> `, docs);
  //   // });
    // let docsArray = [];
  //   // let cursor = repos.find({}).cursor()
  //   // cursor.on('data', docs => {
  //   //   docsArray.push(docs);
  //   // })
  //   // .on('end', () => {
  //   //   expect(docsArray.length).toBeGreaterThanOrEqual(100);
  //   // })

  //   await repos.find({}).stream()
  //     .on('data', docs => {
  //       docsArray.push(docs);
  //     })
  //     .on('error', err => {
  //       console.log(`ERROR: `, err)
  //     })
  //     .on('end', () => {
  //       expect(docsArray.length).toBeGreaterThanOrEqual(100);
  //     })
  // });
});