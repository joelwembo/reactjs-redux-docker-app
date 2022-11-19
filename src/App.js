import { Container } from "@chakra-ui/react";
import "./App.css";
import MainRoutes from "./pages/Routes";

function App() {
  return (
    <Container minWidth="8xl" bg={"#F8F8FF"}  >
      <MainRoutes />
    </Container>
  );
}

export default App;
