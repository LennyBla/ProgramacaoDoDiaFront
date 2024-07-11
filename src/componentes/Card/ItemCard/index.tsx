import React, { useEffect, useState } from "react";
import { Card, CardContent, CardMedia, Typography, Box, Skeleton } from "@mui/material";
import { ICard } from "../../../interfaces/ICard";
import MeninaFundoAmarelo from '../MeninaFundoAmarelo.svg';
import MeninoFundoVermelho from '../MeninoFundoVermelho.svg';
import MeninoFundoAzul from '../MeninoFundoAzul.svg';
import CriancasFundoVerde from '../CriancasFundoVerde.svg';
import styles from '../Card.module.scss';

interface ItemCardProps extends ICard {
  cardColorClass?: string;
  onClick: () => void;
  index: number;
}

const ItemCard: React.FC<ItemCardProps> = ({ id, titulo, descricao, onClick, index }) => {
  const [cardImage, setCardImage] = useState<any>(null);
  const [colorClass, setColorClass] = useState<string>('');

  useEffect(() => {
    const colors = ['color1', 'color2', 'color3', 'color4'];
    const colorClass = colors[index % colors.length];
    setColorClass(colorClass);

    switch (colorClass) {
      case 'color1':
        setCardImage(MeninaFundoAmarelo);
        break;
      case 'color2':
        setCardImage(MeninoFundoVermelho);
        break;
      case 'color3':
        setCardImage(MeninoFundoAzul);
        break;
      case 'color4':
        setCardImage(CriancasFundoVerde);
        break;
      default:
        setCardImage(null);
    }
  }, [index]);

  return (
    <Card
      onClick={onClick}
      className={`${styles.itemCard} ${styles[colorClass]}`}
      sx={{
        mb: 4,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '20px',
        boxShadow: '0 3px 8px rgba(0, 0, 0, 0.7)',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'scale(1.05)',
        }
      }}
    >
      <Box sx={{ flex: 1, p: 2 }}>
        <CardContent>
          {titulo ? (
            <Typography variant="h5" dangerouslySetInnerHTML={{ __html: titulo }} />
          ) : (
            <Skeleton width={200} height={20} />
          )}
          {descricao ? (
            <Typography variant="body2" dangerouslySetInnerHTML={{ __html: descricao }} />
          ) : (
            <Skeleton width={200} height={15} />
          )}
        </CardContent>
      </Box>
      <CardMedia
        component="img"
        image={cardImage}
        alt=""
        sx={{ width: 150, height: '100%', display: { xs: 'none', md: 'block' } }}
      />
    </Card>
  );
};

export default ItemCard;