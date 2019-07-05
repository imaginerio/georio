/* eslint-disable arrow-body-style */
const request = require('supertest');
const httpStatus = require('http-status');
const app = require('@app');
const newLayerService = require('@services/new-layer');

describe('POST /api/v1/getExtent', () => {
  let body;

  beforeEach(() => {
    return newLayerService('testExtentLayer', 'polygon');
  });

  afterEach(() => {});

  it('should integrate api /layer', () => {
    return request(app)
      .get('/api/v1/layer/extent/testExtentLayer/')
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
