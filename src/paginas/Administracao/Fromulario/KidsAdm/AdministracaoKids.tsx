import React, { useEffect } from 'react';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, Typography, TableHead, TableRow, Grid, FormControlLabel, Checkbox } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState } from "react";
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
    // Carregar dados do armazenamento local, se disponível
    const savedCheckedValues = localStorage.getItem('checkedValues');
    if (savedCheckedValues) {
      setCheckedValues(JSON.parse(savedCheckedValues));
    }

    httpV2.get<Ikid[]>("kid/").then((response) => {
      // Inicializar checkedValues com os valores iniciais de cada criança
      const initialCheckedValues: Record<string, { present: boolean }> = {};
      response.data.forEach((kid) => {
        // Verificar se já existe um valor no localStorage para essa criança
        const storedValue = localStorage.getItem(kid.id.toString());
        if (storedValue) {
          // Se existir, usar o valor armazenado
          initialCheckedValues[kid.id.toString()] = { present: JSON.parse(storedValue) };
        } else {
          // Se não existir, inicializar como false
          initialCheckedValues[kid.id.toString()] = { present: false };
        }
      });
      setKids(response.data);
      setCheckedValues(initialCheckedValues);
    });
  }, []);

  // Salvar os valores dos checkboxes no armazenamento local sempre que houver mudanças
  useEffect(() => {
    localStorage.setItem('checkedValues', JSON.stringify(checkedValues));
  }, [checkedValues]);

  const excluir = (kidASerExcluido: Ikid) => {
    httpV2.delete(`kid/${kidASerExcluido.id}/`).then(() => {
      const listaKid = kids.filter((kid) => kid.id !== kidASerExcluido.id);
      setKids(listaKid);
    });
  };

  const abrirDetalhes = (kid: Ikid) => {
    if (kidSelecionada && kidSelecionada.id === kid.id) {
      setDetalhesAbertos(false);
      setKidSelecionada(null);
    } else {
      setDetalhesAbertos(true);
      setKidSelecionada(kid);
    }
  };

  const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>, kid: Ikid) => {
    const updatedCheckedValues = { ...checkedValues };
    updatedCheckedValues[kid.id.toString()] = { present: event.target.checked };
    setCheckedValues(updatedCheckedValues);
    localStorage.setItem(kid.id.toString(), JSON.stringify(event.target.checked));
  };

  return (
    
    <TableContainer component={Paper}>
     <Typography component="h1" variant="h4" gutterBottom sx={{ mb: 2 }}>Registros de Crianças</Typography>
      <Table sx={{ minWidth: 650 }}> {/* Set minimum table width */}
      
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
                  <TableCell /> {/* Empty cell to maintain table structure */}
                  <TableCell /> {/* Empty cell to maintain table structure */}
                  <TableCell colSpan={5}>
                    <Grid container spacing={2} sx={{ px: 2 }}> {/* Add padding for better spacing */}
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={<Checkbox checked={checkedValues[kid.id.toString()]?.present || false} onChange={(event) => handleChangeCheckbox(event, kid)} />}
                          label="Criança Presente"
                        />
                        <FormControlLabel
                          control={<Checkbox checked={!checkedValues[kid.id.toString()]?.present} onChange={(event) => handleChangeCheckbox(event, kid)} />}
                          label="Criança Não Presente"
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