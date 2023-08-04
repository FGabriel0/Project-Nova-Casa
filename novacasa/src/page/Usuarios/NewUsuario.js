import React from 'react'
import style from "./NewUsuario.module.css";

import { useState, useEffect, useRef } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";

const url = "http://localhost:3000/usuarios";
const urlSetores = "http://localhost:3000/setores";
const urlInstituicao = "http://localhost:3000/instituicao"


const NewUsuario = () => {
    const [nome, setNome] = useState("");
    const [telefone, setTelefone] = useState("");
    const [perfil,setPerfil] = useState("")
    const [email,setEmail] = useState("");
    const [chavedeacesso, setChavedeAcesso] = useState("");
    const [password,setPassword] = useState("");
    const [confirmpassword,setConfirmPassword]= useState("");
    const [endereco, setEndereco] = useState("");
    const [data,setData] = useState("")

    const [setor, setSetor] = useState([]);
    const [instituicao,setInstituicao] = useState([])
    const [opcaoSelecionada, setOpcaoSelecionada] = useState("");
    const [opcaoInstituicao, setOpcaoInstituicao] = useState("")
  
    const { data: items, httpConfig, loading, error } = useFetch(url);
    const navigate = useNavigate();
    const inputRef = useRef(null);
  
    function handlerCategory(e) {
      setOpcaoSelecionada(e.target.value);
    }

    function handlerCategory2(e) {
        setOpcaoInstituicao(e.target.value);
      }
  
    const handlerSubmit = async (e) => {
      e.preventDefault();
  
      const produtos = {
        nome,
        telefone,
        password,
        confirmpassword,
        endereco,
        email,
        data,
        chavedeacesso,
        perfil,
        setor: opcaoSelecionada,
        instituicao : opcaoInstituicao
      };
  
      await httpConfig(produtos, "POST");
  
      const validar = inputRef.current.checkValidity();
      if (validar) {
        navigate("/usuarios");
      }
  
    };
  
    useEffect(() => {
      fetch(urlSetores, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setSetor(data);
        })
        .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        fetch(urlInstituicao, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setInstituicao(data);
          })
          .catch((error) => console.log(error));
      }, []);
  
    return (
      <form className={style.form} onSubmit={handlerSubmit}>
        <h1>Novo Usuario::</h1>
        <label>
          Nome:
          <input
            type="text"
            ref={inputRef}
            value={nome}
            placeholder="Digite o nome:"
            required
            onChange={(e) => setNome(e.target.value)}
          />
        </label>
        <label>
          telefone:
          <input
            type="text"
            ref={inputRef}
            value={telefone}
            placeholder="ex. (85) 9999-9999"
            required
            onChange={(e) => setTelefone(e.target.value)}
          />
        </label>
        <div className={style.password}>
        <label>
          Chave de Acesso
          <input
            type="text"
            ref={inputRef}
            value={chavedeacesso}
            placeholder="Chave de Acesso:"
            required
            onChange={(e) => setChavedeAcesso(e.target.value)}
          />
        </label>
        <label>
          Senha:
          <input
            type="password"
            ref={inputRef}
            value={password}
            placeholder="Digite a Senha:"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          Confirme a senha:
          <input
            type="password"
            ref={inputRef}
            value={confirmpassword}
            placeholder="Confirme Senha:"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        </div>
        <div className={style.select}>
          <label className={style.label_select}>
            Setores:
            <select
              ref={inputRef}
              value={opcaoSelecionada}
              onChange={handlerCategory}
            >
              <option value="">Selecione a Opção</option>
              {setor.map((option) => (
                <option key={option.id} value={option.nome}>
                  {option.nome}
                </option>
              ))}
            </select>
          </label>
          <label className={style.label_select}>
            Intituição
            <select
              ref={inputRef}
              value={opcaoInstituicao}
              onChange={handlerCategory2}
            >
              <option value="">Selecione a Opção</option>
              {instituicao.map((option) => (
                <option key={option.id} value={option.nome}>
                  {option.nome}
                </option>
              ))}
            </select>
          </label>
          <label className={style.label_select}>
                Perfil:
            <select
              ref={inputRef}
              value={perfil}
              onChange={(e) => setPerfil(e.target.value)}
            >
              <option value="">Selecione a Opção</option>
              <option value="Cliente">Cliente</option>
              <option value="Casa de Apoio">Casa de Apoio</option>
            </select>
          </label>
          </div>
          <div className={style.endereco}>
          <label>
          Endereço:
          <input
            type="text"
            ref={inputRef}
            value={endereco}
            placeholder="Digite o Endereço"
            required
            onChange={(e) => setEndereco(e.target.value)}
          />
        </label>
          <label>
          E-mail:
          <input
            type="email"
            ref={inputRef}
            value={email}
            placeholder="Digite o E-mail"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Data Nasc:
          <input
            type="data"
            ref={inputRef}
            value={data}
            placeholder="Data de Nasc"
            required
            onChange={(e) => setData(e.target.value)}
          />
        </label>
          </div>
        
        {loading && (
          <input type="submit" value="Aguarde" className={style.btn} disabled />
        )}
        {!loading && <input type="submit" value="Salvar" className={style.btn} />}
      </form>
    );
}

export default NewUsuario