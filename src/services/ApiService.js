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

  port(apiRouter, obj) {
    return http.post(`${apiRouter}`, obj);
  }

  export(apiRouter, obj) {
    return http.post(`${apiRouter}`, obj, {
      responseType: "blob",
    });
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

  deleteMutilple(apiRouter, obj) {
    return http.delete(`${apiRouter}`, {data: obj});
  }
}

export default new ApiService();
