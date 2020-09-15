'use strict';
import { refs } from './refs';

const debounce = require('lodash.debounce');

refs.searchQuery.addEventListener(
  'input',
  debounce(handleGenerateResponse, 500),
);

function handleGenerateResponse(event) {
  let inputValue = getInputQuery(event);

  if (inputValue) {
    fetchCountries(inputValue);
  }
}

function fetchCountries(searchQuery) {
  fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`)
    .then(data => data.json())
    .then(countries => console.table(countries));
}

function getInputQuery(event) {
  return event.target.value;
}

function generateCoutriesList() {}
