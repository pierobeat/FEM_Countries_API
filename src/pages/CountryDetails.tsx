import { useQuery } from '@tanstack/react-query';
import { useRouter, useParams } from '@tanstack/react-router';
import { formatCountryName } from '../utils/formatCountryName';
import CountryApi from '../api';

const CountryData = ({ title, value }) => (
  <p><span className="font-bold">{`${title}: `}</span>{value}</p>
);

function CountryDetails() {
  const router = useRouter();
  const params = useParams({ from: "/details/$countryName" });
  const countryName = formatCountryName(params.countryName, false);

  const { data, isLoading, error } = useQuery({
    queryKey: ['country-details'],
    queryFn: () => CountryApi().getCountryDetails(countryName),
  });

  console.log({ router });
  console.log({ data });

  if (isLoading) return <div>Loading Details...</div>;
  if (error) return <div>Error loading country details.</div>;

  function getNonEnglishNativeName(data) {
    if (!data?.name?.nativeName) return {};
    const nativeName = data.name.nativeName;
    
    const nonEnglishName = Object.keys(nativeName).find(key => key !== 'eng');
    return nonEnglishName ? nativeName[nonEnglishName].common : 'N/A';
  }

  const nonEnglishNativeNames = getNonEnglishNativeName(data);

  return (
    <div>
      <div className="py-12 bg-red-400">CountryDetails</div>
      <div className="w-full grid grid-cols-2 gap-x-24 h-[25rem]">
        <div className="bg-blue-400">
          <img
            src={data?.flags?.png || 'default-flag.png'}
            alt={data?.name?.official + " flag"}
            className="w-full h-full"
          />
        </div>
        <div className="bg-yellow-400 flex flex-col justify-center gap-y-20">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold">{data?.name?.official || 'Unknown Country'}</h2>
            <div className="max-h-36 columns-2">
              <CountryData title="Native Name" value={nonEnglishNativeNames || 'N/A'} />
              <CountryData title="Population" value={data?.population || 'N/A'} />
              <CountryData title="Region" value={data?.region || 'N/A'} />
              <CountryData title="Sub Region" value={data?.subregion || 'N/A'} />
              <CountryData title="Capital" value={data?.capital?.[0] || 'N/A'} />
              <CountryData title="Top Level Domain" value={data?.tld?.[0] || 'N/A'} />
              <CountryData title="Currencies" value={data?.currencies?.BWP?.name || 'N/A'} />
              <CountryData title="Languages" value={Object.values(data?.languages || {}).join(', ') || 'N/A'} />
            </div>
          </div>
          {/* <div className="w-full flex gap-x-2">
            <p>Border Countries:</p>
            {data?.borders?.length > 0
              ? data.borders.map((border) => <p key={border}>{border}</p>)
              : 'No borders available'}
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default CountryDetails;
