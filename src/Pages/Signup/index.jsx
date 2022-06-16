import { Background, Container, Content, AnimationContainer } from "./styles";
import Button from "../../Components/Button";
import { Link, Redirect, useHistory } from "react-router-dom";
import Input from "../../Components/Input";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../../Services/api";
import { toast } from "react-toastify";

function Signup({ authenticated }) {
  const schema = yup.object().shape({
    name: yup.string().required("Campo obrigatório"),
    email: yup.string().email("Email inválido").required("Campo obrigatório"),
    password: yup
      .string()
      .min(8, "Mínimo 8 dígitos")
      .required("Campo obrigatório"),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password")], "Senhas diferentes")
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

  const onSubmitFunction = ({ name, email, password }) => {
    const user = { name, email, password };
    api
      .post("/user/register", user)
      .then((_) => {
        toast.success("Conta criada com sucesso.");
        return history.push("/login");
      })
      .catch((_) => {
        toast.error("Erro ao cadastrar, tente outro email.");
      });
  };

  if (authenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <form onSubmit={handleSubmit(onSubmitFunction)}>
            <h1>Cadastro</h1>
            <Input
              icon={FiUser}
              label="Nome"
              placeholder="Seu nome completo"
              register={register}
              name="name"
              error={errors.name?.message}
            />
            <Input
              icon={FiMail}
              label="Email"
              placeholder="Seu melhor email"
              register={register}
              name="email"
              error={errors.email?.message}
            />
            <Input
              icon={FiLock}
              type="password"
              label="Senha"
              placeholder="Uma senha bem segura"
              register={register}
              name="password"
              error={errors.password?.message}
            />
            <Input
              icon={FiLock}
              label="Confirmação da senha"
              placeholder="Confirmação da senha"
              type="password"
              register={register}
              name="passwordConfirm"
              error={errors.passwordConfirm?.message}
            />
            <Button type="submit">Enviar</Button>
            <p>
              Já tem uma conta? Faça seu <Link to="/login">login</Link>
            </p>
          </form>
        </AnimationContainer>
      </Content>
    </Container>
  );
}

export default Signup;
