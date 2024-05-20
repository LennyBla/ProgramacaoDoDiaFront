import React from "react";
import { format } from 'date-fns'; 
import { Ikid } from '../../../interfaces/Ikid';
import styles from '../Listkids.module.scss';

interface ItemKidProps {
  kid: Ikid;
}

const ItemKid: React.FC<ItemKidProps> = ({ kid }) => {
  const { nome, idade, responsaveis, obs, numeroContato, email, numeroApartamento, horarioCheckout } = kid;

  // Formate a data e hora de checkout usando date-fns
  const formattedCheckout = format(new Date(horarioCheckout), 'dd/MM/yyyy - HH:mm');

  return (
    <div className={styles.item}>
      <h3 >Nome: {nome}</h3>
      <p>Idade: {idade} anos</p>
      <p>Responsáveis: {responsaveis}</p>
      <p>Observações: {obs}</p>
      <p>Número de contato: {numeroContato}</p>
      <p>Email: {email}</p>
      <p>Numero: {numeroContato}</p>
      <p>Número do Apartamento: {numeroApartamento}</p>
      <p>Horário de Checkout: {formattedCheckout}</p>
    </div>
  );
};

export default ItemKid;
