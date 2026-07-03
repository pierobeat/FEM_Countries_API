import type { Country } from "../types/Country";

export const filterCountries = (
  countries: Country[],
  searchQuery: string,
  regionFilter: string,
) => {
  let filteredCountries = countries;

  if (searchQuery) {
    filteredCountries = filteredCountries.filter((country) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }

  if (regionFilter) {
    filteredCountries = filteredCountries.filter(
      (country) => country.region === regionFilter,
    );
  }

  return filteredCountries;
};
