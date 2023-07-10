import React, { useState,useEffect } from "react";
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope,faGear,faCoins,faArrowRightArrowLeft,faNetworkWired} from '@fortawesome/free-solid-svg-icons'

import { NavLink } from "react-router-dom";

import { IoIosArrowUp } from "react-icons/io";

import style from "./DashBoard.module.css";

const DashBoard = () => {
  const [elementCount, setElementCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/usuario');
        const data = response.data;
        const count = data.length;
        setElementCount(count);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const [openConfig, setOpenConfig] = useState(false);

  function handlerConfig() {
    setOpenConfig(!openConfig);
  }
  return (
    <div className={style.container}>

      
    <aside className={style.dashboard}>
      <div>
        <h3>Usuário</h3>
      </div>
      <div className={style.items}>
        <ul>
          <li>
            <button className={style.btnDashboard}>
              <FontAwesomeIcon icon={faEnvelope}/> Todos os Usuários
            </button>
          </li>
          <hr/>
          <li>
            <button className={style.btnDashboard} onClick={handlerConfig}>
            <FontAwesomeIcon icon={faGear}/> Configurações Básicas
            <IoIosArrowUp
                className={`${style.arrow}  ${openConfig ? style.rotate : ""}`}
              />
            </button>
            {openConfig && (
              <ul className={style.item}>
                <li>
                  <NavLink
                    to="/transferencia"
                    className={({ isActive }) => (isActive ? style.active : "")}
                  >
                    <FontAwesomeIcon icon={faArrowRightArrowLeft} /> Transferências
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/produtos"
                    className={({ isActive }) => (isActive ? style.active : "")}
                  >
                     Tipos de Produtos
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/instituicao"
                    className={({ isActive }) => (isActive ? style.active : "")}
                  >
                     Instituição
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/pointofsales"
                    className={({ isActive }) => (isActive ? style.active : "")}
                  >
                   <FontAwesomeIcon icon={faNetworkWired} /> Pontos de Vendas
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/pagamento"
                    className={({ isActive }) => (isActive ? style.active : "")}
                  >
                    <FontAwesomeIcon icon={faCoins} /> Método de Pagamentos
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </aside>
    </div>
  );
};

export default DashBoard;
