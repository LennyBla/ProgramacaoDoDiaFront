import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TextField, Typography, Container, Box, Paper, Button as MuiButton } from '@mui/material';
import usePost from '../../../../hook/usePost';
import autenticaStore from '../../../../stores/autentica.store';
import styles from './Login.module.scss';
import LogoCataratas from '../../../../asset/cataratasparkhotel.png';
import Botao from '../../../../componentes/Botoes/Botao/Button';  // O componente personalizado

function Login() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [alerta, setAlerta] = useState<{ tipo: 'sucesso' | 'erro'; mensagem: string } | null>(null);
    const { cadastrarDados, resposta, erro } = usePost();
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const userData = { username, password };
        await cadastrarDados({ url: "/login/", dados: userData });
    };

    useEffect(() => {
        if (resposta?.token) {
            const expirationTime = Date.now() + 3600 * 1000;
            autenticaStore.login({ username, token: resposta.token, expirationTime });

            setAlerta({ tipo: 'sucesso', mensagem: 'Entrando ...' });
            toast.success('Login bem-sucedido! Entrando ...');
            setTimeout(() => {
                setAlerta(null);
                navigate('/admin/');
            }, 3000);
        }
        if (erro) {
            setAlerta({ tipo: 'erro', mensagem: erro });
            toast.error(`Erro de login: ${erro}`);
            setTimeout(() => {
                setAlerta(null);
            }, 3000);
        }
    }, [resposta, erro, username, navigate]);

    const handleBack = () => {
        navigate(-1); 
    };

    return (
        <>
            <ToastContainer 
                position="top-center" 
                autoClose={3000} 
                hideProgressBar 
                closeOnClick 
                pauseOnHover 
                draggable 
                transition={Slide} 
                style={{ top: '10px' }}
            />
            <MuiButton onClick={handleBack} startIcon={<FontAwesomeIcon icon={faArrowLeft} />} sx={{ mb: 2, mt: 2 }}>
                Voltar
            </MuiButton>

            <Container maxWidth="xs" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Paper 
                    elevation={6} 
                    sx={{ 
                        p: 4, 
                        borderRadius: 5, 
                        width: '100%', 
                        maxWidth: 400,
                        textAlign: 'center',
                    }}
                >
                    <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
                        <img src={LogoCataratas} alt="Cataratas Park Hotel Logo" style={{ width: '400px', marginBottom: '20px' }} />
                        <Typography component="h1" variant="h5">
                            Login
                        </Typography>
                    </Box>

                    <form onSubmit={handleSubmit}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="E-mail"
                            type="email"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Senha"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        
                        <Botao classe={styles.botao} tipo="submit">
                            Entrar
                        </Botao>
                    </form>

                    <MuiButton
                        component={Link}
                        to="/cadastroAdm"
                        fullWidth
                        variant="text"
                        color="primary"
                        sx={{ mt: 3 }}
                    >
                      Cadastre-se
                    </MuiButton>
                </Paper>
            </Container>
        </>
    );
}

export default Login;
