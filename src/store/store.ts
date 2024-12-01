import { makeAutoObservable } from "mobx";
import AuthService from "../services/AuthService";
import HistogramsService from "../services/HistogramsService";
import { ToastContainer, toast } from 'react-custom-alert';
export default class Store {
    user = "";
    tariff = "";
    isAuth = false;
    searchResultTotalDocuments = {};
    searchResultRiskFactors = {};
    constructor() {
        makeAutoObservable(this)
    }

    //сервисы аутентификации
    setAuth(bool: boolean) {
        this.isAuth = bool;
    }
    checkAuth() {
        try {
            return this.isAuth;
        } catch (e) {
            console.log(e.response?.data?.message)
        }
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
            localStorage.setItem('expire', response.data.expire);
            localStorage.setItem('login', login);
            window.location.reload();
        } catch (e) {
            toast.error(e.response?.data?.message);
        }
    }

    async logout() {
        try {
            await AuthService.logout();
            localStorage.clear();
            this.setAuth(false);
            this.setUser("");
            window.location.reload();            
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }
 
    //сервисы поиска
    async request(
        issueDateInterval: Object, 
        searchContext: Object, 
        intervalType: string, 
        histogramTypes: Object, 
        limit: string, 
        similarMode: string, 
        sortType: string, 
        sortDirectionType: string,
        attributeFilters: Object
    ) {
        try {
            const response = await HistogramsService.request(
                issueDateInterval, 
                searchContext, 
                intervalType, 
                histogramTypes, 
                limit, 
                similarMode, 
                sortType, 
                sortDirectionType,
                attributeFilters
            );
            this.saveTotalDocumentsResult(response.data.data[0].data);
            this.saveRiskFactorsResult(response.data.data[1].data);
        } catch (e) {
            toast.error(e.response?.data?.message);
        }
    }
    saveTotalDocumentsResult(result: Object) {
        this.searchResultTotalDocuments = result;
    }
    saveRiskFactorsResult(result: Object) {
        this.searchResultRiskFactors = result;
    }

}       