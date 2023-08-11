import React, { useState,useEffect } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { post } from "../../service/ApiService";

import { mensagemErro } from "../../components/notificationToastr/toastr";

import styles from "./Login.module.css";

import { Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");



  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await post("/api/admin/autenticar", { 
        email: email, 
        senha: senha
      });
      localStorage.setItem(`_usuario_logado`, JSON.stringify(response.data));
      navigate(`/dashboard`);
    } catch (error) {
      if (error.response && error.response.data) {
        mensagemErro(error.response.data);
      } 
    }
  };

  const searchParams = new URLSearchParams(location.search);
  const isVisitante = searchParams.get("visitante");

  useEffect(() => {
    if (isVisitante === "true") {
      navigate("/login")
      mensagemErro("Você deve esta logado para ter acesso")
    }
  }, [isVisitante]);

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
