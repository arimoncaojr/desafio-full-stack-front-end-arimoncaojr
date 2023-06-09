import {
  ModalEditUserContext,
  IModalEditUser,
} from "../../contexts/ModalEditUserContext";
import { useContext } from "react";
import { schema } from "../../lib/yupEditUser";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ContainerModal } from "../../styles/modal";
import { Label } from "../../styles";

export const ModalEditUser = () => {
  const { setShowModalEditUser, editUser } = useContext(ModalEditUserContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IModalEditUser>({
    resolver: yupResolver(schema),
  });

  return (
    <ContainerModal>
      <div className="modal">
        <button
          className="closeModalRegister"
          onClick={() => {
            setShowModalEditUser(false);
            reset();
          }}
        >
          X
        </button>

        <form onSubmit={handleSubmit(editUser)}>
          <h3>Editar Informações</h3>
          <Label
            htmlFor="fullName"
            colorText={errors.fullName ? "red" : "black"}
          >
            {errors.fullName ? errors.fullName.message : "Nome Completo"}
          </Label>
          <input
            type="text"
            id="fullName"
            placeholder="Digite seu nome completo"
            {...register("fullName")}
          />
          <Label htmlFor="email" colorText={errors.email ? "red" : "black"}>
            {errors.email ? errors.email.message : "Email"}
          </Label>
          <input
            type="email"
            id="email"
            placeholder="Digite aqui seu email"
            {...register("email")}
          />
          <Label
            htmlFor="password"
            colorText={errors.password ? "red" : "black"}
          >
            {errors.password ? errors.password.message : "Senha"}
          </Label>
          <input
            type="password"
            id="password"
            placeholder="Digite aqui sua senha"
            {...register("password")}
          />
          <Label
            htmlFor="confirmPass"
            colorText={errors.confirmPass ? "red" : "black"}
          >
            {errors.confirmPass
              ? errors.confirmPass.message
              : "Confirmar Senha"}
          </Label>
          <input
            type="password"
            id="confirmPass"
            placeholder="Digite novamente sua senha"
            {...register("confirmPass")}
          />
          <Label
            htmlFor="telephone"
            colorText={errors.telephone ? "red" : "black"}
          >
            {errors.telephone ? errors.telephone.message : "Telefone"}
          </Label>
          <input
            type="text"
            id="telephone"
            placeholder="Digite seu telefone com DDD"
            {...register("telephone")}
          />
          <button className="btnRegister" type="submit">
            Editar
          </button>
        </form>
      </div>
    </ContainerModal>
  );
};
