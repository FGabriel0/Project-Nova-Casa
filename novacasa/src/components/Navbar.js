import style from "./Navbar.module.css";
<<<<<<< HEAD
import { useContext, useState } from "react";

import { Link, useLocation } from "react-router-dom";
import { SidebarContext } from "../context/SidebarContext";
=======
import { useContext,useState } from "react";

import imgBanner from "../assets/img/logo-nossa-casa.png.png";
import { NavLink, useLocation } from "react-router-dom";
import {SidebarContext} from "../context/SidebarContext"
>>>>>>> 2d9f897939802285be9abaa85b59ebbaf384a12a
import Sidebar from "./Sidebar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
<<<<<<< HEAD
  faUser,
=======

  faUser,
  faMagnifyingGlass,
>>>>>>> 2d9f897939802285be9abaa85b59ebbaf384a12a
  faGear,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
<<<<<<< HEAD
=======

>>>>>>> 2d9f897939802285be9abaa85b59ebbaf384a12a
  const [openConfig, setOpenConfig] = useState(false);
  const { sidebarActive, setSidebarActive } = useContext(SidebarContext);

  const handlerSidebar = () => {
<<<<<<< HEAD
    setSidebarActive((prevState) => !prevState);
=======
    setSidebarActive(prevState => !prevState);
>>>>>>> 2d9f897939802285be9abaa85b59ebbaf384a12a
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
<<<<<<< HEAD
      location.pathname === "/login" ||
      location.pathname === "/cadastrar" ? (
        ""
      ) : (
=======
      location.pathname === "/login" || 
      location.pathname === "/cadastrar" ? (
        ""
>>>>>>> 2d9f897939802285be9abaa85b59ebbaf384a12a
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
<<<<<<< HEAD
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
                  <li>
                    <FontAwesomeIcon icon={faRightToBracket} />
                    <Link to="/">Sair</Link>
                  </li>
                </ul>
              )}
            </div>
          </nav>
        </div>
=======
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
>>>>>>> 2d9f897939802285be9abaa85b59ebbaf384a12a
      )}
    </div>
  );
};

export default Navbar;
