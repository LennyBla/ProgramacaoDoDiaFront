import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ICadastroAdm } from "../../../../interfaces/ICadastroAdmr";
import Botao from '../../../../componentes/Botoes/Botao/Button';
import styles from './cadastro.module.scss';
import stylesGlobal from '../../../../Global.module.scss';
import CampoDigitacao from '../../Campo/Digite';
import usePost from '../../../../hook/usePost';
import LogoCataratas from '../../../../asset/cataratasparkhotel.png';

function CadastroAdm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirm_password] = useState('');
    const [username, setUsername] = useState('');
    const { cadastrarDados, erro, sucesso } = usePost();
    const [alerta, setAlerta] = useState<{ tipo: 'sucesso' | 'erro'; mensagem: string } | null>(null);
    const [usernameErro, setUsernameErro] = useState<boolean>(false);
    const [emailErro, setEmailErro] = useState<boolean>(false);
    const [passwordErro, setPasswordErro] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!username.includes('@')) {
            setUsernameErro(true);
            return;
        } else {
            setUsernameErro(false);
        }
        if (!email.includes('@') || !email.includes('.')) {
            setEmailErro(true);
            return;
        } else {
            setEmailErro(false);
        }
        const senhaForteRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        if (!senhaForteRegex.test(password)) {
            setPasswordErro(true);
            return;
        } else {
            setPasswordErro(false);
        }

        const userData: ICadastroAdm = {
            username: username,
            email: email,
            password: password,
            confirm_password: confirm_password
        }
        try {
            await cadastrarDados({ url: "/user/", dados: userData });
            if (sucesso) {
                setAlerta({ tipo: 'sucesso', mensagem: 'Cadastro realizado com sucesso!' });
                toast.success('Cadastro realizado com sucesso!');
                setTimeout(() => {
                    setAlerta(null);
                    navigate('/login/');
                }, 3000);
            }
        } catch (error) {
            setAlerta({ tipo: 'erro', mensagem: 'Não foi possível fazer o cadastro.' });
            toast.error('Não foi possível fazer o cadastro.');
            setTimeout(() => {
                setAlerta(null);
            }, 3000);
        }
    }

    const handleBack = () => {
        navigate(-1); // Navega para a página anterior
    };

    return (
        <>
            <button onClick={handleBack} className={styles.backButton}>
                <FontAwesomeIcon icon={faArrowLeft} /> Voltar
            </button>
            <div className={styles.CadastroAdmContainer}>
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
                <form onSubmit={handleSubmit}>
                    <div className={styles.logoContainer}>
                        <img src={LogoCataratas} alt="Cataratas Park Hotel Logo" />
                    </div>
                    <h1 className={stylesGlobal.Titulo}>Cadastro</h1>
                    <div>
                        <CampoDigitacao
                            valor={username}
                            tipo='text'
                            placeholder='E-mail'
                            onChange={setUsername}
                            label='E-mail'
                            erro={usernameErro}
                            mensagemErro="O username deve conter '@'."
                        />
                        <CampoDigitacao
                            valor={email}
                            tipo='text'
                            placeholder='Confirme seu e-mail'
                            onChange={setEmail}
                            label='Confirme seu E-mail'
                            erro={emailErro}
                            mensagemErro="E-mail inválido."
                        />
                        <CampoDigitacao
                            valor={password}
                            tipo='password'
                            placeholder='Digite a senha'
                            onChange={setPassword}
                            label='Senha'
                            erro={passwordErro}
                            mensagemErro="A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais."
                        />
                        <CampoDigitacao
                            valor={confirm_password}
                            tipo='password'
                            placeholder='Confirme a senha'
                            onChange={setConfirm_password}
                            label='Confirme a sua Senhaaaa'
                        />
                    </div>
                    <div>
                        <Botao classe={styles.botao} tipo="submit">Salvar</Botao>
                    </div>
                </form>
            </div>
        </>
    );
}

export default CadastroAdm;
