import axios from 'axios';
const baseURL = "https://restcountries.com/"

export default function axiosInstances() {  
  const axiosInstance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return axiosInstance;
};