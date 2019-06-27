/* eslint-disable arrow-body-style */
const request = require('supertest');
const httpStatus = require('http-status');
const app = require('@app');

describe('POST /api/v1/TileJSON', () => {
  let body;

  beforeEach(() => {
    body = {};
  });

  afterEach(() => {});

  it('should integrate api /TileJSON', () => {
    return request(app)
      .get('/api/v1/TileJSON')
      .send(body)
      .expect(httpStatus.OK)
      .then((res) => {
        expect(res.body).toHaveProperty('tilejson');
        expect(res.body).toHaveProperty('tiles');
      });
  });
});
