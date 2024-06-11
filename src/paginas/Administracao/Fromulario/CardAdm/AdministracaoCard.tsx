import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { httpV2 } from "../../../../http";
import { ICard } from "../../../../interfaces/ICard";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, Typography, TableHead, TableRow, IconButton, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Fab } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import AddIcon from '@mui/icons-material/Add';

const Administracao = () => {
    const [cards, setCards] = useState<ICard[]>([]);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [openDialog, setOpenDialog] = useState(false);
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

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
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

    return (
        <TableContainer component={Paper}>
            <Typography variant="h4" gutterBottom>Dia </Typography>
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
                            <TableCell>{card.descricao}</TableCell>
                            <TableCell>
                                <IconButton aria-label="Menu" onClick={handleMenuOpen}>
                                    <FontAwesomeIcon icon={faEllipsisV} />
                                </IconButton>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleMenuClose}
                                >
                                    <MenuItem component={RouterLink} to={`/admin/card/${card.id}`} onClick={handleMenuClose}> Editar </MenuItem>
                                    
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
                <DialogTitle>Criar Novo Card</DialogTitle>
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
                    <TextField
                        margin="dense"
                        id="descricao"
                        label="Descrição"
                        type="text"
                        fullWidth
                        value={novoCardDescricao}
                        onChange={(e) => setNovoCardDescricao(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancelar</Button>
                    <Button onClick={handleCriarNovoCard}>Criar</Button>
                </DialogActions>
            </Dialog>
        </TableContainer>
    );
};

export default Administracao;
