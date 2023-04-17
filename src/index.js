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
            Notiflix.Notify.info(
              'Too many matches found. Please enter a more specific name.'
            );
            return;
          } else {
            if (countries.length === 1) {
              renderinfoCountry(countries);
            } else {
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
  console.log('between Two And Ten country info');
  const markup = countries
    .map(country => {
      return `<li>${country.name} Hello</li>`;
    })
    .join('');
  listСountry.innerHTML = markup;
  // listСountry.insertAdjacentHTML('beforeend', markup);
  console.log(markup);
}

function renderinfoCountry(countries) {
  console.log(countries);
  console.log('ONE country info');
  const languagesName = {};
  console.log(countries[0].currencies);
  console.log(countries[0].languages);
  const currenciesName = Object.keys(countries[0].currencies);
  console.log(currenciesName);
  const markup = countries
    .flatMap(
      ({
        flags: { png, svg, alt },
        name,
        capital,
        currencies,
        population,
        languages: { ukr },
      }) => {
        return `        
      <div><img src="${svg}" width="30" alt="${alt}"></img>${name.official}</div>
      <div>Capital: ${capital}</div>
      <div>Currencies: ${currenciesName}</div>
      <div>Population: ${population}</div>
      <div>Languages: ${ukr}</div>`;
      }
    )
    .join('');
  // listСountry.innerHTML = markup;
  listСountry.insertAdjacentHTML('beforeend', markup);
  console.log(markup);
}

{
  /* <img src="${svg}" alt="${alt}"></img>; */
}
