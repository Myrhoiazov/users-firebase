import Joi from 'joi';

const schema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  secondName: Joi.string().min(3).max(20).required(),
  email: Joi.string()
    .pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
    .required(),
  tel: Joi.string()
    .pattern(/(?=.*\+[0-9]{3}\s?[0-9]{2}\s?[0-9]{3}\s?[0-9]{4,5}$)/)
    .required(),
  birthYear: Joi.date().iso().required(),
  avatar: Joi.any(),
});


export default schema;
