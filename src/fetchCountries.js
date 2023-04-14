// export default fetchCountries()
  .then(countries => {
    renderinfoCountry(countries);
  })

  .catch(error => console.log(error));
function fetchCountries() {
  return fetch(
    'https://restcountries.com/v3.1/all?fields=name;capital;currencies;population;flags.svg;languages'
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
    // Response handling
  });

  function renderListCountry(countries) {}

  function renderinfoCountry(countries) {
    console.log(countries);
  }
}
