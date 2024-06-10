import { Box, Button, TextField, Typography, Container, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { httpV2 } from "../../../../http";
import { ICard } from "../../../../interfaces/ICard";

const FormularioCard = () => {
    const parametros = useParams();

    const [tituloCard, setTituloCard] = useState('');
    const [descricaoCard, setDescricaoCard] = useState('');

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

    return (
        <>
            <Box>
                <Container maxWidth="lg" sx={{ mt: 1 }}>
        
                    <Paper sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', flexDirection: "column", alignItems: "center", flexGrow: 1 }}>
                            <Typography component="h1" variant="h4">Nova Recreação</Typography>
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
                                <TextField
                                    value={descricaoCard}
                                    onChange={evento => setDescricaoCard(evento.target.value)}
                                    label="Descrição da atividade"
                                    variant="standard"
                                    fullWidth
                                    required
                                    multiline
                                    rows={2}
                                    margin="dense"
                                />
                                <Button sx={{ marginTop: 3 }} type="submit" fullWidth variant="outlined">Salvar</Button>
                            </Box>
                        </Box>
                    </Paper>
                </Container>
            </Box>
        </>
    );
};

export default FormularioCard;
