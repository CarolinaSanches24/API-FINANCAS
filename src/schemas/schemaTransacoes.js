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
  valor: joi.number().positive().required().messages({
    "any.required": "O campo valor é obrigatório",
    "string.empty": "O campo valor é obrigatório",
    "number.base": "O campo valor tem que ser númerico",
  }),
  data: joi.string().required().messages({
    "any.required": "O campo data é obrigatório",
    "string.empty": "O campo data é obrigatório",
  }),
  categoria_id: joi.number().positive().required().messages({
    "any.required": "O campo categoria_id é obrigatório",
    "string.empty": "O campo categoria_id é obrigatório",
    "number.base": "O campo categoria_id  tem que ser númerico",
  }),
});

module.exports = {
  schemaTrasacao,
};
