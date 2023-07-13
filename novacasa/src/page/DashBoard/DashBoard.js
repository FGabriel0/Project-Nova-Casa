import React, { useState, useEffect, useContext } from "react";
import {SidebarContext} from '../../context/SidebarContext'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTicket,
  faUser,
  faMagnifyingGlass,
  faGear,
  faRightToBracket,
  faSun
} from "@fortawesome/free-solid-svg-icons";

import style from "./DashBoard.module.css";
import DoughnutChart from "../../graphics/DoughnutChart";
import LineChart from "../../graphics/LineChart";
import Line2Chart from "../../graphics/Line2Chart";
import BarChart from "../../graphics/BarChart"

const DashBoard = () => {
  const {sidebarActive} = useContext(SidebarContext)
  const data = {
    labels: ['Quarto E', 'Quarto D', 'Quarto C','Quarto A'],
    datasets: [{
      label: 'Camas Ocupadas',
      data: [142, 62, 243,102],
      backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)','rgb(75, 192, 192)'],
      hoverOffset: 4,
    }],
  };

  const line = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Hospedagens',
      data: [250, 300, 500, 350, 100],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
    }],
  };

  const line2 = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Loja',
        data: [65, 59, 80, 81, 56, 55],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
      {
        label: 'Trailer',
        data: [30, 45, 67, 55, 70, 85],
        fill: false,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
      {
        label: 'Bazar',
        data: [80, 70, 60, 50, 40, 30],
        fill: false,
        borderColor: 'rgb(54, 162, 235)',
        tension: 0.1,
      },
      {
        label: 'CasadeApoio',
        data: [20, 40, 60, 80, 100, 120],
        fill: false,
        borderColor: 'rgb(255, 205, 86)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className= {style.container}>
        <section
          className={`${style.section} ${sidebarActive ? style.active : ""}`}
        >
          <div className={style.vendas}>
            <h3>Total de Vendas</h3>
            <ul>
              <li>
                <div className={style.venda1}>
                  <FontAwesomeIcon
                    icon={faTicket}
                    style={{ color: "#ea5455" }}
                  />
                </div>
                <div className={style.item_vendas}>
                  <p>Bazar</p>
                  <h2>90</h2>
                </div>
              </li>
              <li>
                <div className={style.venda2}>
                  <FontAwesomeIcon
                    icon={faTicket}
                    style={{ color: "#28c76f" }}
                  />
                </div>
                <div className={style.item_vendas2}>
                  <p>Loja</p>
                  <h2>55</h2>
                </div>
              </li>

              <li>
                <div className={style.venda3}>
                  <FontAwesomeIcon
                    icon={faTicket}
                    style={{ color: "#b88cf0" }}
                  />
                </div>
                <div className={style.item_vendas3}>
                  <p>Trailer</p>
                  <h2>100</h2>
                </div>
              </li>
              <li>
                <div className={style.venda4}>
                  <FontAwesomeIcon
                    icon={faTicket}
                    style={{ color: "#3699ff" }}
                  />
                </div>
                <div className={style.item_vendas4}>
                  <p>Casa de Apoio</p>
                  <h2>10</h2>
                </div>
              </li>
            </ul>
          </div>
          <div className={style.graphics}>
            <h3>Controle dos Quartos</h3>
          <DoughnutChart data={data}/>
          </div>
          <div className={style.graphics}>
            <h3>Hospedagens/Més</h3>
            <LineChart data={line}/>
          </div>
        </section>
        <section className={`${style.section2} ${sidebarActive ? style.active : ""}`}>
        <div className={style.graphics2}>
            <h3>Valor total de vendas/Més</h3>
            <Line2Chart data={line2}/>
          </div>
          <div className={style.Temp}>
            <h2><FontAwesomeIcon icon={faSun} /> 23ºc</h2>
            <p>10 de Agosto de 2021</p>
            <h3>Fortaleza/Ce</h3>

          </div>
          <div className={style.graphics2}>
            <h3>Ganhos Totais</h3>
            <p>R$<span>3.000</span></p>
            <BarChart/>
          </div>
        </section>
      </div>
    
  );
};

export default DashBoard;
