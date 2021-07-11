import React, { useState, useEffect } from "react";
import axios from "axios";

function SearchInput({ searchHandler }) {
  return (
    <div>
      find countries:
      <br />
      <input onChange={searchHandler} />
    </div>
  );
}

function CountryDisplay({ country }) {
  const languages = country.languages;
  const countryUrl = country.flag;
  return (
    <>
      <h1>{country.name}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h2>Languages</h2>
      <ul>
        {languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img src={countryUrl} alt="flag img" />
    </>
  );
}

function WeatherDisplay(props) {
  console.log("In weather display");
  console.log(props.weather);
  if (props.weather === undefined) {
    return <p>Loading ...</p>;
  } else {
    console.log("In component:");
    console.log(props.weather);
    const weather_img = props.weather.current.weather_icons[0];
    return (
      <div>
        <h2>Weather in {props.weather.location.name}</h2>
        <p>
          <b>temperature</b>: {props.weather.current.temperature} Celcius
        </p>
        <img src={weather_img} alt="" />
        <p>
          <b>wind:</b> {props.weather.current.wind_speed} mph, direction{" "}
          {props.weather.current.wind_dir}
        </p>
      </div>
    );
  }
}

function CountriesDisplay({
  filteredCountries,
  setShowCountry,
  showCountry,
  getWeather,
  weather,
}) {
  if (filteredCountries.length > 10) {
    return (
      <>
        <p>Too many results, be more specific</p>
      </>
    );
  } else if (filteredCountries.length === 1) {
    const country = filteredCountries[0];

    <CountryDisplay country={country} />;
  } else {
    return (
      <div>
        {filteredCountries.map((country) => (
          <div
            key={country.name}
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <p>{country.name}</p>
            <button
              country={country.name}
              onClick={() => {
                setShowCountry(country);
                getWeather(country.capital);
              }}
            >
              show
            </button>
          </div>
        ))}
        {showCountry.name && <CountryDisplay country={showCountry} />}
        {showCountry.name && <WeatherDisplay weather={weather} />}
      </div>
    );
  }
}

function App() {
  const [countries, setCountries] = useState([]);
  const [weather, setWeather] = useState();
  const [searchFilter, setSearchFilter] = useState("");
  const [showFiltered, setShowFiltered] = useState(false);
  const [showCountry, setShowCountry] = useState({});

  const api_key = process.env.REACT_APP_WEATHER_API_KEY;

  const getCountries = () => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      console.log("countries promise fulfilled");
      setCountries(response.data);
    });
  };

  const getWeather = (countryName) => {
    const urlCountry = countryName.replace(" ", "_");
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${api_key}&query=${urlCountry}`
      )
      .then((response) => {
        console.log("weather promise fulfilled");
        const weatherData = response.data;
        console.log(response.data);
        setWeather(weatherData);
      });
  };

  useEffect(getCountries, []);

  const filteredCountries = showFiltered
    ? countries.filter((country) =>
        country.name.toLowerCase().includes(searchFilter.toLowerCase())
      )
    : countries;

  const searchHandler = (event) => {
    setSearchFilter(event.target.value);
    if (searchFilter.length !== 0) {
      setShowFiltered(true);
    } else {
      setShowFiltered(false);
    }
  };

  return (
    <>
      <SearchInput searchHandler={searchHandler} />
      <CountriesDisplay
        filteredCountries={filteredCountries}
        setShowCountry={setShowCountry}
        showCountry={showCountry}
        getWeather={getWeather}
        weather={weather}
      />
    </>
  );
}

export default App;
