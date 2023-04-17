import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const fieldFindCountry = document.querySelector('#search-box');
const listСountry = document.querySelector('.country-list');
const infoCountry = document.querySelector('.country-info');

fieldFindCountry.addEventListener(
  'input',
  debounce(
    event => {
      const elementFind = event.target.value;
      console.dir(elementFind);
      // import fetchCountries from './fetchCountries.js';
      fetchCountries(elementFind)
        // .then(renderinfoCountry)
        .then(countries => {
          if (countries.length > 10) {
            listСountry.innerHTML = '';
            infoCountry.innerHTML = '';
            Notiflix.Notify.info(
              'Too many matches found. Please enter a more specific name.'
            );
            return;
          } else {
            if (countries.length === 1) {
              listСountry.innerHTML = '';
              renderInfoOneCountry(countries);
            } else {
              infoCountry.innerHTML = '';
              renderCountrybetweenTwoAndTen(countries);
            }
          }
        })
        .catch(error =>
          Notiflix.Notify.failure('Oops, there is no country with that name')
        );
    },
    DEBOUNCE_DELAY
    // {
    //   leading: true,
    //   trailing: true,
    // }
  )
);

// Notiflix.Notify.success('Sol lucet omnibus');
// Notiflix.Notify.failure('Qui timide rogat docet negare');
// Notiflix.Notify.warning('Memento te hominem esse');
// Notiflix.Notify.info('Cogito ergo sum');

function fetchCountries(name) {
  // console.log(name);
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name;fields=capital;fields=currencies;fields=population;fields=flags;fields=languages`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

function renderCountrybetweenTwoAndTen(countries) {
  console.log(countries);
  // console.log('between Two And Ten country info');
  const markup = countries
    .flatMap(({ flags: { png, alt }, name }) => {
      return `
      <li fontSize="30"><img src="${png}" width="30" alt="${alt}"></img>  ${name.common}</li>`;
    })
    .join('');
  listСountry.innerHTML = markup;
}

function renderInfoOneCountry(countries) {
  console.log(countries);
  console.log(countries[0].currencies);
  // const currenciesNames = Object.values(countries[0].currencies);
  const currenciesName = Object.values(
    Object.values(countries[0].currencies)[0].name
  ).join('');
  const languagesName = Object.values(countries[0].languages).join(', ');
  console.log(currenciesName);

  const markup = countries
    .flatMap(({ flags: { png, alt }, name, capital, population }) => {
      return `        
      <div fontSize="30"><img src="${png}" width="30" alt="${alt}"></img>  ${name.common}</div>
      <div fontSize = "30px">Capital: ${capital}</div>
      <div>Currencies: ${currenciesName}</div>
      <div>Population: ${population}</div>
      <div>Languages: ${languagesName}</div>`;
    })
    .join('');

  infoCountry.innerHTML = markup;
}
