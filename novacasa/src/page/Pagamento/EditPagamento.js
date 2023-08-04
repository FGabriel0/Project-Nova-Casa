import React from "react";

import { useParams } from "react-router-dom";
import { useState, useEffect, useRef,useContext } from "react";
import { useFetch } from "../../hooks/useFetch";
import { SidebarContext } from "../../context/SidebarContext";
import style from "./EditPagamento.module.css";

const EditTablePontodeVendas = () => {
  const { id } = useParams();
  const {sidebarActive} = useContext(SidebarContext)
  const url = `http://localhost:3000/pagamento/${id}`;

  const inputRef = useRef(null);
  
  const [editPagamento, setEditPagamento] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [menssage, setMenssage] = useState("");

  const { loading, httpConfig } = useFetch(url);

  const [nome, setNome] = useState("");

  useEffect(() => {
    const url = `http://localhost:3000/pagamento/${id}`;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setEditPagamento(data);
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
      const pagamento = {
        nome,
      };

      const validar = inputRef.current.checkValidity();
      if (validar) {
        setMenssage("Edição Finalizada");
      }
      setNome("");

      await httpConfig(pagamento, "PUT");

      if (typeof window !== "undefined" && window.location) {
        window.location.reload();
      }
    }
  };
  return (
    <section className={style.container}>
      <div className={`${style.box} ${sidebarActive ? style.active : ""}`}>
        <div>
          <h1>Método de Pagamento: {editPagamento.nome}</h1>
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
                    {editPagamento.nome}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className={style.form}>
              <form onSubmit={handlerSubmit}>
                <label>
                  <span>Novo Nome:</span>
                  <input
                    type="text"
                    value={nome}
                    ref={inputRef}
                    placeholder="Digite o nome:"
                    required
                    onChange={(e) => setNome(e.target.value)}
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
                {!loading && (
                  <input type="submit" value="Editar" className="btn" />
                )}
                {menssage && <p className="confirm">{menssage}</p>}
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default EditTablePontodeVendas;
