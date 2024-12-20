import { runInAction, makeAutoObservable } from "mobx";
import AuthService from "../services/AuthService";
import HistogramsService from "../services/HistogramsService";
import DocsItemsService from "../services/DocsItemsService";
import DocsService from "../services/DocsService";
import UserInfoService from "../services/UserInfoService";
import { ToastContainer, toast } from 'react-custom-alert';

export default class Store {
    user = "";
    tariff = "";
    isAuth = false;
    userCompanyLimit = 0;
    userUsedCompanyCount = 0;
    countSuccess = false;

    countResults = 0;
    searchResultTotalDocuments = {};
    searchResultRiskFactors = {};    
    requestSuccess = false;

    docsItemsResult = {};
    docsItemsCount = 0;
    itemsRange = [0,9];
    endOfRange = false;
    docsItemsReady = false;

    docsResult = {};
    docsResultReady = false;

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
    countIsSuccess(bool: boolean) {
        this.countSuccess = bool;
    }
    setCompanyLimit(userCompanyLimit: number) {
        this.userCompanyLimit = userCompanyLimit;
    }
    setUsedCompanyCount(userUsedCompanyCount: number) {
        this.userUsedCompanyCount = userUsedCompanyCount;
    }
    async getUserCounters() {             
        try {
            const limits = await UserInfoService.info(); 
            setTimeout(() => {            
                this.setCompanyLimit(limits.data.eventFiltersInfo.companyLimit); 
                this.setUsedCompanyCount(limits.data.eventFiltersInfo.usedCompanyCount); 

                this.countIsSuccess(true)  
            }, 3000); // имитируем загрузку для проверки лоадера
               
             
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }   
    
    get getCompanyLimit() { //отмечен как computed
        return this.userCompanyLimit   
    }  
    get getUsedCompanyCount() { 
        return this.userUsedCompanyCount  
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
    requestIsSuccess(bool: boolean) {
        this.requestSuccess = bool;
    }

    async request(
        issueDateInterval: Object, 
        searchContext: Object, 
        intervalType: string, 
        histogramTypes: Object, 
        limit: Number, 
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
            setTimeout(() => {
                if(response.data.data.length == 0){
                    toast.info("Ничего не найдено")
                    this.requestIsSuccess(true)
                } else {
                    this.saveTotalDocumentsResult(response.data.data[0].data);
                    this.saveRiskFactorsResult(response.data.data[1].data);

                    let sum = 0;     // для строки "Найдено ... результатов"
                    for(var i = 0, len = response.data.data[0].data.length; i < len; i++) {
                        sum += response.data.data[0].data[i].value; 
                    }
                    runInAction(() => { // иначе - предупреждение в консоли по mobx
                        this.countResults = sum;
                    })                
                    
                    this.requestIsSuccess(true) 
                }
            }, 3000); // имитируем загрузку для проверки лоадера      
                    
        } catch (e) {
            toast.info("Ничего не найдено");
        } 
    }
    saveTotalDocumentsResult(result: Object) {
        this.searchResultTotalDocuments = result; 
    }
    saveRiskFactorsResult(result: Object) {
        this.searchResultRiskFactors = result; 
    }

    get getTotalDocuments() { //отмечен как computed
        return JSON.parse(JSON.stringify(this.searchResultTotalDocuments)) //уходим от типа вывода "Proxy"   
    } 
    get getRiskFactors() {
        return JSON.parse(JSON.stringify(this.searchResultRiskFactors))  
    } 

    //сервисы получения документов    
    async docsItems(
        issueDateInterval: Object, 
        searchContext: Object, 
        intervalType: string, 
        histogramTypes: Object, 
        limit: Number, 
        similarMode: string, 
        sortType: string, 
        sortDirectionType: string,
        attributeFilters: Object
    ) {
        try {
            const response = await DocsItemsService.request(
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
            setTimeout(() => {
                this.saveDocsItemsResult(response.data.items);    
                this.docsItemsCount = response.data.items.length   
                runInAction(() => { // runInAction, иначе - предупреждение в консоли по mobx
                    this.docsItemsReady = true
                })  
                response.data.items.length == 0 ? "" :
                 this.docs()
                

            }, 1000); // имитируем загрузку                 
                    
        } catch (e) {
            toast.error(e.response?.data?.message);
        } 
    }

    saveDocsItemsResult(result: Object) {
        this.docsItemsResult = result;        
    }  
    get getDocsItemsResult() {
        return JSON.parse(JSON.stringify(this.docsItemsResult)) //уходим от типа вывода "Proxy"       
    }        

    async docs() {
        try {

                if (this.docsItemsCount <= (this.itemsRange[1] +1)) {
                    this.itemsRange[1] = this.docsItemsCount -1
                    this.endOfRange = true
                    toast.info("Все документы загружены");
                }         
    
                //собираем актуальный массив id, максимум 10 доков
                let ids: Array<string> = [];    
                for(let i = this.itemsRange[0], len = this.itemsRange[1]; i <= len; i++) {
                    ids.push(this.getDocsItemsResult[i].encodedId);               
                }                         
    
                //запрашиваем доки для каждого id из актуального массива из 10 доков
                const response = await DocsService.request(ids); 
                
                runInAction(() => { // иначе - предупреждение в консоли по mobx
                    this.docsResult = response.data
                    this.docsResultReady = true
                    toast.info("Данные получены");
    
                    //после получения массива переписываем itemsRange для следующего запроса
                    if(this.docsItemsCount - this.itemsRange[1] > 9) {
                        this.itemsRange[1] = this.itemsRange[1] + 10
                    } else {
    
                        this.itemsRange[1] = this.docsItemsCount -1
                    }                
                })  
    
                    
        } catch (e) {
            toast.info("Ничего не найдено");
        } 
    }    
    
    get getDocs() {
        return this.docsResult
    }        
}       