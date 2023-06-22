import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import { IoIosArrowUp } from "react-icons/io";

import style from "./DashBoard.module.css";

const DashBoard = () => {
  const [openConfig, setOpenConfig] = useState(false);

  function handlerConfig() {
    setOpenConfig(!openConfig);
  }
  return (
    <aside className={style.dashboard}>
      <div>
        <h3>Usuário</h3>
      </div>
      <div className={style.items}>
        <ul>
          <li>
            <button className={style.btnDashboard}>
              Todos os Usuários
            </button>
          </li>
          <hr/>
          <li>
            <button className={style.btnDashboard} onClick={handlerConfig}>
              Configurações Básicas
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
                    Transferências
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
                    Pontos de Vendas
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/pagamento"
                    className={({ isActive }) => (isActive ? style.active : "")}
                  >
                    Método de Pagamentos
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default DashBoard;
