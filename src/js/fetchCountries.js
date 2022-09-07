function fetchCountries(nameCity) {
  const url = `https://restcountries.com/v3.1/name/${nameCity}?name,capital,flags,population,languages`;
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

export { fetchCountries };
