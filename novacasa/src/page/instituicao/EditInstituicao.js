import React from "react";
import style from "./EditInstituicao.module.css";
import { SidebarContext } from "../../context/SidebarContext";

import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef, useContext } from "react";
import { useFetch } from "../../hooks/useFetch";
import { put, get } from "../../service/ApiService";
import Sidebar from "../../components/Sidebar";
import Loading from "../../components/Loading";
import {
  mensagemErro,
  mensagemSucesso,
} from "../../components/notificationToastr/toastr";

const EditInstituicao = () => {
  const { id } = useParams();
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const { sidebarActive } = useContext(SidebarContext);
  const [dados, setDados] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);

  const [nome, setNome] = useState("");
  const [fone, setFone] = useState("");

  function handlerEditForm() {
    setShowEditForm(!showEditForm);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await get(`/api/instituicao/${id}`);
        const responseData = response.data;
        setDados(responseData);
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
      fone,
    };

    try {
      const res = await put(`/api/instituicao/${id}`, campos);

      mensagemSucesso("Instituição Atualizada");
      navigate("/instituicao");
    } catch (error) {
      mensagemErro("Erro ao Atualizar os Dados");
    }
  };

  return (
    <section className={style.container}>
      <Sidebar />
      <div className={`${style.box} ${sidebarActive ? style.active : ""}`}>
        <div>
          <h1>Instituição: {dados.nome}</h1>
          <hr />
          <button>Pesquisa</button>
          <button>Novo</button>

          {<Loading /> && (
            <button onClick={handlerEditForm}>
              {!showEditForm ? "Editar" : "Fechar"}
            </button>
          )}

          {!showEditForm ? (
            <div className={style.infor}>
              <hr />
              <div>
                <p>
                  <span>Nome: </span>
                  {dados.nome}
                </p>
                <p>
                  <span>Telefone: </span>
                  {dados.fone}
                </p>
              </div>
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
                    onChange={(e) => setNome(e.target.value)}
                  />
                </label>

                <label>
                  <span>Telefone:</span>
                  <input
                    type="text"
                    placeholder="ex. (99) 99999-9999"
                    ref={inputRef}
                    value={fone}
                    onChange={(e) => setFone(e.target.value)}
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

export default EditInstituicao;
