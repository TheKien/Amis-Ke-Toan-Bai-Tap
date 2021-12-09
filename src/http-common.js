import axios from "axios";

export default axios.create({
  baseURL: "http://amis.manhnv.net/api/v1/",
  headers: {
    "Content-type": "application/json"
  }
});