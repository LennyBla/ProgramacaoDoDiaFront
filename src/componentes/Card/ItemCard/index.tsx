import React, { useEffect, useState } from "react";
import { ICard } from "../../../interfaces/ICard";
import Botao from '../../Botoes/Botao/Button';
import styles from '../Card.module.scss';
import Skeleton from 'react-loading-skeleton';
import MeninaFundoAmarelo from '../MeninaFundoAmarelo.svg';
import MeninoFundoVermelho from '../MeninoFundoVermelho.svg';
import MeninoFundoAzul from '../MeninoFundoAzul.svg';
import CriancasFundoVerde from '../CriancasFundoVerde.svg';

interface ItemCardProps extends ICard {
  cardColorClass?: string;
  onClick: () => void;
  index: number; 
}

function ItemCard({ cardColorClass, id, titulo, descricao, onClick, index }: ItemCardProps) {
  const [colorClass, setColorClass] = useState('');
  const [cardImage, setCardImage] = useState<any>(null);
  const [buttonColor, setButtonColor] = useState<string>('');

  useEffect(() => {
    const colors = ['color1', 'color2', 'color3', 'color4'];
    setColorClass(styles[colors[index % colors.length]]);

    switch (colorClass) {
      case styles.color1:
        setCardImage(MeninaFundoAmarelo);
        setButtonColor('#F9C20B');
        break;
      case styles.color2:
        setCardImage(MeninoFundoVermelho);
        setButtonColor('#FF6766');
        break;
      case styles.color3:
        setCardImage(MeninoFundoAzul);
        setButtonColor('#1AB8FF');
        break;
      case styles.color4:
        setCardImage(CriancasFundoVerde);
        setButtonColor('#ABCD52');
        break;
      default:
        setCardImage(null);
    }
  }, [index, colorClass]);

  return (
    <li className={`${styles.itemCard} ${colorClass}`} onClick={onClick}>

      <div className={styles.cardContent}>
      <div className={styles.cardHeader}>
          {titulo ? (
            <h3 className={styles.cardTitle} dangerouslySetInnerHTML={{ __html: titulo }} /> 
          ) : (
            <Skeleton width={200} height={20} />
          )}
          {descricao ? (
            <div className={styles.cardDescription} dangerouslySetInnerHTML={{ __html: descricao }} />
          ) : (
            <Skeleton count={3} width={200} height={15} />
          )}
        </div>
        
        {/* <Link to='/cadastro' className={styles.btn}>
          <Botao tipo="button" classe={styles.botao} estilo={{ backgroundColor: buttonColor }}>
            Cadastre-se
          </Botao>
        </Link> */}
      </div>
      <img src={cardImage} alt="" className={styles.cardImage} />

    </li>
  );
}
export default ItemCard;
