import React, { useEffect, useState } from "react";
import { ICard } from '../../interfaces/ICard';
import ItemCard from './ItemCard';
import styles from './Card.module.scss';
import { httpV1 } from "../../http";
import { IPaginacao } from "../../interfaces/IPaginacao";
import Modal from 'react-modal';

interface CardProps {
  cardColorClass: string;
}

const Card: React.FC<CardProps> = ({ cardColorClass }) => {
  const [cards, setCards] = useState<ICard[]>([]);
  const [activePopupId, setActivePopupId] = useState<number | null>(null);

  useEffect(() => {
    httpV1.get<IPaginacao<ICard>>('/card/')
      .then(response => {
        setCards(response.data.results);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const togglePopup = (id: number) => {
    setActivePopupId(prevId => (prevId === id ? null : id));
  };

  const closeModal = () => {
    setActivePopupId(null);
  };

  return (
    <aside className={styles.Card}>
      <h1 className={styles.titulo}>Lista de <span>Cards</span></h1>
      <ul>
        {cards.map((card, index) => (
          <div key={card.id}>
            <ItemCard
              {...card}
              cardColorClass={cardColorClass}
              onClick={() => togglePopup(card.id)}
              index={index}
            />
            <Modal
              isOpen={activePopupId === card.id}
              onRequestClose={closeModal}
              className={`${styles.Modal} ${styles[cardColorClass]}`} 
              overlayClassName={styles.Overlay} 
            >
              <button className={styles.cardCloseButton} onClick={closeModal}>X</button>
              <h2>{card.titulo}</h2>
              <p>{card.descricao}</p>
            </Modal>
          </div>
        ))}
      </ul>
    </aside>
  );
};

export default Card;