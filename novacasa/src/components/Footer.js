import React from 'react'
import Logo from "../assets/img/logo-nossa-casa.png.png"
import style from './Footer.module.css'

const Footer = () => {
  return (
    <footer>
            <div className={style.footer_itens}>
                <div className={style.colun_1}>
                    <img src={Logo} alt="logo"/>
                    <p>Sistema Nossa Casa</p>
                </div>
                <div className={style.colun_2}>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Consultar compras</a></li>
                        <li><a href="#">Consultar Preço</a></li>
                    </ul>
                </div>
            </div>
        </footer>
  )
}

export default Footer