import React from "react";
import style from "./Navbar.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

import imgBanner from "../assets/img/logo-nossa-casa.png.png";
import { useLocation, NavLink } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <div className={style.container}>
      <nav className={style.Navbar}>
        <div>
          <img src={imgBanner} alt="logo" />
        </div>
        <div className={style.links_list}>
          {location.pathname === "/" ||
          location.pathname === "/Consulta" ||
          location.pathname === "/admistrativo" ||
          location.pathname === "/login" ? (
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
          ) : (
            <ul>
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) => (isActive ? style.active : "")}
                >
                  DashBoard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/email"
                  className={({ isActive }) => (isActive ? style.active : "")}
                >
                  <FontAwesomeIcon className={style.icon} icon={faEnvelope} />
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) => (isActive ? style.active : "")}
                >
                  Fechar
                </NavLink>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
