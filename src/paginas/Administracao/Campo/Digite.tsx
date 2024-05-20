import React from 'react';
import stylesGlobal from '../../../Global.module.scss';

interface Props {
    valor: string;
    tipo: string;
    placeholder: string;
    onChange: (value: string) => void;
    label?: string;
    classe?: string; // Propriedade opcional para classe
    erro?: boolean; // Propriedade opcional para indicar erro
    mensagemErro?: string; // Propriedade opcional para mensagem de erro
}

export default function CampoDigitacao({ valor, tipo, placeholder, onChange, label, classe, erro, mensagemErro }: Props) {
    return (
        <div>
            <label className={stylesGlobal.Rotulo}>{label}</label>
            <input
                className={`${classe ? classe : stylesGlobal.Input} ${erro ? stylesGlobal.InputErro : ''} ${!erro && valor ? stylesGlobal.InputSucesso : ''}`} // Aplicar classe customizada ou a padrão e classe de erro
                type={tipo}
                value={valor}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                required
            />
            {erro && <p className={stylesGlobal.MensagemErro}>{mensagemErro}</p>} {/* Mostrar mensagem de erro se houver erro */}
        </div>
    );
}