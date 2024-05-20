import React, { useState } from 'react';
import { Box, Button, Typography, AppBar, Container, Toolbar, Link, Paper, IconButton, Menu, MenuItem } from "@mui/material";
import { Link as RouterLink, useNavigate, Outlet } from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle';
import autenticaStore from "../../stores/autentica.store";

const PaginaBaseAdmin = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const navigate = useNavigate();

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        autenticaStore.logout();
        navigate('/login');
        handleClose();
    };

    const handleModificacoes = () =>{
        navigate ('/admin');
        handleClose();
    }

    return (
        <>
            <AppBar position="static" sx={{ bgcolor: '#006400', margin: 0 }}>
                <Container maxWidth="xl" sx={{ width: '100%', margin: 0 }}>
                    <Toolbar>
                        <Typography variant="h4" sx={{mx: 2, mr: 13, color: 'white' }}>
                            Administração
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Link component={RouterLink} to="/admin/card">
                                <Button sx={{ mx: 2, color: 'white' }}>
                                    RECREAÇÃO
                                </Button>
                            </Link>
                            <Link component={RouterLink} to="/admin/card/novo">
                                <Button sx={{ mx: 2, color: 'white' }}>
                                    Novo Card 
                                </Button>
                            </Link>
                            <Link component={RouterLink} to="/admin/Kids">
                                <Button sx={{ mx: 2, color: 'white' }}>
                                    Lista de Crianças
                                </Button>
                            </Link>
                            <Link component={RouterLink} to="/admin/Kids/novo">
                                <Button sx={{ mx: 2, color: 'white' }}>
                                    Novo Cadastro de Crinça
                                </Button>
                            </Link>
                        </Box>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                            <Typography variant="body1" sx={{ color: 'white', ml: 1 }}>
                                {autenticaStore.usuario.username}
                            </Typography>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleModificacoes}>Modificações</MenuItem>
                            <MenuItem onClick={handleLogout}>Sair</MenuItem>
                        </Menu>
                    </Toolbar>
                </Container>
            </AppBar>
            <Box>
                <Container maxWidth="lg" sx={{ mt: 1 }}>
                    <Paper sx={{ p: 2 }}>
                        <Outlet />
                    </Paper>
                </Container>
            </Box>
        </>
    )
}

export default PaginaBaseAdmin;
