import { makeObservable, observable, action } from "mobx";
import { httpV2 } from '../http';
import Cookies from 'js-cookie';

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
      initializeAuth: action,
      setAuthData: action,
      clearAuthData: action,
      ensureCsrfToken: action,
      handle401: action,
      fetchUserId: action,
    });

    this.initializeAuth();
  }

  login({ username, token, expirationTime }: IUsuario) {
    console.log("Login attempt:", { username, token, expirationTime });
    this.sessaoExpirada = false;
    this.setAuthData(username, token, expirationTime);
  }

  logout() {
    console.log("Logging out user:", this.usuario.username);
    this.clearAuthData();
  }

  setAuthData(username: string, token: string, expirationTime: number) {
    console.log("Setting auth data:", { username, token, expirationTime });
    this.estaAutenticado = true;
    this.usuario = { username, token, expirationTime };
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    localStorage.setItem('expirationTime', expirationTime.toString());

    setTimeout(() => {
      this.checkSessionExpired();
    }, expirationTime - Date.now());
  }

  clearAuthData() {
    console.log("Clearing auth data");
    this.estaAutenticado = false;
    this.usuario = { username: "", token: "", expirationTime: 0 };
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('expirationTime');
  }

  initializeAuth() {
    console.log("Initializing auth");
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const expirationTimeString = localStorage.getItem('expirationTime');
    const expirationTime = expirationTimeString ? parseInt(expirationTimeString, 10) : 0;

    if (token && username && expirationTime > Date.now()) {
      this.setAuthData(username, token, expirationTime);
      this.ensureCsrfToken();
    } else {
      this.clearAuthData();
    }
  }

  ensureCsrfToken() {
    console.log("Ensuring CSRF token");
    const csrfToken = Cookies.get('csrftoken');
    if (!csrfToken) {
      console.log("CSRF token not found, fetching...");
      httpV2.get('/csrf-token/')
        .then(response => {
          const csrfToken = response.data.csrfToken;
          Cookies.set('csrftoken', csrfToken);
          console.log("CSRF token obtained:", csrfToken);
        })
        .catch(error => {
          console.error('Failed to get CSRF token:', error);
        });
    } else {
      console.log("CSRF token already set:", csrfToken);
    }
  }

  checkSessionExpired() {
    if (this.usuario.expirationTime <= Date.now()) {
      this.handle401();
    }
  }

  handle401() {
    this.clearAuthData();
    this.sessaoExpirada = true;
  }

  refreshToken = async () => {
    console.log("Refreshing token for user:", this.usuario.username);
    try {
      const response = await httpV2.post('/refresh-token');
      const { newToken, newExpirationTime } = response.data;
      this.setAuthData(this.usuario.username, newToken, newExpirationTime);
      console.log("Token refreshed successfully:", { newToken, newExpirationTime });
    } catch (error) {
      console.error('Error refreshing token:', error);
      this.handle401();
    }
  }

  fetchUserId = async (identifier: string): Promise<number | null> => {
    try {
      const response = await httpV2.get(`/users/?search=${identifier}`);
      console.log('Resultado da busca do usuário:', response.data.results);
      const user = response.data.results.find((u: IUsuario) =>
        u.username.toLowerCase() === identifier.toLowerCase()
      );
      console.log('Usuário encontrado:', user);
      return user ? user.id : null;
    } catch (error) {
      console.error('Error fetching user ID:', error);
      return null;
    }
  }

  setSessaoExpirada(expirada: boolean) {
    console.log("Setting session expired:", expirada);
    this.sessaoExpirada = expirada;
  }
}

const autenticaStore = new AutenticaStore();

export default autenticaStore;
