import React from 'react'

import style from "./TablePagamentos.module.css"

import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import { useState} from "react";
import { useFetch } from '../../hooks/useFetch';

import { Link } from 'react-router-dom';

const url = "http://localhost:3000/pagamento";

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
        <h1>Métodos de Pagamento - Pesquisa</h1>
        <hr />
        <button onClick={handlerInputPesquise}>Pesquisa</button>
        <button className={style.btn}><Link to='/newPagamento'>Novo</Link></button>
        <button>Limpar</button>
       
        {InputPesquise && (
          <form>
            <label>
              Código:
              <input type="number" placeholder="Código" />
            </label>
            <label>
              Nome:
              <input type="text" placeholder="Digite Método de Pagamento:" />
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
                items.map((pagamento) => (
                  <tr key={pagamento.id}>
                    <td>{pagamento.id}</td>
                    <td>{pagamento.nome}</td>
                    <td className={style.icons}>
                      <button
                        className={style.delete}
                        onClick={() => handlerRemove(pagamento.id)}
                      >
                        <AiFillDelete />
                      </button>
                      <button>
                        <Link to={`/pagamento/${pagamento.id}`}>
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