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


function App() {
  const [atualizarPagina, setAtualizarPagina] = useState(false);

  const handleCadastro = () => {
    // Lógica de cadastro aqui

    // Após uma ação bem-sucedida, atualize a página
    setAtualizarPagina(true);
  };

  if (atualizarPagina) {
    // Recarrega a página
    window.location.reload();
  }

  return (
    <>
      <NavBar />
      <Slide />
      <Link to='/cadastro' className={styles.btn}>
        <Botao classe={styles.botao} onClick={handleCadastro}>Cadastre-se</Botao>
      </Link>
      <div className={StylesGlobal.logo}>
        <h1>Nossa Recreação</h1>
      </div>
      <Card cardColorClass={styles.Card} />
      <MiniBanner />
      <Responsaveis />
      <Link to='/cadastro' className={styles.btn}>
        <Botao classe={styles.botao} onClick={handleCadastro}>Cadastre-se</Botao>
      </Link>
      <Rodape />
    </>
  );
}

export default App;
