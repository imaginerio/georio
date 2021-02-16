const Joi = require('joi');

module.exports = {
  name: 'changeset',
  path: '/api/v1/changeset',
  type: 'post',
  joiSchema: {
    body: Joi.object({
      title: Joi.string(),
      changes: Joi.array().items(Joi.object({
        id: Joi.string().required(),
        approve: Joi.boolean().required()
      }))
    }).xor('title', 'changes'),
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
