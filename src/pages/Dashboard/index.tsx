import { AuthContext, IContactsInfo } from "../../contexts/AuthContext";
import { ModalEditUserContext } from "../../contexts/ModalEditUserContext";
import { ModalEditContactContext } from "../../contexts/ModalEditContactContext";
import { ModalEditUser } from "../../components/ModalEditUser";
import { ModalEditContact } from "../../components/ModalEditContact";
import { useContext } from "react";
import { schema } from "../../lib/yupCreateContact";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Form,
  Label,
  Span,
  Container,
  DashboardContainer,
  ContactsSection,
  ContactsList,
  ContactItem,
  LinkStyle as Link,
} from "../../styles/dashboard";

export const Dashboard = () => {
  const { userInfo, token, userId, registerContact, deleteUser } =
    useContext(AuthContext);
  const { showModalEditUser, setShowModalEditUser } =
    useContext(ModalEditUserContext);
  const {
    showModalEditContact,
    setShowModalEditContact,
    setIdContact,
    setFullNameContact,
    setEmailContact,
    setTelephoneContact,
  } = useContext(ModalEditContactContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IContactsInfo>({ resolver: yupResolver(schema) });

  function btnModalEditContact(
    fullName: string,
    email: string,
    telephone: string
  ) {
    setFullNameContact(fullName);
    setEmailContact(email);
    setTelephoneContact(telephone);
    setShowModalEditContact(true);
  }

  return (
    <>
      {token && userId ? (
        <Container>
          <Link
            to={"/login"}
            onClick={() => {
              window.localStorage.clear();
              toast.success("Logout feito com sucesso!");
            }}
          >
            Sair
          </Link>
          <DashboardContainer>
            <Form onSubmit={handleSubmit(registerContact)}>
              <h2>Criar Contato</h2>
              <div>
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
              </div>
              <div>
                <Label
                  htmlFor="email"
                  colorText={errors.email ? "red" : "black"}
                >
                  {errors.email ? errors.email.message : "Email"}
                </Label>
                <input
                  type="email"
                  id="email"
                  placeholder="Digite aqui seu email"
                  {...register("email")}
                />
              </div>
              <div>
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
              </div>
              <button type="submit">Adicionar Contato</button>
            </Form>
            <ContactsSection>
              <h2>Contatos</h2>
              {userInfo.contacts && (
                <ContactsList>
                  {userInfo.contacts.length > 0 ? (
                    userInfo.contacts.map((element) => (
                      <ContactItem
                        key={element.id}
                        onClick={() => {
                          btnModalEditContact(
                            element.fullName,
                            element.email,
                            element.telephone
                          );
                          setIdContact(element.id);
                        }}
                      >
                        <div>
                          <Span>Nome Completo:</Span> {element.fullName}
                        </div>
                        <div>
                          <Span>Email:</Span> {element.email}
                        </div>
                        <div>
                          <Span>Telefone:</Span> {element.telephone}
                        </div>
                      </ContactItem>
                    ))
                  ) : (
                    <p>Você não possui contatos registrados</p>
                  )}
                </ContactsList>
              )}
            </ContactsSection>
            <button
              className="btnEnd"
              onClick={() => setShowModalEditUser(true)}
            >
              Atualizar Cadastro
            </button>
            <button className="btnEnd" onClick={() => deleteUser()}>
              Deletar Conta
            </button>
            {showModalEditUser && <ModalEditUser />}
          </DashboardContainer>
          {showModalEditContact && <ModalEditContact />}
        </Container>
      ) : (
        <Navigate to="/" replace />
      )}
    </>
  );
};
