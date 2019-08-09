const Joi = require('joi');

module.exports = {
  name: 'type',
  path: '/api/v1/type',
  type: 'post',
  joiSchema: {
    params: {
      action: Joi.string().valid('create', 'modify', 'delete')
    },
    body: {
      layer: Joi.string().required(),
      type: Joi.string(),
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
