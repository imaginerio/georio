/* eslint-disable arrow-body-style */
const request = require('supertest');
const httpStatus = require('http-status');
const app = require('@app');

describe('POST /api/v1/get/style', () => {
  let body;

  beforeEach(() => {
    body = {};
  });

  afterEach(() => {});

  it('should integrate api /get/style', () => {
    return request(app)
      .get('/api/v1/get/style')
      .send(body)
      .expect(httpStatus.OK)
      .then((res) => {
        expect(res.body).toHaveProperty('version');
        expect(res.body).toHaveProperty('name');
      });
  });
});
