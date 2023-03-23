import * as yup from "yup";

export const schema = yup.object({
  fullName: yup.string().required("Nome não preenchido"),
  email: yup.string().email("Email inválido").required("Email não preenchido"),
  telephone: yup
    .string()
    .required("Telefone não preenchido")
    .matches(
      /^[0-9]{11}$/,
      "Telefone deve conter apenas números e exatamente 11 caracteres"
    ),
});
