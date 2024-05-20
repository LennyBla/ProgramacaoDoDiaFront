import React from 'react';
import styles from './style.module.scss';

interface BotaoProps {
  children: React.ReactNode;
  onClick?: () => void;
  tipo?: 'button' | 'submit' | 'reset';
  classe?: string;
  estilo?: React.CSSProperties; 
}

const Botao: React.FC<BotaoProps> = ({ children, onClick, tipo = 'button', classe = '', estilo }) => {
  return (
    <button
      type={tipo}
      className={`${styles.botao} ${classe}`}
      onClick={onClick}
      style={estilo}
    >
      {children}
    </button>
  );
};

export default Botao;
