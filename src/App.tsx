import { RoutesMain } from "./routes";
import { ToastContainer } from "react-toastify";
import { GlobalStyle } from "./styles/global";

function App() {
  return (
    <>
      <GlobalStyle />
      <RoutesMain />
      <ToastContainer
        autoClose={1000}
        toastStyle={{
          background: "gray",
          color: "white",
        }}
      />
    </>
  );
}

export default App;
