import Joi from 'joi';
import validation from 'express-joi-validation'
const validator = validation.createValidator({passError:true});
const hexRegForMongodbId = /^[a-fA-F0-9]{24}$/;

export default [
  validator.params(
    Joi.object().keys({
      "id": Joi.string().regex(hexRegForMongodbId).required(),
    }),
  ),
  validator.headers(
    Joi.object().keys({
      "content-type": Joi.string()
        .valid('application/json').required(),
    }).unknown(),
  )
]