import React from "react";
import style from "./Setores.module.css";
import { useState } from "react";

import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import { Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";

const url = "http://localhost:3000/setores";

const Setores = () => {
  const { data: items, httpConfig, loading, error } = useFetch(url);
  const [InputPesquise, setInputPesquise] = useState(false);

  function handlerInputPesquise() {
    setInputPesquise(true);
  }

  function handlerRemove(id) {
    const sair = window.confirm(
      "Deseja Realmente Deletar esse Ponto de Vendas?"
    );
    if (sair) {
      window.location.reload();
      return httpConfig(id, "DELETE");
    }
  }

  return (
    <section className={style.container}>
      <div className={style.box}>
        <h1>Setores - Pesquisa</h1>
        <hr />
        <button onClick={handlerInputPesquise}>Pesquisa</button>
        <button className={style.btn}>
          <Link to="/newsetor">Novo</Link>
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
                <td>Obeservação</td>
                <td>Instituição</td>
                <td>Config</td>
              </tr>
            </thead>
            <tbody>
              {items &&
                items.map((setores) => (
                  <tr key={setores.id}>
                    <td>{setores.id}</td>
                    <td>{setores.nome}</td>
                    <td>{setores.telefone}</td>
                    <td>{setores.observacao}</td>
                    <td>{setores.instituicao}</td>
                    <td className={style.icons}>
                      <button
                        className={style.delete}
                        onClick={() => handlerRemove(setores.id)}
                      >
                        <AiFillDelete />
                      </button>
                      <button>
                        <Link to={`/EditSetores/${setores.id}`}>
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

export default Setores;
