import { makeObservable, observable, action } from "mobx";
import { httpV2 } from '../http'

interface IUsuario {
    username: string;
    token: string;
}

class AutenticaStore {
    estaAutenticado = false;
    usuario: IUsuario = { username: "", token: "" };

    constructor() {
        makeObservable(this, {
            estaAutenticado: observable,
            usuario: observable,
            login: action,
            logout: action
        });

        this.initializeAuth();
    }

    login({ username, token }: IUsuario) {
        this.setAuthData(username, token);
    }

    logout() {
        this.clearAuthData();
    }

    setAuthData(username: string, token: string) {
        this.estaAutenticado = true;
        this.usuario = { username, token };
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
    }

    clearAuthData() {
        this.estaAutenticado = false;
        this.usuario = { username: "", token: "" };
        localStorage.removeItem('token');
        localStorage.removeItem('username');
    }

    initializeAuth() {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        
        if (token && username) {
            this.setAuthData(username, token);
        }
    }
}

const autenticaStore = new AutenticaStore();

export default autenticaStore;
