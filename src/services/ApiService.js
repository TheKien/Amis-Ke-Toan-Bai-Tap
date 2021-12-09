import http from "../http-common";

class ApiService {
    constructor() {
      this.apiRouter;
      this.setApi();
    }
  setApi() {}

  get(apiRouter) {
    return http.get(`${apiRouter}`);
  }

  getId(id) {
    return http.get(`${this.apiRouter}/${id}`);
  }

  create(apiRouter, obj) {
    return http.post(`${apiRouter}`, obj);
  }

  update(apiRouter, id, obj) {
    return http.put(`${apiRouter}/${id}`, obj);
  }

  delete(apiRouter, id) {
    return http.delete(`${apiRouter}/${id}`);
  }
}

export default new ApiService();
