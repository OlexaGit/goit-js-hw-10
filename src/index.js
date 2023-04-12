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
    fetchCountries(elementFind)
      .then(countries => {
        // if (countries.length > 1 && countries.length < 11) {
        //   countries => renderListCountry(countries);
        // }
        renderinfoCountry(countries);
      })

      .catch(error => console.log(error));
    Notiflix.Notify.success('Scroll handler call after 300ms pause');
  }, DEBOUNCE_DELAY)
);

Notiflix.Notify.success('Sol lucet omnibus');
Notiflix.Notify.failure('Qui timide rogat docet negare');
Notiflix.Notify.warning('Memento te hominem esse');
Notiflix.Notify.info('Cogito ergo sum');

// https://restcountries.eu/rest/v2/{service}?fields={field};{field};{field}
// https://restcountries.eu/rest/v2/all?fields=name;capital;currencies

// 'https://restcountries.eu/rest/v2/all?fields=name.official;capital;population;flags.svg;languages'

function fetchCountries() {
  return fetch('https://restcountries.com/v3.1/all').then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }

    return response.json();
    // Response handling
  });
  // .then(data => {
  //   console.log();
  //   // Data handling
  // })
  // .catch(error => {
  //   // Error handling
  // });
}
function renderListCountry(countries) {}

function renderinfoCountry(countries) {
  console.log(countries);
}
