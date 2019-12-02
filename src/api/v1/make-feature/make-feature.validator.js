const Joi = require('joi');

module.exports = {
  name: 'feature',
  path: '/api/v1/feature',
  type: 'post',
  joiSchema: {
    body: {
      type: Joi.string().required(),
      dataType: Joi.string().valid('geojson', 'wkt'),
      data: Joi.object()
    },
    response: {
      200: {
        description: 'OK',
        body: {
          responseCode: 200,
          responseMessage: Joi.string().required(),
          response: {}
        }
      },
      400: {
        description: 'Error Response',
        body: {
          responseCode: 400,
          responseMessage: Joi.string().required(),
          response: {
            errors: Joi.array().items(Joi.object().keys({
              errorCode: Joi.string().required(),
              errorTitle: Joi.string().required(),
              errorDescription: Joi.string().required(),
              errorDebugDescription: Joi.string()
            }))
          }
        }
      }
    }
  }
};
