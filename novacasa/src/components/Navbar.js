import style from "./Navbar.module.css";
import { useContext,useState } from "react";

import imgBanner from "../assets/img/logo-nossa-casa.png.png";
import { NavLink, useLocation } from "react-router-dom";
import {SidebarContext} from "../context/SidebarContext"
import Sidebar from "./Sidebar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {

  faUser,
  faMagnifyingGlass,
  faGear,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {

  const [openConfig, setOpenConfig] = useState(false);
  const { sidebarActive, setSidebarActive } = useContext(SidebarContext);

  const handlerSidebar = () => {
    setSidebarActive(prevState => !prevState);
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
        // <nav className={style.Navbar}>
        //   <div>
        //     <img src={imgBanner} alt="logo" />
        //   </div>
        //   <div className={style.links_list}>
        //     <ul>
        //       <li>
        //         <NavLink
        //           to="/"
        //           className={({ isActive }) => (isActive ? style.active : "")}
        //         >
        //           Home
        //         </NavLink>
        //       </li>
        //       <li>
        //         <NavLink
        //           to="/Consulta"
        //           className={({ isActive }) => (isActive ? style.active : "")}
        //         >
        //           Consulta
        //         </NavLink>
        //       </li>
        //       <li>
        //         <NavLink
        //           to="/admistrativo"
        //           className={({ isActive }) => (isActive ? style.active : "")}
        //         >
        //           admistrativo
        //         </NavLink>
        //       </li>
        //     </ul>
        //   </div>
        // </nav>
      ) : (
        <div
        className={`${style.container} ${sidebarActive ? style.open : ""}`}
      >
        <div className={style.sidebar}>
          <Sidebar/>
        </div>
        <nav
          className={`${style.navbar} ${sidebarActive? style.open : ""}`}
        >
          <div className={style.hamburguer} onClick={handlerSidebar}>
            <div className={style.line}></div>
            <div className={style.line}></div>
            <div className={style.line}></div>
          </div>
          <div className={style.search}>
            <input type="search" placeholder="Procurar" />
            <button>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
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
                <li>
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
