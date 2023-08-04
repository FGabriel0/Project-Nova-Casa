import React from "react";
import style from "./NewSetor.module.css";
import { useState, useRef,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";

const url = "http://localhost:3000/setores";
const urlInstituicao = "http://localhost:3000/instituicao";

const NewSetor = () => {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [observacao,setObservacao] = useState("")
  const [instituicao, setInstituicao] = useState([]);
  const [opcaoSelecionada, setOpcaoSelecionada] = useState("");

  const {  httpConfig, loading} = useFetch(url);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  function handlerCategory(e) {
    setOpcaoSelecionada(e.target.value);
  }

  const handlerSubmit = async (e) => {
    e.preventDefault();

    const produtos = {
      nome,
      telefone,
      observacao,
      instituicao: opcaoSelecionada,
    };

    await httpConfig(produtos, "POST");

    const validar = inputRef.current.checkValidity();
    if (validar) {
      navigate("/setores");
    }

    setNome("");
    setTelefone("");
    setObservacao("")
    setOpcaoSelecionada("");
  };

  useEffect(() => {
    fetch(urlInstituicao, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setInstituicao(data);
      })
      .catch((error) => console.log(error));
  }, []);
  return(
    <form className={style.form} onSubmit={handlerSubmit}>
    <h1>Novo Setor:</h1>
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
    <label>
      Telefone:
      <input
        type="text"
        ref={inputRef}
        value={telefone}
        placeholder="ex. (85) 9999-9999:"
        required
        onChange={(e) => setTelefone(e.target.value)}
      />
    </label>
    <label>
      Observação
      <input
        type="text"
        ref={inputRef}
        value={observacao}
        placeholder="Digite uma Observação:"
        required
        onChange={(e) => setObservacao(e.target.value)}
      />
    </label>
    <div className={style.select}>
      <label className={style.label_select}>
        Instituição
        <select
          ref={inputRef}
          value={opcaoSelecionada}
          onChange={handlerCategory}
        >
          <option value="">Selecione a Opção</option>
          {instituicao.map((option) => (
            <option key={option.id} value={option.nome}>
              {option.nome}
            </option>
          ))}
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

export default NewSetor;
