import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const fieldFindCountry = document.querySelector('#search-box');
const listСountry = document.querySelector('.country-list');
const infoCountry = document.querySelector('.country-info');
let elementFind = '';
fieldFindCountry.addEventListener(
  'input',
  debounce(
    event => {
      let elementFind = event.target.value;
      console.log(event);
      console.dir(elementFind);
      // import fetchCountries from './fetchCountries.js';
      fetchCountries(elementFind)
        .then(renderinfoCountry)
        .catch(error => console.log(error));
      Notiflix.Notify.success(
        'Too many matches found. Please enter a more specific name.'
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
  console.log(name);
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name;capital;currencies;population;flags.svg;languages`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
// function renderCountrybetweenTwoAndTen(countries) {}

// 'https://restcountries.com/v3.1/all?fields=name;capital;currencies;population;flags.svg;languages'
function renderinfoCountry(countries) {
  console.log(countries);
}
