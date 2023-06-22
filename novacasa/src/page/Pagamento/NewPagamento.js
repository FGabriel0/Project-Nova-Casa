import React from "react";
import { useState, useRef } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import style from "./NewPagamento.module.css";

const url = "http://localhost:3000/pagamento";

const NewPagamento = () => {
  const inputRef = useRef(null);
  const [nome, setNome] = useState("");
  const navigate = useNavigate();
  const [menssage, setMenssage] = useState("");

  const { data: items, httpConfig, loading, error } = useFetch(url);

  const handlerSubmit = async (e) => {
    e.preventDefault();

    const pagamento = {
      nome,
    };

    await httpConfig(pagamento, "POST");

    const validar = inputRef.current.checkValidity();
    if (validar) {
      setMenssage("Novo Pagamento Finalizada");
      navigate("/pagamento");
    }

    setNome("");
  };

  return (
    <form className={style.form} onSubmit={handlerSubmit}>
      <h1>Novo Pagamento</h1>

      <label>
        Nome:
        <input
          ref={inputRef}
          type="text"
          value={nome}
          placeholder="Digite o nome do Pagamento:"
          required
          onChange={(e) => setNome(e.target.value)}
        />
      </label>
      {loading && (
        <input type="submit" value="Aguarde" className={style.btn} disabled />
      )}
      {!loading && <input type="submit" value="Salvar" className={style.btn} />}
    </form>
  );
};

export default NewPagamento;
