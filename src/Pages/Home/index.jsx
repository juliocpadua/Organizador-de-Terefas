import { Redirect, useHistory } from "react-router-dom";
import Button from "../../Components/Button";
import { Container, Content } from "./styles";

function Home({ authenticated }) {
  const history = useHistory();

  const handleNavigation = (path) => {
    return history.push(path);
  };

  if (authenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Container>
      <Content>
        <h1>
          Do<span>.</span>it
        </h1>
        <span>Organize-se de forma fácil e efetiva</span>

        <div>
          <Button onClick={() => handleNavigation("/signup")} whiteSchema>
            Cadastre-se
          </Button>
          <Button onClick={() => handleNavigation("/login")}>Login</Button>
        </div>
      </Content>
    </Container>
  );
}

export default Home;
