import axios from "axios";

const baseURL = "http://localhost:8082";

const post = (url, object) => {
  return axios.post(`${baseURL}${url}`, object);
};

const put = (url, object) => {
  return axios.put(`${baseURL}${url}`, object);
};

const del = (url) => {
  return axios.delete(`${baseURL}${url}`);
};

const get = (url) => {
  return axios.get(`${baseURL}${url}`);
};

export { post, put, del, get };
