import React, { useEffect, useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';

interface Log {
    id: number;
    username: string;
    action: string;
    timestamp: string;
}

const ListaModificacao = () => {
    const [auditLog, setAuditLog] = useState<Log[]>([]);

    useEffect(() => {
        const fetchAuditLog = async () => {
            try {
                const response = await axios.get<Log[]>('http://localhost:8000/api/v2/admin/logs/');
                setAuditLog(response.data);
            } catch (error) {
                console.error('Erro ao recuperar os registros de usuário:', error);
            }
        };

        fetchAuditLog();
    }, []);

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Registros de Usuário
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Usuário</TableCell>
                            <TableCell>Ação</TableCell>
                            <TableCell>Data e Hora</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {auditLog.map(log => (
                            <TableRow key={log.id}>
                                <TableCell>{log.username}</TableCell>
                                <TableCell>{log.action}</TableCell>
                                <TableCell>{log.timestamp}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default ListaModificacao;
