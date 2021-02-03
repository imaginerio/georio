const Joi = require('joi');

module.exports = {
  name: 'updateFeature',
  path: '/api/v1/update/feature',
  type: 'post',
  joiSchema: {
    body: {
      properties: Joi.object({
        name: Joi.string().allow(null, ''),
        firstyear: Joi.number().integer(),
        lastyear: Joi.number().integer(),
        type: Joi.string(),
        tags: Joi.string().allow(null, ''),
        approved: Joi.boolean()
      }),
      geom: Joi.object().keys({
        coordinates: Joi.array().required(),
        type: Joi.string().required()
      })
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
