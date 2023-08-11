import style from "./Navbar.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { SidebarContext } from "../context/SidebarContext";
import { useContext, useState , useEffect} from "react";

import Sidebar from "./Sidebar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faGear,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [openConfig, setOpenConfig] = useState(false);
  const { sidebarActive, setSidebarActive } = useContext(SidebarContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("_usuario_logado");
    navigate("/login"); // Utilize o hook useNavigate para redirecionar
  };

  const handlerSidebar = () => {
    setSidebarActive((prevState) => !prevState);
  };

  function handlerConfig() {
    setOpenConfig(!openConfig);
  }

   const location = useLocation();


  return (
    <div className={style.container}>
      {location.pathname === "/" ||
      location.pathname === "/Consulta" ||
      location.pathname === "/admistrativo" ||
      location.pathname === "/login" ||
      location.pathname === "/cadastrar" ? (
        ""
      ) : (
        <div
          className={`${style.container} ${sidebarActive ? style.open : ""}`}
        >
          <div className={style.sidebar}>
            <Sidebar />
          </div>
          <nav className={`${style.navbar} ${sidebarActive ? style.open : ""}`}>
            <div className={style.hamburguer} onClick={handlerSidebar}>
              <div className={style.line}></div>
              <div className={style.line}></div>
              <div className={style.line}></div>
            </div>

            <div className={style.config}>
              <button onClick={handlerConfig}>
                <FontAwesomeIcon icon={faUser} />
              </button>
              {openConfig && (
                <ul>
                  <li>
                    <FontAwesomeIcon icon={faUser} /> Profile
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faGear} /> Config
                  </li>
                  <hr />
                  <li onClick={handleLogout}>
                    <FontAwesomeIcon icon={faRightToBracket} /> Sair
                  </li>
                </ul>
              )}
            </div>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Navbar;
