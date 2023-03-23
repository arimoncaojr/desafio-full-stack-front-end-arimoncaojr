import { AuthProvider } from "./AuthContext";
import { ModalEditUserProvider } from "./ModalEditUserContext";
import { ModalEditContactProvider } from "./ModalEditContactContext";

interface IProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: IProvidersProps) => {
  return (
    <AuthProvider>
      <ModalEditContactProvider>
        <ModalEditUserProvider>{children}</ModalEditUserProvider>
      </ModalEditContactProvider>
    </AuthProvider>
  );
};
