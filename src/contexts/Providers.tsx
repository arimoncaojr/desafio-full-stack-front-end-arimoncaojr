import { AuthProvider } from "./AuthContext";
import { ModalEditUserProvider } from "./ModalEditUserContext";

interface IProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: IProvidersProps) => {
  return (
    <AuthProvider>
      <ModalEditUserProvider>{children}</ModalEditUserProvider>
    </AuthProvider>
  );
};
