interface CountryDataProps {
  title: string;
  value: string;
}

const CountryData: React.FC<CountryDataProps> = ({ title, value }) => (
  <p><span className="font-bold">{`${title}: `}</span>{value}</p>
);

export default CountryData;
