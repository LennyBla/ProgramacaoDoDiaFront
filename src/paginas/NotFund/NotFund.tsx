import React from 'react';
import stylesGlobal from '../../Global.module.scss';
import styles from './NotFund.module.scss';
import NotFundImage from './6339704.jpg';
import Botao from '../../componentes/Botoes/Botao/Button';
import {useNavigate} from 'react-router-dom'

export default function NotFund() {

  const navigate= useNavigate();
  return (
    <div className={styles.container}>
      <h1 className={stylesGlobal.teste}>Ops! Algo deu errado!</h1>
      <div className={styles.svgContainer}>
        <img src={NotFundImage} alt="Not Found" className={styles.image} />

        <div className={styles.voltar}>
        <Botao onClick={() => navigate(-1)}> {'< Voltar'} </Botao>
        </div>
      </div>
    </div>
  );
}
