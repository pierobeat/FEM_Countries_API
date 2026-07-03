import { useQuery } from "@tanstack/react-query";
import { useRouter, useParams } from "@tanstack/react-router";
import CircularProgress from "@mui/material/CircularProgress";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { formatCountryName } from "../utils/formatCountryName";
import CountryApi from "../api";
import CountryData from "../helper/CountryData";

function CountryDetails() {
  const router = useRouter();
  const params = useParams({ from: "/$countryCode" });
  const countryName = formatCountryName(params.countryCode, false);

  const { data: country, isLoading } = useQuery({
    queryKey: ["country-details", countryName],
    queryFn: () => CountryApi().getCountryDetails(countryName),
  });

  console.log({ country });

  const { data: borderCountries = [] } = useQuery({
    queryKey: ["border-countries", country?.borders],
    queryFn: async () => {
      const borders = country?.borders || [];
      const results = await Promise.all(
        borders.map((borderCode: string) =>
          CountryApi().getCountryDetails(borderCode),
        ),
      );
      return results.filter(Boolean);
    },
    enabled: !!country?.borders?.length,
  });

  function getCurrencyNames(data: any) {
    if (!data?.currencies?.length) return "N/A";
    return data.currencies
      .map((currency: any) => currency.name || currency)
      .join(", ");
  }

  function getLanguageNames(data: any) {
    if (!data?.languages?.length) return "N/A";
    return data.languages
      .map((language: any) => language.name || language)
      .join(", ");
  }

  return (
    <div>
      <div className="py-12">
        <button
          className="py-2 px-8 border-transparent rounded-md shadow-md flex gap-x-2 cursor-pointer back-button"
          onClick={() => router.navigate({ to: "/" })}
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
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-24 h-[25rem]">
          <div className="bg-blue-400">
            <img
              src={country?.flags?.png || country?.flag || "default-flag.png"}
              alt={(country?.name || "Unknown Country") + " flag"}
              className="w-full h-full"
            />
          </div>
          <div className="pt-4 gap-y-20">
            <div className="space-y-8">
              <h2 className="text-3xl font-bold">
                {country?.name || "Unknown Country"}
              </h2>
              <div className="grid grid-cols-2 gap-x-12">
                <div className="space-y-4">
                  <CountryData
                    title="Native Name"
                    value={country?.nativeName || "N/A"}
                  />
                  <CountryData
                    title="Population"
                    value={country?.population?.toString() || "N/A"}
                  />
                  <CountryData
                    title="Region"
                    value={country?.region || "N/A"}
                  />
                  <CountryData
                    title="Sub Region"
                    value={country?.subregion || "N/A"}
                  />
                  <CountryData
                    title="Capital"
                    value={country?.capital || "N/A"}
                  />
                </div>
                <div className="space-y-4">
                  <CountryData
                    title="Top Level Domain"
                    value={country?.topLevelDomain?.[0] || "N/A"}
                  />
                  <CountryData
                    title="Currencies"
                    value={getCurrencyNames(country)}
                  />
                  <CountryData
                    title="Languages"
                    value={getLanguageNames(country)}
                  />
                </div>
                {borderCountries.length > 0 && (
                  <div className="space-y-4 mt-2 flex w-full flex-wrap col-span-2">
                    <p className="font-bold">Border Countries:</p>
                    <div className="flex w-full flex-wrap items-start gap-2">
                      {borderCountries.map((borderCountry: any) => (
                        <button
                          key={borderCountry.alpha3Code}
                          className="px-4 py-2 whitespace-nowrap rounded shadow-sm bg-[var(--background-color)] hover:bg-slate-200 transition cursor-pointer"
                          onClick={() =>
                            router.navigate({
                              to: "/$countryCode",
                              params: {
                                countryCode: borderCountry.alpha3Code,
                              },
                            })
                          }
                        >
                          {borderCountry.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CountryDetails;
