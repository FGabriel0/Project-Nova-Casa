import React from 'react'
import imgBanner from '../assets/img/banner.jpg'
import Footer from "../components/Footer";

import "./Home.css"

const Home = () => {
  return (
    <div>
        <header>
            <div class="img-wrapper">
                <img src={imgBanner} alt="banner"/>
            </div>
            <div class="banner">

                <h1>Bem-Vindo !</h1>
                <p>Sistema nossa casa</p>

                <div class="btns">
                    <button>Consultar minhas compras</button>
                    <button>Consultar Preço</button>
                </div>
            </div>
        </header>
        <Footer />
    </div>
  )
}

export default Home