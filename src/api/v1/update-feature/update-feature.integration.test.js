/* eslint-disable arrow-body-style */
const request = require('supertest');
const httpStatus = require('http-status');
const newFeature = require('@services/new-feature');
const app = require('@app');
const { Layer, Type } = require('@models/');

describe('POST /api/v1/update/feature', () => {
  const body = {
    firstyear: 1900
  };
  let id;
  let layer;

  beforeEach(() => Layer.newLayer({ geometry: 'line' })
    .then((layerId) => {
      layer = layerId;
      return Type.newType(layer, {})
        .then(type => newFeature({
          type,
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
        }).then((feature) => {
          ({ id } = feature.dataValues);
        }));
    }));

  afterEach(() => {});

  it('should integrate api /update/feature', () => {
    return request(app)
      .post(`/api/v1/update/feature/${layer}/${id}`)
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
