import React from 'react'

import style from './TablePontodeVendas.module.css'

import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import { useState} from "react";
import { useFetch } from '../../hooks/useFetch';

import { Link } from 'react-router-dom';

const url = "http://localhost:3000/pontodevendas";

const TablePontodeVendas = () => {
  const [nome,setNome] = useState("");

  const { data: items, httpConfig, loading, error } = useFetch(url);

  const [InputPesquise, setInputPesquise] = useState(false);
  const [InputNovo, setInputNovo] = useState(false);

  function handlerInputPesquise() {
    setInputNovo(false);
    setInputPesquise(true);
  }

  function handlerInputNovo() {
    setInputPesquise(false);
    setInputNovo(true);
  }

  const handlerSubmit = async (e) =>{
    e.preventDefault()

    const pontodevendas ={
      nome
    }

    httpConfig(pontodevendas,"POST");

    setNome("")
  }

  function handlerRemove(id) {
    const sair = window.confirm("Deseja Realmente Deletar esse Ponto de Vendas?");
    if (sair) {
      window.location.reload()
      return httpConfig(id, "DELETE");
    }
  }

  return (
    <section className={style.container}>
      <div className={style.box}>
        <h1>Ponto de Vendas - Pesquisa</h1>
        <hr />
        <button onClick={handlerInputPesquise}>Pesquisa</button>
        <button onClick={handlerInputNovo}>Novo</button>
        <button>Limpar</button>
        {InputNovo && (
          <form onSubmit={handlerSubmit}>
            <label>
              Nome:
              <input
                type="text"
                value={nome}
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
              <input type="submit" value="Salvar" className={style.btn} />
            )}
          </form>
        )}
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
                <td>Config</td>
              </tr>
            </thead>
            <tbody>
              {items &&
                items.map((pointofsales) => (
                  <tr key={pointofsales.id}>
                    <td>{pointofsales.id}</td>
                    <td>{pointofsales.nome}</td>
                    <td className={style.icons}>
                      <button
                        className={style.delete}
                        onClick={() => handlerRemove(pointofsales.id)}
                      >
                        <AiFillDelete />
                      </button>
                      <button>
                        <Link to={`/pointofsales/${pointofsales.id}`}>
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

export default TablePontodeVendas