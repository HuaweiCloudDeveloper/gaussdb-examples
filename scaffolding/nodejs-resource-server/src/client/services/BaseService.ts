import http from "@/http-common";

/* eslint-disable */
class BaseService {
    getMsg(): Promise<any> {
        return http.get("/hello");
    }
}

export default new BaseService();