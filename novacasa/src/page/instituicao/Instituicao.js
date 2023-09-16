import React from "react";
import style from "./instituicao.module.css";

import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { get,del } from "../../service/ApiService"

import { useNavigate } from "react-router-dom";

import { useState,useContext,useEffect} from "react";
import { SidebarContext } from "../../context/SidebarContext";
import { Link } from "react-router-dom";

import { mensagemErro, mensagemSucesso } from "../../components/notificationToastr/toastr";
import Loading from "../../components/Loading";



const Instituicao = () => {
  const {sidebarActive} = useContext(SidebarContext)
  const[item , setItem] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate()

  const [InputPesquise, setInputPesquise] = useState(false);

  function handlerInputPesquise() {
    setInputPesquise(true);
  }


  function handlerRemove(id) {
    const endpoint = `/api/instituicao/${id}`;

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
        const response = await get("/api/instituicao");
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
              {item &&
                item.map((Instituicao) => (
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
          </table>
       
      </div>
    </section>
  );
};

export default Instituicao;
