import React, { useState,useContext } from "react";
import style from "./Transferencias.module.css";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { SidebarContext } from "../../context/SidebarContext";

const url = "http://localhost:3000/transferencia";

const Transferencias = () => {
  const { data: items, httpConfig, loading, error } = useFetch(url);
  const {sidebarActive} = useContext(SidebarContext)

  const [transferencias, setTransferencias] = useState([]);

  const [InputPesquise, setInputPesquise] = useState(false);

  function handlerInputPesquise() {
    setInputPesquise(true);
  }

  function handlerRemove(id) {
    const sair = window.confirm("Deseja Realmente Deletar essa Instituição?");
    if (sair) {
      const updatedTransferencias = transferencias.filter(
        (transferencia) => transferencia.id !== id
      );
      setTransferencias(updatedTransferencias);
      return httpConfig(id, "DELETE");
    }
  }

  return (
    <section className={style.container}>
      <div className={`${style.box} ${sidebarActive ? style.active : ""}`}>
        <h1>Instituição - Pesquisa</h1>
        <hr />
        <button onClick={handlerInputPesquise}>Pesquisa</button>
        <button className={style.btn}>
          <Link to="/newTranferencia">Novo</Link>
        </button>
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
        {loading && <p className={style.loading}>Carreagando Dados...</p>}
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
                items.map((transferencia) => (
                  <tr key={transferencia.id}>
                    <td>{transferencia.id}</td>
                    <td>{transferencia.description}</td>
                    <td>{transferencia.checkboxValues}</td>
                    <td className={style.icons}>
                      <button
                        className={style.delete}
                        onClick={() => handlerRemove(transferencia.id)}
                      >
                        <AiFillDelete />
                      </button>
                      <button>
                        <Link to={`/transferencia/${transferencia.id}`}>
                          <AiFillEdit />
                        </Link>
                      </button>
                    </td>
                  </tr>
                ))}
              {/* {transferencias.map((transferencia) => (
                <tr key={transferencia.id}>
                  <td>{transferencia.id}</td>
                  <td>{transferencia.description}</td>
                  <td>{transferencia.checkboxValues}</td>
                  <td className={style.icons}>
                      <button
                        className={style.delete}
                        onClick={() => handlerRemove(transferencia.id)}
                      >
                        <AiFillDelete />
                      </button>
                      <button>
                        <Link to={`/transferencia/${transferencia.id}`}>
                          <AiFillEdit />
                        </Link>
                      </button>
                    </td>
                </tr>
              ))} */}
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

export default Transferencias;
