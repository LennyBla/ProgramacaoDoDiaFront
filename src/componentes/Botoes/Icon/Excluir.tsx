import React from 'react';
import style from './style.module.scss'

interface DeleteButtonProps {
  onDelete: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onDelete }) => {
  return (
    <button onClick={onDelete} aria-label="Excluir">
      {/* Aqui você pode incluir um ícone de lixeira ou usar um caractere simples como X */}
      <span>🗑️</span>
    </button>
  );
};

export default DeleteButton;
