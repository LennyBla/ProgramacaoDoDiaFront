import React from 'react';
import style from './style.module.scss'

interface AddButtonProps {
  onAdd: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({ onAdd }) => {
  return (
    <button onClick={onAdd} aria-label="Adicionar">
      {/* Aqui você pode incluir um ícone de adição ou usar um caractere simples como + */}
      <span>+</span>
    </button>
  );
};

export default AddButton;
