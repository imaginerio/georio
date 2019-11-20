/* eslint-disable arrow-body-style */
const request = require('supertest');
const httpStatus = require('http-status');
const app = require('@app');
const { Layer } = require('@models/');

describe('POST /api/v1/make/type', () => {
  let body;
  let layerId;

  beforeEach(() => Layer.newLayer({
    geometry: 'point',
    title: 'Test layer'
  }).then((layer) => {
    layerId = layer;
    body = { title: 'Test type' };
  }));

  afterEach(() => {});

  it('should integrate api /make/type', () => {
    return request(app)
      .post(`/api/v1/make/type/${layerId}`)
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
