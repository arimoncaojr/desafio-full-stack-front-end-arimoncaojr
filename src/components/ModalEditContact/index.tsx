import {
  ModalEditContactContext,
  IModalContactEdit,
} from "../../contexts/ModalEditContactContext";
import { useContext } from "react";
import { schema } from "../../lib/yupEditContact";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ContainerModal } from "../../styles/modal";
import { Label } from "../../styles";

export const ModalEditContact = () => {
  const {
    setShowModalEditContact,
    editContact,
    deleteContact,
    fullNameContact,
    emailContact,
    telephoneContact,
  } = useContext(ModalEditContactContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IModalContactEdit>({
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: fullNameContact,
      email: emailContact,
      telephone: telephoneContact,
    },
  });

  return (
    <ContainerModal>
      <div className="modal">
        <button
          className="closeModalRegister"
          onClick={() => {
            setShowModalEditContact(false);
            reset();
          }}
        >
          X
        </button>
        <form onSubmit={handleSubmit(editContact)}>
          <h3>Editar Contato</h3>
          <Label
            htmlFor="fullName"
            colorText={errors.fullName ? "red" : "black"}
          >
            {errors.fullName ? errors.fullName.message : "Nome Completo"}
          </Label>
          <input
            type="text"
            id="fullName"
            className="input"
            placeholder="Digite seu nome completo"
            {...register("fullName")}
          />
          <Label htmlFor="email" colorText={errors.email ? "red" : "black"}>
            {errors.email ? errors.email.message : "Email"}
          </Label>
          <input
            type="email"
            id="email"
            className="input"
            placeholder="Digite aqui seu email"
            {...register("email")}
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
            className="input"
            placeholder="Digite seu telefone com DDD"
            {...register("telephone")}
          />
          <div className="divBtns">
            <button className="btnSaveChanges" type="submit">
              Salvar
            </button>
            <button
              className="btnDeleteContact"
              type="button"
              onClick={() => deleteContact()}
            >
              Excluir
            </button>
          </div>
        </form>
      </div>
    </ContainerModal>
  );
};
