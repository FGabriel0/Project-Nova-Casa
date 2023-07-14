import React from "react";
import style from "./Produtos.module.css";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useState,useContext } from "react";
import { SidebarContext } from "../../context/SidebarContext";
import { useFetch } from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";

const url = "http://localhost:3000/produtos";
const urlPontodeVendas = "http://localhost:3000/pontodevendas";

const Produtos = () => {
  const { data: items, httpConfig, loading, error } = useFetch(url);
  const {sidebarActive} = useContext(SidebarContext)
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
      {loading && <Loading/>}
      <div className={`${style.box} ${sidebarActive ? style.active : ""}`}>
        <h1>Ponto de Vendas - Pesquisa</h1>
        <hr />
        <button onClick={handlerInputPesquise}>Pesquisa</button>
        <button className={style.btn}>
          <Link to="/newProduto">Novo</Link>
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
        {error && <p className={style.error}>{error}</p>}
        {!error && (
          <table>
            <thead>
              <tr className={style.title_table}>
                <td>Código</td>
                <td>Nome</td>
                <td>Ponto de venda</td>
                <td>Vendaval</td>
                <td>Config</td>
              </tr>
            </thead>
            <tbody>
              {items &&
                items.map((produtos) => (
                  <tr key={produtos.id}>
                    <td>{produtos.id}</td>
                    <td>{produtos.nome}</td>
                    <td>{produtos.pontodevendas}</td>
                    <td>{produtos.vendavel}</td>
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
  );
};

export default Produtos;
