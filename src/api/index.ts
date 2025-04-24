import axiosInstances from "../helper/axiosInstances";
const baseURL = import.meta.env.VITE_API_URL

export default function index() {
  async function getAllCountries() {
    const method = "get";
    const url = `${baseURL}all`;
    const response = await axiosInstances({
      method,
      url,
    });
    return response?.data;
  }
  async function getCountriesByRegion(region:string) {
    const method = "get";
    const url = `${baseURL}region/${region}`;
    const response = await axiosInstances({
      method,
      url,
    });
    return response;
  }
  async function getCountryDetails(name:string) {
    const method = "get";
    const url = `${baseURL}name/${name}`;
    const response = await axiosInstances({
      method,
      url,
    });
    return response?.data[0];
  }

  return {
    getAllCountries,
    getCountriesByRegion,
    getCountryDetails
  }
}
