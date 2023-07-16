import axiosPackage from "axios";

const axios = axiosPackage.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axios;
