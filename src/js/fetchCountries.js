'use strict';
import { refs } from './refs';
import countTemp from '../templates/country.hbs';
import fullCoutryInfo from '../templates/full-country-info.hbs';

const debounce = require('lodash.debounce');

refs.searchQuery.addEventListener(
  'input',
  debounce(handleGenerateFromResponse, 500),
);

function handleGenerateFromResponse(event) {
  let inputValue = getInputQuery(event);

  if (inputValue) {
    fetchCountries(inputValue);
  }
}

function fetchCountries(searchQuery) {
  fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`)
    .then(data => data.json())
    .then(countries => {
      selectTypeOutputInfo(countries);
    })
    .catch(error => console.log(error));
}

function getInputQuery(event) {
  return event.target.value;
}

function addCoutriesListToHTML(countriesMarkup) {
  const markup = countTemp(countriesMarkup);

  refs.countryWrapper.innerHTML = '';
  refs.countryWrapper.insertAdjacentHTML('beforeend', markup);
}

function addFullCoutryInfo(country) {
  const markup = fullCoutryInfo(country);

  refs.countryWrapper.innerHTML = '';
  refs.countryWrapper.insertAdjacentHTML('beforeend', markup);
}

function selectTypeOutputInfo(numberOfCountries) {
  numberOfCountries.length < 2
    ? addFullCoutryInfo(numberOfCountries)
    : numberOfCountries.length > 2 && numberOfCountries.length < 10
    ? addCoutriesListToHTML(numberOfCountries)
    : console.log('more 10');
}
