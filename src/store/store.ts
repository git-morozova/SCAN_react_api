import { makeAutoObservable } from "mobx";
import { IUser } from "../models/IUser";
import AuthService from "../services/AuthService";


export default class Store {
    user = {} as IUser;
    isAuth = false;
constructor() {
makeAutoObservable(this)
}
setAuth(bool: boolean) {
    this.isAuth = bool;
}
setUser(user: IUser) {
    this.user = user;

}

async login(login: string, password: string) {
    try {
const response = await AuthService.login(login, password);
console.log(response);
localStorage.setItem('token', response.data.accessToken);
this.setAuth(true);
this.setUser(response.data.user);
    } catch (e) {
console.log(e.response?.data?.message)
    }

}


async logout() {
    try {
const response = await AuthService.logout();
console.log(response);
localStorage.removeItem('token');
this.setAuth(false);
this.setUser({} as IUser);
    } catch (e) {
console.log(e.response?.data?.message)
    }

}

}