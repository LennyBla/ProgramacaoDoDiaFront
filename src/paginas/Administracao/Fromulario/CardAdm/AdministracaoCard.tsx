import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { httpV2 } from "../../../../http";
import { ICard } from "../../../../interfaces/ICard";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, Typography, TableHead, TableRow, IconButton, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Fab } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import AddIcon from '@mui/icons-material/Add';

import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css'; 

const Administracao = () => {
    const [cards, setCards] = useState<ICard[]>([]);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedCard, setSelectedCard] = useState<ICard | null>(null);
    const [novoCardTitulo, setNovoCardTitulo] = useState('');
    const [novoCardDescricao, setNovoCardDescricao] = useState('');

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

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, card: ICard) => {
        setAnchorEl(event.currentTarget);
        setSelectedCard(card);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
        setNovoCardTitulo('');
        setNovoCardDescricao('');
    };

    const handleOpenEditDialog = () => {
        if (selectedCard) {
            setNovoCardTitulo(selectedCard.titulo);
            setNovoCardDescricao(selectedCard.descricao);
            setOpenDialog(true);
            handleMenuClose();
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedCard(null);
    };

    const handleCriarNovoCard = () => {
        httpV2.post('card/', {
            titulo: novoCardTitulo,
            descricao: novoCardDescricao
        })
            .then(() => {
                alert("Novo card criado com sucesso!");
                setNovoCardTitulo('');
                setNovoCardDescricao('');
                fetchCards();
                handleCloseDialog();
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleEditarCard = () => {
        if (selectedCard) {
            httpV2.put(`card/${selectedCard.id}/`, {
                titulo: novoCardTitulo,
                descricao: novoCardDescricao
            })
                .then(() => {
                    alert("Card atualizado com sucesso!");
                    fetchCards();
                    handleCloseDialog();
                })
                .catch(error => {
                    console.error(error);
                });
        }
    };

    return (
        <TableContainer component={Paper}>
            <Typography component="h1" variant="h4">Lista de Recreação</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Título</TableCell>
                        <TableCell>Descrição</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cards.map(card => (
                        <TableRow key={card.id}>
                            <TableCell>{card.titulo}</TableCell>
                            <TableCell>
                                <div dangerouslySetInnerHTML={{ __html: card.descricao }} /> {/* Renderiza a descrição como HTML */}
                            </TableCell>
                            <TableCell>
                                <IconButton aria-label="Menu" onClick={(event) => handleMenuOpen(event, card)}>
                                    <FontAwesomeIcon icon={faEllipsisV} />
                                </IconButton>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleMenuClose}
                                >
                                    <MenuItem onClick={handleOpenEditDialog}>Editar</MenuItem>
                                    <MenuItem onClick={() => excluir(card)}>Excluir</MenuItem>
                                </Menu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Fab color="primary" aria-label="add" onClick={handleOpenDialog} sx={{ position: 'fixed', bottom: 70, right: 70 }}>
                <AddIcon />
            </Fab>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>{selectedCard ? "Editar Card" : "Criar Novo Card"}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="titulo"
                        label="Título"
                        type="text"
                        fullWidth
                        value={novoCardTitulo}
                        onChange={(e) => setNovoCardTitulo(e.target.value)}
                    />
                    <Typography variant="h6" sx={{ mt: 2 }}>Descrição</Typography>
                    <ReactQuill 
                        value={novoCardDescricao} 
                        onChange={setNovoCardDescricao} 
                        theme="snow"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancelar</Button>
                    <Button onClick={selectedCard ? handleEditarCard : handleCriarNovoCard}>
                        {selectedCard ? "Salvar" : "Criar"}
                    </Button>
                </DialogActions>
            </Dialog>
        </TableContainer>
    );
};

export default Administracao;
