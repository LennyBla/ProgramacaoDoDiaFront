import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Paper, List, ListItem, ListItemText, CircularProgress } from "@mui/material";
import { Ikid } from '../../../../interfaces/Ikid';
import { ICard } from '../../../../interfaces/ICard';
import { httpV2 } from '../../../../http';

const KidIndividual = () => {
  const { id } = useParams<{ id: string }>();
  const [kid, setKid] = useState<Ikid | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchKid = async () => {
      try {
        const response = await httpV2.get<Ikid>(`kids/individual/${id}`);
        setKid(response.data);
      } catch (error) {
        console.error('Error fetching kid:', error);
        setError('Erro ao buscar dados da criança.'); 
      } finally {
        setLoading(false);
      }
    };

    fetchKid();
  }, [id]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography variant="body1" sx={{ color: 'error.main' }}>{error}</Typography>;
  }

  if (!kid) {
    return <Typography>Criança não encontrada</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>{kid.nome}</Typography>
      <Typography variant="body1" gutterBottom>{`Idade: ${kid.idade}`}</Typography>
      <Paper elevation={3} sx={{ mt: 2, p: 2 }}>
        <Typography variant="h6">Cards associados:</Typography>
        <List dense={true}>
          {kid.cards?.map((card: ICard) => ( 
            <ListItem key={card.id}>
              <ListItemText primary={card.titulo} secondary={card.descricao} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default KidIndividual;
