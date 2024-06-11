import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Paper, List, ListItem, ListItemText, CircularProgress } from "@mui/material";
import { ICard } from '../../../../interfaces/ICard';
import { Ikid } from '../../../../interfaces/Ikid';
import axios from 'axios';

const CardIndividual = () => {
    const { id } = useParams<{ id: string }>();
    const [card, setCard] = useState<ICard | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchCard = async () => {
            try {
                const response = await axios.get(`/api/cards/${id}`);
                setCard(response.data);
            } catch (error) {
                console.error('Error fetching card:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCard();
    }, [id]);

    if (loading) {
        return <CircularProgress />;
    }

    if (!card) {
        return <Typography>Card not found</Typography>;
    }

    return (
        <Box>
            <Typography variant="h4" gutterBottom>{card.titulo}</Typography>
            <Typography variant="body1" gutterBottom>{card.descricao}</Typography>
            <Paper elevation={3} sx={{ mt: 2, p: 2 }}>
                <Typography variant="h6">Crianças associadas:</Typography>
                <List>
                    {card.kids.map((kid: Ikid) => (
                        <ListItem key={kid.id}>
                            <ListItemText primary={kid.nome} secondary={`Idade: ${kid.idade}`} />
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Box>
    );
};

export default CardIndividual;
