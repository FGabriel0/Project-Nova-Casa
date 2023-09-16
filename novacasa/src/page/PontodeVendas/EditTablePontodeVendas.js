import React from "react";

import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef, useContext } from "react";
import { get, put } from "../../service/ApiService";
import {
  mensagemSucesso,
  mensagemErro,
} from "../../components/notificationToastr/toastr";
import { SidebarContext } from "../../context/SidebarContext";
import style from "./EditTablePontodeVendas.module.css";
import Loading from "../../components/Loading";

const EditTablePontodeVendas = () => {
  const { id } = useParams();
  const { sidebarActive } = useContext(SidebarContext);

  const inputRef = useRef(null);
  const navigate = useNavigate();

  const [showEditForm, setShowEditForm] = useState(false);
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);

  const [nome, setNome] = useState("");

  function handlerEditForm() {
    setShowEditForm(!showEditForm);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await get(`/api/instituicao/${id}`);
        const responseData = response.data;
        setDados(responseData);
        setLoading(false);
      } catch (error) {
        console.log("Erro na busca dos Dados", error);
      }
    }

    fetchData();
  }, []);

  const handlerSubmit = async (e) => {
    e.preventDefault();

    const campos = {
      nome,
    };

    try {
      const res = await put(`/api/pontodevenda/${id}`, campos);

      mensagemSucesso("Ponto de Venda Atualizada");
      navigate("/pointofsales");
    } catch (error) {
      mensagemErro("Erro ao Atualizar os Dados");
    }
  };
  return (
    <section className={style.container}>
      <div className={`${style.box} ${sidebarActive ? style.active : ""}`}>
        <div>
          <h1>Ponto de Venda: {dados.nome}</h1>
          <hr />
          <button>Pesquisa</button>
          <button>Novo</button>
          {loading ? (
            <Loading />
          ) : (
            <button onClick={handlerEditForm}>
              {!showEditForm ? "Editar" : "Fechar"}
            </button>
          )}

          {!showEditForm ? (
            <div className={style.infor}>
              <hr />
              {loading ? (
                <Loading />
              ) : (
                <div>
                  <p>
                    <span>Nome: </span>
                    {dados.nome}
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

                  <input type="submit" value="Editar" className="btn" />
               
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default EditTablePontodeVendas;
