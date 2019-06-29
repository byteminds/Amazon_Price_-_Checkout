const mongoose = require('mongoose');

describe('database', () => {
  let db;
  let repos;
  let connection;

  beforeAll(async () => {
    connection = await mongoose.connect('mongodb://127.0.0.1/pricingComponentDB', {useNewUrlParser: true});
    db = await mongoose.connection;
    repos = await db.collection('pricingComponentDB');
  });

  afterAll(async (done) => {
    // db.dropDatabase();
    db.close();
    done();
  });

  it('should insert a doc into collection', async () => {

    // let repos = db.collection('pricingComponentDB');
    const mockData = {_id: 'some-user-id', name: 'Keenan'};
    await repos.deleteOne(mockData);
    await repos.insertOne(mockData);

    const insertedUser = await repos.findOne({_id: 'some-user-id'});
    expect(insertedUser).toEqual(mockData);
  });

  it('should contain at >=100 records', async () => {
    // let repos = await db.collection('pricingComponentDB');
    let records = await repos.find({}).exec((err, docs) => {
      docs = docs.map(o => o.toObject())
    });
    expect(records.length).toBeGreaterThanOrEqual(100);
  });
});