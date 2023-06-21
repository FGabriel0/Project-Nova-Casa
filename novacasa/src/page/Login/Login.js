import React, { useState} from "react";

import styles from "./Login.module.css";

import { Link} from "react-router-dom";

import { useAuthentication } from "../../hooks/useAuthentication";

const Login = () => {
  const url = "http://localhost:3000/usuario";

  const {
    loading: usuariosLoading,
    Auth
  } = useAuthentication(url);

  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    

    const usuarios = {
      displayName,
      password
    }
    setError("Usuário ou Senha Incorreto")
    await Auth(usuarios)
 
  };

  return (
    <div className={styles.login}>
      <h1>Entrar</h1>
      <p>Faça o login para poder utilizar o sistema</p>
      {usuariosLoading ? (
        <p>Carregando usuários...</p>
      ) : (
        <form onSubmit={handleLogin}>
          <label>
            <span>Usuário:</span>
            <input
              type="text"
              name="usuario"
              required
              placeholder="Nome de usuário"
              onChange={(e) => setDisplayName(e.target.value)}
              value={displayName}
            />
          </label>
          <label>
            <span>Senha:</span>
            <input
              type="password"
              name="password"
              required
              placeholder="Insira a senha"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </label>
          {!usuariosLoading && <button className="btn">Entrar</button>}
          {usuariosLoading && (
            <button className="btn" disabled>
              Aguarde...
            </button>
          )}
          <p>
            <Link to="/cadastrar">Ainda não possui conta?</Link>
          </p>
          {error && <p className="error">{error}</p>}
        </form>
      )}
    </div>
  );
};

export default Login;
