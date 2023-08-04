import React, { useState,useContext } from "react";
import style from "./Sidebar.module.css";
import { NavLink } from "react-router-dom";
import { SidebarContext } from "../context/SidebarContext";
import { IoIosArrowUp } from "react-icons/io";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faGear,
  faCoins,
  faArrowRightArrowLeft,
  faNetworkWired,
  faBuildingColumns,
  faQuoteLeft,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const { sidebarActive } = useContext(SidebarContext);
  const [openConfig, setOpenConfig] = useState(false);

  function handlerConfig() {
    setOpenConfig(!openConfig);
  }


  return (
    <div className={`${style.container} ${sidebarActive ? style.active : ""}`}>
        <aside className={style.dashboard}>
          <div className={style.items}>
            <ul>
              <li>
                <button className={style.Sidebar}>
                  <FontAwesomeIcon icon={faEnvelope} /> Todos os Usuários
                </button>
              </li>
              <hr />
              <li>
                <button className={style.btnDashboard} onClick={handlerConfig}>
                  <FontAwesomeIcon icon={faGear} /> Configurações Básicas
                  <IoIosArrowUp
                    className={`${style.arrow}  ${
                      openConfig ? style.rotate : ""
                    }`}
                  />
                </button>
                {openConfig && (
                  <ul className={style.item}>
                    <li>
                      <NavLink
                        to="/transferencia"
                        className={({ isActive }) =>
                          isActive ? style.active : ""
                        }
                      >
                        <FontAwesomeIcon icon={faArrowRightArrowLeft} />
                         Transferências
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/produtos"
                        className={({ isActive }) =>
                          isActive ? style.active : ""
                        }
                      >
                       <FontAwesomeIcon icon={faQuoteLeft} /> Tipos de Produtos
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/instituicao"
                        className={({ isActive }) =>
                          isActive ? style.active : ""
                        }
                      >
                        <FontAwesomeIcon icon={faBuildingColumns} /> Instituição
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/pointofsales"
                        className={({ isActive }) =>
                          isActive ? style.active : ""
                        }
                      >
                        <FontAwesomeIcon icon={faNetworkWired} /> Pontos de
                        Vendas
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/pagamento"
                        className={({ isActive }) =>
                          isActive ? style.active : ""
                        }
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

<<<<<<< HEAD
export default Sidebar;
=======
export default Sidebar;
>>>>>>> 2d9f897939802285be9abaa85b59ebbaf384a12a
