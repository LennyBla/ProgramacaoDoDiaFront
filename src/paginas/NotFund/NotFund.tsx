import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import stylesGlobal from '../../Global.module.scss';
import styles from './NotFund.module.scss';
import NotFundImage from './6339704.jpg';

export default function NotFund() {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); // Navega para a página anterior
    };

    return (
        <>
            <button onClick={handleBack} className={styles.backButton}>
                <FontAwesomeIcon icon={faArrowLeft} /> Voltar
            </button>
            <div className={styles.container}>
                <h1 className={stylesGlobal.teste}>Ops! Algo deu errado!</h1>
                <div className={styles.svgContainer}>
                    <img src={NotFundImage} alt="Not Found" className={styles.image} />
                </div>
            </div>
        </>
    );
}
