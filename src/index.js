import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const fieldFindCountry = document.querySelector('#search-box');
fieldFindCountry.addEventListener(
  'input',
  debounce(() => {
    Notiflix.Notify.success('Scroll handler call after 300ms pause');
  }, DEBOUNCE_DELAY)
);

Notiflix.Notify.success('Sol lucet omnibus');

Notiflix.Notify.failure('Qui timide rogat docet negare');

Notiflix.Notify.warning('Memento te hominem esse');

Notiflix.Notify.info('Cogito ergo sum');

// https://restcountries.eu/rest/v2/{service}?fields={field};{field};{field}
// https://restcountries.eu/rest/v2/all?fields=name;capital;currencies

fetchCountries(
  'https://restcountries.eu/rest/v2/all?fields=name.official;capital;population;flags.svg;languages'
)
  .then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
    // Response handling
  })
  .then(data => {
    // Data handling
  })
  .catch(error => {
    // Error handling
  });
