import { useState } from 'react';
import { httpV2 } from '../http';
import Cookies from 'js-cookie';
//import { useAlert } from './useAlert'; // Importando o hook useAlert

interface IResponseData {
    token?: string;
    error?: string;
}

export default function usePost() {
    const [erro, setErro] = useState<string>('');
    const [sucesso, setSucesso] = useState<boolean>(false);
    const [resposta, setResposta] = useState<IResponseData | null>(null);
   // const alert = useAlert(); // Inicializa o hook useAlert

    async function cadastrarDados<T>({ url, dados, authToken }: { url: string; dados: T; authToken?: string }) {
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': authToken ? `Bearer ${authToken}` : ''
        };

        const csrfToken = Cookies.get('csrftoken');
        if (csrfToken) {
            headers['X-CSRFToken'] = csrfToken;
        }

        try {
            const response = await httpV2.post(url, dados, { headers });
            setSucesso(true);
            setResposta({ token: response.data.token });
            //alert({ message: 'Cadastro realizado com sucesso', type: 'success' }); // Exibe alerta de sucesso
        } catch (error: any) {
            setErro(`Não foi possível fazer login: ${error.response?.data?.detail || error.message}`);
            setSucesso(false);
            setResposta(null);
          //  alert({ message: erro, type: 'error' }); // Exibe alerta de erro
        }
    }
    

    return { cadastrarDados, sucesso, erro, resposta };
}
