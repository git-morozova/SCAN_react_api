import $api from "../http/";
import { AxiosResponse } from "axios";
import { DocsItemsResponse } from "../models/response/DocsItemsResponse";

export default class DocsItemsService {
    static async request (
        issueDateInterval: Object,
        searchContext: Object,
        intervalType: string,
        histogramTypes: Object,
        limit: Number,
        similarMode: string,
        sortType: string,
        sortDirectionType: string,
        attributeFilters: Object

    ): Promise<AxiosResponse<DocsItemsResponse>> {
        return $api.post<DocsItemsResponse>('/objectsearch', {
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

