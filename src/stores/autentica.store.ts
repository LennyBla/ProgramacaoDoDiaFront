import { makeObservable, observable, action } from "mobx";
import { httpV2 } from '../http'

interface IUsuario {
  username: string;
  token: string;
  expirationTime: number; 
}

class AutenticaStore {
  estaAutenticado = false;
  usuario: IUsuario = { username: "", token: "", expirationTime: 0 };

  constructor() {
    makeObservable(this, {
      estaAutenticado: observable,
      usuario: observable,
      login: action,
      logout: action,
      refreshToken: action, 
    });

    this.initializeAuth();
  }

  login({ username, token, expirationTime }: IUsuario) {
    this.setAuthData(username, token, expirationTime);
  }

  logout() {
    this.clearAuthData();
  }

  setAuthData(username: string, token: string, expirationTime: number) {
    this.estaAutenticado = true;
    this.usuario = { username, token, expirationTime };
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    localStorage.setItem('expirationTime', expirationTime.toString()); 
  }

  clearAuthData() {
    this.estaAutenticado = false;
    this.usuario = { username: "", token: "", expirationTime: 0 };
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('expirationTime');
  }

  initializeAuth() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const expirationTimeString = localStorage.getItem('expirationTime');
    const expirationTime = expirationTimeString ? parseInt(expirationTimeString, 10) : 0; 

    if (token && username && expirationTime > Date.now()) { 
      this.setAuthData(username, token, expirationTime);
    } else {
      this.clearAuthData(); 
    }
  }

  refreshToken = async () => {
    try {
      const response = await httpV2.post('/refresh-token');
      const { newToken, newExpirationTime } = response.data; 
      this.setAuthData(this.usuario.username, newToken, newExpirationTime);
    } catch (error) {
      console.error('Error refreshing token:', error);
      this.logout(); 
    }
  }
}

const autenticaStore = new AutenticaStore();

export default autenticaStore;
