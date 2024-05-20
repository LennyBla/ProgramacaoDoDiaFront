import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, Container, Paper} from "@mui/material";
import { useParams } from "react-router-dom";
import { httpV2 } from "../../../../http";
import { Ikid } from "../../../../interfaces/Ikid";

const FormularioKids = () => {
    const parametros = useParams();
    const [nomeKid, setNomeKid] = useState('');
    const [idadeKid, setIdadeKid] = useState<number | ''>('');
    const [responsaveisKid, setResponsaveisKid] = useState('');
    const [obsKid, setObsKid] = useState('');
    const [numeroContato, setNumeroContato] = useState('');
    const [email, setEmail] = useState('');
    const [numeroApartamento, setNumeroApartamento] = useState('');
    const [horarioCheckout, setHorarioCheckout] = useState('');

    useEffect(() => {
        if (parametros.id) {
            httpV2.get<Ikid>(`kid/${parametros.id}/`)
                .then(resposta => {
                    setNomeKid(resposta.data.nome);
                    setIdadeKid(resposta.data.idade);
                    setResponsaveisKid(resposta.data.responsaveis);
                    setObsKid(resposta.data.obs);
                    setNumeroContato(resposta.data.numeroContato);
                    setEmail(resposta.data.email);
                    setNumeroApartamento(resposta.data.numeroApartamento);
                    setHorarioCheckout(resposta.data.horarioCheckout.slice(0, 16));
                });
        }
    }, [parametros]);

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();
        const horarioFormatado = horarioCheckout.slice(0, 16);

        const dataToSend = {
            id: parametros.id,
            nome: nomeKid,
            idade: idadeKid,
            responsaveis: responsaveisKid,
            obs: obsKid,
            email: email,
            numeroContato: numeroContato,
            numeroApartamento: numeroApartamento,
            horarioCheckout: horarioFormatado
        };

        if (parametros.id) {
            httpV2.put(`kid/${parametros.id}/`, dataToSend)
                .then(() => {
                    alert("Atualizado com sucesso!");
                })
                .catch(error => {
                    console.error('Erro ao atualizar:', error);
                });
        } else {
            httpV2.post('kid/', dataToSend)
                .then(() => {
                    setNomeKid("");
                    setIdadeKid("");
                    setResponsaveisKid("");
                    setObsKid("");
                    setNumeroContato("");
                    setEmail("");
                    setNumeroApartamento("");
                    setHorarioCheckout("");

                    alert("Cadastrado com sucesso!");
                })
                .catch(error => {
                    console.error('Erro ao cadastrar:', error);
                });
        }
    };

    return (
        <>
            <Box>
                <Container maxWidth="lg" sx={{ mt: 1 }}>
                    <Paper sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', flexDirection: "column", alignItems: "center", flexGrow: 1 }}>
                        <Typography component="h1" variant="h4">Formulário de Cadastro de Crianças</Typography>

                            <Box component="form" sx={{ width: '70%' }} onSubmit={aoSubmeterForm}>
                                <TextField
                                    value={nomeKid}
                                    onChange={e => setNomeKid(e.target.value)}
                                    label="Nome"
                                    variant="standard"
                                    fullWidth
                                    required
                                    margin="dense"
                                />
                                <TextField
                                    value={idadeKid}
                                    onChange={e => setIdadeKid(parseInt(e.target.value) || '')}
                                    label="Idade"
                                    variant="standard"
                                    fullWidth
                                    margin="dense"
                                />
                                <TextField
                                    value={responsaveisKid}
                                    onChange={e => setResponsaveisKid(e.target.value)}
                                    label="Responsáveis"
                                    variant="standard"
                                    fullWidth
                                    margin="dense"
                                />
                                <TextField
                                    value={obsKid}
                                    onChange={e => setObsKid(e.target.value)}
                                    label="Observações"
                                    variant="standard"
                                    fullWidth
                                    margin="dense"
                                />
                                <TextField
                                    value={numeroContato}
                                    onChange={e => setNumeroContato(e.target.value)}
                                    label="Número de Contato"
                                    variant="standard"
                                    fullWidth
                                    margin="dense"
                                />
                                <TextField
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    label="Email"
                                    variant="standard"
                                    fullWidth
                                    margin="dense"
                                />
                                <TextField
                                    value={numeroApartamento}
                                    onChange={e => setNumeroApartamento(e.target.value)}
                                    label="Número do Apartamento"
                                    variant="standard"
                                    fullWidth
                                    margin="dense"
                                />
                                <TextField
                                    value={horarioCheckout}
                                    onChange={e => setHorarioCheckout(e.target.value)}
                                    label="Horário de Checkout"
                                    type="datetime-local"
                                    variant="standard"
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
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

export default FormularioKids;
