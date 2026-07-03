export const filterCountries = (
  countries: any[],
  searchQuery: string,
  regionFilter: string,
) => {
  let filteredCountries = countries;

  if (searchQuery) {
    filteredCountries = filteredCountries.filter((country: any) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }

  if (regionFilter) {
    filteredCountries = filteredCountries.filter(
      (country: any) => country.region === regionFilter,
    );
  }

  return filteredCountries;
};
