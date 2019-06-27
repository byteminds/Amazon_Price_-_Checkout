const mongoose = require('mongoose');

describe('insert', () => {
  let db;

  beforeAll(async () => {
    connection = await mongoose.connect('mongodb://127.0.0.1/pricingComponentDB', {useNewUrlParser: true});
    db = await mongoose.connection;
  });

  afterAll(async (done) => {

    db.close();
    done();
  });

  it('should insert a doc into collection', async () => {

    const repos = db.collection('pricingComponentDB');
    const mockUser = {_id: 'some-user-id', name: 'Keenan'};
    await repos.deleteOne(mockUser);
    await repos.insertOne(mockUser);

    const insertedUser = await repos.findOne({id: 'some-user-id'});
    expect(insertedUser).toEqual(mockUser);
  });
});
