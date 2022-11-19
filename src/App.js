import { Container } from "@chakra-ui/react";
import "./App.css";
import MainRoutes from "./pages/Routes";

function App() {
  return (
    <Container minWidth="100%" bg={"#FFFFFF"}  >
      <MainRoutes />
    </Container>
  );
}

export default App;
