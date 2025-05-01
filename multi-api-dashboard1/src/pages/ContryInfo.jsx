import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const fetchCountries = async () => {
  const res = await axios.get('https://restcountries.com/v3.1/all');
  return res.data.map((c) => c.name.common).sort();
};

const fetchCountryData = async (countryName) => {
  const res = await axios.get(`https://restcountries.com/v3.1/name/${countryName}`);
  return res.data[0];
};

const CountryInfoPage = () => {
  const [selectedCountry, setSelectedCountry] = useState('');

  // Fetch list of all countries
  const {
    data: countries,
    isLoading: loadingCountries,
    error: countryListError,
  } = useQuery({
    queryKey: ['countries'],
    queryFn: fetchCountries,
    staleTime: 1000 * 60 * 10, // 10 mins
  });

  // Fetch selected country data only when selectedCountry is set
  const {
    data: countryData,
    isLoading: loadingDetails,
    error: countryDetailsError,
  } = useQuery({
    queryKey: ['country', selectedCountry],
    queryFn: () => fetchCountryData(selectedCountry),
    staleTime: 1000 * 60 * 5, // 5 mins
  });

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
      <h2>🌍 Country Info</h2>

      {/* Country dropdown */}
      {loadingCountries ? (
        <p>Loading country list...</p>
      ) : countryListError ? (
        <p style={{ color: 'red' }}>Failed to load countries.</p>
      ) : (
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
        >
          <option value="">-- Select a country --</option>
          {countries.map((name, i) => (
            <option key={i} value={name}>
              {name}
            </option>
          ))}
        </select>
      )}

      {/* Country details */}
      {selectedCountry && (
        <>
          {loadingDetails ? (
            <p>Loading details for {selectedCountry}...</p>
          ) : countryDetailsError ? (
            <p style={{ color: 'red' }}>Failed to fetch country data.</p>
          ) : countryData ? (
            <div style={{ border: '1px solid #ccc', padding: '1rem' }}>
              <img
                src={countryData.flags?.svg || countryData.flags?.png || 'https://via.placeholder.com/100x60?text=No+Flag'}
                alt="flag"
                style={{ width: '100px', marginBottom: '1rem' }}
              />
              <p><strong>Name:</strong> {countryData.name.common}</p>
              <p><strong>Capital:</strong> {countryData.capital?.[0] || 'N/A'}</p>
              <p><strong>Region:</strong> {countryData.region}</p>
              <p><strong>Population:</strong> {countryData.population.toLocaleString()}</p>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};

export default CountryInfoPage;
