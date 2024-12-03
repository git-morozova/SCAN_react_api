import $api from "../http/";
import { AxiosResponse } from "axios";
import { DocsResponse } from "../models/response/DocsResponse";

export default class DocsService {
    static async request (
        ids: Object,

    ): Promise<AxiosResponse<DocsResponse>> {
        return $api.post<DocsResponse>('/documents', {
            ids
        })
    }
}

