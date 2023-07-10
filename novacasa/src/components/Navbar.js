import style from "./Navbar.module.css";
import { useContext } from "react";

import imgBanner from "../assets/img/logo-nossa-casa.png.png";
import { NavLink } from "react-router-dom";
import { NavBarContext } from "../context/NavBarContext";

const Navbar = () => {
  const { showNavbar, isDashboard } = useContext(NavBarContext);

  if (!showNavbar || isDashboard) {
    return null; 
  }
  
  return (
    <div className={style.container}>
      <nav className={style.Navbar}>
        <div>
          <img src={imgBanner} alt="logo" />
        </div>
        <div className={style.links_list}>
          <ul>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? style.active : "")}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Consulta"
                className={({ isActive }) => (isActive ? style.active : "")}
              >
                Consulta
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admistrativo"
                className={({ isActive }) => (isActive ? style.active : "")}
              >
                admistrativo
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
