import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { post } from "../../service/ApiService";
import {
  mensagemSucesso,
  mensagemErro,
} from "../../components/notificationToastr/toastr";

import { validar } from "../../service/CadastraAdmin";

import styles from "./Cadastra.module.css";

const Cadastra = () => {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlerSubmit = async (e) => {
    e.preventDefault();

    const errorEncontrados = validar(nome, email, senha, confirmPassword);

    if (Object.keys(errorEncontrados).length > 0) {
      errorEncontrados.forEach((msg, index) => {
        mensagemErro(msg);
      });
      return;
    }

    try {
      const response = await post("/api/admin", {
        nome: nome,
        email: email,
        senha: senha,
      });
      mensagemSucesso("Usuário Cadastrado Com Sucesso");
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.data) {
        mensagemErro(error.response.data);
      }
    }
  };

  return (
    <div className={styles.register}>
      <h1>Cadastre-se</h1>
      <form onSubmit={handlerSubmit}>
        <label>
          <span>Nome:</span>
          <input
            type="text"
            name="nome"
            placeholder="Nome do usuário"
            onChange={(e) => setNome(e.target.value)}
            value={nome}
          />
        </label>
        <label>
          <span>Email:</span>
          <input
            type="email"
            name="email"
            placeholder="Digite seu email: "
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>
        <label>
          <span>Senha:</span>
          <input
            type="password"
            name="password"
            placeholder="Insira a senha"
            onChange={(e) => setSenha(e.target.value)}
            value={senha}
          />
        </label>
        <label>
          <span>Confirmação de senha:</span>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirme a senha"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
        </label>
        <button className="btn">Cadastra</button>
        <p>
          <Link to="/login">Acesse sua Conta!</Link>
        </p>
      </form>
    </div>
  );
};

export default Cadastra;
