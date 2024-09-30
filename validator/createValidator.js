const Joi = require('joi');
const validator = require('express-joi-validation')
  .createValidator({passError:true});

module.exports = [
  validator.body(
    Joi.object().keys({
      name: Joi.string().required(),
      description: Joi.string().required(),
      dueDate: Joi.number()
        .min(new Date().getTime()).required(),
    })
  ),
]