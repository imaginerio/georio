/* eslint-disable arrow-body-style */
const request = require('supertest');
const httpStatus = require('http-status');
const app = require('@app');

describe('POST /api/v1/make/layer', () => {
  let body;

  beforeEach(() => {
    body = {
      geometry: 'point',
      title: 'Test layer'
    };
  });

  afterEach(() => {});

  it('should integrate api /make-layer', () => {
    return request(app)
      .post('/api/v1/make/layer')
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
