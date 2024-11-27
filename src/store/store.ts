import { makeAutoObservable } from "mobx";
import AuthService from "../services/AuthService";

export default class Store {
    user = "";
    tariff = "";
    isAuth = false;
    constructor() {
        makeAutoObservable(this)
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }
    setUser(user: string) {
        this.user = user;
    }
    setTariff(tariff: string) {
        this.tariff = tariff;
    }

    async login(login: string, password: string) {
        try {
            const response = await AuthService.login(login, password);
            localStorage.setItem('token', response.data.accessToken);
            localStorage.setItem('login', login);
            window.location.reload();
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async logout() {
        try {
            await AuthService.logout();
            localStorage.removeItem('token');
            localStorage.removeItem('login');
            this.setAuth(false);
            this.setUser("");
            window.location.reload();
            
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    checkAuth() {
        try {
            return this.isAuth;
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }
}       