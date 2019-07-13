const request = require("supertest");
const server = require('../server/index.js');

describe('API', () => {
  it(`should respond with data object`, async () => {
      const response = await request(server).get('/api/1');
      expect(response.status).toEqual(200);
      expect(response.text).toBeDefined();
      expect(typeof response.body).toBe("object");
  });
});