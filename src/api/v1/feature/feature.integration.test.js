/* eslint-disable arrow-body-style */
const request = require('supertest');
const httpStatus = require('http-status');
const app = require('@app');
const { Layer, Type } = require('@models/');

describe('POST /api/v1/feature', () => {
  let body;

  beforeEach(() => Layer.newLayer({ geometry: 'line' })
    .then(layer => Type.newType(layer, {})
      .then((type) => {
        body = {
          type,
          geometry: 'line'
        };
      })));

  afterEach(() => {});

  it('should integrate api /feature', () => {
    return request(app)
      .post('/api/v1/feature/create')
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
