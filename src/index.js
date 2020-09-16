import './styles.css';
import './css/normalize.css';
import './scss/base-styles.scss';
import './scss/styles.scss';

import { alert, notice, info, success, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

import { refs } from './js/refs';
import fetchCountries from './js/fetchCountries';

import countTemp from './templates/country.hbs';
import fullCoutryInfo from './templates/full-country-info.hbs';

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

  addBackgroundImage(country);

  refs.countryWrapper.innerHTML = '';
  refs.countryWrapper.insertAdjacentHTML('beforeend', markup);
}

export function selectTypeOutputInfo(numberOfCountries) {
  numberOfCountries.length < 2
    ? addFullCoutryInfo(numberOfCountries)
    : numberOfCountries.length > 2 && numberOfCountries.length < 10
    ? addCoutriesListToHTML(numberOfCountries)
    : makePNotify();
}

function makePNotify() {
  const myError = error({
    text: 'Найдено слишком много совпадений, уточните ваш запрос',
    type: 'error',
    title: 'Ошибка',
    animateSpeed: 'fast',
  });
}

export function addBackgroundImage(obj) {
  refs.flagOverflow.style.backgroundImage = `url(${obj[0]['flag']})`;
}
