/* eslint-disable arrow-body-style */
const request = require('supertest');
const httpStatus = require('http-status');
const app = require('@app');

describe('GET /api/v1/tiles', () => {
  beforeEach(() => {});

  afterEach(() => {});

  it('should integrate api /tiles', () => {
    return request(app)
      .get('/api/v1/tiles/14/3852/6771.pbf')
      // .send(body)
      .expect(httpStatus.OK);
    // .then((res) => {
    //   expect(res.body).toHaveProperty('responseCode');
    //   expect(res.body).toHaveProperty('responseMessage');
    //   expect(res.body.responseCode).toBe(200);
    //   expect(res.body.responseMessage).not.toBe(undefined);
    // });
  });
});
