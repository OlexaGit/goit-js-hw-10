import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const fieldFindCountry = document.querySelector('#search-box');
const listСountry = document.querySelector('.country-list');
const infoCountry = document.querySelector('.country-info');

fieldFindCountry.addEventListener(
  'input',
  debounce(el => {
    const elementFind = el.data;
    // console.log(elementFind);
    // import fetchCountries from './fetchCountries.js';
    fetchCountries(elementFind)
      .then(countries => {
        renderinfoCountry(countries);
      })

      .catch(error => console.log(error));
    Notiflix.Notify.success('Scroll handler call after 300ms pause');
  }, DEBOUNCE_DELAY)
);

// Notiflix.Notify.success('Sol lucet omnibus');
// Notiflix.Notify.failure('Qui timide rogat docet negare');
// Notiflix.Notify.warning('Memento te hominem esse');
// Notiflix.Notify.info('Cogito ergo sum');

function fetchCountries(elemInput) {
  console.log(elemInput);
  return fetch('https://restcountries.com/v3.1/name/${elemInput}').then(
    response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    }
  );
}
// function renderListCountry(countries) {}

// 'https://restcountries.com/v3.1/all?fields=name;capital;currencies;population;flags.svg;languages'
function renderinfoCountry(countries) {
  console.log(countries);
}
