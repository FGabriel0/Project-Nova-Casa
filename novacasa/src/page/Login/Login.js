import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import styles from "./Login.module.css";

import { Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagemErro, setMensagemErro] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8082/api/admin/autenticar",
        {
          email: email,
          senha: senha,
        }
      );
      console.log(response.data); // Trata a resposta do servidor em caso de sucesso
      navigate(`/dashboard`)
    } catch (error) {
      setMensagemErro(error.response.data); // Trata a resposta do servidor em caso de erro
    }
  };

  return (
    <div className={styles.login}>
      <h1>Entrar</h1>
      <p>Faça o login para poder utilizar o sistema</p>

      <span className={styles.mensagemErro}>{mensagemErro}</span>
      <form onSubmit={handleLogin}>
        <label>
          <span>Email:</span>
          <input
            type="email"
            name="usuario"
            required
            placeholder="Nome de usuário"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>
        <label>
          <span>Senha:</span>
          <input
            type="password"
            name="password"
            required
            placeholder="Insira a senha"
            onChange={(e) => setSenha(e.target.value)}
            value={senha}
          />
        </label>
        <button className="btn">Entrar</button>
        {/* {usuariosLoading && (
            <button className="btn" disabled>
              Aguarde...
            </button>
          )} */}
        <p>
          <Link to="/cadastrar">Ainda não possui conta?</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
