/* eslint-disable arrow-body-style */
const request = require('supertest');
const httpStatus = require('http-status');
const app = require('@app');
const { Layer } = require('@models/');

describe('POST /api/v1/type', () => {
  let body;

  beforeEach(() => Layer.newLayer({ geometry: 'line' }).then((layer) => {
    body = {
      layer,
      data: {}
    };
  }));

  afterEach(() => {});

  it('should integrate api /type', () => {
    console.log(body);
    return request(app)
      .post('/api/v1/type/create')
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
