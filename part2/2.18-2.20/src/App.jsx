import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const[weather,setWeather]=useState(null);

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
      });
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase()),
  );

  const countryToShow =
    selectedCountry ||
    (filteredCountries.length === 1 ? filteredCountries[0] : null);

    useEffect(() => {
      if (!countryToShow) {
        setWeather(null);
        return;
      }

      const capital = countryToShow.capital?.[0];

      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`,
        )
        .then((response) => {
          setWeather(response.data);
        });
    }, [countryToShow, apiKey]);
  return (
    <>
      <input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setSelectedCountry(null);
        }}
        placeholder="Search countries..."
      />

      {filteredCountries.length > 10 && (
        <div>Too many matches, specify another filter</div>
      )}

      {filteredCountries.length > 1 && filteredCountries.length <= 10 && (
        <ul>
          {filteredCountries.map((country) => (
            <li key={country.name.common}>
              {country.name.common}
              <button onClick={() => setSelectedCountry(country)}>Show</button>
            </li>
          ))}
        </ul>
      )}

      {countryToShow && (
        <div>
          <h1>{countryToShow.name.common}</h1>
          <div>Capital {countryToShow.capital?.[0]}</div>
          <div>Area {countryToShow.area}</div>

          <h3>Languages</h3>
          <ul>
            {Object.values(countryToShow.languages).map((lang) => (
              <li key={lang}>{lang}</li>
            ))}
          </ul>

          <img src={countryToShow.flags.png} width="150" />

          {weather && (
            <>
              <h3>Weather in {countryToShow.capital?.[0]}</h3>
              <div>Temperature {weather.main.temp} °C</div>
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="weather icon"
              />
              <div>Wind {weather.wind.speed} m/s</div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default App;
