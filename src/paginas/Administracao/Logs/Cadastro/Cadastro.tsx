import React, { useState, useEffect, FormEvent } from "react";
import { toast, ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { httpV1 } from "../../../../http";
import Botao from "../../../../componentes/Botoes/Botao/Button";
import { Ikid } from "../../../../interfaces/Ikid";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import StylesGlobal from '../../../../Global.module.scss';
import CampoDigitacao from "../../Campo/Digite";
import styles from './Cadastro.module.scss';
import LogoCataratas from '../../../../asset/cataratasparkhotel.png';

function Cadastro() {
    const navigate = useNavigate();
    const parametros = useParams<{ id: string }>();
    const [nomeKid, setNomeKid] = useState('');
    const [idadeKid, setIdadeKid] = useState<string>('');
    const [responsaveisKid, setResponsaveisKid] = useState('');
    const [obsKid, setObsKid] = useState('');
    const [numeroContato, setNumeroContato] = useState('');
    const [email, setEmail] = useState('');
    const [numeroApartamento, setNumeroApartamento] = useState('');
    const [horarioCheckout, setHorarioCheckout] = useState('');
    const [alerta, setAlerta] = useState<{ tipo: 'sucesso' | 'erro'; mensagem: string } | null>(null);

    useEffect(() => {
        const abortController = new AbortController();
        const fetchData = async () => {
            if (parametros.id) {
                try {
                    const resposta = await httpV1.get<Ikid>(`cadastro-kids/${parametros.id}/`, { signal: abortController.signal });
                    setNomeKid(resposta.data.nome);
                    setIdadeKid(String(resposta.data.idade));
                    setResponsaveisKid(resposta.data.responsaveis);
                    setObsKid(resposta.data.obs);
                    setNumeroContato(resposta.data.numeroContato);
                    setEmail(resposta.data.email);
                    setNumeroApartamento(resposta.data.numeroApartamento);
                    setHorarioCheckout(resposta.data.horarioCheckout.slice(0, 16));
                } catch (error) {
                    if (!abortController.signal.aborted) {
                        console.error('Erro ao buscar dados', error);
                    }
                }
            }
        };
        fetchData();

        return () => {
            abortController.abort();
        };
    }, [parametros]);

    const handleSubmit = async (evento: FormEvent<HTMLFormElement>) => {
        evento.preventDefault();
        const horarioFormatado = horarioCheckout.slice(0, 16);

        const dataToSend = {
            id: parametros.id,
            nome: nomeKid,
            idade: idadeKid,
            responsaveis: responsaveisKid,
            obs: obsKid,
            email: email,
            numeroContato: numeroContato,
            numeroApartamento: numeroApartamento,
            horarioCheckout: horarioFormatado
        };

        try {
            if (parametros.id) {
                await httpV1.put(`cadastro-kids/${parametros.id}/`, dataToSend);
            } else {
                await httpV1.post('cadastro-kids/', dataToSend);
            }
            setAlerta({ tipo: 'sucesso', mensagem: 'Cadastrado com sucesso!' });
            toast.success('Sucesso!');
            setTimeout(() => {
                setAlerta(null);
                navigate(-1);
            }, 3000);
        } catch (error) {
            setAlerta({ tipo: 'erro', mensagem: 'Erro ao cadastrar. Por favor, tente novamente.' });
            toast.error(`Erro de login: ${error}`);
            setTimeout(() => {
                setAlerta(null);
            }, 3000);
        }
    };

    const handleBack = () => {
        navigate(-1); // Navega para a página anterior
    };

    return (
        <>
            <button onClick={handleBack} className={styles.backButton}>
                <FontAwesomeIcon icon={faArrowLeft} /> Voltar
            </button>
            <div className={styles.CadastroContainer}>
                {alerta && (
                    <div className={alerta.tipo === 'sucesso' ? styles.alertaSucesso : styles.alertaErro}>
                        {alerta.mensagem}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className={styles.logoContainer}>
                        <img src={LogoCataratas} alt="Cataratas Park Hotel Logo" />
                    </div>
                    <h1 className={StylesGlobal.Titulo}>Cadastre a Criança</h1>
                    <div>
                        <CampoDigitacao
                            valor={nomeKid}
                            tipo='text'
                            placeholder='Nome completo'
                            onChange={setNomeKid}
                            label='Nome Completo'
                        />
                        <CampoDigitacao
                            valor={idadeKid}
                            tipo='text'
                            placeholder='Idade'
                            onChange={setIdadeKid}
                            label='Idade'
                        />
                        <CampoDigitacao
                            valor={responsaveisKid}
                            tipo='text'
                            placeholder='Responsáveis'
                            onChange={setResponsaveisKid}
                            label='Pais ou Responsáveis'
                        />
                        <CampoDigitacao
                            valor={obsKid}
                            tipo='text'
                            placeholder='Observações'
                            onChange={setObsKid}
                            label='Observações sobre a Criança'
                        />
                        <CampoDigitacao
                            valor={numeroContato}
                            tipo='text'
                            placeholder='Número de Contato'
                            onChange={setNumeroContato}
                            label='Número de Contato'
                        />
                        <CampoDigitacao
                            valor={email}
                            tipo='text'
                            placeholder='Insira seu e-mail'
                            onChange={setEmail}
                            label='E-mail'
                        />
                        <CampoDigitacao
                            valor={numeroApartamento}
                            tipo='text'
                            placeholder='Número do Apartamento'
                            onChange={setNumeroApartamento}
                            label='Número do Apartamento'
                        />
                        <CampoDigitacao
                            valor={horarioCheckout}
                            tipo='datetime-local'
                            placeholder='Horário Checkout'
                            onChange={setHorarioCheckout}
                            label='Horário Checkout'
                        />
                    </div>
                    <Botao classe={styles.botao} tipo="submit">Cadastrar</Botao>
                </form>
            </div>
        </>
    );
}

export default Cadastro;
