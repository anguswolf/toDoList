import Joi from 'joi';
import validation from 'express-joi-validation';
const validator = validation.createValidator({passError:true});

export default [
  validator.body(
    Joi.object().keys({
      email: Joi.string().required(),
      password: Joi.string().required(),
    })
  ),
]