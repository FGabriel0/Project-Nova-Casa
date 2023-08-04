import React from "react";
import style from "./instituicao.module.css";


import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import { useState,useContext} from "react";
import { SidebarContext } from "../../context/SidebarContext";
import { Link } from "react-router-dom";

import { useFetch } from "../../hooks/useFetch";
import Loading from "../../components/Loading";

const url = "http://localhost:3000/instituicao";

const Instituicao = () => {
  const {sidebarActive} = useContext(SidebarContext)
  const { data: items, httpConfig, loading, error } = useFetch(url);

  const [InputPesquise, setInputPesquise] = useState(false);

  function handlerInputPesquise() {
    setInputPesquise(true);
  }

  function handlerRemove(id) {
    const sair = window.confirm("Deseja Realmente Deletar essa Instituição?");
    if (sair) {
      window.location.reload()
      return httpConfig(id, "DELETE");
    }
  }

  return (
    <section className={style.container}>
      {loading  && <Loading/>}
      <div className={`${style.box} ${sidebarActive ? style.active : ""}`}>
        <h1>Instituição - Pesquisa</h1>
        <hr />
        <button onClick={handlerInputPesquise}>Pesquisa</button>
        <button className={style.btn}><Link to='/newInstituicao'>Novo</Link></button>
        <button>Limpar</button>   
        {InputPesquise && (
          <form>
            <label>
              Código:
              <input type="number" placeholder="Código" />
            </label>
            <label>
              Nome:
              <input type="text" placeholder="Digite o nome:" />
            </label>
          </form>
        )}
        <br />
        {error && <p className={style.error}>{error}</p>}
        {!error && (
          <table>
            <thead>
              <tr className={style.title_table}>
                <td>Código</td>
                <td>Nome</td>
                <td>Telefone</td>
                <td>Config</td>
              </tr>
            </thead>
            <tbody>
              {items &&
                items.map((Instituicao) => (
                  <tr key={Instituicao.id}>
                    <td>{Instituicao.id}</td>
                    <td>{Instituicao.nome}</td>
                    <td>{Instituicao.fone}</td>
                    <td className={style.icons}>
                      <button
                        className={style.delete}
                        onClick={() => handlerRemove(Instituicao.id)}
                      >
                        <AiFillDelete />
                      </button>
                      <button>
                        <Link to={`/instituicao/${Instituicao.id}`}>
                          <AiFillEdit />
                        </Link>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
            <tfoot>
              <tr>
                <FaArrowLeft /> 1 <FaArrowRight />
              </tr>
            </tfoot>
          </table>
        )}
      </div>
    </section>
  );
};

export default Instituicao;
