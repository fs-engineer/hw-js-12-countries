import { selectTypeOutputInfo } from '../index';

export default function fetchCountries(searchQuery) {
  fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`)
    .then(data => data.json())
    .then(countries => selectTypeOutputInfo(countries))
    .catch(error => console.log(error));
}
