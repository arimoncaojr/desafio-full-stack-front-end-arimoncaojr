import * as yup from "yup";

export const schema = yup.object({
  fullName: yup.string().notRequired(),
  email: yup.string().email("Email inválido").notRequired(),
  telephone: yup
    .string()
    .notRequired()
    .matches(/^[0-9]{11}$/, {
      message: "Telefone deve conter apenas números e exatamente 11 caracteres",
      excludeEmptyString: true,
    }),
});
