import $api from "../http/";
import { AxiosResponse } from "axios";
import { UserInfoResponse } from "../models/response/UserInfoResponse";

export default class UserInfoService {
    static async info (): Promise<AxiosResponse<UserInfoResponse>> {
        return $api.get<UserInfoResponse>('/info')
    }
}