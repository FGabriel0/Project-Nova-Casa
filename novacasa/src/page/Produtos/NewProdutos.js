import React from "react";
import style from "./NewProdutos.module.css";

import { useState, useEffect, useRef } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";

const url = "http://localhost:3000/produtos";
const urlPontodeVendas = "http://localhost:3000/pontodevendas";

const NewProduto = () => {
  const [nome, setNome] = useState("");
  const [vendavel, setVendavel] = useState("");
  const [pontodevendas, setPontodeVendas] = useState([]);
  const [opcaoSelecionada, setOpcaoSelecionada] = useState("");

  const { data: items, httpConfig, loading, error } = useFetch(url);
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [menssage, setMenssage] = useState("");

  function handlerCategory(e) {
    setOpcaoSelecionada(e.target.value);
  }

  const handlerSubmit = async (e) => {
    e.preventDefault();

    const produtos = {
      nome,
      vendavel,
      pontodevendas: opcaoSelecionada,
    };

    await httpConfig(produtos, "POST");

    const validar = inputRef.current.checkValidity();
    if (validar) {
      setMenssage("Novo Pagamento Finalizada");
      navigate("/produtos");
    }

    setNome("");
    setVendavel("");
    setOpcaoSelecionada("");
  };

  useEffect(() => {
    fetch(urlPontodeVendas, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPontodeVendas(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <form className={style.form} onSubmit={handlerSubmit}>
      <h1>Novo Produto:</h1>
      <label>
        Nome:
        <input
          type="text"
          ref={inputRef}
          value={nome}
          placeholder="Digite o nome:"
          required
          onChange={(e) => setNome(e.target.value)}
        />
      </label>
      <div className={style.select}>
        <label className={style.label_select}>
          Ponto de Vendas
          <select
            ref={inputRef}
            value={opcaoSelecionada}
            onChange={handlerCategory}
          >
            <option value="">Selecione a Opção</option>
            {pontodevendas.map((option) => (
              <option key={option.id} value={option.nome}>
                {option.nome}
              </option>
            ))}
          </select>
        </label>
        <label className={style.label_select}>
          Vendavel
          <select
            ref={inputRef}
            value={vendavel}
            onChange={(e) => setVendavel(e.target.value)}
          >
            <option value="">Selecione a Opção</option>
            <option value="Sim">Sim</option>
            <option value="Não">Não</option>
          </select>
        </label>
      </div>
      {loading && (
        <input type="submit" value="Aguarde" className={style.btn} disabled />
      )}
      {!loading && <input type="submit" value="Salvar" className={style.btn} />}
    </form>
  );
};

export default NewProduto;