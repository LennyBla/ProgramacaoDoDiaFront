import React, { useEffect, useState } from "react";
import { ICard } from '../../interfaces/ICard';
import ItemCard from './ItemCard';
import { httpV1 } from "../../http";
import { IPaginacao } from "../../interfaces/IPaginacao";
import { Dialog, DialogTitle, DialogContent, IconButton, Container, Box } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

interface CardListProps {
  cardColorClass: string;
}

const Card: React.FC<CardListProps> = ({ cardColorClass }) => {
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
    <Container>
      {cards.map((card, index) => (
        <Box key={card.id}>
          <ItemCard
            {...card}
            onClick={() => togglePopup(card.id)}
            index={index}
          />
          <Dialog open={activePopupId === card.id} onClose={closeModal} fullWidth>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span dangerouslySetInnerHTML={{ __html: card.titulo }} />
              <IconButton
                edge="end"
                color="inherit"
                onClick={closeModal}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers={false} sx={{ padding: '20px', overflow: 'hidden' }}>
              <div dangerouslySetInnerHTML={{ __html: card.descricao }} />
            </DialogContent>
          </Dialog>
        </Box>
      ))}
    </Container>
  );
};

export default Card;
