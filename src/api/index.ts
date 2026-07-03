import { AxiosResponse } from "axios";
import axiosInstances from "../helper/axiosInstances";
import type { Country } from "../types/Country";
import { filterCountries } from "../helper/Helper";
const baseURL = import.meta.env.VITE_API_URL;

let cachedCountriesPromise: Promise<Country[]> | null = null;

async function fetchCountries(): Promise<Country[]> {
  if (!cachedCountriesPromise) {
    cachedCountriesPromise = axiosInstances({
      method: "get",
      url: `${baseURL}data.json`,
    }).then((response: AxiosResponse<Country[]>) => response.data);
  }

  return cachedCountriesPromise;
}

export default function index() {
  async function getAllCountries(): Promise<Country[]> {
    return fetchCountries();
  }

  async function getCountriesByRegion(region: string): Promise<Country[]> {
    const data = await fetchCountries();
    return filterCountries(data, "", region);
  }

  async function getCountriesByName(name: string): Promise<Country[]> {
    const data = await fetchCountries();
    return filterCountries(data, name, "");
  }

  async function getCountryDetails(code: string): Promise<Country | undefined> {
    const data = await fetchCountries();
    return data.find(
      (country) => country.alpha3Code.toLowerCase() === code.toLowerCase(),
    );
  }

  return {
    getAllCountries,
    getCountriesByRegion,
    getCountriesByName,
    getCountryDetails,
  };
}
