import React from 'react'
import style from './NewPontodeVendas.module.css'
import { useState,useRef} from "react";
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';

const url = "http://localhost:3000/pontodevendas";


const NewPontodeVendas = () => {
    const inputRef = useRef(null);
    const navigate = useNavigate()

    const [nome,setNome] = useState("");
    const [menssage, setMenssage] = useState("");


    const { data: items, httpConfig, loading, error } = useFetch(url);

    const handlerSubmit = async (e) =>{
        e.preventDefault()
    
        const pontodevendas ={
          nome
        }
    
        await httpConfig(pontodevendas,"POST");

        const validar = inputRef.current.checkValidity();
        if (validar) {
          setMenssage("Novo Pagamento Finalizada");
          navigate("/pointofsales");
        }
    
        setNome("")
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
  )
}

export default NewPontodeVendas