import { AxiosResponse } from "axios";
import axiosInstances from "../helper/axiosInstances";
import type { Country } from "../types/Country";
import { filterCountries } from "../helper/Helper";
const baseURL = import.meta.env.VITE_API_URL;

export default function index() {
  async function getAllCountries(): Promise<Country[]> {
    const method = "get";
    const url = `${baseURL}data.json`;
    const response: AxiosResponse<Country[]> = await axiosInstances({
      method,
      url,
    });
    return response?.data;
  }

  async function getCountriesByRegion(
    region: string,
  ): Promise<AxiosResponse<Country[]>> {
    const method = "get";
    const url = `${baseURL}data.json`;
    const response: AxiosResponse<Country[]> = await axiosInstances({
      method,
      url,
    });
    const { data } = response;
    const filteredCountries = filterCountries(data, "", region);
    return { ...response, data: filteredCountries };
  }

  async function getCountriesByName(
    name: string,
  ): Promise<AxiosResponse<Country[]>> {
    const method = "get";
    const url = `${baseURL}data.json`;
    const response: AxiosResponse<Country[]> = await axiosInstances({
      method,
      url,
    });
    const { data } = response;
    const filteredCountries = filterCountries(data, name, "");
    return { ...response, data: filteredCountries };
  }

  async function getCountryDetails(code: string): Promise<Country | undefined> {
    const method = "get";
    const url = `${baseURL}data.json`;
    const response: AxiosResponse<Country[]> = await axiosInstances({
      method,
      url,
    });
    const { data } = response;
    const countryDetails = data.find((country) => country.alpha3Code === code);
    return countryDetails;
    // return response?.data[0];
  }

  return {
    getAllCountries,
    getCountriesByRegion,
    getCountriesByName,
    getCountryDetails,
  };
}
