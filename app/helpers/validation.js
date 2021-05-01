const Joi = require("joi");
const { min } = require("moment");

module.exports = {
  validationUsers: (users) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required().strict(),
      fullName: Joi.string().required(),
    });
    return schema.validate(users);
  },
  validationUsersUpdate: (users) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      phoneNumber: Joi.number().required(),
      username: Joi.string().required(),
      fullName: Joi.string().required(),
    });
    return schema.validate(users);
  },
  validationUsersUpdatePassword: (users) => {
    const schema = Joi.object({
      currentPassword: Joi.string().required(),
      password: Joi.string().min(8).required().strict(),
      confirmPassword: Joi.string()
        .valid(Joi.ref("password"))
        .required()
        .strict(),
    });
    return schema.validate(users);
  },
  validationUsersResetPassword: (users) => {
    const schema = Joi.object({
      password: Joi.string().min(8).required().strict(),
      confirmPassword: Joi.string()
        .valid(Joi.ref("password"))
        .required()
        .strict(),
    });
    return schema.validate(users);
  },
};
