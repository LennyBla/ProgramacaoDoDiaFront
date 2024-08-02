import { makeObservable, observable, action } from "mobx";
import { httpV2 } from '../http';

interface IUsuario {
  username: string;
  token: string;
  expirationTime: number; 
}

class AutenticaStore {
  estaAutenticado = false;
  usuario: IUsuario = { username: "", token: "", expirationTime: 0 };
  sessaoExpirada = false;

  constructor() {
    makeObservable(this, {
      estaAutenticado: observable,
      usuario: observable,
      sessaoExpirada: observable,
      login: action,
      logout: action,
      refreshToken: action,
      setSessaoExpirada: action,
    });

    this.initializeAuth();
  }

  login({ username, token, expirationTime }: IUsuario) {
    console.log('Login action - Start', { username, token, expirationTime });
    this.setAuthData(username, token, expirationTime);
    console.log('Login action - End');
  }

  logout() {
    console.log('Logout action');
    this.clearAuthData();
  }

  setAuthData(username: string, token: string, expirationTime: number) {
    console.log('Setting auth data', { username, token, expirationTime });
    this.estaAutenticado = true;
    this.usuario = { username, token, expirationTime };
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    localStorage.setItem('expirationTime', expirationTime.toString()); 
  }

  clearAuthData() {
    console.log('Clearing auth data');
    this.estaAutenticado = false;
    this.usuario = { username: "", token: "", expirationTime: 0 };
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('expirationTime');
  }

  initializeAuth() {
    console.log('Initializing auth');
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const expirationTimeString = localStorage.getItem('expirationTime');
    const expirationTime = expirationTimeString ? parseInt(expirationTimeString, 10) : 0; 

    if (token && username && expirationTime > Date.now()) { 
      console.log('Auth data found in local storage, setting auth data');
      this.setAuthData(username, token, expirationTime);
    } else {
      console.log('No valid auth data found, clearing auth data');
      this.clearAuthData(); 
    }
  }

  refreshToken = async () => {
    console.log('Refreshing token - Start');
    try {
      const response = await httpV2.post('/refresh-token');
      const { newToken, newExpirationTime } = response.data; 
      console.log('Token refreshed successfully', { newToken, newExpirationTime });
      this.setAuthData(this.usuario.username, newToken, newExpirationTime);
    } catch (error) {
      console.error('Error refreshing token:', error);
      this.logout();
      this.setSessaoExpirada(true);
    }
    console.log('Refreshing token - End');
  }

  setSessaoExpirada(expirada: boolean) {
    console.log('Setting session expired', expirada);
    this.sessaoExpirada = expirada;
  }
}

const autenticaStore = new AutenticaStore();

export default autenticaStore;
