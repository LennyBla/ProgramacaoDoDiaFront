import React, { useEffect, useState } from 'react';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, Typography, TableHead, TableRow, Grid, FormControlLabel, Checkbox } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { httpV2 } from "../../../../http";
import { Ikid } from "../../../../interfaces/Ikid";
import ItemKid from "../../../../componentes/ListKds/ItemKid/index";

const AdministracaoKids = () => {
  const [kids, setKids] = useState<Ikid[]>([]);
  const [kidSelecionada, setKidSelecionada] = useState<Ikid | null>(null);
  const [detalhesAbertos, setDetalhesAbertos] = useState<boolean>(false);
  const [checkedValues, setCheckedValues] = useState<Record<string, { present: boolean }>>({});

  useEffect(() => {
    const savedCheckedValues = localStorage.getItem('checkedValues');
    if (savedCheckedValues) {
      setCheckedValues(JSON.parse(savedCheckedValues));
    }

    httpV2.get<Ikid[]>("kid/").then((response) => {
      console.log("Response from API:", response.data); // Verificar a resposta da API
      const initialCheckedValues: Record<string, { present: boolean }> = {};
      response.data.forEach((kid) => {
        const storedValue = localStorage.getItem(kid.id.toString());
        if (storedValue) {
          initialCheckedValues[kid.id.toString()] = { present: JSON.parse(storedValue) };
        } else {
          initialCheckedValues[kid.id.toString()] = { present: false };
        }
      });
      setKids(response.data);
      setCheckedValues(initialCheckedValues);
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('checkedValues', JSON.stringify(checkedValues));
  }, [checkedValues]);

  const excluir = (kidASerExcluido: Ikid) => {
    console.log("Excluindo criança com ID:", kidASerExcluido.id); // Verificar o ID da criança a ser excluída
    httpV2.delete(`kid/${kidASerExcluido.id}/`).then(() => {
      const listaKid = kids.filter((kid) => kid.id !== kidASerExcluido.id);
      setKids(listaKid);
      console.log("Lista atualizada após exclusão:", listaKid); // Verificar a lista após exclusão
    });
  };

  const abrirDetalhes = (kid: Ikid) => {
    console.log("Abrindo detalhes para:", kid.id); // Verificar qual criança está sendo selecionada
    if (kidSelecionada && kidSelecionada.id === kid.id) {
      setDetalhesAbertos(false);
      setKidSelecionada(null);
    } else {
      setDetalhesAbertos(true);
      setKidSelecionada(kid);
    }
  };

  const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>, kid: Ikid) => {
    console.log("Alterando presença para:", kid.id); // Verificar qual criança está sendo alterada
    const updatedCheckedValues = { ...checkedValues };
    updatedCheckedValues[kid.id.toString()] = { present: event.target.checked };
    setCheckedValues(updatedCheckedValues);
    localStorage.setItem(kid.id.toString(), JSON.stringify(event.target.checked));
  };

  return (
    <TableContainer component={Paper} sx={{ mx: 'auto', maxWidth: '90%' }}>
      <Typography component="h1" variant="h4" gutterBottom sx={{ mb: 2, textAlign: 'center' }}>Lista de Crianças</Typography>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold', width: 150 }}>Nome</TableCell>
            <TableCell sx={{ fontWeight: 'bold', width: 50 }}>Idade</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Observação</TableCell>
            <TableCell sx={{ fontWeight: 'bold', width: 150 }}>Número de Contato</TableCell>
            <TableCell sx={{ fontWeight: 'bold', width: 150 }}>Email</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Editar</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Excluir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {kids.map((kid) => (
            <React.Fragment key={kid.id}>
              <TableRow onClick={() => abrirDetalhes(kid)}>
                <TableCell>{kid.nome}</TableCell>
                <TableCell>{kid.idade}</TableCell>
                <TableCell>{kid.obs}</TableCell>
                <TableCell>{kid.numeroContato}</TableCell>
                <TableCell>{kid.email}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary" component={RouterLink} to={`/admin/kids/${kid.id}`}>
                    Editar
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant="outlined" color="error" onClick={() => excluir(kid)}>
                    Excluir
                  </Button>
                </TableCell>
              </TableRow>
              {detalhesAbertos && kidSelecionada && kidSelecionada.id === kid.id && (
                <TableRow>
                  <TableCell colSpan={7}>
                    <Grid container spacing={2} sx={{ px: 0 }}>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={<Checkbox checked={checkedValues[kid.id.toString()]?.present || false} onChange={(event) => handleChangeCheckbox(event, kid)} />}
                          label="Criança Presente"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <ItemKid kid={kidSelecionada} />
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdministracaoKids;
