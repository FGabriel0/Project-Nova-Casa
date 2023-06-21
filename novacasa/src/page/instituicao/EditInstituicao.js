import React from "react";
import style from "./EditInstituicao.module.css";

import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useFetch } from "../../hooks/useFetch";

const EditInstituicao = () => {
  const { id } = useParams();
  const inputRef = useRef(null);

  const url = `http://localhost:3000/instituicao/${id}`;

  const [editInstituicao, setEditInstituicao] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [menssage, setMenssage] = useState("");

  const { data, loading, httpConfig } = useFetch(url);

  const [nome, setNome] = useState("");
  const [fone, setFone] = useState("");

  useEffect(() => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setEditInstituicao(data);
      })
      .catch((error) => console.log(error));
  }, [id]);

  function handlerEditForm() {
    setShowEditForm(!showEditForm);
  }

  const handlerSubmit = async (e) => {
    e.preventDefault();

    const sair = window.confirm(
      "Deseja Realmente essa Editar essa Instituição?"
    );
    if (sair) {
      const instituicao = {
        nome,
        fone,
      };

      const validar = inputRef.current.checkValidity();
      if (validar) {
        setMenssage("Edição Finalizada");
      }
      setNome("");
      setFone("");

      await httpConfig(instituicao, "PUT");

      if (typeof window !== 'undefined' && window.location) {
        window.location.reload();
      }

    }
  };

  return (
    <section className={style.container}>
      <div className={style.box}>
        <div>
          <h1>Instituição: {editInstituicao.nome}</h1>
          <hr />
          <button>Pesquisa</button>
          <button>Novo</button>
          {!loading && (
            <button onClick={handlerEditForm}>
              {!showEditForm ? "Editar" : "Fechar"}
            </button>
          )}

          {!showEditForm ? (
            <div className={style.infor}>
              <hr />
              {loading ? (
                <p>Carregando Dados...</p>
              ) : (
                <div>
                  <p>
                    <span>Nome: </span>
                    {editInstituicao.nome}
                  </p>
                  <p>
                    <span>Telefone: </span>
                    {editInstituicao.fone}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className={style.form}>
              <form onSubmit={handlerSubmit}>
                <label>
                  <span>Nome:</span>
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
                  <span>Telefone:</span>
                  <input
                    type="number"
                    placeholder="ex. (99) 99999-9999"
                    ref={inputRef}
                    value={fone}
                    onChange={(e) => setFone(e.target.value)}
                    required
                  />
                </label>
                {loading && (
                  <input
                    type="submit"
                    value="Aguarde"
                    className={style.btn}
                    disabled
                  />
                )}
                {!loading && <input type="submit" value="Editar" className="btn"/>}
                {menssage && <p className="confirm">{menssage}</p>}
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default EditInstituicao;
