/* eslint-disable arrow-body-style */
const request = require('supertest');
const httpStatus = require('http-status');
const app = require('@app');
const { Layer, Type } = require('@models/');

describe('POST /api/v1/make/feature', () => {
  let body;

  beforeEach(() => Layer.newLayer({ geometry: 'line' })
    .then(layer => Type.newType(layer, {})
      .then((type) => {
        body = {
          type,
          geometry: 'line',
          data: {
            type: 'Feature',
            properties: {
              firstyear: 1980,
              lastyear: 1985,
              name: 'This guys'
            },
            geometry: {
              coordinates: [
                [
                  -43.21282938122792,
                  -22.942188338773022
                ],
                [
                  -43.2361753284934,
                  -22.94756304479307
                ],
                [
                  -43.23548868298553,
                  -22.90266189008574
                ],
                [
                  -43.21317270398151,
                  -22.90993562218003
                ],
                [
                  -43.19772318005619,
                  -22.914046689449563
                ]
              ],
              type: 'LineString'
            }
          }
        };
      })));

  afterEach(() => {});

  it('should integrate api /make/feature', () => {
    return request(app)
      .post('/api/v1/make/feature')
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
