import React from "react";

import style from "./TablePontodeVendas.module.css";

import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { mensagemSucesso,mensagemErro } from "../../components/notificationToastr/toastr";

import { useState, useContext,useEffect } from "react";
import { get,del } from "../../service/ApiService";

import { Link } from "react-router-dom";
import { SidebarContext } from "../../context/SidebarContext";
import Loading from "../../components/Loading";

const TablePontodeVendas = () => {
  const { sidebarActive } = useContext(SidebarContext);
  const [loading, setLoading] = useState(true);
  const [InputPesquise, setInputPesquise] = useState(false);
  const[item , setItem] = useState([]);


  function handlerInputPesquise() {
    setInputPesquise(true);
  }

  function handlerRemove(id) {
    const endpoint = `/api/pontodevenda/${id}`;

  return del(endpoint)
    .then(response => {
      mensagemSucesso(`excluído com sucesso!`);
      window.location.reload()
    })
    .catch(error => {
      mensagemErro(`Erro ao excluir o recurso com ID ${id}:`, error);
    });
  }

  useEffect(()=>{
    async function fetchData(){
      try {
        const response = await get("/api/pontodevenda");
        const responseData = response.data;
        setItem(responseData);
        setLoading(false)    
      } catch (error) {
        console.log("Erro na busca dos Dados", error);
      }
    }

    fetchData();
  },[]);

  return (
    <section className={style.container}>
      {loading && <Loading/>}
      <div className={`${style.box} ${sidebarActive ? style.active : ""}`}>
        <h1>Ponto de Vendas - Pesquisa</h1>
        <hr />
        <button onClick={handlerInputPesquise}>Pesquisa</button>
        <button className={style.btn}>
          <Link to="/newPontodeVendas">Novo</Link>
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
        
          <table>
            <thead>
              <tr className={style.title_table}>
                <td>Código</td>
                <td>Nome</td>
                <td>Config</td>
              </tr>
            </thead>
            <tbody>
              {item &&
                item.map((pointofsales) => (
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
       
      </div>
    </section>
  );
};

export default TablePontodeVendas;
