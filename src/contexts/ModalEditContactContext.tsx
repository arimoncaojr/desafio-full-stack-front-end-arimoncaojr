import React, { useState, createContext } from "react";
import { toast } from "react-toastify";
import { Api } from "../services/api";

interface IModalEditContactContextProps {
  children: React.ReactNode;
}

export interface IModalContactEdit {
  fullName?: string;
  email?: string;
  telephone?: string;
}

interface IModalEditContactContext {
  showModalEditContact: boolean;
  idContact: string;
  fullNameContact: string;
  emailContact: string;
  telephoneContact: string;
  setShowModalEditContact: React.Dispatch<React.SetStateAction<boolean>>;
  setIdContact: React.Dispatch<React.SetStateAction<string>>;
  setFullNameContact: React.Dispatch<React.SetStateAction<string>>;
  setEmailContact: React.Dispatch<React.SetStateAction<string>>;
  setTelephoneContact: React.Dispatch<React.SetStateAction<string>>;
  editContact: (newInfos: IModalContactEdit) => void;
  deleteContact: () => void;
}

export const ModalEditContactContext = createContext<IModalEditContactContext>(
  {} as IModalEditContactContext
);

export const ModalEditContactProvider = ({
  children,
}: IModalEditContactContextProps) => {
  const token: string | null = localStorage.getItem("@desafioFullStack:Token");

  const [showModalEditContact, setShowModalEditContact] =
    useState<boolean>(false);
  const [idContact, setIdContact] = useState<string>("");
  const [fullNameContact, setFullNameContact] = useState<string>("");
  const [emailContact, setEmailContact] = useState<string>("");
  const [telephoneContact, setTelephoneContact] = useState<string>("");

  const editContact = (newInfos: IModalContactEdit) => {
    Api.patch(
      `/contacts/${idContact}`,
      { ...newInfos },
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((res) => {
        toast.success("Contato editado com sucesso!");
        setShowModalEditContact(false);
      })
      .catch((err) => {
        toast.error("Ops, algo deu errado!");
      });
  };

  function deleteContact() {
    Api.delete(`/contacts/${idContact}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(() => {
      toast.success("Contato deletado com sucesso!");
      setShowModalEditContact(false);
    });
  }

  return (
    <ModalEditContactContext.Provider
      value={{
        showModalEditContact,
        setShowModalEditContact,
        setIdContact,
        fullNameContact,
        setFullNameContact,
        emailContact,
        setEmailContact,
        telephoneContact,
        setTelephoneContact,
        editContact,
        deleteContact,
      }}
    >
      {children}
    </ModalEditContactContext.Provider>
  );
};
