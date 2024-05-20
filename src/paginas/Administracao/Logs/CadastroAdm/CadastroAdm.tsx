import React, { useState } from 'react';
import Botao from '../../../../componentes/Botoes/Botao/Button';
import styles from './cadastro.module.scss';
import { ICadastroAdm } from "../../../../interfaces/ICadastroAdmr";
import { useNavigate } from "react-router-dom";
import stylesGlobal from '../../../../Global.module.scss'
import CampoDigitacao from '../../Campo/Digite';
import usePost from '../../../../hook/usePost';

function CadastroAdm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirm_password] = useState('');
    const [username, setUsername] = useState('');
    const { cadastrarDados, erro, sucesso } = usePost();
    const [alerta, setAlerta] = useState<{ tipo: 'sucesso' | 'erro'; mensagem: string } | null>(null);
    const [usernameErro, setUsernameErro] = useState<boolean>(false); // Estado para indicar erro no username
    const [emailErro, setEmailErro] = useState<boolean>(false); // Estado para indicar erro no email
    const [passwordErro, setPasswordErro] = useState<boolean>(false); // Estado para indicar erro na senha
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Validar username
        if (!username.includes('@')) {
            setUsernameErro(true);
            return;
        } else {
            setUsernameErro(false);
        }

        // Validar email
        if (!email.includes('@') || !email.includes('.')) {
            setEmailErro(true);
            return;
        } else {
            setEmailErro(false);
        }

        // Validar senha
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
                setTimeout(() => {
                    setAlerta(null);
                    navigate('/login/');
                }, 3000);
            }
        } catch (error) {
            setAlerta({ tipo: 'erro', mensagem: 'Não foi possível fazer o cadastro.' });
            setTimeout(() => {
                setAlerta(null);
            }, 3000);
        }
    }

    return (
        <div className={styles.CadastroAdmContainer}>
            {alerta && (
                <div className={alerta.tipo === 'sucesso' ? styles.alertaSucesso : styles.alertaErro}>
                    {alerta.mensagem}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <h1 className={stylesGlobal.Titulo}>Cadastro</h1>
                <div>
                    <CampoDigitacao
                        valor={username}
                        tipo='text'
                        placeholder='E-mail'
                        onChange={setUsername}
                        label='E-mail'
                        erro={usernameErro} // Passar estado de erro para o componente CampoDigitacao
                        mensagemErro="O username deve conter '@'." // Mensagem de erro
                    />
                    <CampoDigitacao
                        valor={email}
                        tipo='text'
                        placeholder='Confirme seu e-mail'
                        onChange={setEmail}
                        label='Confirme seu E-mail'
                        erro={emailErro} // Passar estado de erro para o componente CampoDigitacao
                        mensagemErro="E-mail inválido." // Mensagem de erro
                    />
                    <CampoDigitacao
                        valor={password}
                        tipo='password'
                        placeholder='Digite a senha'
                        onChange={setPassword}
                        label='Senha'
                        erro={passwordErro} // Passar estado de erro para o componente CampoDigitacao
                        mensagemErro="A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais." // Mensagem de erro
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
                    <Botao tipo="submit" classe={styles.btn}>Salvar</Botao>
                </div>
            </form>
        </div>
    );
}

export default CadastroAdm;
