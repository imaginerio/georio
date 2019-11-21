/* eslint-disable arrow-body-style */
const request = require('supertest');
const httpStatus = require('http-status');
const app = require('@app');

describe('POST /api/v1/get/tilejson', () => {
  let body;

  beforeEach(() => {
    body = {};
  });

  afterEach(() => {});

  it('should integrate api /get/tilejson', () => {
    return request(app)
      .get('/api/v1/get/tilejson')
      .send(body)
      .expect(httpStatus.OK)
      .then((res) => {
        expect(res.body).toHaveProperty('tilejson');
        expect(res.body).toHaveProperty('tiles');
      });
  });
});
