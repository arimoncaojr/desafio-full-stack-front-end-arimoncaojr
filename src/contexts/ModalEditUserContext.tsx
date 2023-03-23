import React, { useState, createContext } from "react";
import { toast } from "react-toastify";
import { Api } from "../services/api";

interface IModalEditUserProps {
  children: React.ReactNode;
}

export interface IModalEditUser {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPass?: string;
  telephone?: string;
}

interface IModalEditUserContext {
  showModalEditUser: boolean;
  setShowModalEditUser: React.Dispatch<React.SetStateAction<boolean>>;
  editUser: (newData: IModalEditUser) => void;
}

export const ModalEditUserContext = createContext<IModalEditUserContext>(
  {} as IModalEditUserContext
);

export const ModalEditUserProvider = ({ children }: IModalEditUserProps) => {
  const [showModalEditUser, setShowModalEditUser] = useState<boolean>(false);

  const token: string | null = localStorage.getItem("@desafioFullStack:Token");
  const userId: string | null = localStorage.getItem("@desafioFullStack:ID");

  const editUser = (newData: IModalEditUser) => {
    Api.patch(
      `/users/${userId}`,
      { ...newData },
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((res) => {
        setShowModalEditUser(false);
        toast.success("Informações editadas com sucesso!");
      })
      .catch((err) => {
        toast.error("Ops, algo deu errado, tente novamente!");
      });
  };

  return (
    <ModalEditUserContext.Provider
      value={{
        showModalEditUser,
        setShowModalEditUser,
        editUser,
      }}
    >
      {children}
    </ModalEditUserContext.Provider>
  );
};
