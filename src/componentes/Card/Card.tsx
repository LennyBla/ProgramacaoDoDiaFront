import React, { useEffect, useState } from "react";
import { ICard } from '../../interfaces/ICard';
import ItemCard from './ItemCard';
import { httpV1 } from "../../http";
import { IPaginacao } from "../../interfaces/IPaginacao";
import { Dialog, DialogTitle, DialogContent, IconButton, Container, Box, Button } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

interface CardListProps {
  cardColorClass: string;
}

const Card: React.FC<CardListProps> = ({ cardColorClass }) => {
  const [cards, setCards] = useState<ICard[]>([]);
  const [activePopupId, setActivePopupId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchCards();
  }, [page]);

  const fetchCards = () => {
    httpV1.get<IPaginacao<ICard>>(`/card/?page=${page}`)
      .then(response => {
        if (response.data.results.length === 0) {
          setHasMore(false); // No more cards to fetch
        } else {
          setCards(prevCards => [...prevCards, ...response.data.results]); // Adicionar paginação para carregar mais de 25 cards
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const togglePopup = (id: number) => {
    setActivePopupId(prevId => (prevId === id ? null : id));
  };

  const closeModal = () => {
    setActivePopupId(null);
  };

  const loadMoreCards = () => {
    setPage(prevPage => prevPage + 1); // Carregar mais cards ao clicar no botão "Carregar Mais"
  };

  const viewLessCards = () => {
    setCards(cards.slice(0, 25)); // Mostrar apenas os primeiros 25 cards
    setPage(1);
    setHasMore(true);
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
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}> {/* Centralizar o botão */}
        {hasMore ? (
          <Button 
            onClick={loadMoreCards} 
            variant="contained" 
            color="primary" 
            sx={{ borderRadius: '50px' }} /* Deixar o botão mais arredondado */
          >
            Carregar Mais
          </Button>
        ) : (
          <Button 
            onClick={viewLessCards} 
            variant="contained" 
            color="secondary" 
            sx={{ borderRadius: '50px' }} /* Deixar o botão mais arredondado */
          >
            Ver Menos
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default Card;
