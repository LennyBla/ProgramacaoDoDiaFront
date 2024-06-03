import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Botao from '../../../../componentes/Botoes/Botao/Button';
import CampoDigitacao from '../../Campo/Digite';
import usePost from '../../../../hook/usePost';
import autenticaStore from '../../../../stores/autentica.store';
import stylesGlobal from '../../../../Global.module.scss';
import styles from './Login.module.scss';

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
            autenticaStore.login({ username, token: resposta.token });
            setAlerta({ tipo: 'sucesso', mensagem: 'Entrando ...' });
            setTimeout(() => {
                setAlerta(null);
                navigate('/admin/');
            }, 3000);
        }
        if (erro) {
            setAlerta({ tipo: 'erro', mensagem: erro });
            setTimeout(() => {
                setAlerta(null);
            }, 3000);
        }
    }, [resposta, erro, username, navigate]);

    return (
        <div className={styles.LoginContainer}>
            {alerta && (
                <div className={alerta.tipo === 'sucesso' ? styles.alertaSucesso : styles.alertaErro}>
                    {alerta.mensagem}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <h1 className={stylesGlobal.Titulo}>Login</h1>
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
                    <Botao tipo="submit">Entrar</Botao>
                </div>
            </form>
        </div>
    );
}

export default Login;
