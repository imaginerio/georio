const Joi = require('joi');

module.exports = {
  name: 'change',
  path: '/api/v1/change',
  type: 'post',
  joiSchema: {
    body: {
      approved: Joi.boolean(),
      originalId: Joi.string().length(8),
      newId: Joi.string().length(8)
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
