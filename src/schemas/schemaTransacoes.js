const joi = require("joi");

const schemaTrasacao = joi.object({
  tipo: joi.string().required().messages({
    "any.required": "O campo tipo é obrigatório",
    "string.empty": "O campo tipo é obrigatório",
  }),
  descricao: joi.string().required().messages({
    "any.required": "O campo descricao é obrigatório",
    "string.empty": "O campo descricao é obrigatório",
  }),
  valor: joi.number().required().messages({
    "any.required": "O campo valor é obrigatório",
    "string.empty": "O campo valor é obrigatório",
  }),
  data: joi.string().required().messages({
    "any.required": "O campo data é obrigatório",
    "string.empty": "O campo data é obrigatório",
  }),
  categoria_id: joi.number().required().messages({
    "any.required": "O campo categoria_id é obrigatório",
    "string.empty": "O campo categoria_id é obrigatório",
  }),
});

const schemaLogin = joi.object({
  email: joi.string().email().required().messages({
    "any.required": "O campo email é obrigatório",
    "string.empty": "O campo email é obrigatório",
    "string.email": "O campo email precisa ter um formato válido",
  }),
  senha: joi.string().min(5).required().messages({
    "any.required": "O campo senha é obrigatório",
    "string.empty": "O campo senha é obrigatório",
    "string.min": "A senha precisa conter, no mínimo, 5 caracteres",
  }),
});

module.exports = {
  schemaTrasacao,
  schemaLogin,
};
