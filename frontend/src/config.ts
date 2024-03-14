import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://medium-backend.ankitwaware15.workers.dev/api/v1/",
});
