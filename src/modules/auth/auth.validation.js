import Joi from "joi";

const registerValidation = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({
      "string.empty": "الاسم مطلوب",
      "string.min": "الاسم لازم 3 أحرف على الأقل",
      "string.max": "الاسم ما يتجاوز 30 حرف",
    }),

  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.email": "البريد الإلكتروني غير صحيح",
      "string.empty": "البريد الإلكتروني مطلوب",
    }),

  phone: Joi.string()
    .pattern(/^[0-9]{11}$/)
    .required()
    .messages({
      "string.pattern.base": "رقم الهاتف لازم 11 رقم",
      "string.empty": "رقم الهاتف مطلوب",
    }),

  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .required()
    .messages({
      "string.min": "كلمة المرور لازم 8 أحرف على الأقل",
      "string.pattern.base": "كلمة المرور لازم فيها حروف كبيرة وصغيرة وأرقام",
      "string.empty": "كلمة المرور مطلوبة",
    }),

  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "any.only": "كلمة المرور غير متطابقة",
      "string.empty": "تأكيد كلمة المرور مطلوب",
    }),
});

const loginValidation = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.email": "البريد الإلكتروني غير صحيح",
      "string.empty": "البريد الإلكتروني مطلوب",
    }),

  password: Joi.string()
    .required()
    .messages({
      "string.empty": "كلمة المرور مطلوبة",
    }),
});

const refreshTokenValidation = Joi.object({
  refreshToken: Joi.string()
    .required()
    .messages({
      "string.empty": "refresh token مطلوب",
    }),
});

const logoutValidation = Joi.object({
  refreshToken: Joi.string()
    .required()
    .messages({
      "string.empty": "refresh token مطلوب",
    }),
});

export {
  registerValidation,
  loginValidation,
  refreshTokenValidation,
  logoutValidation,
};