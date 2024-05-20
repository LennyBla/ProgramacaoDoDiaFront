import React from 'react';
import style from './style.module.scss'

interface CloseButtonProps {
  onClose: () => void;
}

const CloseButton: React.FC<CloseButtonProps> = ({ onClose }) => {
  return (
    <button onClick={onClose} aria-label="Fechar">
      {/* Aqui você pode incluir um ícone de fechamento ou usar um caractere simples como X */}
      <span>×</span>
    </button>
  );
};

export default CloseButton;
