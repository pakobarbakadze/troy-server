import Joi from "joi";

const registerValidation = (data: any) => {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).max(20).required(),
  });

  return schema.validate(data).error?.message;
};

const loginValidation = (data: any) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).max(20).required(),
  });

  return schema.validate(data).error?.message;
};

export { registerValidation, loginValidation };
