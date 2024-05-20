import React from "react";
import styles from "./Responsaveis.module.scss";

function Responsaveis() {
    return (
        <div className={styles.responsaveis}>
            <h1 className={styles.titulo}>Nossos responsáveis</h1>
            <div className={styles.tiasContainer}>
                <div className={styles.Tia}>
                    <h3>Tia Panqueca</h3>
                    <img src="logo192.png" alt="Imagem 1" />
                </div>
                <div className={styles.Tia}>
                    <h3>Tia Panqueca</h3>
                    <img src="logo192.png" alt="Imagem 1" />
                </div>
                <div className={styles.Tia}>
                    <h3>Tia Panqueca</h3>
                    <img src="logo192.png" alt="Imagem 1" />
                </div>
                <div className={styles.Tia}>
                    <h3>Tia Panqueca</h3>
                    <img src="logo192.png" alt="Imagem 1" />
                </div>
            </div>
        </div>
    );
}

export default Responsaveis;
