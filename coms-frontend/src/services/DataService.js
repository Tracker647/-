import http from "../http-common";

class DateService {
    constructor(pathName) {
        this.pathName = pathName;
    }
    getAll() {
        return http.get(`/${this.pathName}`);
    }
    get(pkv) {
        console.log(`/${this.pathName}/${pkv}`);
        return http.get(`/${this.pathName}/${pkv}`);
    }
    create(data) {
        return http.post(`/${this.pathName}`, data);
    }
    update(pkv, data) {
        return http.put(`/${this.pathName}/${pkv}`, data);
    }
    delete(pkv) {
        return http.delete(`/${this.pathName}/${pkv}`);
    }
    deteleAll() {
        return http.delete(`/${this.pathName}`);
    }

}
export default DateService;