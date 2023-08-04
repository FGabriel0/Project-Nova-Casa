import React from 'react'
import style from "./Produto.module.css";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { Link } from "react-router-dom";

const url = "http://localhost:3000/produtos";

const Produto = () => {

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
        <h1>Tipos de Produtos - Pesquisa</h1>
        <hr />
        <button onClick={handlerInputPesquise}>Pesquisa</button>
        <button className={style.btn}>
          <Link to="/newProdutos">Novo</Link>
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
                <td>Preço</td>
                <td>Tipo</td>
                <td>Ponto de venda</td>
                <td>Fornecedor</td>
                <td>Ativo</td>
                <td>Config</td>
              </tr>
            </thead>
            <tbody>
              {items &&
                items.map((produtos) => (
                  <tr key={produtos.id}>
                    <td>{produtos.id}</td>
                    <td>{produtos.nome}</td>
                    <td>R$ {produtos.price}</td>
                    <td>{produtos.tipo}</td>
                    <td>{produtos.pontodevenda}</td>
                    <td>{produtos.fornecedor}</td>
                    <td>{produtos.ativo}</td>
                    <td className={style.icons}>
                      <button
                        className={style.delete}
                        onClick={() => handlerRemove(produtos.id)}
                      >
                        <AiFillDelete />
                      </button>
                      <button>
                        <Link to={`/produtos/${produtos.id}`}>
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

export default Produto