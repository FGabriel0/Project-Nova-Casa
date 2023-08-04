import React from 'react'
import style from "./Usuarios.module.css";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import { Link } from "react-router-dom";

const url = "http://localhost:3000/usuarios";

const Usuarios = () => {
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
        <h1>Usuários - Pesquisa</h1>
        <hr />
        <button onClick={handlerInputPesquise}>Pesquisa</button>
        <button className={style.btn}>
          <Link to="/newUsuario">Novo</Link>
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
                <td>Setor</td>
                <td>Instituicao</td>
                <td>Perfil</td>
                <td>Config</td>
              </tr>
            </thead>
            <tbody>
              {items &&
                items.map((usuario) => (
                  <tr key={usuario.id}>
                    <td>{usuario.id}</td>
                    <td>{usuario.nome}</td>
                    <td>{usuario.telefone}</td>
                    <td>{usuario.setor}</td>
                    <td>{usuario.instituicao}</td>
                    <td>{usuario.perfil}</td>
                    <td className={style.icons}>
                      <button
                        className={style.delete}
                        onClick={() => handlerRemove(usuario.id)}
                      >
                        <AiFillDelete />
                      </button>
                      <button>
                        <Link to={`/usuario/${usuario.id}`}>
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
  )
}

export default Usuarios