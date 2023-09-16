import React from "react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ValidarInstituicao } from "../../service/ValidarInstituicao";
import { post } from "../../service/ApiService";
import style from "./NewInstituicao.module.css";
import { mensagemSucesso,mensagemErro } from "../../components/notificationToastr/toastr";



const NewInstituicao = () => {
  const navigate = useNavigate()
  const inputRef = useRef(null);

  const [nome, setNome] = useState("");
  const [fone, setFone] = useState("");


  const handlerSubmit = async (e) => {
    e.preventDefault();

    const errorEncontrados = ValidarInstituicao(nome, fone);

    if (Object.keys(errorEncontrados).length > 0) {
      errorEncontrados.forEach((msg, index) => {
        mensagemErro(msg);
      });
      return;
    }

    try {
      const response = await post("/api/instituicao", {
        nome: nome,
        fone: fone
      });
      mensagemSucesso("Instituição Salvo Com Sucesso");
      navigate("/instituicao");
    } catch (error) {
      if (error.response && error.response.data) {
        mensagemErro(error.response.data);
      }
    }

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
          
          onChange={(e) => setNome(e.target.value)}
        />
      </label>

      <label>
        Telefone:
        <input
          ref={inputRef}
          type="text"
          placeholder="ex. (99) 9 12345678"
          value={fone}
          onChange={(e) => setFone(e.target.value)}
          
        />
      </label>      
      <input type="submit" value="Salvar" className={style.btn} />
    </form>
  );
};

export default NewInstituicao;
