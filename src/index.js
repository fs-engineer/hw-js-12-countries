import './css/normalize.css';
import './scss/base-styles.scss';
import './scss/styles.scss';

import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

import { refs } from './js/refs';
import fetchCountries from './js/fetchCountries';

import countTemp from './templates/country.hbs';
import fullCoutryInfo from './templates/full-country-info.hbs';

const debounce = require('lodash.debounce');

refs.searchQuery.addEventListener(
  'input',
  debounce(handleGenerateListFromResponse, 500),
);

function handleGenerateListFromResponse(event) {
  let inputValue = getInputQuery(event);

  if (inputValue) {
    fetchCountries(inputValue);
  }
}

function getInputQuery(event) {
  return event.target.value;
}

function addCoutriesListToHTML(countriesMarkup) {
  const markup = countTemp(countriesMarkup);

  clearFlagsStyle();

  refs.countryWrapper.innerHTML = '';
  refs.countryWrapper.insertAdjacentHTML('beforeend', markup);
}

function addFullCoutryInfo(country) {
  const markup = fullCoutryInfo(country);

  addBackgroundImage(country);

  clearCountriesList();

  refs.countryWrapper.insertAdjacentHTML('beforeend', markup);
}

function clearCountriesList() {
  refs.countryWrapper.innerHTML = '';
}

export function selectTypeOutputInfo(numberOfCountries) {
  if (numberOfCountries.length < 2) {
    addFullCoutryInfo(numberOfCountries);
  } else if (numberOfCountries.length > 2 && numberOfCountries.length < 10) {
    addCoutriesListToHTML(numberOfCountries);
  } else {
    makePNotify();
  }
}

function makePNotify() {
  clearCountriesList();
  clearFlagsStyle();

  const myError = error({
    text: 'Найдено слишком много совпадений, уточните ваш запрос',
    type: 'error',
    title: 'Ошибка',
    animateSpeed: 'fast',
  });
}

function addBackgroundImage(obj) {
  refs.flagOverflow.style.backgroundImage = `url(${obj[0]['flag']})`;
}

function clearFlagsStyle() {
  refs.flagOverflow.style.backgroundImage = `url()`;
}
