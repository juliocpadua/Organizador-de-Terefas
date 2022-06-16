import { Background, Container, Content, AnimationContainer } from "./styles";
import Button from "../../Components/Button";
import { Link, Redirect, useHistory } from "react-router-dom";
import Input from "../../Components/Input";
import { FiMail, FiLock } from "react-icons/fi";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../../Services/api";
import { toast } from "react-toastify";

function Login({ authenticated, setAuthenticated }) {
  const schema = yup.object().shape({
    email: yup.string().email("Email inválido").required("Campo obrigatório"),
    password: yup
      .string()
      .min(8, "Mínimo 8 dígitos")
      .required("Campo obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const history = useHistory();

  const onSubmitFunction = (data) => {
    api
      .post("/user/login", data)
      .then((response) => {
        const { token, user } = response.data;
        console.log(response.data);

        localStorage.setItem("@Doit:token", token);
        localStorage.setItem("@Doit:user", JSON.stringify(user));

        setAuthenticated(true);

        return history.push("/dashboard");
      })
      .catch((_) => toast.error("Email ou senha inválidos"));
  };

  if (authenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <form onSubmit={handleSubmit(onSubmitFunction)}>
            <h1>Login</h1>

            <Input
              icon={FiMail}
              label="Email"
              placeholder="Digite seu email"
              register={register}
              name="email"
              error={errors.email?.message}
            />
            <Input
              icon={FiLock}
              type="password"
              label="Senha"
              placeholder="Digite sua senha"
              register={register}
              name="password"
              error={errors.password?.message}
            />

            <Button type="submit">Entrar</Button>
            <p>
              Ainda não possui conta? Faça seu{" "}
              <Link to="/signup">cadastro</Link>
            </p>
          </form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
}

export default Login;
