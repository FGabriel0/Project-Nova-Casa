import React from "react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import style from "./NewTransferencia.module.css";
import { useFetch } from "../../hooks/useFetch";

const url = "http://localhost:3000/transferencia";

const NewTransferencia = () => {
  const { data: items, httpConfig, loading, error } = useFetch(url);
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [menssage, setMenssage] = useState("");

  const [description, setDescription] = useState("");
  const [checkboxValues, setCheckboxValues] = useState([]);
  const [transferencias, setTransferencias] = useState([]);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setCheckboxValues([...checkboxValues, value]);
    } else {
      setCheckboxValues(checkboxValues.filter((item) => item !== value));
    }
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();

    const transferencia = {
      description,
      checkboxValues,
    };

   await httpConfig(transferencia, "POST");

    const validar = inputRef.current.checkValidity();
    if (validar) {
      setMenssage("Novo Pagamento Finalizada");
      navigate("/transferencia");
    }

    setTransferencias([...transferencias, transferencia]);
    setDescription("");
    setCheckboxValues([]);
  }
  return (
    <form className={style.form} onSubmit={handlerSubmit}>
      <h1>Nova Transferência:</h1>
      <label>
        Descrição:
        <input
          ref={inputRef}
          type="text"
          value={description}
          placeholder="Digite o nome:"
          required
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <label>
        <input
          type="checkbox"
          value="Entrada"
          onChange={handleCheckboxChange}
        />
        Entrada
      </label>
      <label>
        <input type="checkbox" value="Saida" onChange={handleCheckboxChange} />
        Saida
      </label>

      {loading && (
        <input type="submit" value="Aguarde" className={style.btn} disabled />
      )}
      {!loading && <input type="submit" value="Salvar" className={style.btn} />}
    </form>
  );
};

export default NewTransferencia;
