import React from "react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import style from "./NewInstituicao.module.css";

const url = "http://localhost:3000/instituicao";

const NewInstituicao = () => {
  const navigate = useNavigate()
  const inputRef = useRef(null);

  const [nome, setNome] = useState("");
  const [fone, setFone] = useState("");

  const { data: items, httpConfig, loading, error } = useFetch(url);
  const [menssage, setMenssage] = useState("");

  const handlerSubmit = async (e) => {
    e.preventDefault();

    const instituicao = {
      nome,
      fone,
    };

    httpConfig(instituicao, "POST");

    const validar = inputRef.current.checkValidity();
    if (validar) {
      setMenssage("Novo Instituição Finalizada");
      navigate("/instituicao")
    }

    setFone("");
    setNome("");
  };
  return (
    <form className={style.form} onSubmit={handlerSubmit}>
        <h1>Nova Instituição</h1>
      <label>
        Nova Instituição:
        <input
          type="text"
          value={nome}
          ref={inputRef}
          placeholder="Digite o nome:"
          required
          onChange={(e) => setNome(e.target.value)}
        />
      </label>

      <label>
        Telefone:
        <input
          ref={inputRef}
          type="number"
          placeholder="ex. (99) 99999-9999"
          value={fone}
          onChange={(e) => setFone(e.target.value)}
          required
        />
      </label>
      {loading && (
        <input type="submit" value="Aguarde" className={style.btn} disabled />
      )}
      {!loading && <input type="submit" value="Salvar" className={style.btn} />}
      {menssage && <p className="confirm">{menssage}</p>}
    </form>
  );
};

export default NewInstituicao;
