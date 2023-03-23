import * as yup from "yup";

export const schema = yup.object({
  fullName: yup.string().notRequired(),
  email: yup.string().email("Email inválido").notRequired(),
  password: yup
    .string()
    .notRequired()
    .matches(
      /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[$*&@#()!`'<>"~/?}[_{|;:=+^%,.}])[0-9a-zA-Z$*&@#`()!`'<>_"~/?}{|;:[=+^%,.}]{8,}$/,
      {
        message:
          "Senha com no mínimo 8 caracteres. Necessário ter letras, números e ao menos um símbolo",
        excludeEmptyString: true,
      }
    ),
  confirmPass: yup
    .string()
    .test(
      "confirm-password-required",
      "Confirmação de senha é obrigatória",
      function (value) {
        const { password } = this.parent;
        if (!password || password.length === 0) {
          return true;
        }
        return value === password;
      }
    )
    .test("confirm-password-match", "Senha não é igual", function (value) {
      const { password } = this.parent;
      return !value || value === password;
    }),
  telephone: yup
    .string()
    .notRequired()
    .matches(/^[0-9]{11}$/, {
      message: "Telefone deve conter apenas números e exatamente 11 caracteres",
      excludeEmptyString: true,
    }),
});
