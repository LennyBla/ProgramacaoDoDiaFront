import React from "react";
import { format } from 'date-fns'; 
import { Ikid } from '../../../interfaces/Ikid';
import styles from '../Listkids.module.scss';

interface ItemKidProps {
  kid: Ikid;
}

const ItemKid: React.FC<ItemKidProps> = ({ kid }) => {
  const { nome, idade, responsaveis, obs, numeroContato, email, numeroApartamento, horarioCheckout } = kid;

  const formattedCheckout = format(new Date(horarioCheckout), 'dd/MM/yyyy - HH:mm');

  return (
    <div className={styles.item}>
      <h3 className={styles.title}>Nome: {nome}</h3>
      <p><strong>Idade:</strong> {idade} anos</p>
      <p><strong>Responsáveis:</strong> {responsaveis}</p>
      <p><strong>Observações:</strong> {obs}</p>
      <p><strong>Número de contato:</strong> {numeroContato}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Número do Apartamento:</strong> {numeroApartamento}</p>
      <p><strong>Horário de Checkout:</strong> {formattedCheckout}</p>
    </div>
  );
};

export default ItemKid;
