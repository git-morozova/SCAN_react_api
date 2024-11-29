import $api from "../http/";
import { AxiosResponse } from "axios";
import { HistogramsResponse } from "../models/response/HistogramsResponse";

export default class HistogramsService {
    static async request (
        issueDateInterval: Object,
        searchContext: Object,
        intervalType: string,
        histogramTypes: Object,
        limit: string,
        similarMode: string,
        sortType: string,
        sortDirectionType: string,
        attributeFilters: Object

    ): Promise<AxiosResponse<HistogramsResponse>> {
        return $api.post<HistogramsResponse>('/objectsearch/histograms', {
            issueDateInterval, 
            searchContext, 
            intervalType, 
            histogramTypes, 
            limit, 
            similarMode, 
            sortType, 
            sortDirectionType,
            attributeFilters
        })
    }
}

