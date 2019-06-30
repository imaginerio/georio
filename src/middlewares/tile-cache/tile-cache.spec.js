/* eslint-disable arrow-body-style */
const { tileCacheMiddleware } = require('./tile-cache.middleware');

describe('Middleware - tileCacheMiddleware', () => {
  beforeEach(() => {});

  afterEach(() => {});

  it('should pass request', (done) => {
    tileCacheMiddleware({}, {}, (err) => {
      expect(err).toBe(undefined);
      done();
    });
  });
});
