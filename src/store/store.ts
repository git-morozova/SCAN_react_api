import { makeAutoObservable } from "mobx";
import { IUser } from "../models/IUser";
import AuthService from "../services/AuthService";
import UserInfoService from "../services/UserInfoService";

export default class Store {
    user = {} as IUser;
    isAuth = false;
    companyLimit = 0;
    usedCompanyCount = 0;
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
            console.log("Пользователь залогинен через форму");
            this.companyLimitInfo();
            this.usedCompanyCountInfo();
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
            console.log("Пользователь разлогинен");
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    checkAuth() {
        try {
            if (localStorage.getItem("token")) {
                console.log(`Пользователь залогинен через store / localStorage`);
                this.companyLimitInfo();
                this.usedCompanyCountInfo();

            } else {
                console.log(`Пользователь не залогинен`);
            }
            return this.isAuth;
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async companyLimitInfo() {       
        
    try {
        const limits = await UserInfoService.info();
        this.companyLimit = limits.data.eventFiltersInfo.companyLimit;
        

    } catch (e) {
        console.log(e.response?.data?.message)
    }



        
    }

    async getCompanyLimitInfo() {
        const limits = UserInfoService.info();
        console.log(limits);
        return this.companyLimit;
      };

    async usedCompanyCountInfo() {
        const limits = await UserInfoService.info();
        this.usedCompanyCount = limits.data.eventFiltersInfo.usedCompanyCount;
    }
    getUsedCompanyCountInfo() {
        return this.usedCompanyCount;
    }
}