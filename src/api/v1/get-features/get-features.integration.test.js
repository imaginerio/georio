/* eslint-disable arrow-body-style */
const request = require('supertest');
const httpStatus = require('http-status');
const newFeature = require('@services/new-feature');
const app = require('@app');
const { Layer, Type } = require('@models/');

describe('GET /api/v1/get/features', () => {
  let layerId;

  beforeEach(() => Layer.newLayer({ geometry: 'line' })
    .then((layer) => {
      layerId = layer;
      return Type.newType(layer, {})
        .then(type => newFeature({
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
        }));
    }));

  afterEach(() => {});

  it('should integrate api /get/features', () => {
    return request(app)
      .get(`/api/v1/get/features/${layerId}`)
      .expect(httpStatus.OK)
      .then((res) => {
        const json = JSON.parse(res.text);
        expect(json).toHaveProperty('features');
        expect(json.type).toBe('FeatureCollection');
      });
  });
});
