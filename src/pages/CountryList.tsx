import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import { formatCountryName } from '../utils/formatCountryName';
import CountryApi from '../api'

function CountryList() {
  const router = useRouter();

  const { data: countries, isLoading } = useQuery({
    queryKey: ['country-list'],
    queryFn: CountryApi().getAllCountries
  });

  const onSeeCountryDetails = (name: string) => {
    const formattedName = formatCountryName(name, true);
    router.navigate({
      to: '/details/$countryName',
      params: { countryName: formattedName },
    });
  };

  if (isLoading) return <div>Loading countries...</div>;
  
  return (
    <div className="space-y-4">
      <div className="bg-red-300 pt-12 sticky top-20">test</div>
      <div className="w-full grid grid-cols-4 gap-16">
        {
          countries && countries?.map((dt) => {
            return (
              <div key={dt.name.common} className="shadow-md rounded-md cursor-pointer" onClick={() => onSeeCountryDetails(dt.name.official)}>
                <div className="h-40 w-full overflow-hidden bg-gray-100 rounded-t-md">
                  <img 
                    src={dt.flags.png} 
                    alt={dt.name.official + " flag"}
                    className="w-full h-40"
                  />
                </div>
                <div className="p-8 space-y-4 bg-white rounded-b-md">
                  <h2>{dt.name.official}</h2>
                  <div>
                    <p><span>Population:</span> {dt.population}</p>
                    <p><span>Region:</span> {dt.population}</p>
                    <p><span>Capital:</span> {dt.capital}</p>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default CountryList