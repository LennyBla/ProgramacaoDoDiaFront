import React, { useState } from 'react';
import { Box, Button, Typography, AppBar, Container, Toolbar, Link, Paper, IconButton, Menu, MenuItem, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { Link as RouterLink, useNavigate, Outlet } from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import autenticaStore from "../../stores/autentica.store";

const PaginaBaseAdmin = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [mobileOpen, setMobileOpen] = useState(false);
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

    const handleModificacoes = () => {
        navigate('/admin');
        handleClose();
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                Administração
            </Typography>
            <List>
                <ListItem button component={RouterLink} to="/admin/card">
                    <ListItemText primary="RECREAÇÃO" />
                </ListItem>
                <ListItem button component={RouterLink} to="/admin/card/novo">
                    <ListItemText primary="Novo Card" />
                </ListItem>
                <ListItem button component={RouterLink} to="/admin/Kids">
                    <ListItemText primary="Lista de Crianças" />
                </ListItem>
                <ListItem button component={RouterLink} to="/admin/Kids/novo">
                    <ListItemText primary="Novo Cadastro de Criança" />
                </ListItem>
                <ListItem button onClick={handleModificacoes}>
                    <ListItemText primary="Modificações" />
                </ListItem>
                <ListItem button onClick={handleLogout}>
                    <ListItemText primary="Sair" />
                </ListItem>
            </List>
        </Box>
    );

    return (
        <>
            <AppBar position="static" sx={{ bgcolor: '#006400', margin: 0 }}>
                <Container maxWidth="xl" sx={{ width: '100%', margin: 0 }}>
                    <Toolbar>
                        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                            <Typography variant="h4" sx={{ mx: 2, color: 'white' }}>
                                Administração
                            </Typography>
                        </Box>
                        <Box sx={{ display: { xs: 'block', md: 'none' }, flexGrow: 1 }}>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                onClick={handleDrawerToggle}
                            >
                                <MenuIcon />
                            </IconButton>
                        </Box>
                        <Box sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1, justifyContent: 'center' }}>
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
                                    Novo Cadastro de Criança
                                </Button>
                            </Link>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
                        </Box>
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
            <Box component="nav">
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box>
                <Container maxWidth="lg" sx={{ mt: 1 }}>
                    <Paper sx={{ p: 2 }}>
                        <Outlet />
                    </Paper>
                </Container>
            </Box>
        </>
    );
}

export default PaginaBaseAdmin;
