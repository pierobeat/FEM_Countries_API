import { useQuery } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import { CircularProgress } from '@mui/material';
import { formatCountryName } from '../utils/formatCountryName';
import CountryApi from '../api';
import CountryData from '../helper/CountryData';
import { useState } from 'react';
import SearchInput from '../components/SearchInput';
import RegionSelect from '../components/RegionSelect';
import { useFilterCountriesStore } from '../store/FilterCountries';

function CountryList() {
  const router = useRouter();
  const searchQuery = useFilterCountriesStore((state) => state.search);
  const regionFilter = useFilterCountriesStore((state) => state.region);
  const addFilter = useFilterCountriesStore((state) => state.addFilter);
  const removeRegion = useFilterCountriesStore((state) => state.removeRegion);

  const handleSearchChange = (value: string) => {
    addFilter('search', value);
    removeRegion(); 
  };

  const handleRegionChange = (value: string) => {
    addFilter('region', value);
    addFilter('search', '');
  };

  const {
    data: countries,
    isLoading,
  } = useQuery({
    queryKey: ['country-list', regionFilter, searchQuery],
    queryFn: async () => {
      if (regionFilter) {
        const res = await CountryApi().getCountriesByRegion(regionFilter);
        return res.data;
      }
      if (searchQuery) {
        const res = await CountryApi().getCountriesByName(searchQuery);
        return res.data;
      }
      return await CountryApi().getAllCountries();
    },
    enabled: true,
  });

  const onSeeCountryDetails = (name: string) => {
    const formattedName = formatCountryName(name, true);
    router.navigate({
      to: '/details/$countryName',
      params: { countryName: formattedName },
    });
  };

  return (
    <div className="space-y-12">
      <div className="pt-12 mt-1 sticky top-20 w-full flex items-end justify-between bg-[var(--background-color)]">
        <div className="w-[430px]">
          <SearchInput
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="w-[178px]">
          <RegionSelect value={regionFilter} onChange={handleRegionChange} />
        </div>
      </div>

      {isLoading ? (
        <div className="w-full flex justify-center py-32">
          <CircularProgress />
        </div>
      ) : (
        <div className="w-full grid grid-cols-4 gap-16">
          {countries?.map((dt) => (
            <div
              key={dt.name.common}
              className="shadow-md rounded-md cursor-pointer"
              style={{ backgroundColor: 'var(--header-background)' }}
              onClick={() => onSeeCountryDetails(dt.name.official)}
            >
              <div className="h-40 w-full overflow-hidden rounded-t-md">
                <img
                  src={dt.flags.png}
                  alt={dt.name.official + " flag"}
                  className="w-full h-40 object-cover"
                />
              </div>
              <div className="p-8 space-y-4 rounded-b-md">
                <h2 className="font-bold text-[18px]">{dt.name.official}</h2>
                <div>
                  <CountryData title="Population" value={dt.population.toString()} />
                  <CountryData title="Region" value={dt.region} />
                  <CountryData title="Capital" value={dt.capital} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CountryList;
