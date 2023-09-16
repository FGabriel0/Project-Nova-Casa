import React from 'react'
import style from './NewPontodeVendas.module.css'
import { useState,useRef} from "react";
import { useNavigate } from 'react-router-dom';

import { ValidarPontodeVenda } from '../../service/ValidarPontodeVenda';
import { post } from '../../service/ApiService';
import { mensagemSucesso,mensagemErro } from '../../components/notificationToastr/toastr';


const NewPontodeVendas = () => {
    const inputRef = useRef(null);
    const navigate = useNavigate()

    const [nome,setNome] = useState("");



    const handlerSubmit = async (e) =>{
        e.preventDefault()
    
        const errorEncontrados = ValidarPontodeVenda(nome);

        if (Object.keys(errorEncontrados).length > 0) {
          errorEncontrados.forEach((msg, index) => {
            mensagemErro(msg);
          });
          return;
        }
    
        try {
          const response = await post("/api/pontodevenda", {
            nome: nome,
          });
          mensagemSucesso("Ponto de Venda Salvo Com Sucesso");
          navigate("/pointofsales");
        } catch (error) {
          if (error.response && error.response.data) {
            mensagemErro(error.response.data);
          }
        }
      }

  return (
    <form className={style.form} onSubmit={handlerSubmit}>
        <h1>Novo Ponto de Vendas</h1>
            <label>
              Nome:
              <input
              ref={inputRef}
                type="text"
                value={nome}
                placeholder="Digite o nome:"
                required
                onChange={(e) => setNome(e.target.value)}
              />
            </label>           
            <input type="submit" value="Salvar" className={style.btn} />
           
          </form>
  )
}

export default NewPontodeVendas