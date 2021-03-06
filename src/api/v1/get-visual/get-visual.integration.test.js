/* eslint-disable arrow-body-style */
const request = require('supertest');
const httpStatus = require('http-status');
const app = require('@app');

describe('POST /api/v1/getVisual', () => {
  let body;

  beforeEach(() => {
    body = {};
  });

  afterEach(() => {});

  it('should integrate api /getVisual', () => {
    return request(app)
      .get('/api/v1/get/visual')
      .send(body)
      .expect(httpStatus.OK)
      .then((res) => {
        expect(res.body).toHaveProperty('responseCode');
        expect(res.body).toHaveProperty('responseMessage');
        expect(res.body.responseCode).toBe(200);
        expect(res.body.responseMessage).not.toBe(undefined);
      });
  });
});
