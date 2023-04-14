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
        .catch(error => console.log(error));
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
  console.log('between Two And Ten country info');
}

function renderinfoCountry(countries) {
  console.log('ONE country info');
}
