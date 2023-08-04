import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";

import styles from "./Cadastra.module.css";

import { useAuthentication } from "../../hooks/useAuthentication";

const Cadastra = () => {
  const url = "http://localhost:3000/adm";

  const { httpConfig, loading, error: authError,confirm } = useAuthentication(url);

  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const inputRef = useRef(null);

  const handlerSubmit = async (e) => {
    e.preventDefault();

    setError();

    const usuario = {
      displayName,
      password,
    };

    if (password !== confirmPassword) {
      setError("* As senhas precisam ser iguais! *");
      return;
    }

    setDisplayName("");
    setPassword("");
    setConfirmPassword("");

    httpConfig(usuario, "POST");
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className={styles.register}>
      <h1>Cadastre-se</h1>
      <form onSubmit={handlerSubmit}>
        <label>
          <span>Nome:</span>
          <input
            type="text"
            name="displayName"
            ref={inputRef}
            required
            placeholder="Nome do usuário"
            onChange={(e) => setDisplayName(e.target.value)}
            value={displayName}
          />
        </label>
        <label>
          <span>Senha:</span>
          <input
            type="password"
            name="password"
            ref={inputRef}
            required
            placeholder="Insira a senha"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>
        <label>
          <span>Confirmação de senha:</span>
          <input
            type="password"
            name="confirmPassword"
            ref={inputRef}
            required
            placeholder="Confirme a senha"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
        </label>
        {!loading && <button className="btn">Entrar</button>}
        {loading && (
          <button className="btn" disabled>
            Aguarde...
          </button>
        )}
        <p>
          <Link to="/login">Acesse sua Conta!</Link>
        </p>
        {confirm && <p className={styles.confirm}>{confirm}</p>}
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

export default Cadastra;
