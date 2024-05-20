import React, { useEffect, useState } from "react";
import axios from 'axios'; // Adicionando import do Axios
import { Ikid } from '../../interfaces/Ikid';
import Item from './ItemKid';
import styles from "./Listkids.module.scss";
import { IPaginacao } from "../../interfaces/IPaginacao";

interface ListKidsProps {
    kids: Ikid[];
}

const ListKids: React.FC<ListKidsProps> = ({ kids }) => {
    const [kid, setKid] = useState<Ikid[]>([]);
    const [proximaPagina, setProximaPagina] = useState('');

    useEffect(() => {
        axios.get <IPaginacao<Ikid>>('http://localhost:8000/api/v1/kid/') // Corrigindo a URL da API/ aqui somente o usuario adm podera observar 
            .then(response => {
                setKid(response.data.results);
                setProximaPagina(response.data.next);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const verMais = () => {
        axios.get <IPaginacao<Ikid>>(proximaPagina)
            .then(response => {
                setKid([...kid, ...response.data.results]);
                setProximaPagina(response.data.next);
            })
            .catch(erro => {
                console.log(erro);
            });
    };

    return (
        <aside className={styles.chamada}>
            <h1>Lista de <span>Chamada </span></h1>
            <ul>
                {kids.map((item, index) => (
                    <Item
                        key={index}
                        {...item}
                    />
                ))}
            </ul>
            {proximaPagina && <button onClick={verMais}>Ver Mais</button>}
        </aside>
    );
};

export default ListKids;
