import { useQuery } from '@tanstack/react-query';
import { useRouter, useParams } from '@tanstack/react-router';
import CircularProgress from '@mui/material/CircularProgress';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { formatCountryName } from '../utils/formatCountryName';
import CountryApi from '../api';
import CountryData from '../helper/CountryData';

function CountryDetails() {
  const router = useRouter();
  const params = useParams({ from: "/details/$countryName" });
  const countryName = formatCountryName(params.countryName, false);

  const { data, isLoading } = useQuery({
    queryKey: ['country-details'],
    queryFn: () => CountryApi().getCountryDetails(countryName),
  });

  function getNonEnglishNativeName(data) {
    if (!data?.name?.nativeName) return {};
    const nativeName = data.name.nativeName;

    const nonEnglishName = Object.keys(nativeName).find(key => key !== 'eng');
    return nonEnglishName ? nativeName[nonEnglishName].common : 'N/A';
  }

  const nonEnglishNativeNames = getNonEnglishNativeName(data);

  return (
    <div>
      <div className="py-12">
        <button
          className="py-2 px-8 border-transparent rounded-md shadow-md flex gap-x-2 cursor-pointer back-button"
          onClick={() => router.navigate({ to: '/' })}
        >
          <KeyboardBackspaceIcon />
          <p>Back</p>
        </button>
      </div>

      {isLoading ? (
        <div className="w-full h-[50vh] flex justify-center items-center">
          <CircularProgress />
        </div>
      ) : (
        <div className="w-full grid grid-cols-2 gap-x-24 h-[25rem]">
          <div className="bg-blue-400">
            <img
              src={data?.flags?.png || 'default-flag.png'}
              alt={data?.name?.official + " flag"}
              className="w-full h-full"
            />
          </div>
          <div className="pt-10 gap-y-20">
            <div className="space-y-8">
              <h2 className="text-3xl font-bold">{data?.name?.official || 'Unknown Country'}</h2>
              <div className="grid grid-cols-2 gap-x-12">
                <div className="space-y-4">
                  <CountryData title="Native Name" value={nonEnglishNativeNames || 'N/A'} />
                  <CountryData title="Population" value={data?.population || 'N/A'} />
                  <CountryData title="Region" value={data?.region || 'N/A'} />
                  <CountryData title="Sub Region" value={data?.subregion || 'N/A'} />
                  <CountryData title="Capital" value={data?.capital?.[0] || 'N/A'} />
                </div>
                <div className="space-y-4">
                  <CountryData title="Top Level Domain" value={data?.tld?.[0] || 'N/A'} />
                  <CountryData title="Currencies" value={data?.currencies?.BWP?.name || 'N/A'} />
                  <CountryData title="Languages" value={Object.values(data?.languages || {}).join(', ') || 'N/A'} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CountryDetails;
