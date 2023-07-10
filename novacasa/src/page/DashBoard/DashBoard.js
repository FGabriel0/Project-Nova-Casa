import React, { useState, useEffect, useContext } from "react";
import { NavBarContext } from "../../context/NavBarContext";

import style from "./DashBoard.module.css";
import Sidebar from "../../components/Sidebar";

const DashBoard = () => {
  const { setShowNavbar } = useContext(NavBarContext);
  const [openConfig, setOpenConfig] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false)

  function handlerSidebar() {
    setOpenSidebar(!openSidebar);
  }
  function handlerConfig() {
    setOpenConfig(!openConfig);
  }

  useEffect(() => {
    setShowNavbar(false);
    return () => {
      setShowNavbar(true);
    };
  }, []);

  return (
    <div className={`${style.container} ${openSidebar ? style.sidebarOpen : ''}`}>
      <Sidebar open={openSidebar} />
      <nav className={`${style.navbar} ${openSidebar ? style.contentOpen : ''}`}>
      <div className={style.hamburguer} onClick={handlerSidebar}>
          <div className={style.line}></div>
          <div className={style.line}></div>
          <div className={style.line}></div>
        </div>
        <div className={style.search}>
          <input type="search" placeholder="Procurar" />
          <button>Lupa</button>
        </div>

        <div className={style.config}>
          <button onClick={handlerConfig}>user</button>
          {openConfig && (
            <ul>
              <li>Profile</li>
              <li>My Walter</li>
              <li>Config</li>
              <hr />
              <li>Sair</li>
            </ul>
          )}
        </div>
      </nav>
    </div>
  );
};

export default DashBoard;
