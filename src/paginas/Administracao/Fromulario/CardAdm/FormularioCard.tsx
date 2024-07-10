import { Box, Button, Typography, Container, Paper, Fab, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ReactQuill from 'react-quill'; // Importação do ReactQuill para edição do texto
import 'react-quill/dist/quill.snow.css'; // Importação dos estilos do ReactQuill

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { httpV2 } from "../../../../http";
import { ICard } from "../../../../interfaces/ICard";

const FormularioCard = () => {
    const parametros = useParams();
    const [tituloCard, setTituloCard] = useState('');
    const [descricaoCard, setDescricaoCard] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [novoCardTitulo, setNovoCardTitulo] = useState('');
    const [novoCardDescricao, setNovoCardDescricao] = useState('');

    useEffect(() => {
        if (parametros.id) {
            httpV2.get<ICard>(`card/${parametros.id}/`)
                .then(resposta => {
                    setTituloCard(resposta.data.titulo);
                    setDescricaoCard(resposta.data.descricao);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [parametros]);

    const limparInputs = () => {
        setTituloCard('');
        setDescricaoCard('');
    };

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();

        if (parametros.id) {
            httpV2.put(`card/${parametros.id}/`, {
                titulo: tituloCard,
                descricao: descricaoCard
            })
                .then(() => {
                    alert("Atualizado com sucesso!");
                    limparInputs();
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            httpV2.post('card/', {
                titulo: tituloCard,
                descricao: descricaoCard
            })
                .then(() => {
                    alert("Cadastrado com sucesso!");
                    limparInputs();
                })
                .catch(error => {
                    console.error(error);
                });
        }
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
                handleCloseDialog();
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <>
            <Box>
                <Container maxWidth="lg" sx={{ mt: 1 }}>
                    <Paper sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', flexDirection: "column", alignItems: "center", flexGrow: 1 }}>
                            <Typography component="h1" variant="h4">Formulario de Recreação</Typography>
                            <Box component="form" sx={{ width: '70%' }} onSubmit={aoSubmeterForm}>
                                <TextField
                                    value={tituloCard}
                                    onChange={evento => setTituloCard(evento.target.value)}
                                    label="Título da atividade"
                                    variant="standard"
                                    fullWidth
                                    required
                                    margin="dense"
                                />
                                <Typography variant="h6" sx={{ mt: 2 }}>Descrição da atividade</Typography>
                                <ReactQuill 
                                    value={descricaoCard} 
                                    onChange={setDescricaoCard} 
                                    theme="snow"
                                />
                                <Button sx={{ marginTop: 3 }} type="submit" fullWidth variant="outlined">Salvar</Button>
                            </Box>
                        </Box>
                    </Paper>
                </Container>
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
                        <Typography variant="h6" sx={{ mt: 2 }}>Descrição</Typography>
                        <ReactQuill 
                            value={novoCardDescricao} 
                            onChange={setNovoCardDescricao} 
                            theme="snow"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>Cancelar</Button>
                        <Button onClick={handleCriarNovoCard}>Criar</Button>
                    </DialogActions>
                </Dialog>
                <Fab color="primary" aria-label="add" onClick={handleOpenDialog} sx={{ position: 'fixed', bottom: 70, right: 70 }}>
                    <AddIcon />
                </Fab>
            </Box>
        </>
    );
};

export default FormularioCard;
