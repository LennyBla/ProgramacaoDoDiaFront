import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../../componentes/NavBar';
import Rodape from '../../componentes/Rodape';
import styles from './Home.module.scss';
import Responsaveis from '../../componentes/Resposaveis/Responsaveis';
import Card from '../../componentes/Card/Card';
import Slide from '../../componentes/Slide/Slide';
import MiniBanner from '../../componentes/MiniBanner/MiniBanner';
import Botao from './../../componentes/Botoes/Botao/Button';
import StylesGlobal from '../../Global.module.scss'
import LogoRecreacao from '../../asset/confiranossaprogramao.png'
import Botao from './../../componentes/Botoes/Botao/Button';

function App() {

  return (
    <>
      <NavBar />
      <Slide />
      <div className={styles.logoContainer}>
        <img src={LogoRecreacao} alt="Cataratas Park Hotel Logo" />
       </div>
      <Link to='/cadastro' className={styles.btn}>
        <Botao classe={styles.botao} onClick={handleCadastro}>Cadastre-se</Botao>
      </Link>
      <Card cardColorClass={styles.Card} />
      <Rodape />
    </>
  );
}
//  <MiniBanner />
//<Responsaveis />

export default App;
