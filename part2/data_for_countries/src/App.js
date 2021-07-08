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

function CountriesDisplay({ filteredCountries }) {
  if (filteredCountries.length > 10) {
    return (
      <>
        <p>Too many results, be more specific</p>
      </>
    );
  } else if (filteredCountries.length === 1) {
    const country = filteredCountries[0];
    const languages = filteredCountries[0].languages;
    const countryUrl = country.flag;
    console.log(countryUrl);
    return (
      <>
        <h1>{country.name}</h1>
        <p>{country.capital}</p>
        <p>{country.population}</p>
        <h2>Languages</h2>
        <ul>
          {languages.map((language) => (
            <li key={language.name}>{language.name}</li>
          ))}
        </ul>
        <img src={countryUrl} alt="flag img" />
      </>
    );
  } else {
    return (
      <div>
        {filteredCountries.map((country) => (
          <p key={country.name}>{country.name}</p>
        ))}
      </div>
    );
  }
}

function App() {
  const [countries, setCountries] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [showFiltered, setShowFiltered] = useState(false);

  const getCountries = () => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      console.log("promise fulfilled");
      setCountries(response.data);
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
      console.log(filteredCountries);
    } else {
      setShowFiltered(false);
    }
  };

  return (
    <>
      <SearchInput searchHandler={searchHandler} />
      <CountriesDisplay filteredCountries={filteredCountries} />
    </>
  );
}

export default App;
