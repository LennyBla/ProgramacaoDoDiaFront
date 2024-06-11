import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Botao from '../../../../componentes/Botoes/Botao/Button';
import CampoDigitacao from '../../Campo/Digite';
import usePost from '../../../../hook/usePost';
import autenticaStore from '../../../../stores/autentica.store';
import styles from './Login.module.scss';
import LogoCataratas from '../../../../asset/cataratasparkhotel.png';

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
            <button onClick={handleBack} className={styles.backButton}>
                <FontAwesomeIcon icon={faArrowLeft} /> Voltar
            </button>

            <div className={styles.LoginContainer}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.logoContainer}>
                        <img src={LogoCataratas} alt="Cataratas Park Hotel Logo" />
                    </div>

                    <h1 className={styles.Titulo}>Login</h1>
                    <div>
                        <CampoDigitacao
                            valor={username}
                            onChange={setUsername}
                            placeholder='Insira seu E-mail'
                            label='E-mail'
                            tipo='text'
                        />
                        <CampoDigitacao
                            valor={password}
                            onChange={setPassword}
                            placeholder='Digite a senha'
                            label='Senha'
                            tipo='password'
                        />
                    </div>
                    <div>
                        <Botao classe={styles.botao} tipo="submit">Entrar</Botao>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Login;
