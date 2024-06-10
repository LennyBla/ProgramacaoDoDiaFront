import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer,Typography,  TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { httpV2 } from "../../../../http";
import { ICard } from "../../../../interfaces/ICard";

const Administracao = () => {
    const [cards, setCards] = useState<ICard[]>([]);

    useEffect(() => {
        fetchCards();
    }, []);

    const fetchCards = () => {
        httpV2.get<ICard[]>('card/')
            .then(resposta => setCards(resposta.data))
            .catch(error => console.error('Erro ao buscar cards:', error));
    };

    const excluir = (cardASerExcluido: ICard) => {
        httpV2.delete(`card/${cardASerExcluido.id}/`)
            .then(() => {
                const listaAtualizada = cards.filter(card => card.id !== cardASerExcluido.id);
                setCards(listaAtualizada);
            })
            .catch(error => console.error('Erro ao excluir card:', error));
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>Lista Recreação</Typography>
            <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Título</TableCell>
                        <TableCell>Descrição</TableCell>
                        <TableCell>Editar</TableCell>
                        <TableCell>Excluir</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cards.map(card => (
                        <TableRow key={card.id}>
                            <TableCell>{card.titulo}</TableCell>
                            <TableCell>{card.descricao}</TableCell>
                            <TableCell>
                                <Button variant="outlined" color="primary" component={RouterLink} to={`/admin/card/${card.id}`}>
                                    Editar
                                </Button>
                            </TableCell>
                            <TableCell>
                                <Button variant="outlined" color="error" onClick={() => excluir(card)}>
                                    Excluir
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

        </Box>

    );
};

export default Administracao;